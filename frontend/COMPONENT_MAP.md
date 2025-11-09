# 🗺️ Component Map

Visual guide to the component hierarchy and relationships.

## Application Structure

```
App.jsx (Root)
│
├── Header (Layout)
│   ├── Logo
│   ├── Metrics Toggle Button
│   └── GitHub Link
│
├── Hero Section
│   ├── Sustainability Badge
│   ├── Title
│   └── Description
│
├── SustainabilityMetrics (Conditional)
│   ├── Metrics Grid
│   │   ├── Energy Saved Card
│   │   ├── CO₂ Reduced Card
│   │   ├── Efficiency Score Card
│   │   └── Compute Time Card
│   ├── Architecture Info
│   └── Model Specifications
│
├── ComplianceChecklist (Main Content)
│   ├── Statistics Overview
│   │   ├── Total Controls
│   │   ├── Compliant Count
│   │   ├── Non-Compliant Count
│   │   └── Pending Count
│   │
│   ├── Search & Filter Bar
│   │   ├── Search Input
│   │   └── Category Dropdown
│   │
│   └── Two-Column Layout
│       ├── Left: Control Cards List
│       │   └── ControlCard (Multiple)
│       │       ├── Control Name
│       │       ├── Category Badge
│       │       ├── Description
│       │       ├── Status Badge
│       │       ├── Score Display
│       │       └── Document Count
│       │
│       └── Right: Detail Panel (Sticky)
│           └── ControlDetail
│               ├── Control Header
│               ├── FileUpload Component
│               │   ├── Drop Zone
│               │   └── File List
│               │       └── File Item (Multiple)
│               │           ├── File Icon
│               │           ├── File Name
│               │           ├── File Size
│               │           └── Remove Button
│               ├── Action Buttons
│               │   ├── Verify Button
│               │   └── Reset Button
│               ├── Warning Alert (Conditional)
│               └── VerdictDisplay (Conditional)
│                   ├── Verdict Header
│                   ├── Score Display
│                   │   └── Animated Progress Bar
│                   ├── AI Explanation
│                   └── Sustainability Badge
│
├── Floating Chat Button
│   └── Notification Dot
│
└── ChatBot (Conditional)
    ├── Chat Header
    │   ├── Bot Avatar
    │   ├── Status Indicator
    │   └── Close Button
    ├── Messages Container
    │   └── Message (Multiple)
    │       ├── Avatar
    │       ├── Message Bubble
    │       └── Timestamp
    ├── Typing Indicator (Conditional)
    └── Input Area
        ├── Text Input
        ├── Send Button
        └── Model Info
```

## Component Dependencies

### App.jsx
**Imports:**
- Header
- ComplianceChecklist
- ChatBot
- SustainabilityMetrics

**State:**
- isChatOpen
- showMetrics

### ComplianceChecklist.jsx
**Imports:**
- ControlCard
- ControlDetail
- useComplianceStore (Zustand)

**State:**
- searchQuery
- filterCategory

**Store Access:**
- controls
- selectedControl
- setSelectedControl

### ControlCard.jsx
**Props:**
- control (object)
- isSelected (boolean)
- onClick (function)

**Features:**
- Status icon mapping
- Dynamic styling
- Click handler

### ControlDetail.jsx
**Imports:**
- FileUpload
- Button
- VerdictDisplay
- useComplianceStore

**Props:**
- controlId (string)

**Store Access:**
- controls
- uploadDocuments
- updateControlVerdict
- resetControl

**State:**
- isVerifying

### VerdictDisplay.jsx
**Imports:**
- framer-motion

**Props:**
- verdict (string)
- score (number)
- explanation (string)
- timestamp (string)

**Features:**
- Animated progress bar
- Color-coded display
- Sustainability badge

### FileUpload.jsx
**Props:**
- onFileSelect (function)
- accept (string)
- multiple (boolean)

**State:**
- files (array)
- isDragging (boolean)

**Features:**
- Drag and drop
- File validation
- Preview list

### ChatBot.jsx
**Imports:**
- Button
- framer-motion

**Props:**
- onClose (function)

**State:**
- messages (array)
- input (string)
- isTyping (boolean)

**Features:**
- Message history
- Auto-scroll
- Typing indicator

### SustainabilityMetrics.jsx
**Imports:**
- framer-motion

**Features:**
- Animated cards
- Metric display
- Model information

### Header.jsx
**Props:**
- onToggleMetrics (function)
- showMetrics (boolean)

**Features:**
- Sticky positioning
- Glass effect
- Action buttons

## Reusable UI Components

### Button.jsx
**Props:**
- children
- variant (primary|secondary|ghost|danger)
- size (sm|md|lg)
- disabled
- loading
- icon (component)
- onClick
- className

**Variants:**
- Primary: Eco gradient
- Secondary: Glass effect
- Ghost: Transparent
- Danger: Red background

### Card.jsx
**Props:**
- children
- className
- hover (boolean)

**Features:**
- Glass effect
- Optional hover state
- Flexible content

## State Management (Zustand)

### complianceStore.js

**State:**
```javascript
{
  controls: [
    {
      id: string,
      name: string,
      category: string,
      description: string,
      status: 'pending' | 'processing' | 'compliant' | 'non-compliant',
      score: number | null,
      verdict: string | null,
      explanation: string | null,
      documents: File[],
      timestamp: string | null
    }
  ],
  selectedControl: string | null
}
```

**Actions:**
- setSelectedControl(controlId)
- uploadDocuments(controlId, files)
- updateControlVerdict(controlId, verdict)
- resetControl(controlId)

## Data Flow

### Upload Workflow
```
User selects files
    ↓
FileUpload component
    ↓
onFileSelect callback
    ↓
ControlDetail handler
    ↓
uploadDocuments action
    ↓
Store updates control.documents
    ↓
ControlCard re-renders with file count
```

### Verification Workflow
```
User clicks "Verify"
    ↓
ControlDetail handler
    ↓
API call (simulated)
    ↓
updateControlVerdict action
    ↓
Store updates control state
    ↓
VerdictDisplay renders with animation
    ↓
ControlCard updates status badge
```

### Chat Workflow
```
User types message
    ↓
ChatBot input handler
    ↓
Add user message to state
    ↓
API call (simulated)
    ↓
Add AI response to state
    ↓
Auto-scroll to bottom
```

## Styling Architecture

### Global Styles (index.css)
- Tailwind directives
- Custom scrollbar
- Base styles
- Utility classes

### Component Styles
- Inline Tailwind classes
- Dynamic class composition
- Conditional styling
- Responsive modifiers

### Theme Configuration (tailwind.config.js)
- Custom colors (eco palette)
- Dark theme colors
- Custom animations
- Extended utilities

## File Organization

```
src/
├── components/
│   ├── chat/
│   │   └── ChatBot.jsx
│   ├── compliance/
│   │   ├── ComplianceChecklist.jsx
│   │   ├── ControlCard.jsx
│   │   ├── ControlDetail.jsx
│   │   └── VerdictDisplay.jsx
│   ├── layout/
│   │   └── Header.jsx
│   ├── metrics/
│   │   └── SustainabilityMetrics.jsx
│   └── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       └── FileUpload.jsx
├── store/
│   └── complianceStore.js
├── App.jsx
├── main.jsx
└── index.css
```

## Component Communication

### Parent → Child (Props)
- Configuration
- Data
- Callbacks
- Styling

### Child → Parent (Callbacks)
- Events
- State changes
- User actions

### Sibling → Sibling (Store)
- Shared state
- Global actions
- Cross-component data

### Global State (Zustand)
- Controls data
- Selected control
- Actions

## Performance Optimizations

### Component Level
- Conditional rendering
- Lazy loading (future)
- Memoization (future)
- Event delegation

### State Level
- Minimal re-renders
- Efficient updates
- Selective subscriptions
- Normalized data

### Rendering Level
- CSS animations (GPU)
- Virtual scrolling (future)
- Code splitting (future)
- Asset optimization

## Accessibility Features

### Keyboard Navigation
- Tab order
- Focus management
- Keyboard shortcuts
- Escape handlers

### Screen Readers
- ARIA labels
- Semantic HTML
- Status announcements
- Role attributes

### Visual
- High contrast
- Focus indicators
- Color coding
- Icon + text labels

---

This component map provides a complete overview of the application structure, making it easy to understand relationships and data flow.
