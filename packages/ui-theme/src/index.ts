// Re-export CSS to enable CSS bundling with tsup injectStyle
import './styles/index.css'

// This package primarily exports CSS, but we need a TypeScript entry point
// for proper module resolution and build tooling
export const themePackageVersion = '1.0.0'