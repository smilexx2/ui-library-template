# Multi-Framework Support

## Overview
Extend the component library to support Vue.js and Solid.js frameworks while maintaining a shared design system and component logic.

## Phase
Future Considerations

## Priority
Low

## Dependencies
- Core Components
- Advanced Features
- Performance Optimization

## Description
Create framework adapters that allow the same component designs and behaviors to work across React, Vue, and Solid.js ecosystems, maximizing reach and adoption.

## Acceptance Criteria
- [ ] Vue.js component library created with matching API
- [ ] Solid.js component library implemented
- [ ] Shared design tokens and styling system
- [ ] Cross-framework testing strategy
- [ ] Framework-specific documentation and examples

## Implementation Approach

### 1. Architecture Strategy

#### Headless Core Pattern
```typescript
// packages/core-logic/
export interface ButtonLogic {
  variant: 'default' | 'outline' | 'destructive'
  size: 'sm' | 'md' | 'lg'
  disabled: boolean
  loading: boolean
}

export const useButtonLogic = (props: ButtonProps) => {
  // Framework-agnostic business logic
  return {
    classes: generateClasses(props),
    handlers: createHandlers(props),
    states: manageStates(props)
  }
}
```

#### Framework Adapters
```
packages/
├── core-logic/           # Shared business logic
├── design-tokens/        # Shared design system
├── react/               # React implementation
├── vue/                 # Vue implementation
└── solid/               # Solid implementation
```

### 2. Vue.js Implementation

#### Vue Component Structure
```vue
<!-- packages/vue/src/Button/Button.vue -->
<template>
  <button
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useButtonLogic } from '@smilexx2/core-logic'

interface Props {
  variant?: 'default' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const { classes, handlers } = useButtonLogic(props)

const buttonClasses = computed(() => classes.value)
const handleClick = (event: MouseEvent) => {
  handlers.onClick(event)
  emit('click', event)
}
</script>
```

#### Vue Package Configuration
```json
{
  "name": "@smilexx2/vue",
  "version": "1.0.0",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/index.umd.js",
  "module": "./dist/index.es.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js",
      "types": "./dist/index.d.ts"
    }
  },
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}
```

### 3. Solid.js Implementation

#### Solid Component Structure
```tsx
// packages/solid/src/Button/Button.tsx
import { Component, splitProps } from 'solid-js'
import { useButtonLogic } from '@smilexx2/core-logic'

export interface ButtonProps {
  variant?: 'default' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
  children?: any
}

export const Button: Component<ButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['variant', 'size', 'disabled', 'onClick', 'children'])
  
  const { classes, handlers } = useButtonLogic({
    variant: local.variant || 'default',
    size: local.size || 'md',
    disabled: local.disabled || false
  })
  
  const handleClick = (event: MouseEvent) => {
    handlers.onClick(event)
    local.onClick?.(event)
  }
  
  return (
    <button
      class={classes()}
      disabled={local.disabled}
      onClick={handleClick}
      {...others}
    >
      {local.children}
    </button>
  )
}
```

### 4. Shared Design System

#### Design Tokens Package
```typescript
// packages/design-tokens/src/index.ts
export const tokens = {
  colors: {
    primary: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    }
  },
  spacing: {
    1: '0.25rem',
    2: '0.5rem',
    4: '1rem'
  },
  typography: {
    fontSize: {
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem'
    }
  }
}

// Framework-specific exports
export const cssVariables = generateCSSVariables(tokens)
export const jsTokens = tokens
```

#### Shared Styling
```css
/* packages/design-tokens/styles/base.css */
@import url('./tokens.css');

.btn-base {
  @apply inline-flex items-center justify-center rounded-md font-medium transition-colors;
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring;
  @apply disabled:pointer-events-none disabled:opacity-50;
}

.btn-default {
  @apply bg-primary text-primary-foreground hover:bg-primary/90;
}

.btn-outline {
  @apply border border-input bg-background hover:bg-accent hover:text-accent-foreground;
}
```

### 5. Cross-Framework Testing

#### Shared Test Logic
```typescript
// packages/testing/src/button.test.ts
export const buttonTestSuite = (framework: 'react' | 'vue' | 'solid') => {
  describe(`Button (${framework})`, () => {
    test('renders with default props', () => {
      const component = renderComponent(framework, 'Button', {})
      expect(component).toHaveClass('btn-base', 'btn-default')
    })
    
    test('handles click events', () => {
      const onClick = jest.fn()
      const component = renderComponent(framework, 'Button', { onClick })
      fireEvent.click(component)
      expect(onClick).toHaveBeenCalled()
    })
  })
}
```

#### Framework Test Adapters
```typescript
// packages/testing/src/adapters/react.ts
import { render } from '@testing-library/react'
import * as ReactComponents from '@smilexx2/react'

export const renderReactComponent = (name: string, props: any) => {
  const Component = ReactComponents[name]
  return render(<Component {...props} />)
}

// packages/testing/src/adapters/vue.ts
import { mount } from '@vue/test-utils'
import * as VueComponents from '@smilexx2/vue'

export const renderVueComponent = (name: string, props: any) => {
  const Component = VueComponents[name]
  return mount(Component, { props })
}
```

### 6. Documentation Strategy

#### Framework-Specific Docs
```
docs/
├── react/
│   ├── getting-started.mdx
│   └── components/
├── vue/
│   ├── getting-started.mdx
│   └── components/
└── solid/
    ├── getting-started.mdx
    └── components/
```

#### Unified Storybook
```typescript
// .storybook/main.ts
export default {
  stories: [
    '../packages/react/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/vue/src/**/*.stories.@(js|jsx|ts|tsx)',
    '../packages/solid/src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-controls',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  }
}
```

## Challenges and Solutions

### 1. Event Handling Differences
- React: SyntheticEvent
- Vue: Native events
- Solid: Native events

**Solution**: Event adapter layer in core logic

### 2. Reactivity Systems
- React: useState, useEffect
- Vue: ref, reactive, computed
- Solid: createSignal, createEffect

**Solution**: Framework-specific hooks wrapping shared logic

### 3. Component Composition
- React: Children props
- Vue: Slots
- Solid: Children props

**Solution**: Adapter patterns for each framework

## Migration Path

### Phase 1: Proof of Concept
- Implement Button component in all three frameworks
- Establish build pipeline
- Create basic documentation

### Phase 2: Core Components
- Port essential components (Input, Select, etc.)
- Implement shared testing infrastructure
- Set up CI/CD for all packages

### Phase 3: Advanced Features
- Complex components (Modal, DataTable)
- Animation systems
- Theme integration

### Phase 4: Ecosystem Integration
- Framework-specific tooling
- IDE support
- Community packages

## Resources
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [Solid.js Documentation](https://www.solidjs.com/docs/latest)
- [Headless UI Architecture](https://headlessui.com/)
- [Design Token Standards](https://design-tokens.github.io/community-group/format/)

## Estimated Effort
6-12 months

## Notes
- Consider market demand before full implementation
- Start with most requested framework (likely Vue)
- Maintain API consistency across frameworks
- Plan for long-term maintenance overhead
- Consider community contributions for additional frameworks