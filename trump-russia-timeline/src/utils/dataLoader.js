/**
 * DataLoader - Unified data loading system for Trump-Russia visualization
 * Handles merging year-by-year data files and providing indexed access
 */
class DataLoader {
  constructor() {
    this.initialized = false;
    this.data = {
      events: [],
      entities: {},
      relationships: [],
      transactions: [],
      intelligenceActivities: [],
      eras: []
    };
    this.indices = {};
  }

  /**
   * Initialize the data loader by fetching and processing all data files
   * @returns {Promise<Object>} The consolidated dataset
   */
  async initialize() {
    if (this.initialized) return this.data;
    
    try {
      // Load and merge all year files
      await this.loadYearlyData();
      
      // Build indices for fast lookup
      this.buildIndices();
      
      this.initialized = true;
      console.log('Data loader initialized successfully');
      return this.data;
    } catch (error) {
      console.error('Failed to initialize data loader:', error);
      throw error;
    }
  }

  /**
   * Load and merge data from year-by-year JSON files
   * @returns {Promise<void>}
   */
  async loadYearlyData() {
    // Start with a range of years from 1971 to current
    const startYear = 1971;
    const endYear = new Date().getFullYear();
    let loadedAnyData = false;
    
    // First try to load the complete dataset if it exists
    try {
      const completeResponse = await fetch('data/processed/complete_dataset.json');
      if (completeResponse.ok) {
        const completeData = await completeResponse.json();
        this.mergeYearData(completeData);
        console.log('Loaded complete dataset');
        loadedAnyData = true;
        return; // We have all the data, no need to load individual years
      }
    } catch (error) {
      console.warn('No complete dataset found, falling back to year-by-year loading');
    }
    
    // Try loading from the JSON schema file
    try {
      const schemaResponse = await fetch('data/processed/json_schema.json');
      if (schemaResponse.ok) {
        const schemaData = await schemaResponse.json();
        if (schemaData.example) {
          // If there's example data in the schema, use it for testing
          this.mergeYearData(schemaData.example);
          console.log('Loaded example data from schema file');
          loadedAnyData = true;
        }
      }
    } catch (error) {
      console.warn('No schema example data found, continuing with year-by-year loading');
    }
    
    // Fall back to loading individual year files
    for (let year = startYear; year <= endYear; year++) {
      try {
        // Fetch the year's data file
        const response = await fetch(`data/processed/by-year/${year}.json`);
        
        // Skip if file doesn't exist
        if (!response.ok) {
          console.log(`No data file found for year ${year}`);
          continue;
        }
        
        const yearData = await response.json();
        
        // Merge into consolidated dataset
        this.mergeYearData(yearData);
        console.log(`Loaded data for year ${year}`);
        loadedAnyData = true;
      } catch (error) {
        console.warn(`Could not load data for year ${year}:`, error);
        // Continue with other years even if one fails
      }
    }
    
    // If we couldn't load any data, create some dummy data for testing
    if (!loadedAnyData) {
      console.warn('Could not load any data files. Creating minimal test data.');
      this.createDummyData();
    }
  }
  
  /**
   * Merge a year's data into the consolidated dataset
   * @param {Object} yearData - Data from a single year JSON file
   */
  mergeYearData(yearData) {
    // Merge events (as array)
    if (yearData.events && Array.isArray(yearData.events)) {
      this.data.events = [...this.data.events, ...yearData.events];
    }
    
    // Merge entities (as object with ID keys)
    if (yearData.entities) {
      this.data.entities = { ...this.data.entities, ...yearData.entities };
    }
    
    // Merge relationships (as array)
    if (yearData.relationships && Array.isArray(yearData.relationships)) {
      this.data.relationships = [...this.data.relationships, ...yearData.relationships];
    }
    
    // Merge transactions (as array)
    if (yearData.transactions && Array.isArray(yearData.transactions)) {
      this.data.transactions = [...this.data.transactions, ...yearData.transactions];
    }
    
    // Merge intelligence activities (as array)
    if (yearData.intelligenceActivities && Array.isArray(yearData.intelligenceActivities)) {
      this.data.intelligenceActivities = [
        ...this.data.intelligenceActivities, 
        ...yearData.intelligenceActivities
      ];
    }
    
    // Merge eras (as array)
    if (yearData.eras && Array.isArray(yearData.eras)) {
      this.data.eras = [...this.data.eras, ...yearData.eras];
    }
  }

  /**
   * Build indices for fast data lookup
   */
  buildIndices() {
    console.log('Building data indices...');
    
    // Events by ID
    this.indices.eventsById = {};
    this.data.events.forEach(event => {
      this.indices.eventsById[event.id] = event;
    });
    
    // Events by category
    this.indices.eventsByCategory = {};
    this.data.events.forEach(event => {
      if (event.categories && Array.isArray(event.categories)) {
        event.categories.forEach(category => {
          if (!this.indices.eventsByCategory[category]) {
            this.indices.eventsByCategory[category] = [];
          }
          this.indices.eventsByCategory[category].push(event);
        });
      }
    });
    
    // Events by year (for timeline filtering)
    this.indices.eventsByYear = {};
    this.data.events.forEach(event => {
      if (event.date) {
        const year = event.date.substring(0, 4);
        if (!this.indices.eventsByYear[year]) {
          this.indices.eventsByYear[year] = [];
        }
        this.indices.eventsByYear[year].push(event);
      }
    });
    
    // Entities by type
    this.indices.entitiesByType = {};
    Object.values(this.data.entities).forEach(entity => {
      if (entity.type) {
        if (!this.indices.entitiesByType[entity.type]) {
          this.indices.entitiesByType[entity.type] = [];
        }
        this.indices.entitiesByType[entity.type].push(entity);
      }
    });
    
    // Relationships by entity
    this.indices.relationshipsByEntity = {};
    this.data.relationships.forEach(rel => {
      // Source entity relationships
      if (!this.indices.relationshipsByEntity[rel.source]) {
        this.indices.relationshipsByEntity[rel.source] = [];
      }
      this.indices.relationshipsByEntity[rel.source].push(rel);
      
      // Target entity relationships
      if (!this.indices.relationshipsByEntity[rel.target]) {
        this.indices.relationshipsByEntity[rel.target] = [];
      }
      this.indices.relationshipsByEntity[rel.target].push(rel);
    });
    
    // Financial transactions for piggy bank feature
    this.indices.financialTransactions = {
      toTrump: this.data.transactions.filter(t => t.parties?.receiver?.entity === "entity-001" || t.toEntity === "entity-001"),
      fromTrump: this.data.transactions.filter(t => t.parties?.sender?.entity === "entity-001" || t.fromEntity === "entity-001"),
      byYear: {}
    };
    
    // Index transactions by year
    this.data.transactions.forEach(transaction => {
      if (transaction.date) {
        const year = transaction.date.substring(0, 4);
        if (!this.indices.financialTransactions.byYear[year]) {
          this.indices.financialTransactions.byYear[year] = [];
        }
        this.indices.financialTransactions.byYear[year].push(transaction);
      }
    });
    
    // Sort events chronologically
    this.data.events.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    
    console.log('Indices built successfully');
  }

  /**
   * Get events by category
   * @param {string} category - Category to filter by
   * @returns {Array} Filtered events
   */
  getEventsByCategory(category) {
    return this.indices.eventsByCategory[category] || [];
  }

  /**
   * Get events within a time range
   * @param {string|Date} startDate - Start date
   * @param {string|Date} endDate - End date
   * @returns {Array} Events within range
   */
  getEventsInTimeRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return this.data.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= start && eventDate <= end;
    });
  }

  /**
   * Get entity by ID
   * @param {string} entityId - Entity ID
   * @returns {Object|null} Entity or null if not found
   */
  getEntity(entityId) {
    return this.data.entities[entityId] || null;
  }

  /**
   * Get relationships for an entity
   * @param {string} entityId - Entity ID
   * @returns {Array} Relationships
   */
  getEntityRelationships(entityId) {
    return this.indices.relationshipsByEntity[entityId] || [];
  }

  /**
   * Get network data for visualization
   * @param {Object} options - Filter options
   * @returns {Object} Network data formatted for visualization
   */
  getNetworkData(options = {}) {
    // Extract the nodes (entities) and edges (relationships)
    const nodes = [];
    const edges = [];
    
    // Filter entities based on options
    Object.values(this.data.entities).forEach(entity => {
      // Apply filters if needed
      if (options.entityType && entity.type !== options.entityType) return;
      
      nodes.push({
        id: entity.id,
        label: entity.name,
        title: entity.description,
        group: entity.type,
        value: entity.significance || 1, // For node size
        // Additional properties for visualization
      });
    });
    
    // Add relationships as edges
    this.data.relationships.forEach(rel => {
      // Only include relationships between nodes that are in our filtered set
      const sourceExists = nodes.some(n => n.id === rel.source);
      const targetExists = nodes.some(n => n.id === rel.target);
      
      if (sourceExists && targetExists) {
        edges.push({
          from: rel.source,
          to: rel.target,
          label: rel.type,
          title: rel.description,
          value: rel.strength || 1, // For edge thickness
          arrows: rel.isBidirectional ? 'to;from' : 'to',
          // Additional properties for visualization
        });
      }
    });
    
    return { nodes, edges };
  }

  /**
   * Get financial data for the piggy bank visualization
   * @param {Object} options - Filter options
   * @returns {Object} Financial data formatted for visualization
   */
  getFinancialData(options = {}) {
    let transactions = this.data.transactions;
    
    // Apply filters if needed
    if (options.startYear) {
      transactions = transactions.filter(t => {
        const year = t.date.substring(0, 4);
        return parseInt(year) >= parseInt(options.startYear);
      });
    }
    
    if (options.endYear) {
      transactions = transactions.filter(t => {
        const year = t.date.substring(0, 4);
        return parseInt(year) <= parseInt(options.endYear);
      });
    }
    
    // Calculate totals and metrics
    const totalToTrump = transactions
      .filter(t => t.parties?.receiver?.entity === "entity-001" || t.toEntity === "entity-001")
      .reduce((sum, t) => sum + (t.amount || 0), 0);
      
    const totalFromTrump = transactions
      .filter(t => t.parties?.sender?.entity === "entity-001" || t.fromEntity === "entity-001")
      .reduce((sum, t) => sum + (t.amount || 0), 0);
    
    // Get transactions chronologically for animation
    const chronologicalTransactions = [...transactions]
      .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    return {
      transactions: chronologicalTransactions,
      totalToTrump,
      totalFromTrump,
      netFlow: totalToTrump - totalFromTrump
    };
  }

  /**
   * Search across all data types
   * @param {string} query - Search query
   * @returns {Object} Search results grouped by type
   */
  search(query) {
    if (!query || typeof query !== 'string') return {};
    
    const lowercaseQuery = query.toLowerCase();
    
    return {
      events: this.data.events.filter(e => 
        e.title?.toLowerCase().includes(lowercaseQuery) || 
        e.description?.toLowerCase().includes(lowercaseQuery)
      ),
      entities: Object.values(this.data.entities).filter(e => 
        e.name?.toLowerCase().includes(lowercaseQuery) || 
        e.description?.toLowerCase().includes(lowercaseQuery) ||
        e.aliases?.some(a => a.toLowerCase().includes(lowercaseQuery))
      ),
      relationships: this.data.relationships.filter(r => 
        r.description?.toLowerCase().includes(lowercaseQuery)
      ),
      transactions: this.data.transactions.filter(t => 
        t.description?.toLowerCase().includes(lowercaseQuery)
      )
    };
  }
}

// Export a singleton instance of DataLoader
export default new DataLoader();
