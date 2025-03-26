# Deprecated Components

The files in this directory were moved here on March 26, 2025 to resolve component duplication issues.

## Original Location

These components were originally located in:
- `src/js/components/`

They were duplicates of the more complete implementations in:
- `src/components/`

## Why Deprecated

The files were deprecated because:
1. These were earlier implementations that don't align with the current project architecture
2. According to the original project plan, visualization components should be in `src/components/`
3. The implementations in `src/components/` are more complete, better documented, and currently in use
4. `src/components/moneyCounter.js` incorporates the piggy bank functionality that was originally planned
5. Having duplicate components with different naming conventions caused confusion and import issues

## Files Included

- `money-counter.js`: Alternative D3.js implementation with hyphenated naming convention (vs. camelCase)
- `network.js`: D3.js force simulation implementation (vs. Cytoscape.js in the main implementation)
- `timeline.js`: Earlier implementation of the timeline visualization

## Relationship to Original Plan

The original project plan specified components in the `src/components/` directory:
```
src/
├── components/               # Reusable JS components
│   ├── timeline.js
│   ├── network.js
│   ├── moneyCounter.js
│   └── piggyBank.js
```

The current implementation combines the moneyCounter.js and piggyBank.js functionality into a single component.

## Note for Developers

If you need to reference these earlier implementations, they are kept here for historical reference.
However, for all new development, use the components in `src/components/` instead.
