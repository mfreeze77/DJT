/**
 * Timeline Component
 * 
 * Uses vis-timeline to create an interactive timeline visualization of events.
 * Handles loading events from the data loader, formatting them for vis-timeline,
 * and providing interaction handlers.
 */
import dataLoader from '../utils/dataLoader.js';
import { formatDate, getCategoryColor, truncateText } from '../utils/helpers.js';

export default class TimelineVisualization {
  /**
   * @param {string} containerId - DOM element ID for the timeline container
   * @param {Object} options - Configuration options
   */
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container element with ID "${containerId}" not found`);
    }
    
    this.options = {
      startYear: 1977,
      endYear: new Date().getFullYear(),
      height: '400px',
      showTooltips: true,
      onEventClick: null,
      ...options
    };
    
    this.timeline = null;
    this.events = [];
    this.timelineItems = null;
    this.timelineGroups = null;
    
    // Timeline configuration
    this.timelineOptions = {
      min: new Date(`${this.options.startYear}-01-01`),
      max: new Date(`${this.options.endYear}-12-31`),
      height: this.options.height,
      minHeight: '200px',
      maxHeight: '800px',
      zoomable: true,
      zoomMin: 1000 * 60 * 60 * 24 * 30, // One month
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 10, // Ten years
      stack: true,
      stackSubgroups: true,
      showCurrentTime: false,
      format: {
        minorLabels: {
          year: 'YYYY',
          month: 'MMM',
          day: 'D'
        },
        majorLabels: {
          year: 'YYYY',
          month: 'YYYY',
          day: 'MMMM YYYY'
        }
      },
      tooltip: {
        followMouse: true,
        overflowMethod: 'cap'
      },
      groupTemplate: function(group) {
        return `<div class="timeline-group" style="color: ${group.color};">
                  <span class="timeline-group-label">${group.content}</span>
                </div>`;
      }
    };
    
    // Category definitions for groups
    this.categories = [
      { id: 'financial', content: 'Financial', color: getCategoryColor('financial') },
      { id: 'intelligence', content: 'Intelligence', color: getCategoryColor('intelligence') },
      { id: 'business', content: 'Business', color: getCategoryColor('business') },
      { id: 'political', content: 'Political', color: getCategoryColor('political') },
      { id: 'legal', content: 'Legal', color: getCategoryColor('legal') },
      { id: 'personal', content: 'Personal', color: getCategoryColor('personal') }
    ];
  }
  
  /**
   * Initialize the timeline visualization
   * @returns {Promise<TimelineVisualization>} This instance
   */
  async initialize() {
    try {
      console.log('Initializing timeline visualization...');
      
      // Make sure data is loaded first
      await dataLoader.initialize();
      
      // Create groups based on categories
      this.timelineGroups = new vis.DataSet(this.categories);
      
      // Get events from the data loader
      this.events = dataLoader.data.events;
      console.log(`Loaded ${this.events.length} events for timeline`);
      
      // Format events for vis-timeline
      const timelineItems = this.events.map(event => this.formatEventForTimeline(event));
      this.timelineItems = new vis.DataSet(timelineItems);
      
      // Create timeline
      this.timeline = new vis.Timeline(
        this.container, 
        this.timelineItems,
        this.timelineGroups,
        this.timelineOptions
      );
      
      // Add event listeners
      this.setupEventListeners();
      
      console.log('Timeline visualization initialized successfully');
      return this;
    } catch (error) {
      console.error('Failed to initialize timeline visualization:', error);
      this.container.innerHTML = `<div class="error-message">
        <h3>Error Loading Timeline</h3>
        <p>${error.message}</p>
      </div>`;
      throw error;
    }
  }
  
  /**
   * Format an event for vis-timeline
   * @param {Object} event - Event data
   * @returns {Object} Formatted event for vis-timeline
   */
  formatEventForTimeline(event) {
    // Determine primary category for grouping
    const primaryCategory = event.categories && event.categories.length > 0
      ? event.categories[0]
      : 'uncategorized';
    
    // Determine event type based on duration
    const hasEndDate = event.endDate && event.endDate !== event.date;
    
    // Format tooltip content
    let tooltipContent = '';
    if (this.options.showTooltips) {
      tooltipContent = `
        <div class="timeline-tooltip">
          <div class="timeline-tooltip-title">${event.title}</div>
          <div class="timeline-tooltip-date">${formatDate(event.date, { format: 'short' })}</div>
          <div class="timeline-tooltip-description">${truncateText(event.description, 200)}</div>
          ${event.moneyFlow?.amount ? `
            <div class="timeline-tooltip-money">
              Amount: $${event.moneyFlow.amount.toLocaleString()}
              (${event.moneyFlow.direction === 'to-trump' ? 'To' : 'From'} Trump)
            </div>
          ` : ''}
        </div>
      `;
    }
    
    // Calculate item styling based on importance
    const importance = event.importance || 5; // Default to medium importance
    const scaledSize = 10 + (importance * 2); // Scale size based on importance
    
    // Create the timeline item
    return {
      id: event.id,
      content: event.title,
      start: event.date,
      end: hasEndDate ? event.endDate : undefined,
      group: primaryCategory,
      // Store reference to the original event data
      eventData: event,
      // Styling options
      type: hasEndDate ? 'range' : 'box',
      title: tooltipContent,
      style: `
        height: ${scaledSize}px;
        background-color: ${getCategoryColor(primaryCategory)};
        border-color: ${getCategoryColor(primaryCategory)};
        color: white;
        border-radius: 3px;
        font-size: 9px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      `
    };
  }
  
  /**
   * Set up event listeners for the timeline
   */
  setupEventListeners() {
    // Handle click on timeline item
    this.timeline.on('click', properties => {
      // Check if the click was on an item
      if (properties.item) {
        const clickedItem = this.timelineItems.get(properties.item);
        if (clickedItem && clickedItem.eventData) {
          // Call the event click handler if provided
          if (typeof this.options.onEventClick === 'function') {
            this.options.onEventClick(clickedItem.eventData);
          } else {
            // Default behavior: Show event details in a panel
            this.showEventDetails(clickedItem.eventData);
          }
        }
      }
    });
    
    // Handle timeline range change (zoom, pan)
    this.timeline.on('rangechanged', properties => {
      // Could trigger re-rendering of other components based on visible time range
      console.log('Timeline range changed:', properties);
    });
  }
  
  /**
   * Show event details in a panel
   * @param {Object} event - Event data
   */
  showEventDetails(event) {
    // Look for a details container
    const detailsContainer = document.getElementById('detailsContainer');
    if (!detailsContainer) return;
    
    // Build HTML for event details
    let html = `
      <div class="event-details">
        <h3>${event.title}</h3>
        <div class="event-date">${formatDate(event.date, { format: 'long' })}</div>
        
        <div class="event-categories">
          ${event.categories.map(cat => 
            `<span class="category-tag" style="background-color: ${getCategoryColor(cat)}">
              ${cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>`
          ).join('')}
        </div>
        
        <div class="event-description">${event.description}</div>
        
        ${event.moneyFlow?.amount ? `
          <div class="event-money-flow">
            <h4>Financial Transaction</h4>
            <div class="money-amount">Amount: $${event.moneyFlow.amount.toLocaleString()}</div>
            <div class="money-direction">Direction: ${event.moneyFlow.direction === 'to-trump' ? 'To' : 'From'} Trump</div>
            ${event.moneyFlow.description ? `<div class="money-description">${event.moneyFlow.description}</div>` : ''}
          </div>
        ` : ''}
        
        ${event.location?.city ? `
          <div class="event-location">
            <h4>Location</h4>
            <div>${event.location.city}, ${event.location.country}</div>
          </div>
        ` : ''}
        
        ${event.sources && event.sources.length > 0 ? `
          <div class="event-sources">
            <h4>Sources</h4>
            <ul>
              ${event.sources.map(source => `
                <li>
                  <a href="${source.url}" target="_blank">${source.description}</a>
                  ${source.citation ? `<blockquote>${source.citation}</blockquote>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
    
    // Display the details
    detailsContainer.innerHTML = html;
    detailsContainer.scrollIntoView({ behavior: 'smooth' });
  }
  
  /**
   * Filter events by category
   * @param {Array<string>} categories - Categories to show
   */
  filterByCategories(categories) {
    if (!this.timeline || !this.timelineItems) return;
    
    if (!categories || categories.length === 0) {
      // Show all events
      this.timelineItems.forEach(item => {
        item.visible = true;
        this.timelineItems.update(item);
      });
    } else {
      // Filter events by category
      this.timelineItems.forEach(item => {
        const event = item.eventData;
        const hasCategory = event.categories && 
          event.categories.some(cat => categories.includes(cat));
        
        item.visible = hasCategory;
        this.timelineItems.update(item);
      });
    }
  }
  
  /**
   * Filter events by time range
   * @param {Date|string} startDate - Start date
   * @param {Date|string} endDate - End date
   */
  filterByTimeRange(startDate, endDate) {
    if (!this.timeline) return;
    
    const start = startDate ? new Date(startDate) : new Date(`${this.options.startYear}-01-01`);
    const end = endDate ? new Date(endDate) : new Date(`${this.options.endYear}-12-31`);
    
    this.timeline.setWindow(start, end, { animation: true });
  }
  
  /**
   * Move to a specific date
   * @param {Date|string} date - Target date
   */
  moveTo(date) {
    if (!this.timeline) return;
    
    this.timeline.moveTo(new Date(date), { animation: true });
  }
  
  /**
   * Highlight events by ID
   * @param {Array<string>} eventIds - IDs of events to highlight
   */
  highlightEvents(eventIds) {
    if (!this.timeline || !this.timelineItems) return;
    
    // Reset all events
    this.timelineItems.forEach(item => {
      const originalEvent = item.eventData;
      const primaryCategory = originalEvent.categories[0] || 'uncategorized';
      
      item.style = `
        height: ${10 + (originalEvent.importance * 2)}px;
        background-color: ${getCategoryColor(primaryCategory)};
        border-color: ${getCategoryColor(primaryCategory)};
        color: white;
        border-radius: 3px;
        font-size: 9px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      `;
      
      this.timelineItems.update(item);
    });
    
    // Highlight specific events
    if (eventIds && eventIds.length > 0) {
      eventIds.forEach(id => {
        const item = this.timelineItems.get(id);
        if (item) {
          item.style += `
            box-shadow: 0 0 10px 5px rgba(255, 255, 0, 0.5);
            z-index: 100;
            height: ${16 + (item.eventData.importance * 2)}px;
            font-weight: bold;
          `;
          
          this.timelineItems.update(item);
        }
      });
    }
  }
  
  /**
   * Play an animated sequence of events 
   * @param {Object} options - Animation options
   */
  async playSequence(options = {}) {
    if (!this.timeline || !this.timelineItems) return;
    
    const {
      startYear = this.options.startYear,
      endYear = this.options.endYear,
      speed = 1,
      onProgress = null
    } = options;
    
    // Get events in chronological order
    const sortedItems = this.timelineItems.get({
      filter: item => {
        const year = new Date(item.start).getFullYear();
        return year >= startYear && year <= endYear;
      }
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
    
    if (sortedItems.length === 0) return;
    
    const firstDate = new Date(sortedItems[0].start);
    firstDate.setMonth(firstDate.getMonth() - 1); // Start a bit before first event
    
    // Move to the start
    this.timeline.setWindow(
      firstDate,
      new Date(firstDate.getFullYear() + 3, firstDate.getMonth(), firstDate.getDate()),
      { animation: true }
    );
    
    // Play through events
    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];
      
      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 2000 / speed));
      
      // Move to event
      this.timeline.moveTo(new Date(item.start), { animation: true });
      
      // Highlight the event
      this.highlightEvents([item.id]);
      
      // Show details
      this.showEventDetails(item.eventData);
      
      // Call progress callback
      if (typeof onProgress === 'function') {
        onProgress({
          current: i + 1,
          total: sortedItems.length,
          event: item.eventData
        });
      }
    }
  }
}
