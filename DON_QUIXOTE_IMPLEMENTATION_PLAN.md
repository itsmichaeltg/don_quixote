# Implementation Plan: "The Tilt of Reality" - Don Quixote Interactive Website

## Project Overview

An interactive educational website exploring Cervantes's Don Quixote through dual perspectives: "Imperial Reality" (historical truth) vs "Chivalric Illusion" (romantic idealism). The site toggles between these worldviews to mirror Quixote's cognitive dissonance.

## Architecture Summary

### Core Technologies

- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS v4 with custom theme tokens
- **Animations**: Motion (from `motion` package) for transitions, potentially D3.js for map visualizations
- **State Management**: React Context for global "Truth/Dare" mode
- **Routing**: react-router for navigation between Sally journeys
- **UI Components**: Existing Radix UI components from project

### Application Structure

```
src/
├── app/
│   ├── App.tsx (main entry, mode toggle, router)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── ModeToggle.tsx (Truth | Dare switch)
│   │   │   ├── Navigation.tsx (Wandering Path)
│   │   │   └── Layout.tsx (main layout wrapper)
│   │   ├── modules/
│   │   │   ├── GeopoliticalMap.tsx
│   │   │   ├── LibraryOfMadness.tsx
│   │   │   ├── DialecticSlider.tsx
│   │   │   ├── TimelineModule.tsx
│   │   │   ├── CharacterNetwork.tsx
│   │   │   ├── JourneyVisualizer.tsx
│   │   │   └── QuoteExplorer.tsx
│   │   ├── interactive/
│   │   │   ├── BookshelfItem.tsx
│   │   │   ├── MapRegion.tsx
│   │   │   ├── SplitView.tsx
│   │   │   └── SanityCheckCard.tsx
│   │   └── ui/ (existing shadcn components)
│   └── context/
│       └── ViewModeContext.tsx (Truth/Dare state)
├── data/
│   ├── historical_context.json
│   ├── literary_analysis.json
│   ├── timeline_events.json
│   ├── characters.json
│   ├── journey_locations.json
│   ├── chivalric_books.json
│   └── quotes.json
└── styles/
    ├── theme.css (update with Don Quixote palette)
    └── fonts.css (add Caslon/Garamond + modern sans)
```

## Implementation Phases

### Phase 1: Foundation & State Management (Tasks 1-3)

**Task 1: Install Required Dependencies**

- Install `d3` and `@types/d3` for map visualizations
- Verify `motion`, `react-router`, and `recharts` are available
- All other needed packages already present

**Task 2: Create Custom Theme Tokens**
Update `src/styles/theme.css` with dual-mode color palettes:

**Truth Mode (Imperial Reality):**

- `--imperial-gold`: #C9A961 (Hapsburg gold)
- `--blood-red`: #8B1A1A (war/inquisition)
- `--dusty-ochre`: #B8956A (La Mancha plains)
- `--parchment`: #E8DCC4 (aged paper)
- `--woodcut-black`: #1A1614 (woodcut aesthetic)
- `--stone-gray`: #6B6B6B (austere tone)

**Dare Mode (Chivalric Illusion):**

- `--knight-azure`: #2E5C8A (heraldic blue)
- `--romance-rose`: #D94A6F (idealism)
- `--emerald-quest`: #3A7D5C (adventure)
- `--golden-dream`: #F4D03F (glory)
- `--celestial-white`: #F0EDE5 (purity)
- `--enchantment-purple`: #7B4B94 (magic/surreal)

Add CSS custom properties for typography (Garamond-like serif + modern sans-serif system stack).

**Task 3: Create ViewMode Context**
Create `src/app/context/ViewModeContext.tsx`:

- State: `mode: 'truth' | 'dare'`
- `toggleMode()` function
- Provider component wrapping entire app
- Custom hook `useViewMode()`
- Persists to localStorage for session continuity

### Phase 2: Core Layout & Navigation (Tasks 4-6)

**Task 4: Build ModeToggle Component**
Create `src/app/components/layout/ModeToggle.tsx`:

- Persistent toggle switch UI (top-right or center-top)
- Label: "Truth | Dare"
- Uses Radix Switch component
- Triggers smooth theme transition with Motion
- Visual indicator: woodcut icon for Truth, knight icon for Dare (lucide-react: Shield, BookOpen)

**Task 5: Create Main Layout**
Create `src/app/components/layout/Layout.tsx`:

- Responsive container
- Background shifts based on mode (gritty texture for Truth, vibrant gradient for Dare)
- Integrates ModeToggle
- Handles theme className application

**Task 6: Implement Navigation (Wandering Path)**
Create `src/app/components/layout/Navigation.tsx`:

- Horizontal or vertical path showing three "Sally" stages
- Sally I, Sally II, Sally III (Quixote's three journeys)
- Uses react-router for routing
- Visual: connected dots/nodes, styled differently per mode
- Active state indicates current section

### Phase 3: Data Structure (Tasks 7-13)

**Task 7: Create Historical Context Data**
File: `src/data/historical_context.json`

```json
{
  "regions": [
    {
      "id": "seville",
      "name": "Seville",
      "coordinates": [37.3891, -5.9845],
      "truthNarrative": "The influx of American gold created massive inflation...",
      "dareNarrative": "Port of dreams where fortunes are made...",
      "upheaval": "Economic paradox: gold influx vs mass poverty"
    },
    // Lepanto, Low Countries, etc.
  ]
}
```

**Task 8: Create Literary Analysis Data**
File: `src/data/literary_analysis.json`

```json
{
  "themes": [
    {
      "id": "sanity-madness",
      "truthView": "Quixote's delusion as mental illness in economic collapse",
      "dareView": "Madness as radical critique of corrupt reality",
      "quotes": ["quote_id_1", "quote_id_2"]
    }
    // truth-falsehood, history-fiction, objective-subjective
  ]
}
```

**Task 9: Create Timeline Events Data**
File: `src/data/timeline_events.json`

- Events from 1550-1650
- Discovery of Americas, Reformation, Hapsburg milestones, publication dates
- Each event has `truthDescription` and `dareDescription`

**Task 10: Create Characters Data**
File: `src/data/characters.json`

- Don Quixote, Sancho Panza, Dulcinea, etc.
- Each with `realityRole` and `illusionRole`
- Connections/relationships mapped

**Task 11: Create Journey Locations Data**
File: `src/data/journey_locations.json`

- Key episodes from the three Sallys
- Windmill scene, Golden Age speech, Cave of Montesinos, etc.
- Each with GPS-ish coordinates, episode summary, dual-perspective analysis

**Task 12: Create Chivalric Books Data**
File: `src/data/chivalric_books.json`

```json
{
  "books": [
    {
      "id": "amadis",
      "title": "Amadís de Gaula",
      "coverImage": "url_or_placeholder",
      "literaryInfluence": "Established chivalric romance tropes...",
      "realWorldConsequence": "Decline of feudal knightly class rendered these ideals obsolete"
    }
  ]
}
```

**Task 13: Create Quotes Data**
File: `src/data/quotes.json`

- Key quotes from Don Quixote
- Tagged by theme, character, Sally
- Context and interpretation in both modes

### Phase 4: Interactive Modules (Tasks 14-20)

**Task 14: Build Geopolitical Map Module**
Component: `src/app/components/modules/GeopoliticalMap.tsx`

- Interactive SVG or Canvas-based map of 16th-century Hapsburg Empire
- Uses D3.js for geographic projection (or simplified custom SVG)
- Clickable/hoverable regions (Seville, Lepanto, Low Countries, etc.)
- On hover/click: reveal card with upheaval details
- Card content switches based on Truth/Dare mode
- Visual style: muted/academic for Truth, vibrant/illustrated for Dare

**Task 15: Build Library of Madness Module**
Component: `src/app/components/modules/LibraryOfMadness.tsx`

- 3D CSS bookshelf or isometric grid of books
- Each book clickable
- Click triggers "Sanity Check" split-screen modal:
  - Left: Literary influence (e.g., Amadís de Gaul tropes)
  - Right: Real-world consequence (feudal decline)
- Books rendered from `chivalric_books.json`
- Animation: book tilts out on hover (Motion library)

**Task 16: Build Dialectic Slider Module**
Component: `src/app/components/modules/DialecticSlider.tsx`

- Split-screen interface with draggable divider
- Left side: "Objective Reality" (e.g., Hapsburg decline data, economic charts)
- Right side: "Individual Experience" (Quixote's perspective, quotes)
- Uses Recharts for economic data visualization on left side
- Slider controls balance between perspectives
- Content drawn from `literary_analysis.json`

**Task 17: Build Timeline Module**
Component: `src/app/components/modules/TimelineModule.tsx`

- Horizontal scrollable timeline (1550-1650)
- Events from `timeline_events.json`
- Clickable events reveal detailed card
- Card content adapts to Truth/Dare mode
- Visual markers for different event types (war, publication, reform, discovery)
- Uses Motion for smooth scroll and card animations

**Task 18: Build Character Network Module**
Component: `src/app/components/modules/CharacterNetwork.tsx`

- Visual network graph of characters
- Don Quixote at center, connections radiating
- Uses D3.js force-directed graph or custom React implementation
- Click character node: shows bio card with dual-perspective
- Connections labeled with relationship type
- Data from `characters.json`

**Task 19: Build Journey Visualizer Module**
Component: `src/app/components/modules/JourneyVisualizer.tsx`

- Map of La Mancha region showing Don Quixote's routes
- Three color-coded paths for three Sallys
- Interactive pins at key episode locations
- Click pin: modal with episode summary, Truth/Dare analysis, related quote
- Data from `journey_locations.json`
- Simplified map (SVG) or Leaflet.js integration

**Task 20: Build Quote Explorer Module**
Component: `src/app/components/modules/QuoteExplorer.tsx`

- Filterable quote cards (by theme, character, Sally)
- Each quote has hoverable/clickable annotation
- Annotation connects quote to historical context, theme, or character
- Mode affects visual presentation and annotation emphasis
- Uses `quotes.json`

### Phase 5: Supporting Components (Tasks 21-23)

**Task 21: Create SplitView Component**
Component: `src/app/components/interactive/SplitView.tsx`

- Reusable split-screen component with draggable divider
- Props: `leftContent`, `rightContent`, `initialSplit`
- Used by DialecticSlider and potentially other modules
- Smooth drag interaction with Motion

**Task 22: Create SanityCheckCard Component**
Component: `src/app/components/interactive/SanityCheckCard.tsx`

- Modal/card displaying "Sanity Check" split content
- Props: `literaryInfluence`, `realWorldConsequence`, `bookTitle`
- Styled as dialog/modal using existing Radix Dialog component
- Visual design shifts with mode

**Task 23: Create MapRegion Component**
Component: `src/app/components/interactive/MapRegion.tsx`

- Individual hoverable/clickable region on geopolitical map
- Props: `regionData`, `onHover`, `onClick`
- Renders SVG path or shape
- Tooltip on hover showing region name
- Highlights on interaction

### Phase 6: Main App Integration & Routing (Tasks 24-25)

**Task 24: Set Up React Router**
Update `src/app/App.tsx`:

- Install react-router-dom routes
- Routes for:
  - `/` - Landing page with hero section
  - `/sally-1` - First journey content
  - `/sally-2` - Second journey content
  - `/sally-3` - Third journey content
  - `/map` - Geopolitical Map module
  - `/library` - Library of Madness module
  - `/dialectic` - Dialectic Slider module
  - `/timeline` - Timeline module
  - `/characters` - Character Network module
  - `/journey` - Journey Visualizer module
  - `/quotes` - Quote Explorer module
  - `/revolutionary` - Concluding thesis section
- All routes wrapped in ViewModeContext provider

**Task 25: Build Landing Page**
Component: `src/app/components/pages/LandingPage.tsx` or integrate into App.tsx:

- Hero section with striking title animation
- "Truth or Dare: Don Quixote in an Age of Empire"
- Windmill imagery (use Unsplash MCP tool for period imagery)
- Brief introduction to dual-lens concept
- Call-to-action buttons to enter Truth or Dare mode
- Navigation cards to main modules
- Background animation shifts based on current mode

### Phase 7: Advanced Features & Polish (Tasks 26-29)

**Task 26: Add Mode Transition Animations**

- Create smooth cross-fade between Truth/Dare aesthetics
- Background color/texture transitions
- Typography weight/style shifts
- Icon morphing or swap animations
- Use Motion layout animations and AnimatePresence

**Task 27: Create Revolutionary Ideas Section**
Component: `src/app/components/modules/RevolutionaryIdeas.tsx`:

- Gallery of cards exploring "What's modern/revolutionary about Cervantes?"
- Topics: early novel form, unreliable narrator, metafiction, social critique
- Each card has dual-mode content showing how it applies
- Interactive voting mechanism: "Is Quixote's madness political protest?"
- Results visualization with Recharts

**Task 28: Add Discussion Prompts Section**
Component: `src/app/components/modules/DiscussionPrompts.tsx`:

- Curated thought-provoking questions for class engagement
- Categorized by theme
- Shareable/printable format
- Option to expand for "Teaching Notes"

**Task 29: Responsive Design & Accessibility**

- Ensure all modules work on mobile/tablet
- Touch-friendly interactions for map, bookshelf, slider
- Keyboard navigation support
- ARIA labels for interactive elements
- Color contrast verification for both modes
- Skip links for navigation

### Phase 8: Content Population & Final Polish (Tasks 30-31)

**Task 30: Populate All Data Files**

- Fill historical_context.json with accurate historical details
- Compile quotes from Don Quixote text
- Research and document chivalric books
- Create timeline with key dates and events
- Write dual-perspective narratives for all content
- Fact-check all historical claims

**Task 31: Final Integration & Testing**

- Test all interactive modules in both modes
- Verify smooth mode transitions
- Check routing and navigation flow
- Test responsive behavior on various screen sizes
- Cross-browser testing
- Performance optimization (lazy loading for heavy components)
- Add loading states for data-heavy modules

## Technical Considerations

### Performance

- Lazy load modules with React.lazy() and Suspense
- Optimize D3.js rendering for large datasets
- Use CSS transforms for smooth animations
- Implement virtual scrolling for timeline if needed
- Image optimization for historical imagery

### Data Management

- All data in JSON files for easy content updates
- Consider React Query or SWR for data fetching if files get large
- Centralized data loading utility
- Type definitions for all data structures (TypeScript interfaces)

### Accessibility

- Semantic HTML throughout
- Proper heading hierarchy
- Alt text for all images
- Focus management for modals
- Screen reader friendly content
- Reduced motion preference detection

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge latest versions)
- Graceful degradation for older browsers
- Feature detection for advanced animations

## Success Metrics

1. Both Truth and Dare modes fully functional with distinct aesthetics
2. All eight interactive modules working smoothly
3. Responsive on desktop, tablet, and mobile
4. Smooth transitions and animations without performance issues
5. All data files populated with accurate, educational content
6. Site effectively conveys course themes: sanity/madness, truth/falsehood, history/fiction

## Risks & Mitigations

- **Risk**: D3.js complexity for maps
  - **Mitigation**: Start with simplified SVG maps, enhance if time permits
- **Risk**: Data population time-consuming
  - **Mitigation**: Start with placeholder data, iteratively refine
- **Risk**: Animation performance on mobile
  - **Mitigation**: Reduce motion based on device detection, use CSS transforms
- **Risk**: Scope creep
  - **Mitigation**: Prioritize core modules (Map, Library, Dialectic) first, others as time allows

## Estimated Task Distribution

- **Phase 1-2 (Foundation)**: 6 tasks - core setup
- **Phase 3 (Data)**: 7 tasks - data structure creation
- **Phase 4 (Modules)**: 7 tasks - interactive module development (most complex)
- **Phase 5 (Components)**: 3 tasks - supporting components
- **Phase 6 (Integration)**: 2 tasks - routing and landing page
- **Phase 7 (Polish)**: 4 tasks - advanced features
- **Phase 8 (Content)**: 2 tasks - final content and testing

**Total: 31 discrete tasks**

## Next Steps

Upon approval, begin with Phase 1 (Foundation & State Management) to establish the dual-mode architecture, then proceed sequentially through phases, with flexibility to parallelize module development in Phase 4.