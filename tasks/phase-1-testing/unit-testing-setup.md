# Unit Testing Setup

## Overview
Set up comprehensive unit testing infrastructure for all packages in the monorepo using a phased approach for systematic implementation.

## Phase
Phase 1: Testing Infrastructure

## Priority
High (Current Priority)

## Dependencies
None

## Description
Implement a robust unit testing setup using Vitest and React Testing Library to ensure code quality and prevent regressions across all packages. This follows a 4-phase implementation plan for systematic deployment.

## 4-Phase Implementation Plan

### Phase 1: Unit Testing Setup (1-2 days)

**Goal**: Establish the foundation testing infrastructure

#### Install Dependencies
- Install Vitest, React Testing Library, jsdom, and coverage tools
- Add TypeScript support for testing with @vitest/ui and type definitions
- Configure for monorepo workspace structure

#### Configure Vitest for Monorepo
- Create root Vitest workspace config that discovers all package test configs
- Set up root Vitest config with React plugin, jsdom environment, and coverage reporting
- Create global test setup file for @testing-library/jest-dom and cleanup
- Configure package-specific Vitest configs with path aliases

### Phase 2: Core Test Implementation (1-2 days)

**Goal**: Write comprehensive tests for existing components

#### Test Utilities Setup
- Create shared test-utils directory with custom render function
- Set up test helpers for common operations (button selection, class checking)
- Configure reusable testing patterns for component testing

#### Package-Specific Tests
- **@smilexx2/ui-core**: Test cn utility function for class merging, conditional classes, and Tailwind precedence
- **@smilexx2/ui**: Test Button component rendering, variant classes, size classes, and prop handling
- **@smilexx2/custom-button**: Test enhanced features, animation props, and custom functionality
- Configure meaningful coverage thresholds (80% statements, 70% branches, 80% functions/lines)

### Phase 3: Integration with Development Workflow (1 day)

**Goal**: Integrate testing into the development process

#### Update Package Scripts
- Add test scripts to root package.json for workspace-wide testing
- Configure individual package test scripts with watch mode and coverage
- Add typecheck scripts to ensure TypeScript compliance
- Set up parallel test execution for faster CI builds

#### TypeScript Configuration
- Update tsconfig.json to include Vitest globals and testing library types
- Ensure test files are included in TypeScript compilation
- Configure path mappings for cross-package imports in tests

#### Documentation
- Create testing guidelines documentation
- Document how to write component tests following established patterns
- Set coverage requirements and local testing instructions

### Phase 4: Storybook Integration (1 day)

**Goal**: Connect testing with Storybook development environment

#### Storybook Test Integration
- Configure existing @storybook/addon-vitest for story-based testing
- Update Storybook main config to include testing addons

#### Replace Default Stories
- Remove placeholder Button/Header/Page stories
- Create real component stories for UI Button with all variants and sizes
- Add Custom Button stories showcasing enhanced features
- Include interactive examples demonstrating component behavior

## Acceptance Criteria
- [ ] Phase 1: Vitest configuration added to all packages with monorepo support
- [ ] Phase 1: React Testing Library installed and configured with custom utilities
- [ ] Phase 2: Test utilities and helpers created in shared directory
- [ ] Phase 2: Comprehensive test files added for all packages (cn utility, Button, CustomButton)
- [ ] Phase 2: Coverage reporting configured with meaningful thresholds
- [ ] Phase 3: Test scripts added to all package.json files
- [ ] Phase 3: TypeScript paths and monorepo structure fully supported
- [ ] Phase 4: Storybook integration with real component stories
- [ ] Phase 4: Default Button/Header/Page stories replaced with actual components

## Files to Create/Modify
- `vitest.config.ts` (root)
- `vitest.workspace.ts` (root)
- `test-setup.ts` (root)
- `test-utils/` directory with helpers
- `packages/*/vitest.config.ts`
- `packages/*/src/**/*.test.{ts,tsx}`
- `storybook/src/stories/` (replace default stories)
- Update all package.json scripts
- `docs/testing.md` (documentation)

## Resources
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Monorepo Setup](https://vitest.dev/guide/workspace.html)
- [Storybook Testing](https://storybook.js.org/docs/react/writing-tests/introduction)

## Estimated Effort
4-6 days total (1-2 days per phase)

## Notes
- Each phase builds on the previous one
- Tests must work with TypeScript paths and monorepo structure
- Focus on testing actual components, not placeholder examples
- Ensure parallel test execution for faster development
- Coverage thresholds should be realistic but meaningful
- Document testing patterns for future component development