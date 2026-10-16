/**
 * simple-event-display.js
 * A minimal script to display a single event from a year's JSON file
 * with styling that matches the main application.
 */

// Function to load and display a single event
async function displaySingleEvent(year, eventId) {
  try {
    // 1. Load the specified year's JSON file
    console.log(`Loading data for year ${year}...`);
    const response = await fetch(`../../data/processed/by-year/${year}.json`);
    
    if (!response.ok) {
      throw new Error(`Failed to load data for year ${year}: ${response.status}`);
    }
    
    const yearData = await response.json();
    console.log(`Successfully loaded data for year ${year}`);
    
    // 2. Find the specific event by ID
    const event = yearData.events.find(e => e.id === eventId);
    
    if (!event) {
      throw new Error(`Event ${eventId} not found in year ${year}`);
    }
    
    console.log(`Found event: ${event.title}`);
    
    // Display current date
    const dateDisplay = document.getElementById('current-date');
    if (dateDisplay) {
      dateDisplay.textContent = new Date(event.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // 3. Create a simple display container
    const container = document.getElementById('event-container');
    if (!container) {
      throw new Error('Display container not found');
    }
    
    // 4. Create the event display with main app styling
    container.innerHTML = `
      <div class="card">
        <h2 class="card-title">${event.title}</h2>
        <div class="event-date">${new Date(event.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</div>
        <p>${event.description}</p>
        <h3 class="mt-2">Related Entities:</h3>
        <ul id="entity-list"></ul>
      </div>
    `;
    
    // 5. Fetch and display related entities
    const entityList = document.getElementById('entity-list');
    if (event.entities && event.entities.length > 0) {
      event.entities.forEach(entityId => {
        const entity = yearData.entities[entityId];
        if (entity) {
          const entityItem = document.createElement('li');
          // Add category class if available
          const categoryClass = entity.category ? `category-${entity.category.toLowerCase()}` : '';
          entityItem.className = categoryClass;
          entityItem.textContent = `${entity.name} (${entity.type})`;
          entityList.appendChild(entityItem);
        }
      });
    } else {
      entityList.innerHTML = '<li>No related entities found</li>';
    }
    
    // 6. Create a simple network visualization
    createSimpleNetwork(event, yearData.entities);
    
  } catch (error) {
    console.error('Error displaying event:', error);
    document.getElementById('event-container').innerHTML = 
      `<div class="error-message">Error: ${error.message}</div>`;
  }
}

// Function to create a simple network visualization styled like the main app
function createSimpleNetwork(event, entities) {
  // Create a container for the network
  const networkContainer = document.getElementById('network-container');
  if (!networkContainer) return;
  
  // Clear previous content
  networkContainer.innerHTML = '';
  
  // Create an SVG element for the visualization
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '500');
  svg.setAttribute('viewBox', '0 0 800 500');
  svg.style.overflow = 'visible';
  networkContainer.appendChild(svg);
  
  // Create definitions for filters and gradients
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  svg.appendChild(defs);
  
  // Add shadow filter for nodes
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'drop-shadow');
  filter.innerHTML = `
    <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
    <feOffset dx="2" dy="2" result="offsetblur"/>
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.5"/>
    </feComponentTransfer>
    <feMerge> 
      <feMergeNode/>
      <feMergeNode in="SourceGraphic"/> 
    </feMerge>
  `;
  defs.appendChild(filter);
  
  // Create the Trump node at the bottom center with styling from main app
  const trumpNode = createNode(svg, 400, 400, '#FFA500', 'Donald J. Trump', true);
  
  // Create the event node above Trump
  const eventNode = createNode(svg, 400, 300, '#4299E1', event.title, false, true);
  
  // Create a connection from Trump to the event
  createConnection(svg, 400, 400, 400, 300, true);
  
  // Create entity nodes in an arc above the event
  if (event.entities && event.entities.length > 0) {
    const entityCount = event.entities.length;
    const radius = 150;
    const startAngle = Math.PI / 2 - Math.PI / 4;
    const arcAngle = Math.PI / 2;
    
    event.entities.forEach((entityId, index) => {
      const entity = entities[entityId];
      if (!entity) return;
      
      // Calculate position in arc
      const angle = startAngle + (index / Math.max(1, entityCount - 1)) * arcAngle;
      const x = 400 + radius * Math.cos(angle);
      const y = 200 - radius * Math.sin(angle);
      
      // Determine color based on entity category if available
      let color = '#FF6B6B'; // Default color
      
      if (entity.category) {
        switch(entity.category.toLowerCase()) {
          case 'financial':
            color = '#27ae60'; // Green
            break;
          case 'intelligence':
            color = '#8e44ad'; // Purple
            break;
          case 'business':
            color = '#3498db'; // Blue
            break;
          case 'political':
            color = '#e74c3c'; // Red
            break;
          case 'legal':
            color = '#f39c12'; // Orange
            break;
          case 'personal':
            color = '#7f8c8d'; // Gray
            break;
        }
      }
      
      // Create entity node
      const entityNode = createNode(svg, x, y, color, entity.name);
      
      // Create connection from event to entity
      createConnection(svg, 400, 300, x, y, false);
    });
  }
}

// Helper function to create a node in the SVG with main app styling
function createNode(svg, x, y, color, label, isTrump = false, isEvent = false) {
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.classList.add('network-node');
  
  if (isTrump) {
    group.classList.add('trump-node');
  } else if (isEvent) {
    group.classList.add('event-node');
  }
  
  // Create the circle with styling matching the main app
  const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  circle.setAttribute('cx', x);
  circle.setAttribute('cy', y);
  circle.setAttribute('r', isTrump ? '25' : '20');
  circle.setAttribute('fill', color);
  
  // Apply different styling based on node type
  if (isTrump) {
    // Trump node styling from main app
    circle.setAttribute('stroke', '#cc5500');
    circle.setAttribute('stroke-width', '3');
  } else if (isEvent) {
    // Event node styling from main app
    circle.setAttribute('stroke', '#2980b9');
    circle.setAttribute('stroke-width', '2');
    circle.setAttribute('stroke-dasharray', '5,2');
  } else {
    // Entity node styling
    circle.setAttribute('stroke', '#333');
    circle.setAttribute('stroke-width', '1.5');
  }
  
  circle.setAttribute('filter', 'url(#drop-shadow)');
  
  // Add hover effects with CSS
  circle.style.transition = 'transform 0.2s ease-in-out, opacity 0.3s ease-in-out';
  circle.addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
    this.style.opacity = '1';
  });
  circle.addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
    this.style.opacity = '0.9';
  });
  
  group.appendChild(circle);
  
  // Create the label with better styling
  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', x);
  text.setAttribute('y', y + (isTrump ? 45 : 35));
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('fill', '#333');
  text.setAttribute('font-size', isTrump ? '14px' : '12px');
  text.setAttribute('font-weight', isTrump ? 'bold' : 'normal');
  text.classList.add('node-label');
  
  // Limit label length and add ellipsis if needed
  const maxLabelLength = 15;
  text.textContent = label.length > maxLabelLength ? 
                    label.substring(0, maxLabelLength) + '...' : 
                    label;
  
  // Add a semi-transparent background to make text more readable
  const textBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  const bbox = text.getBBox ? text.getBBox() : { width: label.length * 7, height: 14, x: x - label.length * 3.5, y: y + (isTrump ? 32 : 22) };
  
  // This is a workaround since getBBox() doesn't work until the element is in the DOM
  const width = Math.min(bbox.width + 10, maxLabelLength * 8 + 10);
  textBg.setAttribute('x', x - width/2);
  textBg.setAttribute('y', y + (isTrump ? 32 : 22));
  textBg.setAttribute('width', width);
  textBg.setAttribute('height', 16);
  textBg.setAttribute('rx', 3);
  textBg.setAttribute('ry', 3);
  textBg.setAttribute('fill', 'white');
  textBg.setAttribute('fill-opacity', '0.7');
  
  group.appendChild(textBg);
  group.appendChild(text);
  
  svg.appendChild(group);
  return group;
}

// Helper function to create a connection between nodes with main app styling
function createConnection(svg, x1, y1, x2, y2, isEventConnection = false) {
  const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  line.setAttribute('x1', x1);
  line.setAttribute('y1', y1);
  line.setAttribute('x2', x2);
  line.setAttribute('y2', y2);
  
  if (isEventConnection) {
    // Event connection styling from main app
    line.setAttribute('stroke', '#718096');
    line.setAttribute('stroke-width', '3');
    line.classList.add('event-connection');
  } else {
    // Entity connection styling from main app
    line.setAttribute('stroke', '#a0aec0');
    line.setAttribute('stroke-width', '1.5');
    line.classList.add('entity-connection');
  }
  
  line.setAttribute('opacity', isEventConnection ? '0.9' : '0.7');
  
  // Add transition effects
  line.style.transition = 'opacity 0.3s ease-in-out';
  
  svg.insertBefore(line, svg.firstChild); // Put lines behind nodes
  return line;
}

// Call the function with the Moscow trip event when the page loads
window.addEventListener('DOMContentLoaded', () => {
  displaySingleEvent('1987', 'event-019');
});
