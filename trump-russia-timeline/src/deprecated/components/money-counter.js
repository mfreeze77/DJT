// D3-based money counter/visualizer
import * as d3 from 'd3';

export default class MoneyCounter {
  constructor(selector, data, options = {}) {
    this.selector = selector;
    this.data = data;
    
    // Default options
    this.options = Object.assign({
      width: 200,
      height: 200,
      maxAmount: 100000000 // Maximum amount for scale
    }, options);
    
    this.svg = null;
    this.totalAmount = 0;
    
    // Store reference to container element
    this.container = d3.select(this.selector);
  }
  
  initialize() {
    const { width, height } = this.options;
    
    console.log('Starting money counter initialization');
        
    // Create SVG
    this.svg = this.container
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('overflow', 'visible');
    
    // Create piggy bank outline
    this.createPiggyBank();
    
    // Create money counter text with larger font and better visibility
    this.counterText = this.svg.append('text')
      .attr('class', 'money-counter')
      .attr('x', width / 2)
      .attr('y', height - 10)
      .attr('text-anchor', 'middle')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', '#1a237e')
      .text('$0');
    
    // Initialize with 0 amount
    this.updateAmount(0);
    
    return this;
  }
  
  createPiggyBank() {
    const { width, height } = this.options;
    
    // Create piggy bank shape (simplified)
    this.piggyBank = this.svg.append('g')
      .attr('class', 'piggy-bank');
    
    // Body
    this.piggyBank.append('ellipse')
      .attr('cx', width / 2)
      .attr('cy', height / 2 - 30)
      .attr('rx', width / 3)
      .attr('ry', height / 4)
      .attr('stroke', '#4CAF50')
      .attr('stroke-width', 1.5)
      .attr('fill', 'rgba(76, 175, 80, 0.05)');
    
    // Fill level (starts empty)
    this.moneyFill = this.piggyBank.append('rect')
      .attr('x', width / 2 - width / 3)
      .attr('y', height / 2 + height / 4 - 40) // Position at bottom
      .attr('width', width / 1.5)
      .attr('height', 0) // Empty initially
      .attr('fill', 'rgba(76, 175, 80, 0.6)');
    
    // Coin slot
    this.piggyBank.append('rect')
      .attr('x', width / 2 - 15)
      .attr('y', height / 3 - 30)
      .attr('width', 30)
      .attr('height', 3)
      .attr('fill', 'rgba(76, 175, 80, 0.8)');
  }
  
  updateAmount(amount) {
    const { height, maxAmount } = this.options;
    
    this.totalAmount = amount;
    
    // Update counter text
    this.counterText
      .text(`$${this.totalAmount.toLocaleString()}`)
      .attr('fill', this.totalAmount > 500000000 ? 'rgba(229, 57, 53, 0.9)' : 'rgba(26, 35, 126, 0.9)'); // Red for large amounts
    
    // Calculate fill height (proportional to amount)
    const fillHeight = Math.min(height / 2, (amount / maxAmount) * height / 2);
    
    // Animate fill level
    this.moneyFill.transition()
      .duration(1000)
      .attr('fill', this.totalAmount > 500000000 ? 'rgba(229, 57, 53, 0.6)' : 'rgba(76, 175, 80, 0.6)')
      .attr('height', fillHeight)
      .attr('y', height / 2 + height / 4 - 40 - fillHeight);
    
    return this;
  }
  
  updateForDate(date) {
    // Calculate total money up to the given date
    const relevantTransactions = this.data.filter(t => new Date(t.date) <= date);
    const amountAtDate = relevantTransactions.reduce((sum, t) => sum + t.amount, 0);
    
    // Find recent transactions (within 1 year of the current date)
    const recentDate = new Date(date);
    recentDate.setFullYear(recentDate.getFullYear() - 1); // 1 year before current date
    
    const recentTransactions = this.data.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate <= date && transactionDate >= recentDate;
    });
    
    // Sort recent transactions by date (newest first)
    recentTransactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update amount
    this.updateAmount(amountAtDate);
    
    // Animate recent transactions
    if (recentTransactions.length > 0) {
      // Show the most recent transaction with a coin animation
      const mostRecent = recentTransactions[0];
      this.addCoinAnimation(mostRecent.direction === 'from-trump');
      
      // Update transaction details
      const detailsContainer = document.getElementById('detailsContainer');
      if (detailsContainer) {
        const transactionsList = recentTransactions
          .slice(0, 5) // Show up to 5 recent transactions
          .map(t => {
            const formattedDate = new Date(t.date).toLocaleDateString();
            const formattedAmount = `$${t.amount.toLocaleString()}`;
            const directionIcon = t.direction === 'from-trump' ? '↑' : '↓';
            const directionClass = t.direction === 'from-trump' ? 'outgoing' : 'incoming';
            
            return `
              <div class="transaction-item ${directionClass}">
                <div class="transaction-date">${formattedDate}</div>
                <div class="transaction-amount">${directionIcon} ${formattedAmount}</div>
                <div class="transaction-description">${t.description || 'Unspecified transaction'}</div>
              </div>
            `;
          })
          .join('');
        
        detailsContainer.innerHTML = `
          <h3>Recent Financial Transactions</h3>
          <div class="transactions-list">
            ${transactionsList}
          </div>
          <div class="transaction-summary">
            <p>Total amount as of ${date.toLocaleDateString()}: <strong>$${amountAtDate.toLocaleString()}</strong></p>
          </div>
        `;
      }
    }
    
    return this;
  }
  
  addTransaction(transaction) {
    this.data.push(transaction);
    this.updateAmount(this.totalAmount + transaction.amount);
    
    // Add a coin animation
    this.addCoinAnimation();
    
    return this;
  }
  
  addCoinAnimation(isOutgoing = false) {
    const { width, height } = this.options;
    
    // Create a coin
    const coin = this.svg.append('circle')
      .attr('class', 'coin')
      .attr('cx', width / 2)
      .attr('cy', isOutgoing ? height / 3 - 30 : 0) // Start at slot if outgoing
      .attr('r', 8)
      .attr('fill', isOutgoing ? 'rgba(255, 152, 0, 0.8)' : 'rgba(255, 215, 0, 0.8)') // Orange for outgoing, gold for incoming
      .attr('stroke', isOutgoing ? 'rgba(230, 81, 0, 0.8)' : 'rgba(218, 165, 32, 0.8)')
      .attr('stroke-width', 1.5);
    
    if (isOutgoing) {
      // Animate coin moving out of piggy bank (up and away)
      coin.transition()
        .duration(1000)
        .attr('cy', -30) // Move up and out
        .attr('cx', width / 2 + 50) // Move to the right
        .transition()
        .duration(300)
        .attr('r', 0) // Shrink and disappear
        .remove(); // Remove after animation
    } else {
      // Animate coin falling into piggy bank
      coin.transition()
        .duration(1000)
        .attr('cy', height / 3 - 30) // Move to slot
        .transition()
        .duration(500)
        .attr('r', 0) // Shrink as it goes in
        .remove(); // Remove after animation
    }
    
    // Add small particles effect for emphasis
    const particleCount = 5;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = 12;
      
      const particle = this.svg.append('circle')
        .attr('class', 'particle')
        .attr('cx', width / 2 + Math.cos(angle) * distance)
        .attr('cy', isOutgoing ? height / 3 - 35 : height / 3 - 25)
        .attr('r', 2)
        .attr('fill', isOutgoing ? 'rgba(255, 152, 0, 0.7)' : 'rgba(255, 215, 0, 0.7)')
        .attr('opacity', 0.6);
      
      particle.transition()
        .duration(800)
        .attr('cx', width / 2 + Math.cos(angle) * distance * 2)
        .attr('cy', (isOutgoing ? height / 3 - 45 : height / 3 - 15) + Math.sin(angle) * distance)
        .attr('r', 1)
        .attr('opacity', 0)
        .remove();
    }
  }
}
