# Changelog

All notable changes and completed milestones for the UI Library Template project.

## [Unreleased]

### Completed Milestones

#### Infrastructure Setup ✅
- **Tailwind CSS v4.1.11 Migration**
  - Successfully migrated to stable Tailwind CSS v4.1.11
  - Updated all CSS files to use v4 syntax (`@import "tailwindcss"` and `@theme` directive)
  - Configured Storybook to work with Tailwind v4
  - Removed unnecessary tailwind.config.js files (not needed in v4)
  - Updated PostCSS configurations for v4 compatibility with `@tailwindcss/postcss`

- **Dependency Standardization**
  - Aligned all Storybook packages to v9.0.17 (previously mixed v8.6.14 and v9.0.17)
  - Standardized TypeScript version syntax to ^5.8.3 across all packages
  - Fixed Yarn version consistency (yarn@4.9.2) across all workspaces
  - Cleaned up root devDependencies (reduced from 25 to 9 essential packages)
  - Resolved React peer dependency warnings in monorepo

- **Build System Optimization**
  - Implemented comprehensive package exports with ESM/CJS dual format support
  - Enhanced all Vite configurations for optimal library builds
  - Fixed CSS imports and asset naming across all packages
  - Added subpath exports for optimal tree-shaking
  - Standardized TypeScript target (ES2020) across all configurations
  - Fixed TypeScript path mappings for cross-package imports

#### Documentation ✅
- Created comprehensive EXPORTS.md documentation
- Updated README with detailed import examples
- Enhanced .gitignore for proper build artifact exclusion
- Added clean script for removing dist/ and node_modules/

#### Project Structure ✅
- Established monorepo structure with Yarn 4.9.2 workspaces
- Created three core packages:
  - `@smilexx2/ui-core`: Utility functions (cn, etc.)
  - `@smilexx2/ui`: shadcn/ui-based components with CVA patterns
  - `@smilexx2/custom-button`: Enhanced components with animations
- Set up Storybook workspace for component development
- Created Next.js + Nextra documentation site
- Added memory-bank directory for context files

#### Component Architecture ✅
- Implemented CVA (Class Variance Authority) for component variants
- Integrated Radix UI primitives for accessibility
- Ensured all components properly forward refs
- Followed shadcn/ui design patterns consistently
- Created custom animations for custom-button package

## Project History

### Initial Setup
- Created monorepo template with modern tooling
- React 19.1.0 with full React 19 features support
- TypeScript 5.8.3 with project references
- Vite 7.0.4 for fast builds and HMR
- Integrated shadcn/ui design system principles

### Technology Choices
- **Yarn 4**: Modern package management with PnP support
- **Tailwind CSS v4**: CSS-first configuration approach
- **Storybook 9**: Latest version for component development
- **Next.js 15**: App router and latest features
- **Nextra 4**: MDX-powered documentation

---

This changelog tracks completed work. For upcoming features, see [ROADMAP.md](./ROADMAP.md)