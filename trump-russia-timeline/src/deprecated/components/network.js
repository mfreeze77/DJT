// D3-based network visualization
import * as d3 from 'd3';
import { forceSimulation, forceLink, forceManyBody, forceCenter, forceCollide } from 'd3-force';

export default class NetworkGraph {
  constructor(selector, data, options = {}) {
    this.selector = selector;
    this.data = data;
    
    // Validate and ensure data structure is correct
    console.log('Network constructor - data received:', 
      data ? `${data.nodes?.length || 0} nodes, ${data.links?.length || 0} links` : 'No data');
    
    if (!data || !data.nodes || !data.links) {
      console.error('Invalid network data structure:', data);
      // Create minimal valid data structure
      this.data = {
        nodes: [{
          id: 'placeholder',
          label: 'No Data Available',
          group: 'other'
        }],
        links: []
      };
    }
    
    // Default options
    this.options = Object.assign({
      width: 600,
      height: 400,
      nodeRadius: 20,  // Larger nodes for better visibility
      linkDistance: 150, // Increased for better spacing
      charge: -400,    // Stronger repulsion
      centerForce: 0.1 // Strength of center gravity
    }, options);
    
    this.svg = null;
    this.simulation = null;
    this.listeners = {};
    
    // Track currently visible nodes/links for filtering
    this.visibleNodes = [];
    this.visibleLinks = [];
    
    // Pre-process node groups - identify T, T/R, R categories
    this.prepareNodeGroups();
  }
  
  // Pre-categorize nodes into Trump, Russia, and intermediaries
  prepareNodeGroups() {
    if (!this.data.nodes) return;
    
    this.data.nodes.forEach(node => {
      // Determine if node is Trump-related
      const isTrump = 
        node.label.toLowerCase().includes('trump') && 
        node.label.toLowerCase().includes('donald');
      
      // Determine if node is Russia-related
      const isRussian = 
        node.group === 'russian' || 
        node.type === 'russian' ||
        node.label.toLowerCase().includes('russia') || 
        node.label.toLowerCase().includes('soviet') || 
        node.label.toLowerCase().includes('kgb');
      
      // Assign conceptual grouping based on the entity type
      if (isTrump) {
        node.conceptGroup = 'T'; // Trump
        node.nodeColor = '#FF9900'; // Orange for Trump
      } else if (isRussian) {
        node.conceptGroup = 'R'; // Russia/Russian
        node.nodeColor = '#FF3333'; // Red for Russian
      } else {
        // Check if this is a potential intermediary by looking at links
        const isIntermediary = this.data.links.some(link => {
          const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
          const targetId = typeof link.target === 'object' ? link.target.id : link.target;
          
          // If this node links between Trump and Russian entities, it's an intermediary
          return (sourceId === node.id || targetId === node.id);
        });
        
        node.conceptGroup = isIntermediary ? 'T/R' : 'other';
        node.nodeColor = isIntermediary ? '#FF6666' : '#999999'; // Light red for intermediaries
      }
    });
  }
  
  initialize() {
    console.log('Initializing network visualization');
    const { width, height } = this.options;
    
    try {
      // Create SVG
      const container = d3.select(this.selector);
      if (container.empty()) {
        console.error(`Selector not found: ${this.selector}`);
        return this;
      }
      
      this.svg = container.append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'network-graph');
      
      // Add zoom behavior
      const zoom = d3.zoom()
        .scaleExtent([0.1, 4])
        .on('zoom', (event) => {
          graphContainer.attr('transform', event.transform);
        });
      
      this.svg.call(zoom);
      
      // Create container for zoomable elements
      const graphContainer = this.svg.append('g')
        .attr('class', 'graph-container');
      
      // Add descriptive text for conceptual groups
      this.svg.append('text')
        .attr('x', 10)
        .attr('y', 20)
        .attr('class', 'legend-title')
        .style('font-weight', 'bold')
        .text('Network Connections:');
      
      this.svg.append('circle')
        .attr('cx', 20)
        .attr('cy', 40)
        .attr('r', 8)
        .style('fill', '#FF9900');
      
      this.svg.append('text')
        .attr('x', 35)
        .attr('y', 45)
        .text('Trump (T)');
      
      this.svg.append('circle')
        .attr('cx', 20)
        .attr('cy', 65)
        .attr('r', 8)
        .style('fill', '#FF6666');
      
      this.svg.append('text')
        .attr('x', 35)
        .attr('y', 70)
        .text('Intermediaries (T/R)');
      
      this.svg.append('circle')
        .attr('cx', 20)
        .attr('cy', 90)
        .attr('r', 8)
        .style('fill', '#FF3333');
      
      this.svg.append('text')
        .attr('x', 35)
        .attr('y', 95)
        .text('Russia (R)');
      
      // Add arrow marker definition for directed links
      const defs = this.svg.append('defs');
      
      defs.append('marker')
        .attr('id', 'arrowhead')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 20)  // Position slightly away from node
        .attr('refY', 0)
        .attr('orient', 'auto')
        .attr('markerWidth', 6)
        .attr('markerHeight', 6)
        .attr('xoverflow', 'visible')
        .append('path')
        .attr('d', 'M 0,-5 L 10,0 L 0,5')
        .attr('fill', '#999')
        .style('stroke', 'none');

      // Create links
      const links = graphContainer.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data(this.data.links)
        .enter()
        .append('line')
        .attr('class', d => `link link-${d.type}`)
        .attr('stroke-width', d => Math.max(1, Math.sqrt(d.value || 1)))
        .attr('stroke', '#999')
        .attr('marker-end', 'url(#arrowhead)');
      
      // Create nodes with dynamic radius based on importance
      const nodeGroups = graphContainer.append('g')
        .attr('class', 'nodes')
        .selectAll('g')
        .data(this.data.nodes)
        .enter()
        .append('g')
        .attr('class', d => `node-group node-${d.id}`);
      
      // Add circle for each node
      const nodes = nodeGroups.append('circle')
        .attr('class', d => `node node-${d.conceptGroup || d.group}`)
        .attr('r', d => this.getNodeRadius(d))
        .attr('fill', d => d.nodeColor || this.getNodeColor(d.conceptGroup || d.group))
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .call(this.drag(this.simulation));
      
      // Add labels to nodes
      const labels = nodeGroups.append('text')
        .attr('dx', 0)
        .attr('dy', d => -this.getNodeRadius(d) - 5) // Position above node
        .attr('text-anchor', 'middle')
        .attr('class', 'node-label')
        .text(d => d.label)
        .attr('fill', '#333')
        .attr('stroke', '#fff')
        .attr('stroke-width', 0.5)
        .attr('paint-order', 'stroke')
        .style('font-size', '12px')
        .style('pointer-events', 'none');
      
      // Add titles for tooltips
      nodeGroups.append('title')
        .text(d => `${d.label} (${d.conceptGroup || d.group})`);
      
      // Add click event to nodes
      nodeGroups.on('click', (event, d) => {
        event.stopPropagation();
        if (this.listeners.nodeSelected) {
          this.listeners.nodeSelected(d);
        }
      });
      
      // Create force simulation
      this.simulation = forceSimulation(this.data.nodes)
        .force('link', forceLink(this.data.links)
          .id(d => d.id)
          .distance(this.options.linkDistance))
        .force('charge', forceManyBody()
          .strength(this.options.charge))
        .force('center', forceCenter(width / 2, height / 2)
          .strength(this.options.centerForce))
        .force('collision', forceCollide()
          .radius(d => this.getNodeRadius(d) + 5));
      
      // Update positions during simulation
      this.simulation.on('tick', () => {
        // Constrain nodes to svg boundaries
        this.data.nodes.forEach(d => {
          d.x = Math.max(this.getNodeRadius(d), Math.min(width - this.getNodeRadius(d), d.x));
          d.y = Math.max(this.getNodeRadius(d), Math.min(height - this.getNodeRadius(d), d.y));
        });
        
        links
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);
        
        nodeGroups
          .attr('transform', d => `translate(${d.x}, ${d.y})`);
      });
      
      // Adjust initial positions for conceptual layout
      this.positionNodesConceptually();
      
      // Store references for updating
      this.nodeElements = nodeGroups;
      this.linkElements = links;
      
      console.log('Network visualization initialized successfully');
    } catch (error) {
      console.error('Error initializing network visualization:', error);
    }
    
    return this;
  }
  
  // Position nodes conceptually to match the diagram (T at bottom, R at top, T/R in between)
  positionNodesConceptually() {
    const { width, height } = this.options;
    
    this.data.nodes.forEach(node => {
      if (node.conceptGroup === 'T') { // Trump
        node.fx = width / 2; // Center horizontally
        node.fy = height * 0.8; // Near bottom
        node.fixed = true; // Fix position
      } else if (node.conceptGroup === 'R') { // Russia
        node.fx = width / 2; // Center horizontally
        node.fy = height * 0.2; // Near top
        node.fixed = true; // Fix position
      } else if (node.conceptGroup === 'T/R') { // Intermediaries
        // Position randomly in the middle section
        node.x = width * (0.3 + Math.random() * 0.4);
        node.y = height * (0.4 + Math.random() * 0.3);
      }
    });
    
    // Restart simulation with new positions
    if (this.simulation) {
      this.simulation.alpha(1).restart();
    }
  }
  
  drag(simulation) {
    function dragstarted(event) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    
    function dragged(event) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }
    
    function dragended(event) {
      if (!event.active) simulation.alphaTarget(0);
      // Don't reset position if it's a fixed node
      if (!event.subject.fixed) {
        event.subject.fx = null;
        event.subject.fy = null;
      }
    }
    
    return d3.drag()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended);
  }
  
  getNodeRadius(node) {
    // Base radius on node importance/value if available
    const baseRadius = this.options.nodeRadius;
    const value = node.value || node.significance || 1;
    
    // Scale radius by importance but set minimum
    return Math.max(baseRadius / 2, baseRadius * Math.sqrt(value / 5));
  }
  
  getNodeColor(group) {
    // Colors for conceptual groups
    const conceptColors = {
      'T': '#FF9900',     // Orange for Trump
      'T/R': '#FF6666',   // Light red for intermediaries
      'R': '#FF3333'      // Bright red for Russian entities
    };
    
    // Colors for entity types
    const entityColors = {
      'person': '#1E88E5',
      'organization': '#43A047',
      'property': '#FB8C00',
      'financial-institution': '#6D4C41',
      'intelligence': '#8E24AA',
      'trump': '#FF9900',
      'russian': '#FF3333',
      'business': '#00ACC1',
      'other': '#757575'
    };
    
    // Try concept color first, then entity color
    return conceptColors[group] || entityColors[group] || '#999999';
  }
  
  on(event, callback) {
    this.listeners[event] = callback;
    return this;
  }
  
  updateNetworkForDate(date) {
    if (!this.nodeElements || !this.linkElements) {
      console.warn('Cannot update network - elements not initialized');
      return this;
    }
    
    console.log(`Updating network for date: ${date.toISOString().split('T')[0]}`);
    
    // Filter nodes based on date
    this.nodeElements.attr('opacity', d => {
      // Parse dates safely
      const startDate = d.startDate instanceof Date ? d.startDate : new Date(d.startDate || '1970-01-01');
      const endDate = d.endDate instanceof Date ? d.endDate : new Date(d.endDate || '2100-01-01');
      
      // Show node if it exists at the given date
      const isVisible = startDate <= date && endDate >= date;
      
      // Update visibility tracking
      if (isVisible) {
        this.visibleNodes.push(d.id);
      } else {
        this.visibleNodes = this.visibleNodes.filter(id => id !== d.id);
      }
      
      return isVisible ? 1 : 0.1;
    });
    
    // Filter links based on date and connected nodes' visibility
    this.linkElements.attr('opacity', d => {
      // Parse dates safely
      const startDate = d.startDate instanceof Date ? d.startDate : new Date(d.startDate || '1970-01-01');
      const endDate = d.endDate instanceof Date ? d.endDate : new Date(d.endDate || '2100-01-01');
      
      // Get source and target IDs (handling both object and string references)
      const sourceId = typeof d.source === 'object' ? d.source.id : d.source;
      const targetId = typeof d.target === 'object' ? d.target.id : d.target;
      
      // Link is visible if it exists at the given date AND both nodes are visible
      const existsAtDate = startDate <= date && endDate >= date;
      const nodesVisible = this.visibleNodes.includes(sourceId) && this.visibleNodes.includes(targetId);
      const isVisible = existsAtDate && nodesVisible;
      
      return isVisible ? 1 : 0;
    });
    
    return this;
  }
  
  // Helper to highlight a specific node and its connections
  highlightNode(nodeId) {
    if (!this.nodeElements || !this.linkElements) return;
    
    // Dim all nodes and links first
    this.nodeElements.attr('opacity', 0.2);
    this.linkElements.attr('opacity', 0.1);
    
    // Highlight the selected node
    this.nodeElements.filter(d => d.id === nodeId)
      .attr('opacity', 1)
      .select('circle')
      .transition()
      .duration(300)
      .attr('r', d => this.getNodeRadius(d) * 1.2);
    
    // Find connected nodes and links
    const connectedLinks = this.data.links.filter(link => {
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      return sourceId === nodeId || targetId === nodeId;
    });
    
    // Highlight connected links
    connectedLinks.forEach(link => {
      this.linkElements.filter(l => 
        (l.source.id === link.source.id && l.target.id === link.target.id) ||
        (l.source.id === link.target.id && l.target.id === link.source.id)
      ).attr('opacity', 1)
        .attr('stroke-width', l => Math.sqrt(l.value || 1) * 2);
      
      // Highlight connected nodes
      const connectedId = link.source.id === nodeId ? link.target.id : link.source.id;
      this.nodeElements.filter(d => d.id === connectedId)
        .attr('opacity', 0.8);
    });
  }
  
  // Reset highlighting
  resetHighlight() {
    if (!this.nodeElements || !this.linkElements) return;
    
    // Reset all nodes and links to their date-filtered opacity
    this.updateNetworkForDate(this.currentDate || new Date());
    
    // Reset node sizes
    this.nodeElements.select('circle')
      .transition()
      .duration(300)
      .attr('r', d => this.getNodeRadius(d));
    
    // Reset link widths
    this.linkElements
      .attr('stroke-width', d => Math.sqrt(d.value || 1));
  }
}
