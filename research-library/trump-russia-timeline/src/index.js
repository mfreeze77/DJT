/**
 * Trump-Russia Timeline Visualization
 * Main entry file for the application
 */

// Import styles
import './styles/main.css';
import './styles/timeline.css';
import './styles/network.css';
import './styles/moneyCounter.css';

// Import core modules
import dataLoader from './utils/dataLoader.js';
import * as helpers from './utils/helpers.js';
import TimelineVisualization from './components/timeline.js';
import NetworkVisualization from './components/network.js';
import MoneyCounterVisualization from './components/moneyCounter.js';

// Make modules available globally for debugging
window.TrumpRussiaTimeline = {
  dataLoader,
  helpers,
  TimelineVisualization,
  NetworkVisualization,
  MoneyCounterVisualization
};

// Log initialization
console.log('Trump-Russia Timeline Visualization initialized');
console.log('App version: 1.0.0');
console.log('Data timespan: 1977-Present');

// Import and execute the main initialization code
import './js/main.js';
