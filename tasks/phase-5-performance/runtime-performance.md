# Runtime Performance

## Overview
Implement performance benchmarks, React DevTools profiling, SSR optimization, and code splitting strategies to ensure optimal runtime performance.

## Phase
Phase 5: Performance & Optimization

## Priority
High

## Dependencies
- Bundle Optimization
- Core Components

## Description
Optimize runtime performance through benchmarking, profiling, server-side rendering enhancements, and strategic code splitting.

## Acceptance Criteria
- [ ] Performance benchmarks established for all components
- [ ] React DevTools profiling integrated into development workflow
- [ ] SSR optimization implemented with proper hydration
- [ ] Code splitting strategies deployed for large components
- [ ] Performance regression testing automated

## Implementation Steps

### 1. Performance Benchmarks

#### Benchmark Suite Setup
```bash
yarn add -D @testing-library/react-hooks benchmark.js
```

Create `scripts/benchmark.js`:
```javascript
import Benchmark from 'benchmark'
import { render } from '@testing-library/react'
import { Button } from '@smilexx2/ui'

const suite = new Benchmark.Suite()

suite
  .add('Button render', () => {
    render(<Button>Test</Button>)
  })
  .add('Button with props', () => {
    render(<Button variant="outline" size="lg">Test</Button>)
  })
  .on('cycle', (event) => {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })
  .run({ async: true })
```

#### Component Metrics
Measure for each component:
- Initial render time
- Re-render performance
- Memory usage
- DOM manipulation efficiency

#### Performance Thresholds
```javascript
const PERFORMANCE_BUDGETS = {
  Button: { render: 16, rerender: 8 }, // ms
  Modal: { render: 50, rerender: 16 },
  Table: { render: 100, rerender: 32 }
}
```

### 2. React DevTools Profiling

#### Automated Profiling Setup
```bash
yarn add -D react-dom/profiling scheduler/tracing
```

#### Profiling Utilities
```typescript
// utils/profiling.ts
export const withProfiler = <P extends {}>(
  Component: React.ComponentType<P>,
  name: string
) => {
  return React.memo((props: P) => (
    <React.Profiler
      id={name}
      onRender={(id, phase, actualDuration) => {
        if (process.env.NODE_ENV === 'development') {
          console.log(`${id} ${phase}:`, actualDuration)
        }
      }}
    >
      <Component {...props} />
    </React.Profiler>
  ))
}
```

#### Performance Monitoring Hook
```typescript
export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        console.log(`${componentName}:`, entry)
      })
    })
    observer.observe({ entryTypes: ['measure'] })
    return () => observer.disconnect()
  }, [componentName])
}
```

### 3. SSR Optimization

#### Server-Side Rendering Setup
```typescript
// ssr/render.tsx
import { renderToString } from 'react-dom/server'
import { Button } from '@smilexx2/ui'

export const renderButton = (props: ButtonProps) => {
  return renderToString(<Button {...props} />)
}
```

#### Hydration Optimization
```typescript
// Ensure SSR/client consistency
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const [mounted, setMounted] = useState(false)
    
    useEffect(() => {
      setMounted(true)
    }, [])
    
    if (!mounted) {
      return <button {...props} ref={ref} />
    }
    
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
```

#### Critical CSS Extraction
```bash
yarn add -D critters
```

Configure for inline critical styles:
```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'postcss-critical-split': {
      output: 'critical'
    }
  }
}
```

### 4. Code Splitting Strategies

#### Dynamic Imports for Large Components
```typescript
// Lazy load heavy components
const DataTable = lazy(() => import('./DataTable'))
const ChartComponent = lazy(() => import('./Chart'))

const LazyDataTable = (props: DataTableProps) => (
  <Suspense fallback={<TableSkeleton />}>
    <DataTable {...props} />
  </Suspense>
)
```

#### Route-based Splitting
```typescript
// Documentation site optimization
const ComponentPage = lazy(() => import('../pages/ComponentPage'))
const ExamplesPage = lazy(() => import('../pages/ExamplesPage'))
```

#### Bundle Splitting Configuration
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-core': ['@smilexx2/ui-core'],
          'ui-components': ['@smilexx2/ui'],
          'animations': ['framer-motion']
        }
      }
    }
  }
})
```

### 5. Performance Testing Automation

#### Lighthouse CI Integration
```bash
yarn add -D @lhci/cli
```

Configure `.lighthouserc.js`:
```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000'],
      numberOfRuns: 3
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }]
      }
    }
  }
}
```

#### Performance Regression Tests
```typescript
// tests/performance.test.ts
describe('Performance Tests', () => {
  it('Button renders within budget', async () => {
    const startTime = performance.now()
    render(<Button>Test</Button>)
    const endTime = performance.now()
    
    expect(endTime - startTime).toBeLessThan(16) // 60fps budget
  })
})
```

## Performance Monitoring Dashboard

### Metrics Collection
- Component render times
- Bundle load times
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to Interactive (TTI)

### Real User Monitoring (RUM)
```typescript
// utils/rum.ts
export const trackPerformance = (metric: string, value: number) => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`${metric}:${value}`)
  }
}
```

## Optimization Targets

### Performance Budgets
- Initial render: < 16ms (60fps)
- Re-render: < 8ms
- Bundle load: < 200ms
- First paint: < 1s
- Interactive: < 2.5s

### Memory Usage
- Component instances: < 1MB
- Event listeners: Proper cleanup
- DOM nodes: Minimal footprint

## Files to Create/Modify
- `scripts/benchmark.js`
- `utils/profiling.ts`
- `ssr/` directory with SSR utilities
- `.lighthouserc.js`
- Performance test files
- CI performance workflows

## Resources
- [React Performance Optimization](https://react.dev/learn/render-and-commit)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [React DevTools Profiler](https://react.dev/blog/2018/09/10/introducing-the-react-profiler)

## Estimated Effort
3-4 weeks

## Notes
- Focus on user-perceived performance
- Test on various devices and network conditions
- Consider accessibility performance impact
- Document performance best practices
- Set up alerts for performance regressions