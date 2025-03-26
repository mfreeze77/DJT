# Trump-Russia Timeline Visualization

This project is a D3.js-based visualization of Trump-Russia connections and events from 1977 to the present.

## Features

- Interactive timeline of events with date filtering
- Force-directed network graph of relationships
- Financial flow visualization with money counter
- Search and filter functionality
- Year-based playback animation

## Prerequisites

- Node.js (v14.x or higher)
- npm (v6.x or higher)

## Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

## Development

To run the development server:

```bash
npm start
```

This will start the webpack development server at http://localhost:8080

## Building for Production

To build the project for production:

```bash
npm run build
```

This will create a production-ready build in the `dist` directory.

## Data Structure

The data is organized by year in the `data/processed/by-year` directory with JSON files following the schema defined in `data/processed/json_schema.json`.

## Project Structure

- `src/js/components/` - D3.js visualization components
  - `timeline.js` - Timeline visualization
  - `network.js` - Network graph visualization
  - `money-counter.js` - Financial flow visualization

- `src/js/main.js` - Main application entry point
- `src/css/main.css` - Stylesheet

## Components

### Timeline

The timeline displays events across time with interactive filtering and zooming capabilities. Events are color-coded by category.

### Network Graph

The network graph shows relationships between entities (people, organizations, properties) with force-directed layout. Nodes and edges appear/disappear based on the selected time period.

### Money Counter

The money counter visualizes financial flows to and from key entities over time.

## Acknowledgments

This visualization is based on research data compiled from various sources and organized chronologically.
