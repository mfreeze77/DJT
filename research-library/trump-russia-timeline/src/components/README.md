# Trump-Russia Timeline Visualization Components

This directory contains the core visualization components used in the Trump-Russia Timeline project, following the original project architecture plan.

## Components

### MoneyCounterVisualization (`moneyCounter.js`)
- D3.js-based visualization for financial transactions
- Animated "piggy bank" visualization with coin animations
- Displays running totals of money flows to/from Trump
- Combines the functionality originally planned for separate moneyCounter.js and piggyBank.js components

### NetworkVisualization (`network.js`) 
- Cytoscape.js-based network graph of entities and relationships
- Interactive visualization showing connections between people, organizations, and properties
- Color-coded nodes and edges with filtering capabilities

### TimelineVisualization (`timeline.js`)
- Chronological visualization of events and connections
- Supports filtering, zooming, and highlighting
- Synchronizes with other visualizations

## Alignment with Original Plan

These components implement the visualization features outlined in the original project plan:

```
src/
├── components/               # Reusable JS components
│   ├── timeline.js
│   ├── network.js
│   ├── moneyCounter.js
│   └── piggyBank.js
```

Note that the piggyBank.js functionality has been incorporated directly into moneyCounter.js for a more integrated implementation.

## Usage

Import these components in your application:

```javascript
import TimelineVisualization from './components/timeline.js';
import NetworkVisualization from './components/network.js';
import MoneyCounterVisualization from './components/moneyCounter.js';
```

Initialize with a container ID and options:

```javascript
const timeline = new TimelineVisualization('timeline-container', {
  height: '500px',
  // other options...
});

await timeline.initialize();
```

## Component Structure

Each component follows a consistent pattern:
1. Constructor accepting container ID and options
2. Async initialize method to set up the visualization
3. Update methods to refresh with new data
4. Event handling and interactive features

## Notes

These components implement the visualization features as specified in the project plan. The moneyCounter.js component incorporates what was originally planned as piggyBank.js functionality for a more integrated implementation.
