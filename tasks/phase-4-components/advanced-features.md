# Advanced Features

## Overview
Implement advanced component features including composition patterns, animations, responsive utilities, and enhanced theming system.

## Phase
Phase 4: Component Library Expansion

## Priority
Medium

## Dependencies
- Core Components

## Description
Enhance the component library with advanced features that provide superior developer experience and user interactions.

## Acceptance Criteria
- [ ] Component composition patterns implemented
- [ ] Animation variants with Framer Motion integrated
- [ ] Responsive design utilities created
- [ ] Enhanced theme customization system built
- [ ] Dark mode enhancements completed

## Implementation Steps

### 1. Component Composition Patterns
Create `@smilexx2/composition`:

#### Compound Components
```tsx
// Example: Card with compound pattern
<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
  <Card.Footer>
    <Card.Actions>
      <Button>Action</Button>
    </Card.Actions>
  </Card.Footer>
</Card>
```

#### Render Props Pattern
```tsx
interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: Error | null) => React.ReactNode
}
```

#### Polymorphic Components
```tsx
interface PolymorphicProps<C extends React.ElementType> {
  as?: C
  children: React.ReactNode
}
```

### 2. Animation System
Create `@smilexx2/animations`:

#### Framer Motion Integration
```bash
yarn add framer-motion
```

#### Animation Variants
- Fade in/out
- Slide transitions
- Scale animations
- Stagger effects
- Page transitions

#### Motion Components
```tsx
interface MotionBoxProps extends MotionProps {
  children: React.ReactNode
  className?: string
}

const MotionBox = motion.div
```

#### Animation Utilities
- Preset animation configs
- Easing functions
- Duration constants
- Accessibility respect (prefers-reduced-motion)

### 3. Responsive Design Utilities
Create `@smilexx2/responsive`:

#### Responsive Props
```tsx
interface ResponsiveProps {
  sm?: any
  md?: any
  lg?: any
  xl?: any
}
```

#### Breakpoint Hook
```tsx
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('sm')
  // Implementation
  return breakpoint
}
```

#### Container Queries Support
- Modern CSS container queries
- Fallback for older browsers
- TypeScript utilities

### 4. Enhanced Theme System
Create `@smilexx2/theming`:

#### Theme Provider
```tsx
interface ThemeConfig {
  colors: ColorPalette
  typography: TypographyScale
  spacing: SpacingScale
  radius: RadiusScale
  shadows: ShadowScale
}
```

#### CSS-in-JS Integration
- Stitches or vanilla-extract
- Runtime theme switching
- Type-safe theme tokens

#### Design Token System
```tsx
const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      100: '#dbeafe',
      // ... full scale
      950: '#1e3a8a'
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    // ... full scale
  }
}
```

### 5. Dark Mode Enhancements
Extend existing dark mode with:

#### Advanced Color Schemes
- System preference detection
- Multiple theme variants
- High contrast mode
- Custom color scheme creation

#### Theme Persistence
- localStorage integration
- SSR-safe hydration
- Theme flash prevention

#### Component Adaptations
- Dark mode optimized components
- Contrast ratio validation
- Accessibility compliance

## Advanced Patterns Implementation

### 1. Headless Components
```tsx
// Headless Select implementation
const useSelect = <T,>(options: SelectOptions<T>) => {
  // Logic only, no UI
  return {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps
  }
}
```

### 2. Slot-based Architecture
```tsx
interface SlotProps {
  children?: React.ReactNode
  asChild?: boolean
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(...)
```

### 3. Controlled/Uncontrolled Pattern
```tsx
const useControllableState = <T,>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
) => {
  // Implementation
}
```

## Package Organization
```
packages/
├── composition/
│   ├── src/
│   │   ├── compound/
│   │   ├── polymorphic/
│   │   └── render-props/
│   └── package.json
├── animations/
├── responsive/
└── theming/
```

## Testing Strategy
- Animation testing with @testing-library/user-event
- Theme switching tests
- Responsive behavior testing
- Performance testing for animations
- Accessibility testing with motion preferences

## Performance Considerations
- Lazy loading for animation components
- Tree-shaking for unused utilities
- Bundle size optimization
- Runtime performance monitoring

## Resources
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Compound Component Pattern](https://kentcdodds.com/blog/compound-components-with-react-hooks)
- [Headless UI Patterns](https://headlessui.com/)
- [Modern CSS Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)

## Estimated Effort
6-8 weeks

## Notes
- Consider progressive enhancement
- Maintain backward compatibility
- Document performance implications
- Provide migration paths for existing components
- Test thoroughly across different devices and browsers