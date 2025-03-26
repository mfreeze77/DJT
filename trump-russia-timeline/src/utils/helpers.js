/**
 * Helper utilities for Trump-Russia timeline visualization
 */

/**
 * Format a date string as a more human-readable date
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date
 */
export function formatDate(dateString, options = {}) {
  if (!dateString) return 'Unknown date';
  
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  
  const format = options.format || 'long';
  
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    case 'year':
      return date.getFullYear().toString();
    case 'month-year':
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long'
      });
    case 'long':
    default:
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long'
      });
  }
}

/**
 * Format a currency amount with dollar sign and commas
 * @param {number} amount - The amount to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted amount
 */
export function formatCurrency(amount, options = {}) {
  if (amount === undefined || amount === null) return '$0';
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: options.fractionDigits !== undefined ? options.fractionDigits : 0,
    maximumFractionDigits: options.fractionDigits !== undefined ? options.fractionDigits : 0
  });
  
  return formatter.format(amount);
}

/**
 * Get a color for a category
 * @param {string} category - Category name
 * @returns {string} HEX color code
 */
export function getCategoryColor(category) {
  const colorMap = {
    financial: '#27ae60',   // Green
    intelligence: '#8e44ad', // Purple
    business: '#3498db',    // Blue
    political: '#e74c3c',   // Red
    legal: '#f39c12',       // Orange
    personal: '#7f8c8d'     // Gray
  };
  
  return colorMap[category] || '#95a5a6'; // Default gray
}

/**
 * Debounce a function to limit how often it gets called
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait between calls
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 300) {
  let timeout;
  
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create a unique ID
 * @returns {string} Unique ID
 */
export function createUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * Create a DOM element with attributes and children
 * @param {string} tagName - The tag name of the element
 * @param {Object} attributes - Attributes to set on the element
 * @param {Array|Node|string} children - Child elements or text
 * @returns {HTMLElement} The created element
 */
export function createElement(tagName, attributes = {}, children = []) {
  const element = document.createElement(tagName);
  
  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.entries(value).forEach(([property, propertyValue]) => {
        element.style[property] = propertyValue;
      });
    } else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });
  
  // Add children
  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child instanceof Node) {
          element.appendChild(child);
        } else if (child !== undefined && child !== null) {
          element.appendChild(document.createTextNode(child.toString()));
        }
      });
    } else if (children instanceof Node) {
      element.appendChild(children);
    } else if (children !== undefined && children !== null) {
      element.appendChild(document.createTextNode(children.toString()));
    }
  }
  
  return element;
}

/**
 * Extract the year from a date string
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {number} Year as a number
 */
export function getYearFromDate(dateString) {
  if (!dateString) return null;
  
  // Try to extract year from ISO format
  const match = dateString.match(/^(\d{4})/);
  if (match) {
    return parseInt(match[1], 10);
  }
  
  // Fallback to Date object
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.getFullYear();
  }
  
  return null;
}

/**
 * Safely get a nested object property without errors
 * @param {Object} obj - The object to extract from
 * @param {string} path - Dot notation path to the property
 * @param {*} defaultValue - Default value if property not found
 * @returns {*} The property value or default
 */
export function getNestedProperty(obj, path, defaultValue = null) {
  if (!obj || !path) return defaultValue;
  
  const parts = path.split('.');
  let current = obj;
  
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[part];
  }
  
  return current !== undefined ? current : defaultValue;
}

/**
 * Format and truncate text to a specific length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  
  return text.substring(0, maxLength) + '...';
}

/**
 * Calculate time period between two dates
 * @param {string} startDate - Start date string
 * @param {string} endDate - End date string
 * @returns {string} Human readable time period
 */
export function calculateTimePeriod(startDate, endDate) {
  if (!startDate || !endDate) return '';
  
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';
  
  const diffYears = end.getFullYear() - start.getFullYear();
  const diffMonths = end.getMonth() - start.getMonth() + (diffYears * 12);
  
  if (diffYears > 1) {
    return `${diffYears} years`;
  } else if (diffMonths > 1) {
    return `${diffMonths} months`;
  } else {
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  }
}
