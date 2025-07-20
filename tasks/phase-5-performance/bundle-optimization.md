# Bundle Optimization

## Overview
Implement comprehensive bundle optimization strategies including size tracking, tree-shaking verification, build optimization, and source map generation.

## Phase
Phase 5: Performance & Optimization

## Priority
High

## Dependencies
- Core Components
- Publishing Setup

## Description
Optimize bundle sizes and build performance to ensure the component library remains lightweight and fast for end users.

## Acceptance Criteria
- [ ] size-limit tracking implemented for all packages
- [ ] Tree-shaking effectiveness verified and optimized
- [ ] Build configurations optimized for production
- [ ] Source map generation configured for debugging
- [ ] Bundle analysis and reporting automated

## Implementation Steps

### 1. Bundle Size Tracking
```bash
yarn add -D size-limit @size-limit/preset-small-lib
```

#### Configure size-limit
Create `.size-limit.json`:
```json
[
  {
    "name": "@smilexx2/ui-core",
    "path": "packages/core/dist/index.js",
    "limit": "2 KB"
  },
  {
    "name": "@smilexx2/ui",
    "path": "packages/ui/dist/index.js",
    "limit": "15 KB"
  },
  {
    "name": "@smilexx2/custom-button",
    "path": "packages/custom-button/dist/index.js",
    "limit": "8 KB"
  }
]
```

#### Size Budget CI Integration
```yaml
- name: Check bundle size
  run: yarn size-limit
```

#### Bundle Analysis
```bash
yarn add -D webpack-bundle-analyzer rollup-plugin-analyzer
```

### 2. Tree-shaking Optimization

#### ESM Module Configuration
```json
{
  "type": "module",
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

#### Vite Build Configuration
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UILibrary',
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
```

#### Tree-shaking Verification
Create test imports to verify:
```typescript
// Test tree-shaking effectiveness
import { Button } from '@smilexx2/ui' // Should only include Button
import { cn } from '@smilexx2/ui-core/utils' // Should only include utils
```

### 3. Build Optimization

#### Vite Optimization Settings
```typescript
export default defineConfig({
  build: {
    minify: 'esbuild',
    target: 'es2020',
    sourcemap: true,
    reportCompressedSize: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  }
})
```

#### CSS Optimization
```bash
yarn add -D @tailwindcss/cli postcss cssnano
```

Configure PostCSS:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' && {
      cssnano: {
        preset: 'default'
      }
    })
  }
}
```

### 4. Source Map Configuration

#### Development Source Maps
```typescript
export default defineConfig({
  build: {
    sourcemap: process.env.NODE_ENV === 'development' ? 'inline' : true
  }
})
```

#### Source Map Upload (for error tracking)
```bash
yarn add -D @sentry/cli
```

### 5. Performance Monitoring

#### Bundle Analyzer Integration
```json
{
  "scripts": {
    "analyze": "yarn build && yarn dlx webpack-bundle-analyzer dist/stats.json",
    "size": "size-limit",
    "size:why": "size-limit --why"
  }
}
```

#### Performance Budgets
```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "2kb",
      "maximumError": "4kb"
    }
  ]
}
```

## Optimization Targets

### Size Budgets by Package
- `@smilexx2/ui-core`: < 2 KB
- `@smilexx2/ui`: < 15 KB (Button component)
- `@smilexx2/custom-button`: < 8 KB
- `@smilexx2/form-components`: < 25 KB
- `@smilexx2/layout-components`: < 10 KB

### Performance Metrics
- First Paint improvement
- Tree-shaking efficiency > 95%
- Gzip compression ratio > 70%
- ESM module compatibility

## Monitoring and Reporting

### CI/CD Integration
```yaml
- name: Bundle Analysis
  run: |
    yarn build
    yarn size-limit
    yarn analyze --json > bundle-report.json
    
- name: Comment Bundle Size
  uses: andresz1/size-limit-action@v1
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
```

### Performance Dashboard
- Bundle size trends over time
- Tree-shaking effectiveness metrics
- Build time optimization
- Package dependency analysis

## Files to Create/Modify
- `.size-limit.json`
- `vite.config.ts` (optimization settings)
- `postcss.config.js`
- `.github/workflows/bundle-analysis.yml`
- `scripts/analyze-bundle.js`

## Resources
- [size-limit Documentation](https://github.com/ai/size-limit)
- [Vite Build Optimization](https://vitejs.dev/guide/build.html)
- [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
- [Tree Shaking Guide](https://webpack.js.org/guides/tree-shaking/)

## Estimated Effort
2-3 weeks

## Notes
- Monitor impact on development build times
- Consider lazy loading for optional features
- Document optimization strategies for contributors
- Set up alerts for significant size increases
- Regular audit of dependencies and their impact