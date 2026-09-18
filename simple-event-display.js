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
  svg.setAttribute('height', '400');
  svg.setAttribute('viewBox', '370 300 350 400');
  networkContainer.appendChild(svg);
  
  // Find the Trump entity and other entities
  const trumpEntity = eventData.entities['entity-001'];
  const ivanaEntity = eventData.entities['entity-002'];
  
  // We don't need prefixes anymore since we're using direct values

  // Set up coordinates to match the screenshot exactly
  const trumpX = 540; // Trump centered horizontally on bottom
  const trumpY = 650; // Trump at bottom
  
  const eventX = 540; // Event above Trump
  const eventY = 550;
  
  const entityX = 540; // Entity (Ivana) positioned above event
  const entityY = 460; // Position above event
  
  const intelX = 540; // Intelligence activity above Ivana
  const intelY = 380; // Positioned above the entity (Ivana)
  
  // Create Trump node (orange box at bottom)
  createBox(svg, trumpX, trumpY, '#FFA500', trumpEntity.name);
  
  // Create Event node (blue box above Trump)
  createBox(svg, eventX, eventY, '#4299E1', event.title);
  
  // Connect Trump to Event
  createConnection(svg, trumpX, trumpY - 15, eventX, eventY + 15, '#333');
  
  // Create Entity node (green box above event)
  createBox(svg, entityX, entityY, '#4CAF50', ivanaEntity.name);
  
  // Connect Entity to Event
  createConnection(svg, entityX, entityY + 15, eventX, eventY - 15, '#333');
  
  // Find intelligence activities related to this event
  const intelActivities = eventData.intelligenceActivities.filter(
    activity => activity.relatedEvents && activity.relatedEvents.includes(event.id)
  );
  
  if (intelActivities.length > 0) {
    // Take the first intel activity (StB surveillance in this case)
    const activity = intelActivities[0];
    
  // Create intel activity node (red box above Ivana) using data from JSON
  createBox(svg, intelX, intelY, '#DC143C', `${activity.agency} (${activity.activityType})`);
  
  // Connect intel activity to Ivana entity (vertical connection)
  createConnection(svg, intelX, intelY + 15, entityX, entityY - 15, '#333');
  
  // Connect intel activity directly to Trump with dashed red line
  createConnection(svg, intelX, intelY + 15, trumpX, trumpY - 15, '#FF0000', 'dashed');
  }
}

// Helper function to create a box with text
function createBox(svg, x, y, color, text) {
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  // Create the rectangle (centered on x,y) with more width to fit text
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('x', x - 95);
  rect.setAttribute('y', y - 15);
  rect.setAttribute('width', 190);
  rect.setAttribute('height', 30);
  rect.setAttribute('rx', 3);
  rect.setAttribute('ry', 3);
  rect.setAttribute('fill', color);
  rect.setAttribute('stroke', '#333');
  rect.setAttribute('stroke-width', '1');
  group.appendChild(rect);
  
  // Create the label
  const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  textEl.setAttribute('x', x);
  textEl.setAttribute('y', y + 5);
  textEl.setAttribute('text-anchor', 'middle');
  textEl.setAttribute('fill', color === '#FFA500' ? '#000' : '#fff');
  textEl.setAttribute('font-size', '12px');
  textEl.setAttribute('font-weight', 'bold');
  textEl.textContent = text;
  group.appendChild(textEl);
  
  svg.appendChild(group);
  return group;
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
