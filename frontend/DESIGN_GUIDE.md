# Design Guide - Compliance Buddy

## 🎨 Design System

### Color Palette

#### Primary Colors (Eco Green)
```css
eco-50:  #f0fdf4  /* Lightest green */
eco-100: #dcfce7
eco-200: #bbf7d0
eco-300: #86efac
eco-400: #4ade80  /* Primary accent */
eco-500: #22c55e  /* Brand color */
eco-600: #16a34a  /* Primary hover */
eco-700: #15803d
eco-800: #166534
eco-900: #14532d
eco-950: #052e16  /* Darkest green */
```

#### Dark Theme Colors
```css
dark-bg:       #0a0f0d  /* Main background */
dark-surface:  #111816  /* Card background */
dark-elevated: #1a221f  /* Hover states */
dark-border:   #2d3935  /* Borders */
dark-text:     #e8f5e9  /* Primary text */
dark-muted:    #8fa89a  /* Secondary text */
```

#### Semantic Colors
```css
Success: eco-400 (#4ade80)
Warning: yellow-400 (#facc15)
Error:   red-400 (#f87171)
Info:    blue-400 (#60a5fa)
```

### Typography

#### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
             'Helvetica Neue', sans-serif;
```

#### Font Sizes
- **xs**: 0.75rem (12px)
- **sm**: 0.875rem (14px)
- **base**: 1rem (16px)
- **lg**: 1.125rem (18px)
- **xl**: 1.25rem (20px)
- **2xl**: 1.5rem (24px)
- **3xl**: 1.875rem (30px)
- **4xl**: 2.25rem (36px)
- **5xl**: 3rem (48px)

### Spacing

Uses Tailwind's default spacing scale (0.25rem increments):
- **1**: 0.25rem (4px)
- **2**: 0.5rem (8px)
- **3**: 0.75rem (12px)
- **4**: 1rem (16px)
- **6**: 1.5rem (24px)
- **8**: 2rem (32px)
- **12**: 3rem (48px)

### Border Radius
- **rounded**: 0.25rem (4px)
- **rounded-lg**: 0.5rem (8px)
- **rounded-xl**: 0.75rem (12px)
- **rounded-2xl**: 1rem (16px)
- **rounded-full**: 9999px (circle)

## 🧩 Component Patterns

### Glass Effect
```jsx
<div className="glass-effect">
  {/* Content */}
</div>
```
Creates a frosted glass appearance with:
- Semi-transparent background
- Backdrop blur
- Subtle border

### Eco Gradient
```jsx
<div className="eco-gradient">
  {/* Content */}
</div>
```
Applies the signature green gradient:
- From: eco-600
- To: eco-800

### Status Badge
```jsx
<span className="status-badge bg-eco-400/10 text-eco-400">
  <Icon className="w-4 h-4" />
  <span>Label</span>
</span>
```

## 🎭 Component Library

### Button Variants

#### Primary
```jsx
<Button variant="primary">
  Primary Action
</Button>
```
- Eco gradient background
- White text
- Shadow on hover

#### Secondary
```jsx
<Button variant="secondary">
  Secondary Action
</Button>
```
- Glass effect background
- Dark text
- Elevated on hover

#### Ghost
```jsx
<Button variant="ghost">
  Subtle Action
</Button>
```
- Transparent background
- Muted text
- Elevated on hover

#### Danger
```jsx
<Button variant="danger">
  Delete
</Button>
```
- Red background
- White text
- Darker red on hover

### Button Sizes
- **sm**: Compact (px-3 py-1.5)
- **md**: Default (px-4 py-2)
- **lg**: Large (px-6 py-3)

### Card Component
```jsx
<Card hover>
  {/* Content */}
</Card>
```
- Glass effect background
- Rounded corners (xl)
- Optional hover effect

### File Upload
```jsx
<FileUpload 
  onFileSelect={handleFiles}
  accept=".pdf,.docx"
  multiple
/>
```
Features:
- Drag and drop
- Click to browse
- File list with preview
- Remove functionality

## 🎬 Animations

### Fade In
```jsx
<div className="animate-fade-in">
  {/* Content */}
</div>
```
Duration: 0.3s

### Slide Up
```jsx
<div className="animate-slide-up">
  {/* Content */}
</div>
```
Duration: 0.3s

### Pulse Slow
```jsx
<div className="animate-pulse-slow">
  {/* Content */}
</div>
```
Duration: 3s (infinite)

### Framer Motion Patterns

#### Fade In
```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* Content */}
</motion.div>
```

#### Stagger Children
```jsx
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## 📱 Responsive Design

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile-First Approach
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Responsive grid */}
</div>
```

### Container
```jsx
<div className="container mx-auto px-4 max-w-7xl">
  {/* Centered content with max width */}
</div>
```

## ♿ Accessibility

### Focus States
All interactive elements have visible focus states:
```css
focus:outline-none focus:ring-2 focus:ring-eco-600
```

### ARIA Labels
```jsx
<button aria-label="Close dialog">
  <X className="w-5 h-5" />
</button>
```

### Keyboard Navigation
- Tab through interactive elements
- Enter/Space to activate
- Escape to close modals

### Screen Reader Support
- Semantic HTML elements
- Descriptive labels
- Status announcements

## 🎯 Best Practices

### Component Structure
```jsx
export default function ComponentName({ 
  prop1, 
  prop2 = 'default',
  ...props 
}) {
  // State
  const [state, setState] = useState(initialValue)
  
  // Effects
  useEffect(() => {
    // Side effects
  }, [dependencies])
  
  // Handlers
  const handleAction = () => {
    // Logic
  }
  
  // Render
  return (
    <div className="component-wrapper" {...props}>
      {/* Content */}
    </div>
  )
}
```

### State Management
```jsx
// Zustand store pattern
const useStore = create((set) => ({
  // State
  items: [],
  
  // Actions
  addItem: (item) => set((state) => ({
    items: [...state.items, item]
  })),
  
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
}))
```

### Performance
1. **Memoization**: Use `useMemo` and `useCallback` for expensive operations
2. **Lazy Loading**: Import components dynamically
3. **Code Splitting**: Separate route bundles
4. **Image Optimization**: Use appropriate formats and sizes

### Sustainability
1. **Dark Mode**: Default to reduce energy consumption
2. **Minimal Animations**: Respect `prefers-reduced-motion`
3. **Efficient Rendering**: Avoid unnecessary re-renders
4. **Optimized Assets**: Compress images and fonts

## 🎨 Design Tokens

### Shadows
```css
shadow-sm:  0 1px 2px 0 rgb(0 0 0 / 0.05)
shadow:     0 1px 3px 0 rgb(0 0 0 / 0.1)
shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1)
shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1)
shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25)
```

### Transitions
```css
transition-all duration-200  /* Fast */
transition-all duration-300  /* Default */
transition-all duration-500  /* Slow */
```

### Z-Index Layers
```css
z-0:  0    /* Base */
z-10: 10   /* Dropdowns */
z-20: 20   /* Sticky headers */
z-30: 30   /* Modals */
z-40: 40   /* Tooltips */
z-50: 50   /* Toasts */
```

## 📐 Layout Patterns

### Centered Content
```jsx
<div className="min-h-screen flex items-center justify-center">
  {/* Centered content */}
</div>
```

### Sticky Header
```jsx
<header className="sticky top-0 z-40">
  {/* Header content */}
</header>
```

### Two-Column Layout
```jsx
<div className="grid lg:grid-cols-2 gap-6">
  <div>{/* Left column */}</div>
  <div className="lg:sticky lg:top-24 h-fit">
    {/* Right column (sticky) */}
  </div>
</div>
```

### Card Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map(item => (
    <Card key={item.id}>{/* Card content */}</Card>
  ))}
</div>
```

## 🎪 Interactive States

### Hover
```css
hover:bg-dark-elevated
hover:shadow-lg
hover:scale-105
```

### Active
```css
active:scale-95
active:brightness-90
```

### Disabled
```css
disabled:opacity-50
disabled:cursor-not-allowed
```

### Loading
```jsx
<div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
```

---

This design guide ensures consistency across the application while maintaining the sustainable AI theme. All components are optimized for performance, accessibility, and environmental impact.
