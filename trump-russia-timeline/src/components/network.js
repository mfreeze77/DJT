/**
 * Network Visualization Component
 * 
 * Uses Cytoscape.js to create an interactive network graph of entities and their relationships.
 * Displays people, organizations, properties, and other entities as nodes, with relationships as edges.
 */
import dataLoader from '../utils/dataLoader.js';
import { getCategoryColor, truncateText } from '../utils/helpers.js';

export default class NetworkVisualization {
  /**
   * @param {string} containerId - DOM element ID for the network container
   * @param {Object} options - Configuration options
   */
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container element with ID "${containerId}" not found`);
    }
    
    this.options = {
      height: '500px',
      minNodeSize: 20,
      maxNodeSize: 60,
      minEdgeWidth: 1,
      maxEdgeWidth: 8,
      animate: true,
      layout: 'concentric', // 'cose', 'concentric', 'breadthfirst', 'circle', etc.
      onNodeClick: null,
      onEdgeClick: null,
      ...options
    };
    
    this.network = null;
    this.data = null;
    
    // Set container height
    this.container.style.height = this.options.height;
    
    // Entity type settings for styling nodes
    this.entityTypeConfig = {
      person: {
        shape: 'ellipse',
        color: '#3498db', // Blue
        borderColor: '#2980b9'
      },
      organization: {
        shape: 'roundrectangle',
        color: '#e74c3c', // Red
        borderColor: '#c0392b'
      },
      property: {
        shape: 'hexagon',
        color: '#f39c12', // Orange
        borderColor: '#d35400'
      },
      'financial-institution': {
        shape: 'roundrectangle',
        color: '#27ae60', // Green
        borderColor: '#2ecc71'
      },
      // Special types for Trump and Russia
      'trump': {
        shape: 'ellipse',
        color: '#FFA500', // Orange for Trump
        borderColor: '#FF8C00'
      },
      'russian': {
        shape: 'ellipse',
        color: '#FF0000', // Red for Russian entities
        borderColor: '#CC0000'
      },
      'intermediary': {
        shape: 'ellipse',
        color: '#FF6347', // Tomato red for intermediaries
        borderColor: '#E54B38'
      }
    };
    
    // Relationship type settings for styling edges
    this.relationshipTypeConfig = {
      business: {
        color: '#3498db', // Blue
        style: 'solid'
      },
      financial: {
        color: '#27ae60', // Green
        style: 'solid'
      },
      intelligence: {
        color: '#8e44ad', // Purple
        style: 'dashed'
      },
      personal: {
        color: '#7f8c8d', // Gray
        style: 'dotted'
      },
      legal: {
        color: '#f39c12', // Orange
        style: 'solid'
      },
      political: {
        color: '#e74c3c', // Red
        style: 'solid'
      }
    };
  }
  
  /**
   * Initialize the network visualization
   * @param {Object} filterOptions - Initial filter options
   * @returns {Promise<NetworkVisualization>} This instance
   */
  async initialize(filterOptions = {}) {
    try {
      console.log('Initializing network visualization...');
      
      // Make sure data is loaded first
      await dataLoader.initialize();
      
      // Get network data from loader
      this.data = dataLoader.getNetworkData(filterOptions);
      console.log(`Loaded ${this.data.nodes.length} nodes and ${this.data.edges.length} edges for network`);
      
      // Initialize Cytoscape
      this.initializeCytoscape();
      
      console.log('Network visualization initialized successfully');
      return this;
    } catch (error) {
      console.error('Failed to initialize network visualization:', error);
      this.container.innerHTML = `<div class="error-message">
        <h3>Error Loading Network</h3>
        <p>${error.message}</p>
      </div>`;
      throw error;
    }
  }
  
  /**
   * Initialize Cytoscape with the loaded data
   */
  initializeCytoscape() {
    // Format nodes and edges for Cytoscape
    const elements = {
      nodes: this.formatNodesForCytoscape(),
      edges: this.formatEdgesForCytoscape()
    };
    
    // Configure Cytoscape
    this.network = cytoscape({
      container: this.container,
      elements: elements,
      style: this.getCytoscapeStyle(),
      layout: this.getCytoscapeLayout(),
      wheelSensitivity: 0.2, // Reduce zoom sensitivity
      minZoom: 0.1,
      maxZoom: 3,
      boxSelectionEnabled: true,
      autounselectify: false
    });
    
    // Add event listeners
    this.setupEventListeners();
    
    // Fit the graph to the viewport
    this.network.fit();
    
    // If 'Trump' entity exists, center on it
    const trumpNode = this.network.nodes('[id = "entity-001"]'); // DJT entity ID
    if (trumpNode.length > 0) {
      this.network.center(trumpNode);
      
      // Highlight Trump node
      trumpNode.addClass('highlighted');
    }
  }
  
  /**
   * Format nodes for Cytoscape
   * @returns {Array} Formatted nodes
   */
  formatNodesForCytoscape() {
    return this.data.nodes.map(node => {
      // Calculate node size based on significance
      const significance = node.value || 5; // Default medium significance
      
      // Determine special node types
      let entityType = node.group || 'person';
      
      // Check if it's Trump
      if (node.id === 'entity-001' || node.id === 'trump' || 
          (node.label && node.label.toLowerCase().includes('donald') && 
          node.label.toLowerCase().includes('trump'))) {
        entityType = 'trump';
      }
      // Check if it's a Russian entity
      else if (node.group === 'russian' || 
               (node.label && (node.label.toLowerCase().includes('russia') || 
                           node.label.toLowerCase().includes('soviet') || 
                           node.label.toLowerCase().includes('kgb')))) {
        entityType = 'russian';
      }
      // Check if it's an intermediary (special handling for intermediaries between Trump and Russia)
      else if (this.isIntermediary(node)) {
        entityType = 'intermediary';
      }
      
      // Get entity type config, or use default
      const typeConfig = this.entityTypeConfig[entityType] || this.entityTypeConfig.person;
      
      return {
        data: {
          id: node.id,
          label: node.label,
          type: entityType,
          significance: significance,
          color: typeConfig.color,
          borderColor: typeConfig.borderColor,
          shape: typeConfig.shape,
          description: node.title || '',
          // Add a custom ID for Trump and Russia to make layout easier
          isSpecial: entityType === 'trump' || entityType === 'russian'
        },
        position: {} // Will be set by layout
      };
    });
  }
  
  /**
   * Check if a node is an intermediary between Trump and Russia
   * @param {Object} node - Node to check
   * @returns {boolean} True if node is an intermediary
   */
  isIntermediary(node) {
    if (!this.data.edges) return false;
    
    // Check if node connects to both Trump and Russian entities
    const connections = this.data.edges.filter(edge => 
      edge.from === node.id || edge.to === node.id
    );
    
    // Check for Trump connection
    const hasTrumpConnection = connections.some(edge => {
      const otherId = edge.from === node.id ? edge.to : edge.from;
      const otherNode = this.data.nodes.find(n => n.id === otherId);
      
      return otherNode && otherNode.label && 
             otherNode.label.toLowerCase().includes('trump');
    });
    
    // Check for Russian connection
    const hasRussianConnection = connections.some(edge => {
      const otherId = edge.from === node.id ? edge.to : edge.from;
      const otherNode = this.data.nodes.find(n => n.id === otherId);
      
      return otherNode && 
             (otherNode.group === 'russian' || 
              (otherNode.label && 
               (otherNode.label.toLowerCase().includes('russia') || 
                otherNode.label.toLowerCase().includes('soviet'))));
    });
    
    return hasTrumpConnection && hasRussianConnection;
  }
  
  /**
   * Format edges for Cytoscape
   * @returns {Array} Formatted edges
   */
  formatEdgesForCytoscape() {
    return this.data.edges.map(edge => {
      // Calculate edge width based on strength
      const strength = edge.value || 1;
      
      // Get relationship type config, or use default
      const relType = edge.label || 'business';
      const typeConfig = this.relationshipTypeConfig[relType] || this.relationshipTypeConfig.business;
      
      return {
        data: {
          id: `${edge.from}-${edge.to}`,
          source: edge.from,
          target: edge.to,
          type: relType,
          strength: strength,
          color: typeConfig.color,
          style: typeConfig.style,
          label: edge.label,
          description: edge.title || '',
          bidirectional: edge.arrows === 'to;from'
        }
      };
    });
  }
  
  /**
   * Get Cytoscape style
   * @returns {Array} Style array
   */
  getCytoscapeStyle() {
    return [
      // Node base style
      {
        selector: 'node',
        style: {
          'label': 'data(label)',
          'width': 'mapData(significance, 1, 10, 20, 60)',
          'height': 'mapData(significance, 1, 10, 20, 60)',
          'background-color': 'data(color)',
          'border-color': 'data(borderColor)',
          'border-width': 2,
          'text-valign': 'center',
          'text-halign': 'center',
          'font-size': '10px',
          'color': '#fff',
          'text-outline-width': 2,
          'text-outline-color': 'data(color)',
          'shape': 'data(shape)',
          'text-wrap': 'ellipsis',
          'text-max-width': '80px'
        }
      },
      
      // Trump node style
      {
        selector: 'node[type = "trump"]',
        style: {
          'label': 'T',
          'font-size': '24px',
          'text-valign': 'center',
          'text-halign': 'center',
          'color': '#000',
          'text-outline-width': 0
        }
      },
      
      // Russian entity style
      {
        selector: 'node[type = "russian"]',
        style: {
          'label': 'R',
          'font-size': '24px',
          'text-valign': 'center',
          'text-halign': 'center',
          'color': '#000',
          'text-outline-width': 0
        }
      },
      
      // Intermediary entity style
      {
        selector: 'node[type = "intermediary"]',
        style: {
          'label': 'T/R',
          'font-size': '18px',
          'text-valign': 'center',
          'text-halign': 'center',
          'color': '#000',
          'text-outline-width': 0
        }
      },
      
      // Node hover style
      {
        selector: 'node:hover',
        style: {
          'border-width': 4,
          'border-color': '#FFF',
          'font-size': '12px',
          'z-index': 999
        }
      },
      
      // Node selected style
      {
        selector: 'node:selected',
        style: {
          'border-width': 4,
          'border-color': '#FFFF00',
          'font-size': '14px',
          'z-index': 999
        }
      },
      
      // Node highlighted style
      {
        selector: 'node.highlighted',
        style: {
          'border-width': 4,
          'border-color': '#FFFF00',
          'background-color': 'data(color)',
          'z-index': 999
        }
      },
      
      // Filtered nodes (hidden)
      {
        selector: 'node.filtered',
        style: {
          'opacity': 0,
          'visibility': 'hidden',
          'display': 'none'
        }
      },
      
      // Filtered edges (hidden)
      {
        selector: 'edge.filtered',
        style: {
          'opacity': 0,
          'visibility': 'hidden',
          'display': 'none',
          'width': 0
        }
      },
      
      // Edge base style
      {
        selector: 'edge',
        style: {
          'width': 'mapData(strength, 1, 10, 1, 8)',
          'line-color': 'data(color)',
          'target-arrow-color': 'data(color)',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          'opacity': 0.7,
          'z-index': 1,
          'label': 'data(label)',
          'font-size': '9px',
          'color': '#fff',
          'text-outline-width': 2,
          'text-outline-color': 'data(color)',
          'text-rotation': 'autorotate',
          'text-margin-y': '-10px',
          'text-background-opacity': 1,
          'text-background-color': 'data(color)',
          'text-background-padding': '2px'
        }
      },
      
      // Filtered edges (hidden)
      {
        selector: 'edge.filtered',
        style: {
          'opacity': 0,
          'visibility': 'hidden'
        }
      },
      
      // Edge dotted style
      {
        selector: 'edge[style = "dotted"]',
        style: {
          'line-style': 'dotted'
        }
      },
      
      // Edge dashed style
      {
        selector: 'edge[style = "dashed"]',
        style: {
          'line-style': 'dashed'
        }
      },
      
      // Edge bidirectional style
      {
        selector: 'edge[bidirectional = true]',
        style: {
          'source-arrow-shape': 'triangle',
          'source-arrow-color': 'data(color)'
        }
      },
      
      // Edge hover style
      {
        selector: 'edge:hover',
        style: {
          'width': 'mapData(strength, 1, 10, 3, 10)',
          'opacity': 1,
          'z-index': 999,
          'font-size': '11px'
        }
      },
      
      // Edge selected style
      {
        selector: 'edge:selected',
        style: {
          'width': 'mapData(strength, 1, 10, 3, 10)',
          'opacity': 1,
          'z-index': 999,
          'line-color': '#FFFF00',
          'target-arrow-color': '#FFFF00',
          'source-arrow-color': '#FFFF00'
        }
      }
    ];
  }
  
  /**
   * Get Cytoscape layout config
   * @returns {Object} Layout config
   */
  getCytoscapeLayout() {
    const self = this; // Store reference to use in callback functions
    const layouts = {
      cose: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0,
        animate: this.options.animate ? 'end' : false
      },
      concentric: {
        name: 'concentric',
        concentric: function(node) {
          // Check if it's Trump - position at bottom (higher value = outer rings)
          if (node.id() === 'entity-001' || node.id() === 'trump' || 
              node.data('label').toLowerCase().includes('donald') && 
              node.data('label').toLowerCase().includes('trump')) {
            return 20; // Place Trump on the outermost ring (bottom)
          }
          
          // Check if it's Russia - position at top (lower value = inner rings)
          if (node.data('type') === 'russian' || 
              node.data('label').toLowerCase().includes('russia') || 
              node.data('label').toLowerCase().includes('soviet')) {
            return 1; // Place Russian entities on the innermost ring (top)
          }
          
          // Position intermediaries in the middle
          // Use significance to determine exact position
          return 10 - (node.data('significance') || 5);
        },
        levelWidth: function() { return 1; },
        minNodeSpacing: 50,
        animate: this.options.animate ? true : false,
        // Ensure Trump is positioned at bottom
        transform: function(node, position) {
          // Flip the Y coordinates to have Trump at bottom and Russia at top
          // Only if positionTrumpAtBottom is enabled
          if (self.options.positionTrumpAtBottom) {
            return {
              x: position.x,
              y: self.container.clientHeight - position.y
            };
          }
          return position;
        }
      },
      breadthfirst: {
        name: 'breadthfirst',
        directed: true,
        roots: function(node) {
          // Use Trump node as the root for hierarchical layout
          return node.data('label').toLowerCase().includes('donald') && 
                 node.data('label').toLowerCase().includes('trump');
        },
        spacingFactor: 1.5,
        animate: this.options.animate ? true : false
      },
      hierarchical: {
        name: 'breadthfirst',
        directed: true,
        spacingFactor: 1.75,
        grid: true,
        // Identify roots (Trump nodes) for the layout
        roots: function(elem) {
          if (elem.data('label')?.toLowerCase().includes('trump') && 
              elem.data('label')?.toLowerCase().includes('donald')) {
            return true;
          }
          return false;
        },
        // Use a transform to invert the Y axis to put Trump at bottom instead of top
        transform: function(node, position) {
          // Flip Y coordinates so Trump (root) is at bottom
          return { 
            x: position.x, 
            y: self.container.clientHeight - position.y 
          };
        },
        animate: this.options.animate ? true : false
      },
      circle: {
        name: 'circle',
        animate: this.options.animate ? true : false
      }
    };
    
    // Default to hierarchical layout for the umbrella effect
    if (this.options.positionTrumpAtBottom && !layouts[this.options.layout]) {
      return layouts.hierarchical;
    }
    
    return layouts[this.options.layout] || layouts.cose;
  }
  
  /**
   * Set up event listeners for the network
   */
  setupEventListeners() {
    // Node click
    this.network.on('tap', 'node', event => {
      const node = event.target;
      const entityId = node.id();
      
      // Get full entity data
      const entity = dataLoader.getEntity(entityId);
      
      if (typeof this.options.onNodeClick === 'function') {
        this.options.onNodeClick(entity);
      } else {
        // Default behavior: Show entity details
        this.showEntityDetails(entity);
        
        // Also highlight connected nodes and edges
        this.highlightConnections(node);
      }
    });
    
    // Edge click
    this.network.on('tap', 'edge', event => {
      const edge = event.target;
      const sourceId = edge.data('source');
      const targetId = edge.data('target');
      
      // Get relationship data
      const relationships = dataLoader.data.relationships.filter(rel => 
        (rel.source === sourceId && rel.target === targetId) ||
        (rel.target === sourceId && rel.source === targetId)
      );
      
      if (typeof this.options.onEdgeClick === 'function') {
        this.options.onEdgeClick(relationships[0]);
      } else {
        // Default behavior: Show relationship details
        this.showRelationshipDetails(relationships[0]);
      }
    });
    
    // Background click - reset highlights
    this.network.on('tap', event => {
      if (event.target === this.network) {
        this.resetHighlights();
      }
    });
  }
  
  /**
   * Show entity details in a panel
   * @param {Object} entity - Entity data
   */
  showEntityDetails(entity) {
    // Look for a details container
    const detailsContainer = document.getElementById('detailsContainer');
    if (!detailsContainer || !entity) return;
    
    // Build HTML for entity details
    let html = `
      <div class="entity-details">
        <h3>${entity.name}</h3>
        ${entity.aliases && entity.aliases.length > 0 ? 
          `<div class="entity-aliases">Also known as: ${entity.aliases.join(', ')}</div>` : ''}
        
        <div class="entity-type-badge" style="background-color: ${
          this.entityTypeConfig[entity.type]?.color || '#95a5a6'
        }">
          ${entity.type}${entity.subtype ? ` - ${entity.subtype}` : ''}
        </div>
        
        <div class="entity-description">${entity.description || 'No description available.'}</div>
        
        ${entity.nationality ? `
          <div class="entity-nationality">
            <strong>Nationality:</strong> ${entity.nationality}
          </div>
        ` : ''}
        
        ${entity.roles && entity.roles.length > 0 ? `
          <div class="entity-roles">
            <strong>Roles:</strong> ${entity.roles.join(', ')}
          </div>
        ` : ''}
        
        ${entity.significance ? `
          <div class="entity-significance">
            <strong>Significance:</strong> ${entity.significance}/10
          </div>
        ` : ''}
        
        ${entity.firstAppearance ? `
          <div class="entity-appearance">
            <strong>First Appearance:</strong> ${entity.firstAppearance}
          </div>
        ` : ''}
        
        ${entity.intelligenceConnections && entity.intelligenceConnections.agency ? `
          <div class="intelligence-connections">
            <h4>Intelligence Connections</h4>
            <div><strong>Agency:</strong> ${entity.intelligenceConnections.agency}</div>
            <div><strong>Relationship:</strong> ${entity.intelligenceConnections.relationship}</div>
            <div><strong>Timeframe:</strong> ${entity.intelligenceConnections.timeframe}</div>
          </div>
        ` : ''}
        
        ${entity.financialData && (entity.financialData.estimatedWealth || entity.financialData.suspiciousActivity) ? `
          <div class="financial-data">
            <h4>Financial Information</h4>
            ${entity.financialData.estimatedWealth ? 
              `<div><strong>Estimated Wealth:</strong> $${entity.financialData.estimatedWealth.toLocaleString()}</div>` : ''}
            ${entity.financialData.suspiciousActivity ? 
              `<div><strong>Suspicious Activity:</strong> ${entity.financialData.suspiciousActivity}</div>` : ''}
          </div>
        ` : ''}
        
        ${entity.sources && entity.sources.length > 0 ? `
          <div class="entity-sources">
            <h4>Sources</h4>
            <ul>
              ${entity.sources.map(source => `
                <li>
                  <a href="${source.url}" target="_blank">${source.description}</a>
                  ${source.citation ? `<blockquote>${source.citation}</blockquote>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${entity.notes ? `
          <div class="entity-notes">
            <h4>Notes</h4>
            <p>${entity.notes}</p>
          </div>
        ` : ''}
      </div>
    `;
    
    // Display the details
    detailsContainer.innerHTML = html;
    detailsContainer.scrollIntoView({ behavior: 'smooth' });
  }
  
  /**
   * Show relationship details in a panel
   * @param {Object} relationship - Relationship data
   */
  showRelationshipDetails(relationship) {
    // Look for a details container
    const detailsContainer = document.getElementById('detailsContainer');
    if (!detailsContainer || !relationship) return;
    
    // Get entity names
    const sourceEntity = dataLoader.getEntity(relationship.source);
    const targetEntity = dataLoader.getEntity(relationship.target);
    
    if (!sourceEntity || !targetEntity) return;
    
    // Build HTML for relationship details
    let html = `
      <div class="relationship-details">
        <h3>Relationship</h3>
        
        <div class="relationship-entities">
          <div class="source-entity" style="background-color: ${
            this.entityTypeConfig[sourceEntity.type]?.color || '#95a5a6'
          }">
            ${sourceEntity.name}
          </div>
          
          <div class="relationship-arrow ${relationship.isBidirectional ? 'bidirectional' : ''}" style="
            color: ${this.relationshipTypeConfig[relationship.type]?.color || '#95a5a6'}
          ">
            ${relationship.isBidirectional ? '⟷' : '→'}
          </div>
          
          <div class="target-entity" style="background-color: ${
            this.entityTypeConfig[targetEntity.type]?.color || '#95a5a6'
          }">
            ${targetEntity.name}
          </div>
        </div>
        
        <div class="relationship-type-badge" style="background-color: ${
          this.relationshipTypeConfig[relationship.type]?.color || '#95a5a6'
        }">
          ${relationship.type}${relationship.subtype ? ` - ${relationship.subtype}` : ''}
        </div>
        
        <div class="relationship-description">${relationship.description || 'No description available.'}</div>
        
        ${relationship.strength ? `
          <div class="relationship-strength">
            <strong>Strength:</strong> ${relationship.strength}/10
          </div>
        ` : ''}
        
        ${relationship.startDate ? `
          <div class="relationship-dates">
            <strong>Period:</strong> ${relationship.startDate} to ${relationship.endDate || 'Present'}
          </div>
        ` : ''}
        
        ${relationship.evidenceStrength ? `
          <div class="relationship-evidence">
            <strong>Evidence:</strong> ${relationship.evidenceStrength}
          </div>
        ` : ''}
        
        ${relationship.sources && relationship.sources.length > 0 ? `
          <div class="relationship-sources">
            <h4>Sources</h4>
            <ul>
              ${relationship.sources.map(source => `
                <li>
                  <a href="${source.url}" target="_blank">${source.description}</a>
                  ${source.citation ? `<blockquote>${source.citation}</blockquote>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${relationship.notes ? `
          <div class="relationship-notes">
            <h4>Notes</h4>
            <p>${relationship.notes}</p>
          </div>
        ` : ''}
      </div>
    `;
    
    // Display the details
    detailsContainer.innerHTML = html;
    detailsContainer.scrollIntoView({ behavior: 'smooth' });
  }
  
  /**
   * Highlight node and its connections
   * @param {Object} node - Cytoscape node
   */
  highlightConnections(node) {
    // Reset previous highlights
    this.resetHighlights();
    
    // Add highlighted class to the selected node
    node.addClass('highlighted');
    
    // Get connected nodes and edges
    const connectedEdges = node.connectedEdges();
    const connectedNodes = node.neighborhood('node');
    
    // Highlight connected nodes and edges
    connectedEdges.addClass('highlighted');
    connectedNodes.addClass('highlighted');
    
    // Fade out unconnected elements
    this.network.elements()
      .difference(connectedEdges)
      .difference(connectedNodes)
      .difference(node)
      .addClass('faded');
  }
  
  /**
   * Reset highlights
   */
  resetHighlights() {
    this.network.elements().removeClass('highlighted faded');
  }
  
  /**
   * Filter network by entity types
   * @param {Array<string>} types - Entity types to show
   */
  filterByEntityTypes(types) {
    if (!this.network) return;
    
    if (!types || types.length === 0) {
      // Show all nodes
      this.network.nodes().removeClass('filtered');
    } else {
      // Hide nodes not in the specified types
      this.network.nodes().forEach(node => {
        if (!types.includes(node.data('type'))) {
          node.addClass('filtered');
        } else {
          node.removeClass('filtered');
        }
      });
    }
    
    // Update visibility of edges
    this.network.edges().forEach(edge => {
      const source = this.network.getElementById(edge.data('source'));
      const target = this.network.getElementById(edge.data('target'));
      
      if (source.hasClass('filtered') || target.hasClass('filtered')) {
        edge.addClass('filtered');
      } else {
        edge.removeClass('filtered');
      }
    });
  }
  
  /**
   * Filter network by relationship types
   * @param {Array<string>} types - Relationship types to show
   */
  filterByRelationshipTypes(types) {
    if (!this.network) return;
    
    if (!types || types.length === 0) {
      // Show all edges
      this.network.edges().removeClass('filtered');
    } else {
      // Hide edges not in the specified types
      this.network.edges().forEach(edge => {
        if (!types.includes(edge.data('type'))) {
          edge.addClass('filtered');
        } else {
          edge.removeClass('filtered');
        }
      });
    }
  }
  
  /**
   * Search for entities in the network
   * @param {string} query - Search query
   * @returns {Array} Matching nodes
   */
  search(query) {
    if (!this.network || !query) return [];
    
    // Reset highlights
    this.resetHighlights();
    
    // Normalize query
    const normalizedQuery = query.toLowerCase().trim();
    
    // Find matching nodes
    const matchingNodes = this.network.nodes().filter(node => {
      const label = node.data('label').toLowerCase();
      const description = node.data('description').toLowerCase();
      
      return label.includes(normalizedQuery) || description.includes(normalizedQuery);
    });
    
    // Highlight matching nodes
    if (matchingNodes.length > 0) {
      matchingNodes.addClass('highlighted');
      
      // Center on the first match
      this.network.center(matchingNodes[0]);
      this.network.zoom({
        level: 1.5,
        position: matchingNodes[0].position()
      });
    }
    
    return matchingNodes;
  }
  
  /**
   * Change the layout of the network
   * @param {string} layoutName - Name of the layout ('cose', 'concentric', etc.)
   */
  changeLayout(layoutName) {
    if (!this.network) return;
    
    if (!layoutName || !['cose', 'concentric', 'breadthfirst', 'circle'].includes(layoutName)) {
      layoutName = 'cose';
    }
    
    this.options.layout = layoutName;
    
    // Apply the new layout
    const layout = this.network.layout(this.getCytoscapeLayout());
    layout.run();
  }
  
  /**
   * Filter the network to show only nodes and edges that existed at a specific date
   * @param {Date} date - Date to filter by
   */
  filterByDate(date) {
    if (!this.network) return;
    
    const dateObj = date instanceof Date ? date : new Date(date);
    console.log(`Filtering network for date: ${dateObj.toISOString().split('T')[0]}`);
    
    // Reset any previous filtering
    this.network.elements().removeClass('filtered');
    
    // Filter nodes based on date
    this.network.nodes().forEach(node => {
      const entityId = node.id();
      const entity = dataLoader.getEntity(entityId);
      
      if (entity) {
        const firstDate = entity.firstAppearance ? new Date(entity.firstAppearance) : new Date(0);
        const lastDate = entity.lastAppearance ? new Date(entity.lastAppearance) : new Date(9999, 11, 31);
        
        // Hide node if it didn't exist at the specified date
        if (dateObj < firstDate || dateObj > lastDate) {
          node.addClass('filtered');
          
          // Also hide all connected edges
          const connectedEdges = node.connectedEdges();
          connectedEdges.addClass('filtered');
        }
      }
    });
    
    // Additional pass for edges - check relationship dates
    this.network.edges().filter(edge => !edge.hasClass('filtered')).forEach(edge => {
      const sourceId = edge.data('source');
      const targetId = edge.data('target');
      
      // Get relationship data
      const relationships = dataLoader.data.relationships.filter(rel => 
        (rel.source === sourceId && rel.target === targetId) ||
        (rel.source === targetId && rel.target === sourceId)
      );
      
      if (relationships && relationships.length > 0) {
        const relationship = relationships[0]; // Take the first relationship
        
        // Check if relationship existed at the filtered date
        if (relationship.startDate && dateObj < new Date(relationship.startDate)) {
          edge.addClass('filtered');
        }
        
        if (relationship.endDate && dateObj > new Date(relationship.endDate)) {
          edge.addClass('filtered');
        }
      }
    });
    
    // Apply CSS styles directly for better compatibility
    this.network.elements('.filtered').style({
      'display': 'none',
      'opacity': 0,
      'visibility': 'hidden'
    });
  }
  
  /**
   * Update the network with new filter options
   * @param {Object} filterOptions - Filter options
   * @returns {Promise<NetworkVisualization>} This instance
   */
  async update(filterOptions = {}) {
    console.log('Updating network with filter options:', filterOptions);
    
    // Update data based on filters
    this.data = dataLoader.getNetworkData(filterOptions);
    
    // Re-initialize the network with the new data
    // Preserve existing option settings
    this.initializeCytoscape();
    
    // If there's a specific date filter, apply it
    if (filterOptions.endYear) {
      const filterDate = new Date(filterOptions.endYear, 11, 31);
      this.filterByDate(filterDate);
    }
    
    return this;
  }
}
