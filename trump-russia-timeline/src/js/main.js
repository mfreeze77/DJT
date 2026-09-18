import Timeline from '../components/timeline';
import NetworkVisualization from '../components/network';
import MoneyCounterVisualization from '../components/moneyCounter';
import { validateNetworkData } from './debug';
import dataLoader from '../utils/dataLoader';
import { dateToSliderPosition, sliderPositionToDate, formatDate, 
         moveDateByDays, moveDateByMonths, setDateRangeFromEvents } from './date-helpers';
import { connectEventsToTrump, updateNodesTemporalOpacity,
         getRelevantEvents, createEventInfoHTML, findTrumpNode } from './event-connector';
import '../css/main.css';
import '../css/network-effects.css';
import '../styles/network.css';

// Main application entry point
// Use window object to store initialization state that persists across HMR updates
window.isAppInitialized = window.isAppInitialized || false;
console.log('Module loaded/reloaded, isAppInitialized =', window.isAppInitialized);

// Function to clean up existing visualizations
function cleanupVisualizations() {
  console.log('Cleaning up existing visualizations');
  
  // Remove existing SVG elements from containers
  const networkContainer = document.querySelector('#network-container');
  const moneyContainer = document.querySelector('#money-tracker');
  
  if (networkContainer) {
    const existingSvgs = networkContainer.querySelectorAll('svg');
    if (existingSvgs.length > 0) {
      console.log(`Removing ${existingSvgs.length} existing SVG(s) from network container`);
      existingSvgs.forEach(svg => svg.remove());
    }
  }
  
  if (moneyContainer) {
    const existingSvgs = moneyContainer.querySelectorAll('svg');
    if (existingSvgs.length > 0) {
      console.log(`Removing ${existingSvgs.length} existing SVG(s) from money container`);
      existingSvgs.forEach(svg => svg.remove());
    }
  }
}

/**
 * Update all visualizations for a specific date
 * @param {Date} date - Date to update visualizations for
 */
function updateVisualizationsForDate(date) {
  // Store globally
  window.appCurrentDate = date;
  
  // Get references to components
  const network = window.TrumpRussiaTimeline?.NetworkVisualization?.instance;
  const moneyCounter = window.TrumpRussiaTimeline?.MoneyCounterVisualization?.instance;
  
  // Update network visualization
  if (network && network.network) {
    try {
      console.log(`Updating visualizations for date: ${date.toISOString().split('T')[0]}`);
      
      // First make sure we have data
      if (!dataLoader.data || !dataLoader.data.events) {
        console.error('No event data available');
        return;
      }
      
      // Find the Trump node
      const trumpNode = findTrumpNode(network.network);
      if (!trumpNode) {
        console.error('Could not find Trump node');
        return;
      }
      
      // Find events for the exact date first
      const exactDateEvents = getRelevantEvents(dataLoader.data.events, date, 0);
      
      // If no exact matches, try same month events
      const eventsToShow = exactDateEvents.length > 0 ? 
                          exactDateEvents : 
                          getRelevantEvents(dataLoader.data.events, date, 30);
      
      // Connect events to Trump with the umbrella structure
      if (eventsToShow.length > 0) {
        connectEventsToTrump(network.network, eventsToShow, trumpNode);
      }
      
      // Update event info display
      const eventInfoContainer = document.getElementById('event-info-container');
      if (eventInfoContainer) {
        if (eventsToShow.length > 0) {
          eventInfoContainer.innerHTML = createEventInfoHTML(eventsToShow);
        } else {
          eventInfoContainer.innerHTML = '<div class="event-info">No events found near this date</div>';
        }
      }
    } catch (err) {
      console.error('Error updating network visualization for date:', err);
    }
  }
  
  // Update money counter
  if (moneyCounter) {
    updateMoneyCounterForDate(moneyCounter, date);
  }
}

/**
 * Update date controls to reflect current date
 */
function updateDateControls() {
  const dateSlider = document.getElementById('date-slider');
  const currentDateDisplay = document.getElementById('current-date');
  
  if (dateSlider && currentDateDisplay && window.appCurrentDate) {
    dateSlider.value = dateToSliderPosition(window.appCurrentDate);
    currentDateDisplay.textContent = formatDate(window.appCurrentDate);
  }
}

// Main initialization function
async function initializeApplication() {
  console.log('DOMContentLoaded fired, isAppInitialized =', window.isAppInitialized);
  
  // Prevent duplicate initialization which can happen in development mode 
  if (window.isAppInitialized) {
    console.log('Application already initialized, skipping duplicate initialization');
    return;
  }
  
  // Check if containers already have SVG elements (indicating previous initialization)
  const networkContainer = document.querySelector('#network-container');
  const moneyContainer = document.querySelector('#money-tracker');
  
  if (networkContainer && networkContainer.querySelector('svg')) {
    console.warn('Network container already has SVG element! This suggests duplicate initialization.');
  }
  
  if (moneyContainer && moneyContainer.querySelector('svg')) {
    console.warn('Money tracker container already has SVG element! This suggests duplicate initialization.');
  }
  
  // Clean up any existing visualizations before initializing
  cleanupVisualizations();
  
  window.isAppInitialized = true;
  console.log('Setting isAppInitialized to true');
  
  try {
    // Load data from by-year folder
    // First, get the list of years
    const years = ['1971', '1972', '1973', '1975', '1977', '1978', '1979', '1980', 
                  '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', 
                  '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', 
                  '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', 
                  '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', 
                  '2013', '2014', '2015'];
    
    // Load and merge all year files
    const timelineEvents = [];
    const allEntities = {};
    const allRelationships = [];
    const allTransactions = [];
    const allIntelligenceActivities = [];
    
    // Load each year file and merge the data
    for (const year of years) {
    try {
      console.log(`Trying to load data for year ${year}...`);
      const response = await fetch(`data/processed/by-year/${year}.json`);
      
      if (!response.ok) {
        throw new Error(`Failed to load data for year ${year}: ${response.status} ${response.statusText}`);
      }
      
      const yearData = await response.json();
      console.log(`Successfully loaded data for year ${year}`);
      
      // Add events from this year
      if (yearData.events) {
        timelineEvents.push(...yearData.events);
      }
        
        // Merge entities
        if (yearData.entities) {
          Object.assign(allEntities, yearData.entities);
        }
        
        // Add relationships
        if (yearData.relationships) {
          allRelationships.push(...yearData.relationships);
        }
        
        // Add financial transactions
        if (yearData.transactions) {
          allTransactions.push(...yearData.transactions);
        }
        
        // Add intelligence activities
        if (yearData.intelligenceActivities) {
          allIntelligenceActivities.push(...yearData.intelligenceActivities);
        }
      } catch (error) {
        console.warn(`Could not load data for year ${year}:`, error);
      }
    }
    
    // Validate network data before processing
    console.log('Validating network data...');
    const validatedData = validateNetworkData(allEntities, allRelationships);
    
    // Prepare network data format expected by NetworkGraph component
    console.log('Processing network data');
    
    // First create a map of all valid entity IDs to ensure relationships only include valid entities
    const validEntityIds = new Map();
    Object.entries(allEntities).forEach(([id, entity]) => {
      validEntityIds.set(id, true);
    });
    
    // Convert entities to nodes format expected by D3
    const nodes = Object.values(allEntities).map(entity => ({
      id: entity.id,
      label: entity.name || entity.id,
      group: entity.type || 'other',
      type: entity.subtype || entity.type || 'other',
      startDate: new Date(entity.firstAppearance || '1970-01-01'),
      endDate: new Date(entity.lastAppearance || '2025-01-01'),
      value: entity.significance || 1
    }));
    
    // Create a special node for Trump if one doesn't already exist
    if (!validEntityIds.has('trump') && !validEntityIds.has('entity-001')) {
      const trumpNode = {
        id: 'trump',
        label: 'Donald J. Trump',
        group: 'trump',
        type: 'person',
        startDate: new Date('1970-01-01'),
        endDate: new Date('2025-01-01'),
        value: 10
      };
      nodes.push(trumpNode);
      validEntityIds.set('trump', true);
      console.log('Added Trump node since it was missing');
    }
    
    // Check for any missing entities referenced in relationships and create placeholder nodes
    console.log('Checking for missing entities referenced in relationships');
    allRelationships.forEach(rel => {
      if (!validEntityIds.has(rel.source)) {
        console.log(`Creating placeholder for missing entity: ${rel.source}`);
        const placeholderNode = {
          id: rel.source,
          label: rel.source.replace('entity-', 'Entity '),
          group: 'other',
          type: 'other',
          startDate: new Date('1970-01-01'),
          endDate: new Date('2025-01-01'),
          value: 1
        };
        nodes.push(placeholderNode);
        validEntityIds.set(rel.source, true);
      }
      
      if (!validEntityIds.has(rel.target)) {
        console.log(`Creating placeholder for missing entity: ${rel.target}`);
        const placeholderNode = {
          id: rel.target,
          label: rel.target,
          group: 'other',
          type: 'other',
          startDate: new Date('1970-01-01'),
          endDate: new Date('2025-01-01'),
          value: 1
        };
        nodes.push(placeholderNode);
        validEntityIds.set(rel.target, true);
      }
    });
    
    // All relationships should be valid now since we've created placeholder nodes
    const validRelationships = allRelationships;
    
    // Convert relationships to links format expected by D3
    const links = validRelationships.map(rel => ({
      source: rel.source,
      target: rel.target,
      type: rel.type || 'other',
      value: rel.strength || 1,
      startDate: new Date(rel.startDate || '1970-01-01'),
      endDate: new Date(rel.endDate || '2025-01-01')
    }));
    
    // Final network data structure
    // Convert from nodes/links format to nodes/edges format expected by NetworkVisualization
    const networkData = { 
      nodes,
      edges: links.map(link => ({
        from: link.source,
        to: link.target,
        label: link.type,
        value: link.value,
        arrows: 'to'
      }))
    };
    console.log(`Network data processed: ${nodes.length} nodes, ${networkData.edges.length} edges`);
    
    // Prepare financial data for MoneyCounter
    const financialData = allTransactions.map(transaction => ({
      date: new Date(transaction.date),
      amount: transaction.amount,
      direction: transaction.direction || 'to-trump',
      description: transaction.description || ''
    }));
    
    // Initialize components with data options
    let timeline, network, moneyCounter;
    
    // Set date range from actual event data
    setDateRangeFromEvents(timelineEvents);
    
    // Find an interesting starting date (mid-range by default)
    let initialDate = new Date('1987-01-01'); // Fallback default
    
    // Try to find an event around 1987 as a starting point (interesting era)
    if (timelineEvents && timelineEvents.length > 0) {
      // Sort events by date for finding interesting events
      const sortedEvents = [...timelineEvents].filter(e => e.date).sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      if (sortedEvents.length > 0) {
        // Look for events in 1987 (interesting period)
        const events1987 = sortedEvents.filter(e => 
          new Date(e.date).getFullYear() === 1987
        );
        
        if (events1987.length > 0) {
          // Use first event from 1987
          initialDate = new Date(events1987[0].date);
        } else {
          // Otherwise use a date roughly in the middle of the timeline
          const middleIndex = Math.floor(sortedEvents.length / 2);
          initialDate = new Date(sortedEvents[middleIndex].date);
        }
      }
    }
    
    // Set global date state
    window.appCurrentDate = initialDate;
    console.log('Setting initial date to:', formatDate(window.appCurrentDate));
    
    try {
      console.log('Initializing network with', networkData.nodes.length, 'nodes and', networkData.edges.length, 'edges');
      network = new NetworkVisualization('network-container', {
        width: document.getElementById('network-container')?.clientWidth || 600,
        height: 500,
        nodeRadius: 20,  // Larger nodes for better visibility
        linkDistance: 150, // Increased for better spacing
        charge: -500,    // Stronger repulsion
        centerForce: 0.1, // Add center gravity
        layout: 'hierarchical', // Use hierarchical layout for the umbrella effect
        positionTrumpAtBottom: true  // Position Trump at bottom
      });
      
      // Create network data option for initialization
      const networkFilterOptions = {
        startYear: 1970,
        endYear: new Date(window.appCurrentDate).getFullYear()
      };
      
      // Call initialize with the data
      await network.initialize(networkFilterOptions);
      console.log('Network initialized successfully');
      
      // Store instance for later reference
      if (!window.TrumpRussiaTimeline) window.TrumpRussiaTimeline = {};
      if (!window.TrumpRussiaTimeline.NetworkVisualization) window.TrumpRussiaTimeline.NetworkVisualization = {};
      window.TrumpRussiaTimeline.NetworkVisualization.instance = network;
      
    } catch (err) {
      console.error('Failed to initialize network:', err);
    }
    
    try {
      console.log('Initializing money counter with', financialData.length, 'transactions');
      moneyCounter = new MoneyCounterVisualization('money-tracker', {
        width: document.getElementById('money-tracker')?.clientWidth || 200,
        height: 300,
        maxAmount: 1000000000, // 1 billion
        startYear: 1970,
        endYear: new Date(window.appCurrentDate).getFullYear()
      });
      
      // Call initialize after creating the component
      await moneyCounter.initialize();
      console.log('Money counter initialized successfully');
      
      // Store instance for later reference
      if (!window.TrumpRussiaTimeline) window.TrumpRussiaTimeline = {};
      if (!window.TrumpRussiaTimeline.MoneyCounterVisualization) window.TrumpRussiaTimeline.MoneyCounterVisualization = {};
      window.TrumpRussiaTimeline.MoneyCounterVisualization.instance = moneyCounter;
      
    } catch (err) {
      console.error('Failed to initialize money counter:', err);
    }
    
    // Connect components
    let componentsInitialized = false;
    
    // Setup initial state - only if both network and money counter are available
    if (network && moneyCounter) {
      componentsInitialized = true;
      
      // Initial update with the start date
      updateVisualizationsForDate(window.appCurrentDate);
      
      // Setup any component specific event handlers
      if (typeof network.on === 'function') {
        network.on('nodeSelected', (nodeData) => {
          console.log('Node selected:', nodeData);
          // Could highlight or display node details
        });
      }
    } else {
      console.warn('Some components failed to initialize');
    }
    
    // Set up UI controls
    const dateSlider = document.getElementById('date-slider');
    const currentDateDisplay = document.getElementById('current-date');
    const prevDayBtn = document.getElementById('prev-day-btn');
    const nextDayBtn = document.getElementById('next-day-btn');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const categoryFilters = document.querySelectorAll('.category-filters input[type="checkbox"]');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    // Create container for event info display if it doesn't exist
    let eventInfoContainer = document.getElementById('event-info-container');
    if (!eventInfoContainer) {
      eventInfoContainer = document.createElement('div');
      eventInfoContainer.id = 'event-info-container';
      networkContainer.appendChild(eventInfoContainer);
    }
    
    // Setup date controls
    if (dateSlider && currentDateDisplay) {
      // Initial setup
      currentDateDisplay.textContent = formatDate(window.appCurrentDate);
      dateSlider.value = dateToSliderPosition(window.appCurrentDate);
      
      // Update visualizations on slider change
      dateSlider.addEventListener('input', () => {
        const sliderPosition = parseInt(dateSlider.value);
        window.appCurrentDate = sliderPositionToDate(sliderPosition);
        currentDateDisplay.textContent = formatDate(window.appCurrentDate);
        
        // Debounce the update to improve performance
        if (window.networkUpdateTimeout) {
          clearTimeout(window.networkUpdateTimeout);
        }
        
        window.networkUpdateTimeout = setTimeout(() => {
          updateVisualizationsForDate(window.appCurrentDate);
        }, 100); // Short delay for smoother performance
      });
      
      // Setup navigation buttons
      if (prevDayBtn) {
        prevDayBtn.addEventListener('click', () => {
          window.appCurrentDate = moveDateByDays(window.appCurrentDate, -1);
          updateDateControls();
          updateVisualizationsForDate(window.appCurrentDate);
        });
      }
      
      if (nextDayBtn) {
        nextDayBtn.addEventListener('click', () => {
          window.appCurrentDate = moveDateByDays(window.appCurrentDate, 1);
          updateDateControls();
          updateVisualizationsForDate(window.appCurrentDate);
        });
      }
      
      if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
          window.appCurrentDate = moveDateByMonths(window.appCurrentDate, -1);
          updateDateControls();
          updateVisualizationsForDate(window.appCurrentDate);
        });
      }
      
      if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
          window.appCurrentDate = moveDateByMonths(window.appCurrentDate, 1);
          updateDateControls();
          updateVisualizationsForDate(window.appCurrentDate);
        });
      }
      
      // Initial update with the selected date
      updateVisualizationsForDate(window.appCurrentDate);
    }
    
    // Set up filters
    if (categoryFilters && categoryFilters.length > 0) {
      categoryFilters.forEach(filter => {
        filter.addEventListener('change', () => {
          // Get all checked categories
          const enabledCategories = Array.from(categoryFilters)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.dataset.category);
          
          // Filter events based on enabled categories
          const filteredEvents = timelineEvents.filter(event => {
            const eventCategories = Array.isArray(event.categories) 
              ? event.categories 
              : [event.category || 'other'];
            
            return eventCategories.some(cat => enabledCategories.includes(cat));
          });
          
          // Update timeline with filtered events
          // Note: In a real implementation, you'd need to reinitialize or update the timeline
          console.log('Filtered to categories:', enabledCategories);
          console.log('Filtered events count:', filteredEvents.length);
        });
      });
    }
    
    // Set up search
    if (searchInput && searchButton) {
      searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm) {
          // Search in events, entities, relationships
          const matchingEvents = timelineEvents.filter(event => 
            event.title.toLowerCase().includes(searchTerm) || 
            event.description.toLowerCase().includes(searchTerm)
          );
          
          const matchingEntities = Object.values(allEntities).filter(entity => 
            entity.name.toLowerCase().includes(searchTerm) || 
            (entity.description && entity.description.toLowerCase().includes(searchTerm))
          );
          
          console.log('Search results - Events:', matchingEvents.length);
          console.log('Search results - Entities:', matchingEntities.length);
          
          // Update details panel with search results
          const detailsContainer = document.getElementById('detailsContainer');
          if (detailsContainer) {
            detailsContainer.innerHTML = `
              <h3>Search Results for "${searchTerm}"</h3>
              <p>Found ${matchingEvents.length} events and ${matchingEntities.length} entities.</p>
              <div class="search-results-list">
                ${matchingEvents.slice(0, 5).map(event => `
                  <div class="search-result-item">
                    <strong>${event.title}</strong> (${new Date(event.date).toLocaleDateString()})
                    <p>${event.description.substring(0, 100)}...</p>
                  </div>
                `).join('')}
                ${matchingEvents.length > 5 ? '<p>...and more</p>' : ''}
              </div>
            `;
          }
        }
      });
      
      // Allow search on Enter key
      searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          searchButton.click();
        }
      });
    }
    
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

  // Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeApplication);

// The updateNetworkForDate function is no longer needed as we now use
// the improved updateNodesTemporalOpacity function from event-connector.js

/**
 * Adapter function to update money counter for a specific date
 * @param {MoneyCounterVisualization} moneyCounter - Money counter visualization instance
 * @param {Date} date - Date to filter to
 */
function updateMoneyCounterForDate(moneyCounter, date) {
  if (!moneyCounter) {
    console.warn('Money counter is not initialized');
    return;
  }
  
  try {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    console.log(`Updating money counter for year: ${year}`);
    
    // Update with transactions up to this date
    const filterOptions = {
      startYear: 1970,
      endYear: year
    };
    
    if (typeof moneyCounter.update === 'function') {
      console.log('Using money counter update method');
      moneyCounter.update(filterOptions).catch(err => console.error('Error updating money counter:', err));
    } else if (typeof moneyCounter.filterByDate === 'function') {
      console.log('Using money counter filterByDate method');
      moneyCounter.filterByDate(dateObj);
    } else {
      console.warn('Money counter does not have any update methods available');
      
      // Try direct manipulation if we have access to the underlying visualization
      if (moneyCounter.transactions) {
        const filteredTransactions = moneyCounter.transactions.filter(t => {
          const transactionYear = new Date(t.date).getFullYear();
          return transactionYear <= year;
        });
        
        console.log(`Filtered transactions to ${filteredTransactions.length} items`);
        
        // If the moneyCounter has a render method, try to use it
        if (typeof moneyCounter.render === 'function') {
          moneyCounter.render(filteredTransactions);
        }
      }
    }
  } catch (err) {
    console.error('Error updating money counter:', err);
  }
}

// Handle Hot Module Replacement
if (module.hot) {
  console.log('HMR is enabled');
  
  module.hot.accept('../components/network.js', () => {
    console.log('HMR: network.js updated');
    // No need to re-initialize, just let the normal HMR process handle it
  });
  
  module.hot.accept('../components/moneyCounter.js', () => {
    console.log('HMR: moneyCounter.js updated');
    // No need to re-initialize, just let the normal HMR process handle it
  });
}
