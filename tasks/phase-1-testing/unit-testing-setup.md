# Unit Testing Setup

## Overview
Set up comprehensive unit testing infrastructure for all packages in the monorepo.

## Phase
Phase 1: Testing Infrastructure

## Priority
High

## Dependencies
None

## Description
Implement a robust unit testing setup using Vitest and React Testing Library to ensure code quality and prevent regressions across all packages.

## Acceptance Criteria
- [ ] Vitest configuration added to all packages
- [ ] React Testing Library installed and configured
- [ ] Test utilities and helpers created
- [ ] Example test files added for each package
- [ ] Coverage reporting configured
- [ ] Tests run successfully in CI/CD pipeline

## Implementation Steps

### 1. Install Dependencies
```bash
yarn add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### 2. Configure Vitest
- Add `vitest.config.ts` to workspace root
- Configure for React components with jsdom environment
- Set up coverage reporting with c8 or @vitest/coverage-v8

### 3. Create Test Utilities
- Set up custom render function with providers
- Create test helpers for common operations
- Add custom matchers for component testing

### 4. Add Example Tests
- `packages/core/`: Test utility functions
- `packages/ui/`: Test Button component variants and interactions
- `packages/custom-button/`: Test enhanced features and animations

### 5. Configure Package Scripts
Add test scripts to each package.json:
```json
{
  "scripts": {
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage"
  }
}
```

## Files to Create/Modify
- `vitest.config.ts` (root)
- `packages/*/vitest.config.ts`
- `packages/*/src/**/*.test.{ts,tsx}`
- `test-utils/` directory with helpers
- Update workspace package.json scripts

## Resources
- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Monorepo Setup](https://vitest.dev/guide/workspace.html)

## Estimated Effort
2-3 days

## Notes
- Ensure tests work with TypeScript paths and aliases
- Consider mock strategies for external dependencies
- Set up parallel test execution for faster CI builds