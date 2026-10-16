/**
 * Money Counter (Piggy Bank) Visualization
 * 
 * Uses D3.js to create an animated visualization of financial transactions.
 * Displays a running total of money flows to/from Trump, with animated coin drops.
 */
import dataLoader from '../utils/dataLoader.js';
import { formatCurrency } from '../utils/helpers.js';

export default class MoneyCounterVisualization {
  /**
   * @param {string} containerId - DOM element ID for the money counter container
   * @param {Object} options - Configuration options
   */
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container element with ID "${containerId}" not found`);
    }
    
    this.options = {
      height: '300px',
      width: '100%',
      animationDuration: 2000,
      maxCoins: 20,  // Maximum number of coins to show simultaneously
      coinColors: {
        toTrump: '#27ae60', // Green for incoming money
        fromTrump: '#e74c3c'  // Red for outgoing money
      },
      startYear: 1977,
      endYear: new Date().getFullYear(),
      ...options
    };
    
    // Set container dimensions
    this.container.style.height = this.options.height;
    this.container.style.width = this.options.width;
    this.container.style.position = 'relative';
    
    this.svg = null;
    this.piggyBank = null;
    this.counterText = null;
    this.currentTotal = 0;
    this.transactions = [];
    this.isAnimating = false;
  }
  
  /**
   * Initialize the money counter visualization
   * @param {Object} filterOptions - Initial filter options
   * @returns {Promise<MoneyCounterVisualization>} This instance
   */
  async initialize(filterOptions = {}) {
    try {
      console.log('Initializing money counter visualization...');
      
      // Make sure data is loaded first
      await dataLoader.initialize();
      
      // Get financial data from loader
      const financialData = dataLoader.getFinancialData({
        startYear: this.options.startYear,
        endYear: this.options.endYear,
        ...filterOptions
      });
      
      this.transactions = financialData.transactions;
      this.currentTotal = 0; // Start at 0, will be updated during animations
      this.targetTotal = financialData.netFlow; // Total net flow (to Trump - from Trump)
      
      console.log(`Loaded ${this.transactions.length} financial transactions with net flow of ${formatCurrency(this.targetTotal)}`);
      
      // Create SVG
      this.createSvgContainer();
      
      // Create the piggy bank
      this.createPiggyBank();
      
      // Create the counter
      this.createCounter();
      
      // Optionally create summary stats
      this.createSummaryStats(financialData);
      
      console.log('Money counter visualization initialized successfully');
      return this;
    } catch (error) {
      console.error('Failed to initialize money counter visualization:', error);
      this.container.innerHTML = `<div class="error-message">
        <h3>Error Loading Money Counter</h3>
        <p>${error.message}</p>
      </div>`;
      throw error;
    }
  }
  
  /**
   * Create the SVG container
   */
  createSvgContainer() {
    // Calculate dimensions
    const width = this.container.clientWidth;
    const height = parseInt(this.options.height);
    
    // Create SVG element
    this.svg = d3.select(this.container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'money-counter-svg');
    
    // Add a background with gradient
    const defs = this.svg.append('defs');
    
    // Create gradient
    const gradient = defs.append('linearGradient')
      .attr('id', 'piggy-bank-bg')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    
    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#f5f7fa');
    
    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#c3cfe2');
    
    // Add background rect
    this.svg.append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'url(#piggy-bank-bg)')
      .attr('rx', 10)
      .attr('ry', 10);
    
    // Create a group for the piggy bank and counter
    this.mainGroup = this.svg.append('g')
      .attr('class', 'money-counter-main')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);
  }
  
  /**
   * Create the piggy bank visualization
   */
  createPiggyBank() {
    // Create group for piggy bank
    this.piggyBank = this.mainGroup.append('g')
      .attr('class', 'piggy-bank')
      .attr('transform', 'translate(0, -40)');
    
    // Draw the piggy bank shape
    // Main body (ellipse)
    this.piggyBank.append('ellipse')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('rx', 60)
      .attr('ry', 40)
      .attr('fill', '#f39c12')
      .attr('stroke', '#e67e22')
      .attr('stroke-width', 2);
    
    // Nose (small circle)
    this.piggyBank.append('circle')
      .attr('cx', 55)
      .attr('cy', -10)
      .attr('r', 10)
      .attr('fill', '#e74c3c')
      .attr('stroke', '#c0392b')
      .attr('stroke-width', 1);
    
    // Nostrils (two tiny circles)
    this.piggyBank.append('circle')
      .attr('cx', 58)
      .attr('cy', -13)
      .attr('r', 2)
      .attr('fill', '#c0392b');
    
    this.piggyBank.append('circle')
      .attr('cx', 58)
      .attr('cy', -7)
      .attr('r', 2)
      .attr('fill', '#c0392b');
    
    // Eyes (two small circles)
    this.piggyBank.append('circle')
      .attr('cx', 35)
      .attr('cy', -25)
      .attr('r', 5)
      .attr('fill', 'white')
      .attr('stroke', '#c0392b')
      .attr('stroke-width', 1);
    
    this.piggyBank.append('circle')
      .attr('cx', 45)
      .attr('cy', -25)
      .attr('r', 5)
      .attr('fill', 'white')
      .attr('stroke', '#c0392b')
      .attr('stroke-width', 1);
    
    // Pupils
    this.piggyBank.append('circle')
      .attr('cx', 35)
      .attr('cy', -25)
      .attr('r', 2)
      .attr('fill', 'black');
    
    this.piggyBank.append('circle')
      .attr('cx', 45)
      .attr('cy', -25)
      .attr('r', 2)
      .attr('fill', 'black');
    
    // Ears (two ellipses)
    this.piggyBank.append('ellipse')
      .attr('cx', -15)
      .attr('cy', -35)
      .attr('rx', 15)
      .attr('ry', 10)
      .attr('fill', '#f39c12')
      .attr('stroke', '#e67e22')
      .attr('stroke-width', 1)
      .attr('transform', 'rotate(-20)');
    
    this.piggyBank.append('ellipse')
      .attr('cx', 15)
      .attr('cy', -35)
      .attr('rx', 15)
      .attr('ry', 10)
      .attr('fill', '#f39c12')
      .attr('stroke', '#e67e22')
      .attr('stroke-width', 1)
      .attr('transform', 'rotate(20)');
    
    // Slot (money opening)
    this.piggyBank.append('ellipse')
      .attr('cx', 0)
      .attr('cy', -35)
      .attr('rx', 25)
      .attr('ry', 7)
      .attr('fill', '#c0392b')
      .attr('stroke', '#c0392b')
      .attr('stroke-width', 1);
    
    this.piggyBank.append('rect')
      .attr('x', -15)
      .attr('y', -38)
      .attr('width', 30)
      .attr('height', 6)
      .attr('fill', 'black')
      .attr('rx', 2)
      .attr('ry', 2);
  }
  
  /**
   * Create the money counter display
   */
  createCounter() {
    // Create counter text
    this.counterText = this.mainGroup.append('text')
      .attr('class', 'money-counter-text')
      .attr('x', 0)
      .attr('y', 60)
      .attr('text-anchor', 'middle')
      .attr('font-size', '24px')
      .attr('font-weight', 'bold')
      .attr('fill', this.targetTotal >= 0 ? this.options.coinColors.toTrump : this.options.coinColors.fromTrump)
      .text(formatCurrency(0));
    
    // Create counter label
    this.mainGroup.append('text')
      .attr('class', 'money-counter-label')
      .attr('x', 0)
      .attr('y', 85)
      .attr('text-anchor', 'middle')
      .attr('font-size', '14px')
      .attr('fill', '#333')
      .text('NET FLOW');
    
    // Animate the counter from 0 to the target total
    this.animateCounter(0, this.targetTotal, this.options.animationDuration);
  }
  
  /**
   * Create summary statistics display
   * @param {Object} financialData - Financial data with totals
   */
  createSummaryStats(financialData) {
    const width = this.container.clientWidth;
    
    // Create stats group
    const statsGroup = this.svg.append('g')
      .attr('class', 'money-counter-stats')
      .attr('transform', `translate(${width - 20}, 20)`);
    
    // To Trump total
    statsGroup.append('text')
      .attr('class', 'stats-to-trump')
      .attr('x', 0)
      .attr('y', 0)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', this.options.coinColors.toTrump)
      .text(`To Trump: ${formatCurrency(financialData.totalToTrump)}`);
    
    // From Trump total
    statsGroup.append('text')
      .attr('class', 'stats-from-trump')
      .attr('x', 0)
      .attr('y', 20)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', this.options.coinColors.fromTrump)
      .text(`From Trump: ${formatCurrency(financialData.totalFromTrump)}`);
    
    // Transaction count
    statsGroup.append('text')
      .attr('class', 'stats-count')
      .attr('x', 0)
      .attr('y', 40)
      .attr('text-anchor', 'end')
      .attr('font-size', '12px')
      .attr('fill', '#333')
      .text(`Transactions: ${this.transactions.length}`);
  }
  
  /**
   * Animate the counter from one value to another
   * @param {number} fromValue - Starting value
   * @param {number} toValue - Target value
   * @param {number} duration - Animation duration in ms
   */
  animateCounter(fromValue, toValue, duration = 2000) {
    // Create number formatter
    const formatNumber = d3.format('$,.0f');
    
    // Create transition
    const t = d3.transition()
      .duration(duration)
      .ease(d3.easeCubicInOut);
    
    // Update counter color based on whether it's positive or negative
    this.counterText
      .transition(t)
      .attr('fill', toValue >= 0 ? this.options.coinColors.toTrump : this.options.coinColors.fromTrump);
    
    // Animate the counter value
    const interpolator = d3.interpolateNumber(fromValue, toValue);
    this.counterText
      .transition(t)
      .textTween(() => {
        return (t) => {
          const value = interpolator(t);
          this.currentTotal = value;
          return formatNumber(value);
        };
      });
  }
  
  /**
   * Add a coin animation
   * @param {Object} transaction - Transaction data
   * @returns {Promise<void>} Animation completion
   */
  async addCoin(transaction) {
    if (!this.svg || !transaction) return;
    
    // Determine if the transaction is to or from Trump
    const isToTrump = transaction.parties?.receiver?.entity === "entity-001" || 
                      transaction.toEntity === "entity-001";
    
    // Calculate coin size based on amount (with limits)
    const amount = Math.abs(transaction.amount || 0);
    const minSize = 5;
    const maxSize = 25;
    const baseSize = Math.log10(amount + 1) * 3; // Logarithmic scale
    const size = Math.min(Math.max(minSize, baseSize), maxSize);
    
    // Determine coin color
    const coinColor = isToTrump ? this.options.coinColors.toTrump : this.options.coinColors.fromTrump;
    
    // Calculate random starting position at top of svg
    const width = this.container.clientWidth;
    const xPos = Math.random() * (width - 100) + 50;
    const yPos = -50; // Start above the visible area
    
    // Create coin element
    const coin = this.svg.append('g')
      .attr('class', 'coin')
      .attr('transform', `translate(${xPos}, ${yPos})`);
    
    // Add main circle
    coin.append('circle')
      .attr('r', size)
      .attr('fill', coinColor)
      .attr('stroke', d3.color(coinColor).darker(0.5))
      .attr('stroke-width', 2)
      .attr('opacity', 0.8);
    
    // Add dollar sign
    coin.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', 'white')
      .attr('font-size', size * 0.8)
      .attr('font-weight', 'bold')
      .text('$');
    
    // Calculate destination (slot in piggy bank)
    const dest = this.piggyBank.node().getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();
    
    // Adjust for container position
    const destX = (dest.left + dest.width / 2) - containerRect.left;
    const destY = (dest.top + dest.height / 3) - containerRect.top;
    
    // Create animation path for the falling motion
    // Start with a random X offset within reason
    const endX = destX;
    const endY = destY;
    const controlX1 = xPos;
    const controlY1 = yPos + 50;
    const controlX2 = endX - 20 + Math.random() * 40; // Random variation near the end
    const controlY2 = endY - 50;
    
    // Create the path for the animation
    const path = d3.path();
    path.moveTo(xPos, yPos);
    path.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);
    
    // Calculate animation duration based on amount (larger = slower)
    const animDuration = 1000 + Math.min(amount / 10000000, 1) * 2000;
    
    // Animate the coin along the path with rotation
    let animationComplete = false;
    let startTime = null;
    let rotation = 0;
    
    // Return a promise that resolves when the animation completes
    return new Promise((resolve) => {
      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animDuration, 1);
        
        // If we're at the end and already processed completion, stop
        if (progress >= 1 && animationComplete) {
          return;
        }
        
        // Get point along the path
        const x = d3.interpolate(xPos, endX)(progress);
        const y = d3.interpolate(yPos, endY)(progress);
        
        // Add rotation based on progress
        rotation = progress * 720; // Multiple full rotations
        
        // Update coin position and rotation
        coin.attr('transform', `translate(${x}, ${y}) rotate(${rotation})`);
        
        // If we're at the end, remove the coin and update counter
        if (progress >= 1 && !animationComplete) {
          animationComplete = true;
          
          // Shrink and fade out
          coin.transition()
            .duration(300)
            .attr('transform', `translate(${endX}, ${endY}) rotate(${rotation}) scale(0.1)`)
            .style('opacity', 0)
            .remove();
          
          // Resolve the promise after the remove transition
          setTimeout(resolve, 300);
          return;
        }
        
        // Continue animation
        requestAnimationFrame(animate);
      }
      
      // Start animation
      requestAnimationFrame(animate);
    });
  }
  
  /**
   * Play a sequence of transaction animations
   * @param {Object} options - Playback options
   * @returns {Promise<void>} Animation completion
   */
  async playTransactionSequence(options = {}) {
    const {
      startIndex = 0,
      speed = 1,
      onProgress = null
    } = options;
    
    if (this.isAnimating) return;
    this.isAnimating = true;
    
    // Reset counter if starting from the beginning
    if (startIndex === 0) {
      this.currentTotal = 0;
      this.counterText.text(formatCurrency(0));
    }
    
    try {
      // Get transactions in chronological order starting from startIndex
      const transactionsToPlay = this.transactions.slice(startIndex);
      
      // Play each transaction animation
      for (let i = 0; i < transactionsToPlay.length; i++) {
        const transaction = transactionsToPlay[i];
        const amount = transaction.amount || 0;
        
        // Determine if this transaction is to or from Trump
        const isToTrump = transaction.parties?.receiver?.entity === "entity-001" || 
                          transaction.toEntity === "entity-001";
        
        // Calculate new total
        const newTotal = this.currentTotal + (isToTrump ? amount : -amount);
        
        // Add coin animation
        await this.addCoin(transaction);
        
        // Update counter
        this.animateCounter(this.currentTotal, newTotal, 500);
        
        // Wait based on speed
        await new Promise(resolve => setTimeout(resolve, 500 / speed));
        
        // Call progress callback
        if (typeof onProgress === 'function') {
          onProgress({
            current: startIndex + i + 1,
            total: this.transactions.length,
            transaction
          });
        }
      }
      
      // Final update to ensure total is exactly right
      this.animateCounter(this.currentTotal, this.targetTotal, 1000);
    } finally {
      this.isAnimating = false;
    }
  }
  
  /**
   * Update the visualization with new filter options
   * @param {Object} filterOptions - Filter options
   * @returns {Promise<MoneyCounterVisualization>} This instance
   */
  async update(filterOptions = {}) {
    // Get new data based on filters
    const financialData = dataLoader.getFinancialData({
      startYear: this.options.startYear,
      endYear: this.options.endYear,
      ...filterOptions
    });
    
    this.transactions = financialData.transactions;
    this.targetTotal = financialData.netFlow;
    
    // Update the counter
    this.animateCounter(this.currentTotal, this.targetTotal, this.options.animationDuration);
    
    // Update summary stats if they exist
    const statsToTrump = this.svg.select('.stats-to-trump');
    if (!statsToTrump.empty()) {
      statsToTrump.text(`To Trump: ${formatCurrency(financialData.totalToTrump)}`);
    }
    
    const statsFromTrump = this.svg.select('.stats-from-trump');
    if (!statsFromTrump.empty()) {
      statsFromTrump.text(`From Trump: ${formatCurrency(financialData.totalFromTrump)}`);
    }
    
    const statsCount = this.svg.select('.stats-count');
    if (!statsCount.empty()) {
      statsCount.text(`Transactions: ${this.transactions.length}`);
    }
    
    return this;
  }
  
  /**
   * Add a single transaction with animation
   * @param {Object} transaction - Transaction data
   * @returns {Promise<void>} Animation completion
   */
  async addTransaction(transaction) {
    if (!transaction) return;
    
    // Add to transactions array
    this.transactions.push(transaction);
    
    // Determine if this transaction is to or from Trump
    const isToTrump = transaction.parties?.receiver?.entity === "entity-001" || 
                      transaction.toEntity === "entity-001";
    
    // Calculate new total
    const amount = transaction.amount || 0;
    const newTotal = this.targetTotal + (isToTrump ? amount : -amount);
    this.targetTotal = newTotal;
    
    // Animate the transaction
    await this.addCoin(transaction);
    
    // Update counter
    this.animateCounter(this.currentTotal, this.targetTotal, 500);
    
    // Update summary stats
    await this.update();
  }
  
  /**
   * Reset the visualization to initial state
   * @returns {Promise<MoneyCounterVisualization>} This instance
   */
  async reset() {
    this.currentTotal = 0;
    
    // Animate counter back to 0
    this.animateCounter(this.currentTotal, 0, this.options.animationDuration);
    
    return this;
  }
}
