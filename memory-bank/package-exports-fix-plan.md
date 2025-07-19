# Package.json Exports Fields Fix Plan

## Overview
The current package.json files have incomplete `exports` fields that don't fully support modern module resolution, tree-shaking, or proper TypeScript integration. This plan addresses these issues to ensure packages work correctly in all environments.

## Issues Identified

### 1. @smilexx2/ui Package
**Current Issues:**
- Only exports `/button` subpath, but has `index.ts` that also exports Button
- No main entry point export
- Missing CSS exports for component-specific styles
- No way to import `buttonVariants` utility separately

**Current exports:**
```json
"exports": {
  "./button": {
    "types": "./dist/components/ui/button.d.ts",
    "import": "./dist/components/ui/button.js"
  },
  "./styles.css": "./dist/index.css"
}
```

### 2. @smilexx2/ui-core Package
**Current Issues:**
- Only has basic main export
- No subpath exports for utilities
- Missing type re-exports

**Current exports:**
```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  }
}
```

### 3. @smilexx2/custom-button Package
**Current Issues:**
- Has legacy `main`/`module`/`types` fields alongside `exports`
- Missing CSS export for styles
- No CommonJS support in exports

**Current exports:**
```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js"
  }
}
```

## Proposed Solution

### 1. @smilexx2/ui Package - Enhanced Exports
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
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "sideEffects": ["*.css"]
}
```

### 2. @smilexx2/ui-core Package - Enhanced Exports
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
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "sideEffects": false
}
```

### 3. @smilexx2/custom-button Package - Enhanced Exports
```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs",
      "default": "./dist/index.js"
    },
    "./styles.css": {
      "import": "./dist/styles/index.css",
      "require": "./dist/styles/index.css",
      "default": "./dist/styles/index.css"
    },
    "./package.json": "./package.json"
  },
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "sideEffects": ["*.css"]
}
```

## Build Configuration Updates

### Vite Configuration Changes
To support both ESM and CJS outputs, we need to update Vite configs:

```javascript
// vite.config.ts updates
export default defineConfig({
  build: {
    lib: {
      formats: ['es', 'cjs'],
      fileName: (format) => format === 'es' ? '[name].js' : '[name].cjs'
    },
    rollupOptions: {
      output: [
        {
          format: 'es',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].js'
        },
        {
          format: 'cjs',
          preserveModules: true,
          preserveModulesRoot: 'src',
          entryFileNames: '[name].cjs'
        }
      ]
    }
  }
});
```

## Implementation Steps

### Phase 1: Update Package.json Files
1. Add comprehensive `exports` field to each package
2. Keep legacy fields (`main`, `module`, `types`) for backward compatibility
3. Ensure `sideEffects` is properly configured for CSS files
4. Add `"./package.json"` export for tooling compatibility

### Phase 2: Update Build Configurations
1. Modify Vite configs to output both ESM and CJS formats
2. Ensure proper file naming conventions
3. Configure `preserveModules` for better tree-shaking
4. Update build scripts if necessary

### Phase 3: Test & Validate
1. Build all packages
2. Test imports in different environments:
   - ESM imports in modern bundlers
   - CommonJS requires in Node.js
   - TypeScript type resolution
   - CSS imports
3. Verify tree-shaking works properly
4. Test in consuming applications

### Phase 4: Documentation
1. Update README with import examples
2. Document available exports and subpaths
3. Add migration guide if breaking changes

## Benefits

1. **Better Compatibility**: Works in both ESM and CJS environments
2. **Improved Tree-shaking**: Subpath exports allow importing only what's needed
3. **Type Safety**: Proper TypeScript type exports at all levels
4. **CSS Flexibility**: Import styles separately or bundled
5. **Future-proof**: Follows Node.js module resolution standards
6. **Developer Experience**: Clear, predictable import paths

## Breaking Changes

- None expected if legacy fields are maintained
- Consumers can continue using existing import patterns
- New subpath exports are additive features

## Testing Checklist

- [ ] ESM imports work in Vite
- [ ] CommonJS requires work in Node.js
- [ ] TypeScript finds all type definitions
- [ ] CSS imports resolve correctly
- [ ] Tree-shaking removes unused code
- [ ] Storybook can import all exports
- [ ] Documentation site builds correctly
- [ ] No regression in existing functionality

## Notes

- The `exports` field takes precedence over `main`/`module` fields in modern tools
- Keep legacy fields for tools that don't support `exports` yet
- Order matters in exports conditions: `types` should come first
- Use `preserveModules` in Rollup for better tree-shaking
- Consider adding source maps in future iteration