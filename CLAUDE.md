# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **UI library template repository** that extends shadcn/ui with additional components and utilities. It provides a complete **Yarn v4 monorepo** setup for building, documenting, and distributing component libraries.

### Key Features
- 🏗️ **Template Repository**: Fork/clone to create your own component library
- 📦 **Monorepo Architecture**: Organized packages with shared dependencies
- 🎨 **shadcn/ui Compatible**: Extends and complements existing shadcn/ui setups
- ⚡ **Modern Stack**: React 19.1, TypeScript 5.8, Tailwind CSS v4.1, Vite 7
- 📚 **Full Documentation**: Storybook + Next.js/Nextra docs site included

### Template Customization Points
- Package names (currently `@smilexx2/*` namespace)
- Component implementations (Button examples provided)
- Documentation branding and content
- Repository metadata and publishing configuration

## Project Structure

```
├── packages/              # Component packages (Yarn workspaces)
│   ├── core/             # @smilexx2/ui-core - Utilities (cn function)
│   ├── ui/               # @smilexx2/ui - shadcn/ui-style components
│   └── custom-button/    # @smilexx2/custom-button - Enhanced components
├── docs/                 # Next.js 15.4 + Nextra 4.2 documentation site
├── storybook/            # Storybook 9.0 development environment
├── ROADMAP.md            # Future development plans
├── CHANGELOG.md          # Completed milestones  
└── EXPORTS.md           # Package export documentation
```

## Development Commands

### 🚀 Quick Start
```bash
# Install dependencies
yarn install

# Start development
yarn storybook        # Component development (port 6006)
yarn dev:docs        # Documentation site (port 3000)
```

### 📦 Package Development
```bash
yarn dev:ui            # Watch mode for @smilexx2/ui
yarn dev:custom-button # Watch mode for @smilexx2/custom-button
yarn dev:core         # Watch mode for @smilexx2/ui-core
```

### 🏗️ Building
```bash
yarn build            # Build all packages
yarn build:ui         # Build specific package
yarn storybook:build  # Build static Storybook
```

### 🧹 Code Quality
```bash
yarn lint             # ESLint all workspaces
yarn lint:fix         # Auto-fix issues
yarn format           # Prettier formatting
yarn format:check     # Check formatting
yarn typecheck        # TypeScript validation
```

### 🔧 Maintenance
```bash
yarn clean            # Remove dist/ and node_modules/
yarn deps:check       # Check for updates
```

## Technology Stack

### Core Dependencies
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.0 | UI framework with React 19 features |
| TypeScript | 5.8.3 | Type safety and DX |
| Tailwind CSS | 4.1.11 | Utility-first CSS (stable v4) |
| Vite | 7.0.4 | Fast builds and HMR |
| Yarn | 4.9.2 | Package management with workspaces |

### Component Tools
- **Class Variance Authority (CVA)**: Component variant management
- **Radix UI Primitives**: Accessible component foundations
- **clsx + tailwind-merge**: Optimized className handling

### Documentation
- **Storybook 9.0.17**: Component development and testing
- **Next.js 15.4.1**: Documentation site framework
- **Nextra 4.2.17**: MDX-powered docs theme

## Development Guidelines

### Component Patterns
```typescript
// Use CVA for variants
const buttonVariants = cva("base-classes", {
  variants: {
    variant: { default: "...", outline: "..." },
    size: { sm: "...", md: "...", lg: "..." }
  },
  defaultVariants: { variant: "default", size: "md" }
})

// Forward refs for composition
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

// Export both component and variants
export { Button, buttonVariants }
```

### Tailwind CSS v4 Patterns
```css
/* Use @import and @theme directives */
@import "tailwindcss";

@theme {
  --color-background: oklch(100% 0 0);
  --color-foreground: oklch(0% 0 0);
}

/* Component styles */
.button {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

### Package Configuration
```json
{
  "name": "@smilexx2/package-name",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "types": "./dist/index.d.ts"
    },
    "./styles.css": "./dist/styles.css"
  },
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  }
}
```

## Best Practices

### Do's ✅
- Follow shadcn/ui component patterns
- Use semantic HTML and ARIA attributes
- Implement proper TypeScript types
- Include JSDoc comments for public APIs
- Test components in Storybook
- Keep bundle sizes minimal
- Use CSS variables for theming

### Don'ts ❌
- Don't break shadcn/ui compatibility
- Don't include heavy dependencies
- Don't use inline styles
- Don't forget accessibility
- Don't ignore TypeScript errors
- Don't commit without linting

## Current State

### ✅ Completed
- Tailwind CSS v4.1.11 stable implementation
- Full ESM/CJS dual package support
- Storybook 9.0.17 integration
- TypeScript project references
- Comprehensive export configuration
- React 19.1.0 compatibility

### 🚧 In Progress
- Testing infrastructure (Vitest + RTL)
- CI/CD pipeline setup
- NPM publishing configuration

### 📋 Planned
See [ROADMAP.md](ROADMAP.md) for detailed plans

## Known Issues

### Non-Critical Warnings
- Storybook experimental API warning (internal, safe to ignore)
- @theguild/remark-mermaid peer dependency range conflict
- TypeScript version syntax inconsistency (~5.8.3 vs ^5.8.3)

## Resources

- **Project Documentation**: [@README.md](README.md)
- **Export Patterns**: [@EXPORTS.md](EXPORTS.md)
- **Future Plans**: [ROADMAP.md](ROADMAP.md)
- **Change History**: [CHANGELOG.md](CHANGELOG.md)
- **shadcn/ui Docs**: [ui.shadcn.com](https://ui.shadcn.com)

## Quick Reference

### Component Locations
- Core utilities: `packages/core/src/`
- UI components: `packages/ui/src/components/`
- Custom components: `packages/custom-button/src/`

### Important Files
- Global types: `packages/ui/src/types/`
- Theme tokens: `packages/ui/src/index.css`
- Storybook config: `storybook/.storybook/`
- Docs config: `docs/next.config.mjs`

---

*This file is specifically for Claude Code. For general project information, see README.md*