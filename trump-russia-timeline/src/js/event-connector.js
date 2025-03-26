/**
 * Event connector module 
 * 
 * Handles creating connections between events, entities and Trump,
 * implementing the umbrella structure (Trump -> Events -> Entities -> People)
 * 
 * This module includes functions to reset, filter, and update the network visualization
 * based on specific dates.
 */

/**
 * Find the Trump node in the network
 * @param {Object} network - Cytoscape network instance
 * @returns {Object|null} - The Trump node if found, null otherwise
 */
export function findTrumpNode(network) {
  if (!network) {
    console.warn('Missing network when finding Trump node');
    return null;
  }
  
  try {
    // Find the Trump node - try different possible IDs
    let trumpNode = null;
    if (network.getElementById('entity-001').length > 0) {
      trumpNode = network.getElementById('entity-001');
    } else if (network.getElementById('trump').length > 0) {
      trumpNode = network.getElementById('trump');
    } else {
      // As a fallback, look for any node with trump in the label
      const trumpNodeQuery = network.nodes().filter(node => {
        const label = node.data('label') || '';
        return label.toLowerCase().includes('trump');
      });
      
      if (trumpNodeQuery && trumpNodeQuery.length > 0) {
        trumpNode = trumpNodeQuery;
      }
    }
    
    return trumpNode && trumpNode.length > 0 ? trumpNode[0] : null;
  } catch (err) {
    console.error('Error finding Trump node:', err);
    return null;
  }
}

/**
 * Create connections between Trump, events, and entities
 * @param {Object} network - Cytoscape network instance
 * @param {Array} allEvents - Event data array
 * @param {Object} trumpNode - Trump node in the network
 */
export function connectEventsToTrump(network, allEvents, trumpNode) {
  if (!network || !trumpNode || !allEvents || !allEvents.length) {
    console.warn('Missing data for connectEventsToTrump');
    return;
  }

  console.log(`Connecting ${allEvents.length} events to Trump node`);
  
  try {
    // Clear existing event nodes before adding new ones
    const existingEventNodes = network.nodes('[type="event"]');
    if (existingEventNodes.length > 0) {
      network.remove(existingEventNodes);
    }
    
    // Remove existing event connections
    network.edges('.event-connection').remove();
    
    // FIRST: Position Trump at bottom center and make it unmovable
    const centerX = network.width() / 2;
    const bottomY = network.height() * 0.9; // Place even lower
    
    trumpNode.position({ x: centerX, y: bottomY });
    trumpNode.lock(); // Lock position
    
    // Give Trump node special styling
    trumpNode.addClass('trump-node');
    
    // Sort events by date and limit to a reasonable number
    const sortedEvents = [...allEvents]
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 7); // Limit to 7 events for a cleaner umbrella
    
    // SECOND: Position events in a perfect umbrella arc above Trump
    const eventCount = sortedEvents.length;
    const radius = Math.min(150, (network.width() * 0.3)); // Tighter radius
    const arcAngle = Math.PI * 0.8; // Wider arc for better umbrella shape
    const startAngle = Math.PI / 2 - arcAngle / 2; // Start from left side
    
    // Create a clean umbrella shape with events
    sortedEvents.forEach((event, index) => {
      if (!event.date) return;
      
      // Calculate exact position in arc
      const angle = startAngle + (index / Math.max(1, eventCount - 1)) * arcAngle;
      const x = centerX + radius * Math.cos(angle);
      const y = bottomY - (radius * Math.sin(angle) * 0.8); // Flatter umbrella

      // Create event node with fixed position
      const eventNode = {
        group: 'nodes',
        data: {
          id: `event-${event.id}`,
          label: event.title,
          type: 'event',
          group: 'event', 
          eventData: event,
          description: event.description,
          date: event.date
        },
        position: { x, y }, // Fixed position
        classes: 'event-node'
      };
      
      // Add node to network
      network.add(eventNode);
      
      // Create direct connection from Trump to this event (umbrella spoke)
      const eventConnection = {
        group: 'edges',
        data: {
          id: `trump-to-${event.id}`,
          source: trumpNode.id(),
          target: `event-${event.id}`,
          type: 'event-connection'
        },
        classes: 'event-connection'
      };
      
      network.add(eventConnection);
      
      // Add entity connections
      if (event.entities && event.entities.length > 0) {
        event.entities.forEach(entityId => {
          const entityNode = network.getElementById(entityId);
          if (entityNode.length > 0) {
            // Connect event to entity
            const entityConnection = {
              group: 'edges',
              data: {
                id: `${event.id}-to-${entityId}`,
                source: `event-${event.id}`,
                target: entityId,
                type: 'entity-connection'
              },
              classes: 'entity-connection'
            };
            
            network.add(entityConnection);
          }
        });
      }
    });
    
    // Lock event nodes in place to maintain umbrella shape
    network.nodes('[type="event"]').forEach(node => {
      node.lock();
    });
    
    // THIRD: Arrange entity nodes above the events to complete umbrella
    // Create a proper "canopy" for the umbrella with entities
    const entityNodes = network.nodes().filter(n => 
      n.id() !== trumpNode.id() && 
      !n.hasClass('event-node')
    );
    
    // Position entities above their connected events, in the top part of umbrella
    entityNodes.forEach(entityNode => {
      // Find all connected event nodes
      const connectedEvents = entityNode.neighborhood('node.event-node');
      
      if (connectedEvents.length > 0) {
        // Calculate average position of connected events
        let avgX = 0, avgY = 0;
        connectedEvents.forEach(eventNode => {
          avgX += eventNode.position('x');
          avgY += eventNode.position('y');
        });
        avgX /= connectedEvents.length;
        avgY /= connectedEvents.length;
        
        // Position entity above connected events (higher up in umbrella)
        const entityY = Math.min(avgY - 80, bottomY - 200);
        entityNode.position({
          x: avgX + (Math.random() * 50 - 25), // Small random x offset
          y: entityY
        });
      }
    });
    
    // Disable automatic layout to keep umbrella shape
    trumpNode.position({ x: centerX, y: bottomY });
    trumpNode.lock();
  } catch (err) {
    console.error('Error connecting events to Trump:', err);
  }
}

/**
 * Update the opacity of nodes based on exact date matching
 * @param {Object} network - Cytoscape network instance
 * @param {Array} allEvents - Array of all event objects
 * @param {Date} currentDate - Currently selected date
 */
export function updateNodesTemporalOpacity(network, allEvents, currentDate) {
  if (!network || !allEvents || !currentDate) return;
  
  try {
    // Format the current date as YYYY-MM-DD for comparison
    const selectedDateStr = currentDate.toISOString().split('T')[0];
    console.log(`Updating opacity for specific date: ${selectedDateStr}`);
    
    // First, find the Trump node
    let trumpNode = findTrumpNode(network);
    if (!trumpNode) {
      console.error('Could not find Trump node');
      return;
    }
    
    // Find events for the exact date first
    const exactDateEvents = getRelevantEvents(allEvents, currentDate, 0);
    
    // If no exact matches, try same month events
    const eventsToShow = exactDateEvents.length > 0 ? 
                         exactDateEvents : 
                         getRelevantEvents(allEvents, currentDate, 30);
    
    if (eventsToShow.length === 0) {
      console.log('No events to show for date:', selectedDateStr);
      return;
    }
    
    console.log(`Showing ${eventsToShow.length} events for ${selectedDateStr}`);
    
    // Create event nodes and connect them to Trump
    connectEventsToTrump(network, eventsToShow, trumpNode);
  } catch (err) {
    console.error('Error updating opacity for date:', err);
  }
}

/**
 * Get events for the specific selected date from the JSON data
 * Improved to handle exact date matching and fallbacks consistently
 * @param {Array} allEvents - Array of all event objects
 * @param {Date} currentDate - Currently selected date
 * @param {number} maxDaysRange - Maximum days around the date to consider (0 = exact match only)
 * @returns {Array} Array of events for the specific date or range
 */
export function getRelevantEvents(allEvents, currentDate, maxDaysRange = 0) {
  // Format the current date as YYYY-MM-DD for comparison
  const selectedDateStr = currentDate.toISOString().split('T')[0];
  console.log(`Finding events for specific date: ${selectedDateStr} (range: ${maxDaysRange} days)`);
  
  if (!allEvents || !currentDate) {
    console.warn('Missing data for getRelevantEvents:', {
      hasEvents: !!allEvents,
      hasDate: !!currentDate
    });
    return [];
  }
  
  // If maxDaysRange is 0, only get exact date matches
  if (maxDaysRange === 0) {
    // Filter events to include only those matching the exact date
    const exactDateEvents = allEvents.filter(event => {
      if (!event.date) {
        return false;
      }
      
      // Convert event date to YYYY-MM-DD format
      const eventDateObj = new Date(event.date);
      const eventDateStr = eventDateObj.toISOString().split('T')[0];
      
      // Only include events from the exact date
      return eventDateStr === selectedDateStr;
    });
    
    console.log(`Found ${exactDateEvents.length} events on exact date ${selectedDateStr}`);
    return exactDateEvents;
  }
  
  // Otherwise, get events within the specified range
  // Calculate the date range boundaries
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - maxDaysRange);
  
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + maxDaysRange);
  
  // Find events within the date range
  const rangeEvents = allEvents.filter(event => {
    if (!event.date) return false;
    
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  });
  
  // Sort events by proximity to the current date
  rangeEvents.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const diffA = Math.abs(dateA.getTime() - currentDate.getTime());
    const diffB = Math.abs(dateB.getTime() - currentDate.getTime());
    return diffA - diffB;
  });
  
  // If no events in range but we're looking for a month, use same month events
  if (rangeEvents.length === 0 && maxDaysRange >= 15) {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    
    const sameMonthEvents = allEvents.filter(event => {
      if (!event.date) return false;
      
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
    
    // Sort by day proximity within month
    sameMonthEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const diffA = Math.abs(dateA.getDate() - currentDate.getDate());
      const diffB = Math.abs(dateB.getDate() - currentDate.getDate());
      return diffA - diffB;
    });
    
    console.log(`No events in ${maxDaysRange}-day range, found ${sameMonthEvents.length} events in same month`);
    return sameMonthEvents;
  }
  
  console.log(`Found ${rangeEvents.length} events within ${maxDaysRange} days of ${selectedDateStr}`);
  return rangeEvents;
}

/**
 * Create HTML for displaying event information for the specific date
 * @param {Array} events - Array of event objects to display
 * @returns {string} HTML string
 */
export function createEventInfoHTML(events) {
  if (!events || events.length === 0) {
    return '<div class="event-info">No events found for this date</div>';
  }
  
  const mainEvent = events[0];
  const otherEvents = events.slice(1, 3); // Show up to 3 more events
  
  // Extract date information
  const eventDate = new Date(mainEvent.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Determine if we're showing exact date or same-month events
  const isExactDate = otherEvents.length > 0 ? 
    new Date(otherEvents[0].date).getDate() === eventDate.getDate() : true;
  
  let html = `
    <div class="event-info">
      <h3>${mainEvent.title}</h3>
      <div class="event-date">${formattedDate}</div>
      <p>${mainEvent.description}</p>
  `;
  
  if (otherEvents.length > 0) {
    const headerText = isExactDate ? 
      `Other events on ${formattedDate}:` : 
      `Other nearby events (${eventDate.toLocaleDateString('en-US', {month: 'long', year: 'numeric'})}):`; 
    
    html += `<hr><h4>${headerText}</h4><ul>`;
    otherEvents.forEach(event => {
      html += `
        <li>
          <strong>${event.title}</strong>
          <span class="event-date">(${new Date(event.date).toLocaleDateString()})</span>
        </li>
      `;
    });
    html += '</ul>';
  }
  
  if (events.length > 4) {
    const remainingText = isExactDate ? 
      `...and ${events.length - 4} more events on this date` :
      `...and ${events.length - 4} more events in this timeframe`;
    
    html += `<p>${remainingText}</p>`;
  }
  
  html += '</div>';
  return html;
}
