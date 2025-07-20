# Core Components

## Overview
Implement essential UI components including form elements, layout components, feedback components, and navigation elements.

## Phase
Phase 4: Component Library Expansion

## Priority
High

## Dependencies
- Unit Testing Setup
- Component Documentation

## Description
Build a comprehensive set of core components that form the foundation of most web applications, following shadcn/ui patterns and accessibility standards.

## Acceptance Criteria
- [ ] Form components (Input, Select, Checkbox, Radio, Switch) implemented
- [ ] Layout components (Grid, Stack, Container, Spacer) created
- [ ] Feedback components (Alert, Toast, Modal, Drawer) built
- [ ] Navigation components (Tabs, Breadcrumb, Pagination) developed
- [ ] Data display components (Table, Card, Badge, Avatar) completed

## Implementation Steps

### 1. Form Components Package
Create `@smilexx2/form-components`:

#### Input Component
```tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'outline' | 'filled'
  size?: 'sm' | 'md' | 'lg'
  error?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}
```

#### Select Component
- Radix UI Select primitive
- Custom styling with Tailwind
- Search functionality for large lists
- Multi-select variant

#### Checkbox & Radio
- Consistent styling with form theme
- Indeterminate state for checkbox
- Group components for radio sets

#### Switch Component
- Toggle functionality
- Size variants
- Disabled states

### 2. Layout Components Package
Create `@smilexx2/layout-components`:

#### Grid Component
```tsx
interface GridProps {
  cols?: number | 'auto' | 'fit'
  gap?: number | string
  responsive?: boolean
  children: React.ReactNode
}
```

#### Stack Component
- Horizontal and vertical layouts
- Spacing control
- Responsive breakpoints

#### Container Component
- Max-width constraints
- Responsive padding
- Centered content

### 3. Feedback Components Package
Create `@smilexx2/feedback-components`:

#### Alert Component
- Multiple variants (info, success, warning, error)
- Dismissible functionality
- Icon integration

#### Toast/Notification System
- Toast provider and hook
- Queue management
- Position configuration
- Animation support

#### Modal/Dialog
- Radix UI Dialog primitive
- Focus management
- Backdrop click handling
- Size variants

### 4. Navigation Components Package
Create `@smilexx2/navigation-components`:

#### Tabs Component
- Radix UI Tabs primitive
- Vertical and horizontal orientations
- Controlled and uncontrolled modes

#### Breadcrumb
- Separator customization
- Max items with collapse
- Link integration

#### Pagination
- Page number display
- First/last navigation
- Size configuration

### 5. Data Display Package
Create `@smilexx2/data-components`:

#### Table Component
- Sortable columns
- Selection functionality
- Pagination integration
- Loading states

#### Card Component
- Header, body, footer sections
- Interactive variants
- Image support

## Package Structure
```
packages/
├── form-components/
│   ├── src/
│   │   ├── input/
│   │   ├── select/
│   │   ├── checkbox/
│   │   ├── radio/
│   │   └── switch/
│   └── package.json
├── layout-components/
├── feedback-components/
├── navigation-components/
└── data-components/
```

## Testing Requirements
- Unit tests for all components
- Accessibility testing with axe-core
- Visual regression tests in Storybook
- Keyboard navigation testing
- Screen reader compatibility

## Documentation Requirements
- Storybook stories for all variants
- API documentation with prop tables
- Usage examples and best practices
- Migration guides from other libraries

## Resources
- [Radix UI Primitives](https://www.radix-ui.com/primitives)
- [React ARIA](https://react-spectrum.adobe.com/react-aria/)
- [WAI-ARIA Guidelines](https://www.w3.org/WAI/ARIA/apg/)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)

## Estimated Effort
8-12 weeks (can be parallelized)

## Notes
- Prioritize accessibility in all components
- Ensure consistent theming across packages
- Consider bundle size impact
- Plan for internationalization support
- Maintain backward compatibility with existing components