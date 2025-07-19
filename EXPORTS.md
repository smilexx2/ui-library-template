# Package Exports Reference

This document provides a comprehensive reference for all available exports from each package in the monorepo.

## Package Overview

| Package | Purpose | Main Exports |
|---------|---------|--------------|
| `@smilexx2/ui-core` | Utility functions and helpers | `cn` utility function |
| `@smilexx2/ui` | shadcn/ui style components | `Button`, `buttonVariants` + styles |
| `@smilexx2/custom-button` | Enhanced button component | `CustomButton` + styles |

## @smilexx2/ui-core

Core utilities package providing essential helper functions.

### Available Exports

```typescript
// Main export
import { cn } from '@smilexx2/ui-core'

// Subpath export (for tree-shaking)
import { cn } from '@smilexx2/ui-core/utils'

// CommonJS
const { cn } = require('@smilexx2/ui-core')
const { cn } = require('@smilexx2/ui-core/utils')
```

### Package.json Exports
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    },
    "./utils": {
      "types": "./dist/lib/utils.d.ts",
      "import": "./dist/lib/utils.js",
      "require": "./dist/lib/utils.cjs",
      "default": "./dist/lib/utils.js"
    },
    "./package.json": "./package.json"
  }
}
```

## @smilexx2/ui

shadcn/ui compatible components with consistent styling patterns.

### Available Exports

```typescript
// Main export - all components
import { Button, buttonVariants } from '@smilexx2/ui'
import type { ButtonProps } from '@smilexx2/ui'

// Subpath export - individual components (tree-shaking)
import { Button, buttonVariants } from '@smilexx2/ui/button'
import type { ButtonProps } from '@smilexx2/ui/button'

// CSS styles
import '@smilexx2/ui/styles.css'

// CommonJS
const { Button, buttonVariants } = require('@smilexx2/ui')
const { Button } = require('@smilexx2/ui/button')
```

### Package.json Exports
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    },
    "./button": {
      "types": "./dist/components/ui/button.d.ts",
      "import": "./dist/components/ui/button.js",
      "require": "./dist/components/ui/button.cjs",
      "default": "./dist/components/ui/button.js"
    },
    "./styles.css": {
      "import": "./dist/index.css",
      "require": "./dist/index.css",
      "default": "./dist/index.css"
    },
    "./package.json": "./package.json"
  }
}
```

## @smilexx2/custom-button

Enhanced button component with additional features and animations.

### Available Exports

```typescript
// Main export
import { CustomButton } from '@smilexx2/custom-button'

// Direct component import (tree-shaking)
import { CustomButton } from '@smilexx2/custom-button/custom-button'

// CSS styles
import '@smilexx2/custom-button/styles.css'

// CommonJS
const { CustomButton } = require('@smilexx2/custom-button')
const { CustomButton } = require('@smilexx2/custom-button/custom-button')
```

### Package.json Exports
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    },
    "./custom-button": {
      "types": "./dist/components/custom-button.d.ts",
      "import": "./dist/components/custom-button.js",
      "require": "./dist/components/custom-button.cjs",
      "default": "./dist/components/custom-button.js"
    },
    "./styles.css": {
      "import": "./dist/styles/index.css",
      "require": "./dist/styles/index.css",
      "default": "./dist/styles/index.css"
    },
    "./package.json": "./package.json"
  }
}
```

## Tree-Shaking Benefits

All packages are configured for optimal tree-shaking:

### ✅ Recommended (Tree-shakeable)
```typescript
// Import only what you need
import { cn } from '@smilexx2/ui-core/utils'
import { Button } from '@smilexx2/ui/button'
import { CustomButton } from '@smilexx2/custom-button/custom-button'
```

### ⚠️ Less Optimal (Still works)
```typescript
// Imports everything from the package
import { cn } from '@smilexx2/ui-core'
import { Button, buttonVariants } from '@smilexx2/ui'
import { CustomButton } from '@smilexx2/custom-button'
```

## CSS Imports

Each package provides its own CSS that can be imported separately:

```typescript
// Import all styles (recommended for most use cases)
import '@smilexx2/ui/styles.css'
import '@smilexx2/custom-button/styles.css'

// Or in your CSS file
@import '@smilexx2/ui/styles.css';
@import '@smilexx2/custom-button/styles.css';
```

### CSS Contents

- **@smilexx2/ui/styles.css**: Tailwind CSS v4 base styles, design tokens, and component styles
- **@smilexx2/custom-button/styles.css**: Additional styles for custom button animations and variants

## Module Resolution

All packages support modern module resolution with proper condition exports:

- **ESM**: Uses `.js` files for modern bundlers and Node.js ESM
- **CommonJS**: Uses `.cjs` files for legacy Node.js and bundlers
- **TypeScript**: Provides `.d.ts` declaration files for full type safety
- **CSS**: Separate CSS files that can be imported or linked

## Usage Examples

### Complete Integration Example

```typescript
// app.tsx
import React from 'react'
import { cn } from '@smilexx2/ui-core'
import { Button, buttonVariants } from '@smilexx2/ui'
import { CustomButton } from '@smilexx2/custom-button'

// Import styles
import '@smilexx2/ui/styles.css'
import '@smilexx2/custom-button/styles.css'

export function App() {
  return (
    <div className={cn('space-y-4 p-8')}>
      {/* Standard shadcn/ui style button */}
      <Button variant="default">Standard Button</Button>
      
      {/* Using buttonVariants utility */}
      <button className={buttonVariants({ variant: 'outline', size: 'sm' })}>
        Custom Styled Button
      </button>
      
      {/* Enhanced custom button */}
      <CustomButton variant="default" size="default">
        Enhanced Button
      </CustomButton>
    </div>
  )
}
```

### Tree-Shaking Optimized Example

```typescript
// For maximum tree-shaking, import from subpaths
import { cn } from '@smilexx2/ui-core/utils'
import { Button } from '@smilexx2/ui/button'
import { CustomButton } from '@smilexx2/custom-button/custom-button'

// Still import CSS as needed
import '@smilexx2/ui/styles.css'
import '@smilexx2/custom-button/styles.css'
```

## Migration Guide

If you're updating from previous versions that didn't have proper exports:

### Before (Limited Exports)
```typescript
// This only worked for specific paths
import { Button } from '@smilexx2/ui/button'
// CSS import might not have worked
```

### After (Comprehensive Exports)
```typescript
// All of these now work
import { Button, buttonVariants } from '@smilexx2/ui'
import { Button } from '@smilexx2/ui/button'
import '@smilexx2/ui/styles.css'

// Plus CommonJS support
const { Button } = require('@smilexx2/ui')
```

## Troubleshooting

### Import Issues

If you encounter import issues:

1. **Check your bundler supports package.json exports** (most modern bundlers do)
2. **For TypeScript issues**: Ensure `moduleResolution` is set to `"node16"`, `"nodenext"`, or `"bundler"`
3. **For CSS imports**: Make sure your bundler is configured to handle CSS imports
4. **For tree-shaking**: Use subpath imports for optimal results

### Legacy Support

For legacy environments that don't support package.json exports:

- The packages still include `main`, `module`, and `types` fields for fallback
- CommonJS files are available with `.cjs` extension
- All functionality remains accessible through legacy import patterns