/**
 * Debug helper for Trump-Russia Timeline visualization
 * This module adds debugging and data validation to help identify issues
 */

// Check entity and relationship data integrity
export function validateNetworkData(entities, relationships) {
  console.log('--- VALIDATING NETWORK DATA ---');
  
  // Check entities
  console.log(`Total entities: ${Object.keys(entities).length}`);
  
  const entityTypes = {};
  const entityGroupCounts = {};
  const missingNames = [];
  
  // Check entity structure
  Object.entries(entities).forEach(([id, entity]) => {
    // Record entity types
    const type = entity.type || 'unknown';
    entityTypes[type] = (entityTypes[type] || 0) + 1;
    
    // Record conceptual grouping
    let group = 'other';
    if (entity.name?.toLowerCase().includes('trump') && entity.name?.toLowerCase().includes('donald')) {
      group = 'T';
    } else if (entity.type === 'russian' || 
               entity.name?.toLowerCase().includes('russia') || 
               entity.name?.toLowerCase().includes('soviet') || 
               entity.name?.toLowerCase().includes('kgb')) {
      group = 'R';
    } else {
      group = 'T/R';  // Will be refined later based on connections
    }
    
    entityGroupCounts[group] = (entityGroupCounts[group] || 0) + 1;
    
    // Check for missing names
    if (!entity.name) {
      missingNames.push(id);
    }
  });
  
  // If we have no entities, add some placeholders
  if (Object.keys(entities).length === 0) {
    console.warn('No entities found! Adding placeholders for visualization.');
    
    entities['trump'] = {
      id: 'trump',
      name: 'Donald Trump',
      type: 'person',
      subtype: 'businessman',
      significance: 10
    };
    
    entities['russia'] = {
      id: 'russia',
      name: 'Russia/Soviet Union',
      type: 'russian',
      subtype: 'country',
      significance: 10
    };
    
    entities['intermediary1'] = {
      id: 'intermediary1',
      name: 'Trump-Russia Intermediary 1',
      type: 'person',
      significance: 7
    };
    
    entities['intermediary2'] = {
      id: 'intermediary2',
      name: 'Trump-Russia Intermediary 2',
      type: 'organization',
      significance: 6
    };
    
    console.log('Added placeholder entities:', Object.keys(entities));
  }
  
  // Check relationships
  console.log(`Total relationships: ${relationships.length}`);
  
  const relationshipTypes = {};
  const missingEndpoints = [];
  const selfReferences = [];
  
  // Check relationship structure
  relationships.forEach(rel => {
    // Record relationship types
    const type = rel.type || 'unknown';
    relationshipTypes[type] = (relationshipTypes[type] || 0) + 1;
    
    // Check for missing endpoints
    if (!rel.source || !rel.target) {
      missingEndpoints.push(rel);
    }
    
    // Check for self-references
    if (rel.source === rel.target) {
      selfReferences.push(rel);
    }
  });
  
  // If we have entities but no relationships, add placeholders
  if (Object.keys(entities).length > 0 && relationships.length === 0) {
    console.warn('No relationships found! Adding placeholders for visualization.');
    
    // Try to find Trump and Russia entities
    const trumpId = Object.keys(entities).find(id => 
      entities[id].name?.toLowerCase().includes('trump') && 
      entities[id].name?.toLowerCase().includes('donald')
    ) || 'trump';
    
    const russiaId = Object.keys(entities).find(id =>
      entities[id].type === 'russian' ||
      entities[id].name?.toLowerCase().includes('russia') ||
      entities[id].name?.toLowerCase().includes('soviet')
    ) || 'russia';
    
    // Get some intermediary entities if possible
    let intermediaries = Object.keys(entities)
      .filter(id => id !== trumpId && id !== russiaId)
      .slice(0, 2);
    
    // Ensure we have intermediaries
    if (intermediaries.length === 0) {
      if (!entities['intermediary1']) {
        entities['intermediary1'] = {
          id: 'intermediary1',
          name: 'Trump-Russia Intermediary 1',
          type: 'person',
          significance: 7
        };
      }
      if (!entities['intermediary2']) {
        entities['intermediary2'] = {
          id: 'intermediary2',
          name: 'Trump-Russia Intermediary 2',
          type: 'organization',
          significance: 6
        };
      }
      intermediaries = ['intermediary1', 'intermediary2'];
    }
    
    // Add T → T/R connections
    intermediaries.forEach((id, index) => {
      relationships.push({
        source: trumpId,
        target: id,
        type: 'connection',
        strength: 7 - index
      });
    });
    
    // Add T/R → R connections
    intermediaries.forEach((id, index) => {
      relationships.push({
        source: id,
        target: russiaId,
        type: 'connection',
        strength: 7 - index
      });
    });
    
    console.log('Added placeholder relationships between:', trumpId, intermediaries, russiaId);
  }
  
  // Log summary
  console.log('Entity types:', entityTypes);
  console.log('Entity groups:', entityGroupCounts);
  console.log('Relationship types:', relationshipTypes);
  
  if (missingNames.length > 0) {
    console.warn('Entities missing names:', missingNames);
  }
  
  if (missingEndpoints.length > 0) {
    console.warn('Relationships with missing endpoints:', missingEndpoints);
  }
  
  if (selfReferences.length > 0) {
    console.warn('Self-referencing relationships:', selfReferences);
  }
  
  console.log('--- END VALIDATION ---');
  
  return {entities, relationships};
}

// Export helper functions
export default {
  validateNetworkData
};
