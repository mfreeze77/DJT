# json_schema

## Core JSON Schemas

### 1. Timeline Events JSON Schema

```json
{
  "events": [
    {
      "id": "string",                     // Unique identifier for the event
      "date": "YYYY-MM-DD",               // Date of the event (as specific as possible)
      "startDate": "YYYY-MM-DD",          // For events with duration
      "endDate": "YYYY-MM-DD",            // For events with duration
      "title": "string",                  // Short event title
      "description": "string",            // Detailed description
      "categories": [                     // Multiple categories possible
        "financial",                      // Money-related events
        "intelligence",                   // Intelligence operations
        "business",                       // Business dealings
        "political",                      // Political interactions
        "legal",                          // Legal proceedings
        "personal"                        // Personal connections
      ],
      "importance": 1-10,                 // Scale for bubble size
      "moneyFlow": {
        "amount": number,                 // Dollar amount
        "direction": "to-trump|from-trump", // Direction of money flow
        "isDirectFlow": boolean,          // Direct or indirect connection
        "entities": ["entity-id"]         // References to involved entities
      },
      "location": {
        "country": "string",              // Country where event occurred
        "city": "string",                 // City where event occurred
        "coordinates": [number, number]   // Lat/long for mapping
      },
      "entities": ["entity-id"],          // References to involved entities
      "sources": [
        {
          "description": "string",        // Source description
          "url": "string",                // Link to source
          "documentType": "string",       // Type of document
          "citation": "string"            // Formal citation
        }
      ],
      "documentationLink": "string",      // Link to GitHub file section
      "relatedEvents": ["event-id"],      // Related timeline events
      "era": "string",                    // Historical period
      "mediaUrls": ["string"]             // Optional images/videos
    }
  ]
}
```

### 2. Entities JSON Schema

```json
{
  "entities": [
    {
      "id": "string",                     // Unique identifier
      "name": "string",                   // Full name
      "aliases": ["string"],              // Alternative names
      "type": "person|organization|property|financial-institution",
      "subtype": "string",                // More specific classification
      "nationality": "string",            // For persons or organizations
      "description": "string",            // Brief biography/description
      "roles": ["string"],                // Roles in the timeline
      "affiliation": ["entity-id"],       // Connected organizations/people
      "significance": 1-10,               // Importance to the narrative
      "firstAppearance": "YYYY-MM-DD",    // First appearance in timeline
      "lastAppearance": "YYYY-MM-DD",     // Last appearance in timeline
      "images": ["string"],               // URLs to images
      "properties": {                     // Entity-specific properties
        "propertyValue": number,          // For properties: market value
        "position": "string",             // For persons: job title
        "foundedDate": "YYYY-MM-DD",      // For organizations
        "dissolutionDate": "YYYY-MM-DD",  // For organizations
        "location": "string"              // Physical location
      },
      "intelligenceConnections": {
        "agency": "string",               // Intelligence agency
        "relationship": "string",         // Nature of intelligence connection
        "timeframe": "string",            // Period of connection
        "source": "string"                // Source of this information
      },
      "financialData": {
        "estimatedWealth": number,        // For persons/organizations
        "knownTransactions": ["transaction-id"], // Related financial transactions
        "suspiciousActivity": "string"    // Notes on suspicious activities
      },
      "sources": [                        // Sources for entity information
        {
          "description": "string",
          "url": "string",
          "documentType": "string",
          "citation": "string"
        }
      ],
      "documentationLink": "string",      // Link to GitHub file section
      "notes": "string"                   // Additional information
    }
  ]
}
```

### 3. Relationships JSON Schema

```json
{
  "relationships": [
    {
      "id": "string",                     // Unique identifier
      "source": "entity-id",              // Source entity
      "target": "entity-id",              // Target entity
      "type": "string",                   // Relationship type
      "subtype": "string",                // More specific classification
      "description": "string",            // Description of relationship
      "strength": 1-10,                   // Relationship strength
      "startDate": "YYYY-MM-DD",          // When relationship began
      "endDate": "YYYY-MM-DD",            // When relationship ended
      "isBidirectional": boolean,         // Two-way relationship
      "relatedEvents": ["event-id"],      // Events connected to relationship
      "evidenceStrength": "confirmed|reported|alleged", // Confidence level
      "sources": [                        // Sources for relationship info
        {
          "description": "string",
          "url": "string",
          "documentType": "string",
          "citation": "string"
        }
      ],
      "documentationLink": "string",      // Link to GitHub file section
      "notes": "string"                   // Additional information
    }
  ]
}
```

### 4. Financial Transactions JSON Schema

```json
{
  "transactions": [
    {
      "id": "string",                     // Unique identifier
      "date": "YYYY-MM-DD",               // Transaction date
      "fromEntity": "entity-id",          // Source entity
      "toEntity": "entity-id",            // Destination entity
      "intermediaries": ["entity-id"],    // Intermediary entities
      "amount": number,                   // Dollar amount
      "currency": "string",               // Original currency
      "amountUSD": number,                // Converted to USD
      "type": "payment|loan|investment|property|gift",
      "subtype": "string",                // More specific classification
      "description": "string",            // Transaction description
      "purpose": "string",                // Stated purpose
      "method": "string",                 // Payment method
      "isConfirmed": boolean,             // Verified transaction
      "isRussianConnected": boolean,      // Russian/Soviet connection
      "russianConnectionType": "string",  // Nature of Russian connection
      "jurisdiction": "string",           // Legal jurisdiction
      "relatedEvents": ["event-id"],      // Related timeline events
      "evidenceStrength": "confirmed|reported|alleged", // Confidence level
      "sources": [                        // Source documentation
        {
          "description": "string",
          "url": "string",
          "documentType": "string",
          "citation": "string"
        }
      ],
      "panamaConnection": {               // Panama Papers specific info
        "isInPanamaPapers": boolean,
        "offshoreEntities": ["string"],
        "beneficiaries": ["string"],
        "jurisdictions": ["string"],
        "leakSource": "string"
      },
      "documentationLink": "string",      // Link to GitHub file section
      "notes": "string"                   // Additional information
    }
  ]
}
```

### 5. Intelligence Activities JSON Schema

```json
{
  "intelligenceActivities": [
    {
      "id": "string",                     // Unique identifier
      "date": "YYYY-MM-DD",               // Date of activity
      "startDate": "YYYY-MM-DD",          // For ongoing activities
      "endDate": "YYYY-MM-DD",            // For ongoing activities
      "agency": "string",                 // Intelligence agency
      "country": "string",                // Country of agency
      "activityType": "string",           // Type of intelligence activity
      "targets": ["entity-id"],           // Target entities
      "operators": ["entity-id"],         // Operating entities
      "description": "string",            // Detailed description
      "objectives": ["string"],           // Goals of the activity
      "outcomes": ["string"],             // Results of the activity
      "relatedEvents": ["event-id"],      // Related timeline events
      "classification": "string",         // Security classification
      "declassificationDate": "YYYY-MM-DD", // When info was declassified
      "evidenceStrength": "confirmed|reported|alleged", // Confidence level
      "sources": [                        // Source documentation
        {
          "description": "string",
          "url": "string",
          "documentType": "string",
          "citation": "string"
        }
      ],
      "documentationLink": "string",      // Link to GitHub file section
      "notes": "string"                   // Additional information
    }
  ]
}
```

### 6. Eras JSON Schema

```json
{
  "eras": [
    {
      "id": "string",                     // Unique identifier
      "name": "string",                   // Era name
      "startDate": "YYYY-MM-DD",          // Start date
      "endDate": "YYYY-MM-DD",            // End date
      "description": "string",            // Era description
      "significance": "string",           // Why this era matters
      "keyEvents": ["event-id"],          // Defining events
      "historicalContext": "string",      // Broader historical setting
      "color": "string",                  // For timeline visualization
      "documentationLink": "string"       // Link to GitHub file section
    }
  ]
}
```

## Additional Data Elements to Capture

### For Financial Analysis
- All property purchases and sales
- Known Russian/Soviet buyers of Trump properties
- Loan details, particularly from foreign banks
- Bankruptcy proceedings and financial rescues
- Offshore entity connections (Panama Papers)
- Money laundering allegations and investigations

### For Intelligence Activities
- StB (Czechoslovak) surveillance details
- KGB/FSB activities related to Trump associates
- Intelligence agency assessments and reports
- Surveillance targets and methods
- Information sharing between agencies

### For Personal/Business Connections
- Family relationships and marriages
- Business partnerships and joint ventures
- Employees with Russian/Soviet connections
- Social connections and meetings
- Travel to Russia/Soviet territories

### For Political Elements
- Statements about Russia/Soviet Union
- Political aspirations and activities
- Russian policy positions
- Electoral campaign connections
- Government appointments with Russian ties

### For Legal Matters
- Investigations and their outcomes
- Legal proceedings and judgments
- Regulatory actions
- Testimony and depositions
- Law enforcement activities

### Source Documentation
- Links to relevant chapters in your research
- Original source documents (when available)
- News articles and books referenced
- Government documents and reports
- Public records and databases

This comprehensive schema will give the LLM everything it needs to create properly structured JSON files that capture all the relevant information for your Trump-Russia timeline visualization. The schema is designed to interconnect all elements through IDs, allowing the visualization to show relationships between events, entities, transactions, and intelligence activities.