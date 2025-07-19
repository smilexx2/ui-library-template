# Storybook Fix Plan

## Issues Identified
1. **Mixed Storybook Versions**: Root package.json had v8.6.14 while storybook workspace had v9.0.17
2. **Yarn Version Mismatch**: Root uses yarn@4.9.2, storybook workspace referenced yarn@1.22.22
3. **TypeScript Version Inconsistency**: Root uses ^5.8.3, storybook uses ~5.8.3
4. **Experimental Warning**: CommonJS/ES Module loading conflict due to version mismatch

## Phase 1: ✅ COMPLETED - Standardize Storybook to v9.0.17
- ✅ Updated root package.json Storybook packages from v8.6.14 to ^9.0.17:
  - `@storybook/builder-vite`: 8.6.14 → ^9.0.17
  - `@storybook/react-vite`: 8.6.14 → ^9.0.17
  - `storybook`: 8.6.14 → ^9.0.17
- ✅ Fixed Yarn version in storybook workspace to match root (yarn@4.9.2)

## Phase 2: ⏳ PENDING - Clean Dependencies  
- Standardize TypeScript version syntax (^5.8.3) across all packages
- Clean lockfiles - Remove conflicting entries in yarn.lock and package-lock.json
- Reinstall dependencies with `yarn install` to resolve conflicts

## Phase 3: ⏳ PENDING - Verify & Test
- Test Storybook startup - Ensure no experimental warnings
- Verify functionality - Check that all components load correctly
- Run lint/build commands to ensure no breaking changes

## DevDependencies Cleanup: ✅ COMPLETED
**Removed from root package.json (17 dependencies eliminated):**
- All Storybook packages: `@chromatic-com/storybook`, `@storybook/*`, `eslint-plugin-storybook`, `storybook`
- React packages: `react`, `react-dom`, `@types/react`, `@types/react-dom` 
- Build tools: `vite`, `@types/aria-query`

**Root now contains only 9 essential workspace-wide dependencies:**
- `@tailwindcss/postcss`, `@types/node`, `@typescript-eslint/*`
- `autoprefixer`, `eslint`, `eslint-plugin-react*`, `postcss`
- `prettier`, `tailwindcss`, `typescript`

## Next Steps
1. Run `yarn install` to update dependencies
2. Test Storybook with `yarn storybook`
3. Proceed with Phase 2 if needed

## Notes
- **Before:** 25 devDependencies with duplicates and misplaced packages
- **After:** 9 essential workspace-wide dependencies only
- Eliminated all Storybook/React duplication between root and storybook workspace
- The mixed version conflict was the primary cause of experimental CommonJS/ES Module warnings
- Phase 1 should resolve most immediate issues
- May need dependency reinstall to fully resolve lockfile conflicts