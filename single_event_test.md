```javascript
// simple-event-display.js
// A minimal script to display a single event from a static JSON object

// Static event data (to avoid fetch/CORS issues)
const eventData = {
  "events": [
    {
      "id": "event-004",
      "date": "1977-04-01",
      "startDate": "1977-04-01",
      "endDate": "1977-04-01",
      "title": "Donald Trump marries Ivana Zelníčková",
      "description": "Donald Trump and Ivana Zelníčková wed, beginning a marriage that draws the attention of Czechoslovak intelligence services.",
      "categories": ["personal"],
      "importance": 8,
      "moneyFlow": null,
      "location": {
        "country": "United States",
        "city": "New York",
        "coordinates": []
      },
      "entities": ["entity-001", "entity-002"],
      "sources": [
        {
          "description": "Czechoslovak secret police files reveal interest in Trump couple",
          "url": "https://english.radio.cz/czechoslovak-secret-police-files-reveal-interest-trump-couple-8207116",
          "documentType": "news article",
          "citation": ""
        },
        {
          "description": "Tmanch_CH1.md",
          "url": "https://raw.githubusercontent.com/mfreeze77/DJT/main/Tmanch_CH1.md",
          "documentType": "markdown",
          "citation": ""
        }
      ],
      "documentationLink": "",
      "relatedEvents": [],
      "era": "era-001",
      "mediaUrls": []
    }
  ],
  "entities": {
    "entity-001": {
      "id": "entity-001",
      "name": "Donald J. Trump",
      "aliases": ["Donald John Trump", "DJT"],
      "type": "person",
      "subtype": "",
      "nationality": "American",
      "description": "Real estate developer, 45th President of the US. Key figure in the 1977–1983 Manhattan real estate deals and later expansions.",
      "roles": ["developer", "political figure"],
      "affiliation": [],
      "significance": 10,
      "firstAppearance": "1977-01-01",
      "lastAppearance": "",
      "images": [],
      "properties": {},
      "intelligenceConnections": {},
      "financialData": {},
      "sources": [],
      "documentationLink": "",
      "notes": ""
    },
    "entity-002": {
      "id": "entity-002",
      "name": "Ivana Trump (née Zelníčková)",
      "aliases": ["Ivana Zelníčková", "Ivana Winklmayr"],
      "type": "person",
      "subtype": "",
      "nationality": "Czech, Austrian, later American",
      "description": "Donald Trump's first wife. Emigrated from communist Czechoslovakia via a marriage of convenience. Drew interest from StB due to her father's informant status.",
      "roles": ["spouse of Donald Trump"],
      "affiliation": [],
      "significance": 8,
      "firstAppearance": "1971-01-01",
      "lastAppearance": "",
      "images": [],
      "properties": {},
      "intelligenceConnections": {},
      "financialData": {},
      "sources": [],
      "documentationLink": "",
      "notes": ""
    },
    "entity-018": {
      "id": "entity-018",
      "name": "Czechoslovak State Security (StB)",
      "aliases": ["StB"],
      "type": "organization",
      "subtype": "intelligence agency",
      "nationality": "Czechoslovak",
      "description": "Communist-era secret police force that opened a dossier on Donald Trump after his marriage to Ivana. Shared intelligence with the KGB.",
      "roles": [],
      "affiliation": [],
      "significance": 9,
      "firstAppearance": "1977-01-01",
      "lastAppearance": "",
      "images": [],
      "properties": {},
      "intelligenceConnections": {},
      "financialData": {},
      "sources": [],
      "documentationLink": "",
      "notes": ""
    }
  },
  "relationships": [
    {
      "id": "relationship-002",
      "source": "entity-001",
      "target": "entity-002",
      "type": "married",
      "subtype": "",
      "description": "Donald Trump married Ivana Zelníčková in 1977.",
      "strength": 8,
      "startDate": "1977-04-01",
      "endDate": "1992-01-01",
      "isBidirectional": true,
      "relatedEvents": ["event-004"],
      "evidenceStrength": "confirmed",
      "sources": [],
      "documentationLink": "",
      "notes": ""
    }
  ],
  "intelligenceActivities": [
    {
      "id": "intel-001",
      "date": "1977-05-01",
      "startDate": "1977-05-01",
      "endDate": "",
      "agency": "StB",
      "country": "Czechoslovakia",
      "activityType": "surveillance",
      "targets": ["entity-001", "entity-002"],
      "operators": ["entity-018"],
      "description": "Czechoslovak StB opens a dossier on Donald Trump after his marriage to Ivana.",
      "objectives": ["Monitor Trump's business and political aspirations"],
      "outcomes": ["Regular reporting on the Trump couple to StB files"],
      "relatedEvents": ["event-004"],
      "classification": "secret",
      "declassificationDate": "",
      "evidenceStrength": "reported",
      "sources": [
        {
          "description": "Czechoslovakia's spy agency targeted Donald Trump",
          "url": "https://www.telegraph.co.uk/news/2018/10/29/czechoslovakias-spy-agency-targeted-donald-trump-1980s-wife/",
          "documentType": "news article",
          "citation": ""
        }
      ],
      "documentationLink": "",
      "notes": ""
    }
  ]
};

// Function to display a single event
function displaySingleEvent(eventId) {
  try {
    console.log(`Looking for event ${eventId} in static data...`);
    
    // Find the specific event by ID
    const event = eventData.events.find(e => e.id === eventId);
    
    if (!event) {
      throw new Error(`Event ${eventId} not found in data`);
    }
    
    console.log(`Found event: ${event.title}`);
    
    // Format the display date
    const eventDate = new Date(event.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Update page header with event date
    const dateHeader = document.getElementById('event-date');
    if (dateHeader) {
      dateHeader.textContent = eventDate;
    }
    
    // Create a simple display container
    const container = document.getElementById('event-container');
    if (!container) {
      throw new Error('Display container not found');
    }
    
    // 4. Create the event display with more complete details
    container.innerHTML = `
      <div class="event-card">
        <h2>${event.title}</h2>
        <div class="event-date">${eventDate}</div>
        <p class="event-description">${event.description}</p>
        
        <div class="event-metadata">
          <div class="metadata-item">
            <span class="label">Categories:</span>
            <span class="value">${event.categories ? event.categories.join(', ') : 'None'}</span>
          </div>
          <div class="metadata-item">
            <span class="label">Importance:</span>
            <span class="value">${event.importance}/10</span>
          </div>
          <div class="metadata-item">
            <span class="label">Location:</span>
            <span class="value">${event.location.city}, ${event.location.country}</span>
          </div>
        </div>
        
        <h3>Related Entities:</h3>
        <ul id="entity-list" class="entity-list"></ul>
        
        <h3>Sources:</h3>
        <ul id="source-list" class="source-list"></ul>
      </div>
    `;
    
    // 5. Populate related entities
    const entityList = document.getElementById('entity-list');
    if (event.entities && event.entities.length > 0) {
      event.entities.forEach(entityId => {
        const entity = eventData.entities[entityId];
        if (entity) {
          const entityItem = document.createElement('li');
          entityItem.innerHTML = `
            <strong>${entity.name}</strong> (${entity.type})
            <div class="entity-description">${entity.description}</div>
          `;
          entityList.appendChild(entityItem);
        }
      });
    } else {
      entityList.innerHTML = '<li>No related entities found</li>';
    }
    
    // 6. Populate sources
    const sourceList = document.getElementById('source-list');
    if (event.sources && event.sources.length > 0) {
      event.sources.forEach(source => {
        const sourceItem = document.createElement('li');
        sourceItem.innerHTML = `
          <a href="${source.url}" target="_blank">${source.description}</a>
          <span class="source-type">(${source.documentType})</span>
        `;
        sourceList.appendChild(sourceItem);
      });
    } else {
      sourceList.innerHTML = '<li>No sources available</li>';
    }
    
    // 7. Add intelligence activities if related to this event
    const intelActivities = eventData.intelligenceActivities.filter(
      activity => activity.relatedEvents && activity.relatedEvents.includes(event.id)
    );
    
    if (intelActivities.length > 0) {
      const intelSection = document.createElement('div');
      intelSection.className = 'intel-section';
      intelSection.innerHTML = `
        <h3>Intelligence Activities:</h3>
        <ul id="intel-list" class="intel-list"></ul>
      `;
      container.appendChild(intelSection);
      
      const intelList = document.getElementById('intel-list');
      intelActivities.forEach(activity => {
        const intelItem = document.createElement('li');
        intelItem.innerHTML = `
          <div class="intel-agency">${activity.agency} (${activity.country})</div>
          <div class="intel-type">${activity.activityType}</div>
          <div class="intel-description">${activity.description}</div>
          <div class="intel-date">Date: ${new Date(activity.date).toLocaleDateString()}</div>
        `;
        intelList.appendChild(intelItem);
      });
    }
    
    // 8. Create a network visualization
    createNetworkVisualization(event);
    
  } catch (error) {
    console.error('Error displaying event:', error);
    document.getElementById('event-container').innerHTML = 
      `<div class="error">Error: ${error.message}</div>`;
  }
}

// Function to create a network visualization
function createNetworkVisualization(event) {
  // Create a container for the network
  const networkContainer = document.getElementById('network-container');
  if (!networkContainer) return;
  
  // Clear previous content
  networkContainer.innerHTML = '';
  
  // Create an SVG element for the visualization
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '800');
  svg.setAttribute('height', '500');
  networkContainer.appendChild(svg);
  
  // Find the central figure (Trump) node
  const trumpEntity = eventData.entities['entity-001'];
  
  // Create the Trump node at the center
  const trumpNode = createNode(svg, 400, 250, '#FFA500', trumpEntity.name);
  
  // Create the event node to the right
  const eventNode = createNode(svg, 600, 250, '#4299E1', event.title);
  
  // Create a connection from Trump to the event
  createConnection(svg, 400, 250, 600, 250, '#AAA');
  
  // Add related entities in a semi-circle on the left
  if (event.entities && event.entities.length > 0) {
    const entityCount = event.entities.length;
    const radius = 200;
    const startAngle = Math.PI / 2 - Math.PI / 4;
    const arcAngle = Math.PI / 2;
    
    event.entities.forEach((entityId, index) => {
      // Skip Trump entity since it's already placed
      if (entityId === 'entity-001') return;
      
      const entity = eventData.entities[entityId];
      if (!entity) return;
      
      // Calculate position in arc
      const angle = startAngle + (index / Math.max(1, entityCount - 1)) * arcAngle;
      const x = 200 + radius * Math.cos(angle);
      const y = 250 - radius * Math.sin(angle);
      
      // Create entity node
      const entityColor = getEntityColor(entity.type);
      const entityNode = createNode(svg, x, y, entityColor, entity.name);
      
      // Create connection from entity to Trump
      createConnection(svg, x, y, 400, 250, '#AAA');
    });
  }
  
  // Add intelligence activities if related to this event
  const intelActivities = eventData.intelligenceActivities.filter(
    activity => activity.relatedEvents && activity.relatedEvents.includes(event.id)
  );
  
  if (intelActivities.length > 0) {
    // Create intel nodes below event
    intelActivities.forEach((activity, index) => {
      const x = 600;
      const y = 350 + index * 70;
      
      // Find the agency entity
      const agencyId = Object.keys(eventData.entities).find(
        id => eventData.entities[id].name.includes(activity.agency)
      );
      
      const agencyColor = agencyId ? getEntityColor(eventData.entities[agencyId].type) : '#8B0000';
      const activityNode = createNode(svg, x, y, agencyColor, activity.agency);
      
      // Connect to event
      createConnection(svg, x, y, 600, 250, '#AAA');
      
      // Connect to targets
      if (activity.targets) {
        activity.targets.forEach(targetId => {
          if (targetId === 'entity-001') {
            // Connect to Trump
            createConnection(svg, x, y, 400, 250, '#FF0000', 'dashed');
          } else {
            // Find position of target entity if it's in the visualization
            const targetEntityNode = document.querySelector(`[data-entity-id="${targetId}"]`);
            if (targetEntityNode) {
              const targetX = parseFloat(targetEntityNode.getAttribute('cx'));
              const targetY = parseFloat(targetEntityNode.getAttribute('cy'));
              createConnection(svg, x, y, targetX, targetY, '#FF0000', 'dashed');
            }
          }
        });
      }
    });
  }
}

// Helper function to get color based on entity type
function getEntityColor(type) {
  const colorMap = {
    'person': '#4CAF50',
    'organization': '#9C27B0',
    'location': '#2196F3',
    'intelligence agency': '#F44336'
  };
  return colorMap[type.toLowerCase()] || '#888888';
}

// Helper function to create a node in the SVG
function createNode(svg, x, y, color, label) {
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  // Create the circle
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', '20');
  circle.setAttribute('fill', color);
  circle.setAttribute('stroke', '#333');
  circle.setAttribute('stroke-width', '2');
  group.appendChild(circle);
  
  // Create the label
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', x);
  text.setAttribute('y', y + 40);
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('fill', '#333');
  text.setAttribute('font-size', '12px');
  text.textContent = label;
  group.appendChild(text);
  
  svg.appendChild(group);
  return group;
}

// Helper function to create a connection between nodes
function createConnection(svg, x1, y1, x2, y2, color = '#999', style = 'solid') {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  line.setAttribute('stroke', color);
  line.setAttribute('stroke-width', '2');
  
  if (style === 'dashed') {
    line.setAttribute('stroke-dasharray', '5,5');
  }
  
  svg.appendChild(line);
  return line;
}

// Add more detailed styling
const style = document.createElement('style');
style.textContent = `
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  
  h1 {
    color: #003366;
    border-bottom: 2px solid #003366;
    padding-bottom: 10px;
  }
  
  #event-date {
    font-size: 1.5em;
    font-weight: bold;
    margin: 20px 0;
    color: #003366;
  }
  
  .event-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .event-card h2 {
    color: #003366;
    margin-top: 0;
  }
  
  .event-date {
    color: #666;
    margin-bottom: 15px;
    font-weight: bold;
  }
  
  .event-description {
    font-size: 1.1em;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .event-metadata {
    background-color: #f8f8f8;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  
  .metadata-item {
    margin-bottom: 8px;
  }
  
  .label {
    font-weight: bold;
    display: inline-block;
    width: 100px;
  }
  
  h3 {
    color: #003366;
    margin-top: 25px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 5px;
  }
  
  .entity-list, .source-list, .intel-list {
    list-style: none;
    padding: 0;
  }
  
  .entity-list li, .source-list li, .intel-list li {
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f8f8f8;
    border-radius: 5px;
    border-left: 4px solid #003366;
  }
  
  .entity-description, .source-type {
    color: #666;
    font-size: 0.9em;
    margin-top: 5px;
  }
  
  .intel-agency {
    font-weight: bold;
    color: #990000;
  }
  
  .intel-type {
    font-style: italic;
    margin: 5px 0;
  }
  
  .intel-date {
    font-size: 0.9em;
    color: #666;
  }
  
  #network-container {
    border: 1px solid #ddd;
    margin-top: 20px;
    height: 500px;
    border-radius: 8px;
    background-color: #f8f8f8;
    overflow: hidden;
  }
  
  .error {
    color: #721c24;
    padding: 20px;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
    background-color: #f8d7da;
  }
  
  a {
    color: #0066cc;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  .back-link {
    display: inline-block;
    margin-bottom: 20px;
    color: #003366;
    text-decoration: none;
  }
  
  .back-link:hover {
    text-decoration: underline;
  }
`;
document.head.appendChild(style);

// Call the function with the event ID when the page loads
window.addEventListener('DOMContentLoaded', () => {
  displaySingleEvent('event-004');
});
```

And here's the updated HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trump-Russia Timeline: Single Event View</title>
  <script src="simple-event-display.js"></script>
</head>
<body>
  <h1>Trump-Russia Timeline: Single Event View</h1>
  
  <a href="#" class="back-link">←Back to full timeline</a>
  
  <h2 id="event-date">Loading event date...</h2>
  
  <div id="event-container">
    <!-- Event information will be displayed here -->
    <div class="loading">Loading event data...</div>
  </div>
  
  <div id="network-container">
    <!-- Network visualization will be displayed here -->
  </div>
  
  <footer>
    <p>Trump-Russia Timeline Visualization | © 2025</p>
  </footer>
</body>
</html>
```

This revised approach:

1. Uses the static JSON data you provided directly in the script
2. Skips the fetch operation entirely to avoid CORS issues
3. Creates a much more detailed event display that shows:
   - Event details (title, date, description)
   - Categories, importance and location metadata
   - Related entities with descriptions
   - Sources with links
   - Intelligence activities related to the event
4. Creates an improved network visualization that shows:
   - Donald Trump as the central node
   - The event connected to Trump
   - Related entities positioned in a semi-circle
   - Intelligence activities with connections to their targets
5. Uses color coding for different entity types
6. Adds improved styling for better readability

You can save these two files and open the HTML directly in your browser - it should work without any CORS issues since it's not trying to fetch external files.