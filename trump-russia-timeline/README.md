# Trump-Russia Timeline Visualization

An interactive visualization of Trump-Russia connections from 1977 to the present, featuring a chronological timeline, network visualization, and financial transaction tracking.

## Features

- **Interactive Timeline**: Navigate through events from 1977 to the present with filtering by category and time period
- **Network Visualization**: Explore the relationships between people, organizations, and entities
- **Financial Flows**: Track and visualize monetary transactions with an animated piggy bank
- **Search Functionality**: Find specific events, entities, or transactions across the dataset
- **Detailed View**: Click on any element to see comprehensive details including sources and documentation

## Project Structure

```
trump-russia-timeline/
├── data/
│   ├── raw/                      # Original markdown files
│   ├── processed/                # Processed JSON files ready for visualization
│   │   ├── by-year/              # Events organized by year
│   │   └── json_schema.json      # Schema definition for data
│   └── helpers/                  # Data processing utilities
│
├── src/
│   ├── components/               # Primary visualization components (current implementation)
│   │   ├── timeline.js           # Timeline visualization using vis-timeline
│   │   ├── network.js            # Network visualization using Cytoscape.js
│   │   ├── moneyCounter.js       # Financial visualization using D3.js
│   │   └── README.md             # Documentation for component organization
│   │
│   ├── deprecated/               # Archive of earlier component implementations
│   │   ├── components/           # Legacy components
│   │   └── MAINTENANCE_NOTE.md   # Documentation explaining deprecation
│   │
│   ├── utils/                    # Utility functions
│   │   ├── dataLoader.js         # Data loading and processing
│   │   └── helpers.js            # Helper functions
│   │
│   ├── styles/                   # CSS styling
│   │   ├── main.css              # Main application styles
│   │   ├── timeline.css          # Timeline-specific styles
│   │   ├── network.css           # Network-specific styles
│   │   └── moneyCounter.css      # Money counter-specific styles
│   │
│   ├── js/                       # JavaScript initialization code
│   │   └── main.js               # Main application initialization
│   │
│   └── index.js                  # Main application entry point
│
├── public/                       # Public assets
│   └── index.html                # Main HTML file
│
├── docs/                         # Documentation
│
├── lib/                          # External libraries
│   ├── vis-timeline/
│   ├── cytoscape/
│   └── d3/
│
├── webpack.config.js             # Webpack configuration
└── package.json                  # Project dependencies
```

## Recent Maintenance

### Component Duplication Fix (March 2025)
The project was recently consolidated to resolve component duplication:

- **Previous Issue**: Duplicate component implementations existed in both `src/components/` and `src/js/components/`
- **Resolution**: Consolidated on the more complete implementations in `src/components/`, moved duplicates to `src/deprecated/components/`
- **Interface Adapters**: Added adapter methods in `main.js` for compatibility between components and application code
- **Documentation**: Added detailed documentation about the component changes in:
  - `src/components/README.md`: Current component structure
  - `src/deprecated/MAINTENANCE_NOTE.md`: Why components were deprecated and moved

### Known Issues / Next Steps

1. **Component Initialization**: The visualization components are not fully initializing due to remaining interface discrepancies
2. **Functionality Testing**: A full system test is needed to verify all functionality works with the consolidated components
3. **Documentation Updates**: Additional documentation about the visualization architecture may be helpful

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/trump-russia-timeline.git
cd trump-russia-timeline
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Data Structure

The visualization is powered by several interconnected data structures:

1. **Events**: Chronological occurrences with dates, descriptions, categories, and importance scores
2. **Entities**: People, organizations, properties, and financial institutions
3. **Relationships**: Connections between entities with relationship types and strengths
4. **Transactions**: Financial flows with amounts, parties involved, and documentation
5. **Intelligence Activities**: Intelligence operations related to the timeline

## Usage

### Timeline Navigation

- Use the timeline slider to navigate through different time periods
- Click on events to see detailed information
- Filter events by category using the checkboxes
- Use the "Play" button to animate through the timeline chronologically

### Network Exploration

- Use different layout options to visualize relationships between entities
- Click on nodes (entities) to see their details and highlight their connections
- Click on edges (relationships) to see relationship details
- Search for specific entities or relationship types

### Financial Tracking

- View the piggy bank visualization to see the aggregate financial flows
- Use the "Play Financial Animation" button to animate through transactions chronologically
- Adjust animation speed with the speed selector
- Reset the counter with the "Reset" button

## Technologies Used

- **vis-timeline**: For the interactive timeline visualization
- **Cytoscape.js**: For the network graph visualization
- **D3.js**: For the financial visualization and animations
- **Webpack**: For bundling and building the application
- **Babel**: For JavaScript compatibility
- **CSS3**: For styling and animations

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data compiled from extensive research and public documents
- Visualization libraries: vis-timeline, Cytoscape.js, and D3.js
