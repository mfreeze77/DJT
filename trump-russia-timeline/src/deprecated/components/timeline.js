// D3-based timeline component
import * as d3 from 'd3';

export default class Timeline {
  constructor(selector, data, options = {}) {
    this.selector = selector;
    this.data = data;
    
    // Default options
    this.options = Object.assign({
      width: 1000,
      height: 200,
      margin: { top: 20, right: 20, bottom: 30, left: 50 },
      timeFormat: '%Y-%m-%d',
      itemHeight: 20,
      itemMargin: 5
    }, options);
    
    this.svg = null;
    this.xScale = null;
    this.listeners = {};
  }
  
  initialize() {
    const { width, height, margin } = this.options;
    
    // Create SVG
    this.svg = d3.select(this.selector)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
    
    // Prepare data
    const timeExtent = d3.extent(this.data, d => new Date(d.date));
    const minDate = timeExtent[0];
    const maxDate = timeExtent[1];
    
    // Create scales
    this.xScale = d3.scaleTime()
      .domain([minDate, maxDate])
      .range([margin.left, width - margin.right]);
    
    // Create axes
    const xAxis = d3.axisBottom(this.xScale);
    
    // Add axes to SVG
    this.svg.append('g')
      .attr('class', 'axis x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);
    
    // Add timeline events
    this.renderEvents();
    
    // Add brush for timeline navigation
    this.addBrush();
    
    return this;
  }
  
  renderEvents() {
    const { itemHeight, itemMargin } = this.options;
    
    // Group events by category for layering (handle both string and array categories)
    const processedEvents = this.data.map(event => {
      // If categories is an array, use the first category
      const category = Array.isArray(event.categories) 
        ? event.categories[0] 
        : (event.category || 'other');
      
      return { ...event, processedCategory: category };
    });
    
    const eventsByCategory = d3.group(processedEvents, d => d.processedCategory);
    
    // Assign vertical positions to categories
    let categoryIndex = 0;
    eventsByCategory.forEach((events, category) => {
      // Add events for this category
      this.svg.selectAll(`.event-${category}`)
        .data(events)
        .enter()
        .append('circle')
        .attr('class', `event event-${category}`)
        .attr('cx', d => this.xScale(new Date(d.date)))
        .attr('cy', this.options.margin.top + categoryIndex * (itemHeight + itemMargin) + itemHeight/2)
        .attr('r', itemHeight/2)
        .attr('fill', d => this.getCategoryColor(d.category))
        .on('mouseover', (event, d) => this.showTooltip(event, d))
        .on('mouseout', () => this.hideTooltip())
        .on('click', (event, d) => {
          if (this.listeners.eventSelected) {
            this.listeners.eventSelected(d);
          }
        });
      
      categoryIndex++;
    });
  }
  
  addBrush() {
    const { height, margin } = this.options;
    
    // Create brush
    const brush = d3.brushX()
      .extent([[margin.left, 0], [this.options.width - margin.right, height - margin.bottom]])
      .on('brush', (event) => {
        // Continuous updates during brushing/sliding
        if (!event.sourceEvent) return; // Only respond to user interaction
        
        const selection = event.selection;
        if (selection) {
          // Convert pixel range to date range
          const dateRange = selection.map(this.xScale.invert);
          
          // Add visual indicator for current position
          this.updateCurrentPositionIndicator(selection);
          
          if (this.listeners.rangeChanged) {
            this.listeners.rangeChanged(dateRange);
          }
        }
      })
      .on('end', (event) => {
        if (!event.sourceEvent) return; // Only respond to user interaction
        
        const selection = event.selection;
        if (selection) {
          // Convert pixel range to date range
          const dateRange = selection.map(this.xScale.invert);
          
          // Final update after brush ends
          if (this.listeners.rangeChanged) {
            this.listeners.rangeChanged(dateRange);
          }
        }
      });
    
    // Add brush to SVG
    const brushGroup = this.svg.append('g')
      .attr('class', 'brush')
      .call(brush);
    
    // Add position indicator (will be updated during brushing)
    this.positionIndicator = this.svg.append('line')
      .attr('class', 'position-indicator')
      .attr('x1', this.options.width / 2)
      .attr('y1', 0)
      .attr('x2', this.options.width / 2)
      .attr('y2', height - margin.bottom)
      .attr('stroke', '#FF9800')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.7);
    
    // Add year label above position indicator
    this.yearLabel = this.svg.append('text')
      .attr('class', 'year-label')
      .attr('x', this.options.width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-weight', 'bold')
      .attr('opacity', 0.9)
      .text('');
    
    // Set initial brush position (centered with reasonable width)
    const startX = this.options.width / 2 - 100;
    const endX = this.options.width / 2 + 100;
    brushGroup.call(brush.move, [startX, endX]);
  }
  
  updateCurrentPositionIndicator(selection) {
    // Get the middle of the selection as current position
    const midX = (selection[0] + selection[1]) / 2;
    
    // Update the position indicator
    this.positionIndicator
      .attr('x1', midX)
      .attr('x2', midX);
    
    // Update year label
    const currentDate = this.xScale.invert(midX);
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString('default', { month: 'short' });
    
    this.yearLabel
      .attr('x', midX)
      .text(`${month} ${year}`);
  }
  
  showTooltip(event, d) {
    const tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('position', 'absolute')
      .style('background', 'white')
      .style('padding', '10px')
      .style('border', '1px solid #ccc')
      .style('border-radius', '5px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('max-width', '300px');
    
    // Format the categories as badges
    const categoriesHTML = Array.isArray(d.categories)
      ? d.categories.map(cat => `<span class="category-tag" style="background-color: ${this.getCategoryColor(cat)}">${cat}</span>`).join('')
      : `<span class="category-tag" style="background-color: ${this.getCategoryColor(d.category)}">${d.category || 'other'}</span>`;
    
    tooltip.html(`
      <div class="tooltip-title">${d.title}</div>
      <div class="tooltip-date">${new Date(d.date).toLocaleDateString()}</div>
      <div>${categoriesHTML}</div>
      <div style="margin-top: 8px">${d.description}</div>
    `)
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 10) + 'px')
      .transition()
      .duration(200)
      .style('opacity', 0.95);
  }
  
  hideTooltip() {
    d3.select('.tooltip')
      .transition()
      .duration(500)
      .style('opacity', 0)
      .remove();
  }
  
  getCategoryColor(category) {
    const colors = {
      'financial': '#4CAF50',
      'intelligence': '#9C27B0',
      'business': '#3498db',
      'political': '#e74c3c',
      'legal': '#f39c12',
      'personal': '#7f8c8d'
    };
    
    // Check if category is part of an array (from categories attribute)
    if (Array.isArray(category)) {
      return category.length > 0 ? (colors[category[0]] || '#9E9E9E') : '#9E9E9E';
    }
    
    return colors[category] || '#9E9E9E';
  }
  
  on(event, callback) {
    this.listeners[event] = callback;
    return this;
  }
  
  setTimeRange(start, end) {
    // Update x scale domain
    this.xScale.domain([start, end]);
    
    // Update axis
    this.svg.select('.x-axis')
      .transition()
      .duration(750)
      .call(d3.axisBottom(this.xScale));
    
    // Update event positions
    this.svg.selectAll('.event')
      .transition()
      .duration(750)
      .attr('cx', d => this.xScale(new Date(d.date)));
      
    // Add time period markers
    this.addTimePeriodMarkers();
    
    return this;
  }
  
  addTimePeriodMarkers() {
    // Remove any existing markers first
    this.svg.selectAll('.time-period-marker').remove();
    
    // Define important time periods
    const timePeriods = [
      { start: new Date('1977-01-01'), end: new Date('1983-12-31'), label: '1977-1983', color: 'rgba(255, 152, 0, 0.2)' },
      { start: new Date('1984-01-01'), end: new Date('1990-12-31'), label: '1984-1990', color: 'rgba(233, 30, 99, 0.2)' },
      { start: new Date('1991-01-01'), end: new Date('1999-12-31'), label: '1991-1999', color: 'rgba(33, 150, 243, 0.2)' },
      { start: new Date('2000-01-01'), end: new Date('2015-12-31'), label: '2000-2015', color: 'rgba(76, 175, 80, 0.2)' },
      { start: new Date('2016-01-01'), end: new Date('2025-12-31'), label: 'Post-2016', color: 'rgba(156, 39, 176, 0.2)' }
    ];
    
    // Filter time periods that overlap with current domain
    const domain = this.xScale.domain();
    const visiblePeriods = timePeriods.filter(period => 
      (period.start <= domain[1] && period.end >= domain[0])
    );
    
    // Add background rectangles for time periods
    const periodMarkers = this.svg.append('g')
      .attr('class', 'time-period-markers')
      .selectAll('.time-period-marker')
      .data(visiblePeriods)
      .enter()
      .append('g')
      .attr('class', 'time-period-marker');
    
    // Add background rectangles
    periodMarkers.append('rect')
      .attr('x', d => Math.max(this.options.margin.left, this.xScale(d.start)))
      .attr('y', 0)
      .attr('width', d => {
        const startX = Math.max(this.options.margin.left, this.xScale(d.start));
        const endX = Math.min(this.options.width - this.options.margin.right, this.xScale(d.end));
        return Math.max(0, endX - startX);
      })
      .attr('height', this.options.height - this.options.margin.bottom)
      .attr('fill', d => d.color)
      .attr('opacity', 0.5);
    
    // Add labels
    periodMarkers.append('text')
      .attr('x', d => {
        const startX = Math.max(this.options.margin.left, this.xScale(d.start));
        const endX = Math.min(this.options.width - this.options.margin.right, this.xScale(d.end));
        return (startX + endX) / 2;
      })
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#333')
      .text(d => d.label);
  }
}
