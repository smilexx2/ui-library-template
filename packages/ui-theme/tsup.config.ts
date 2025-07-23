import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'styles/index': './src/styles/index.css',
  },
  format: ['esm', 'cjs'],
  dts: { resolve: true },
  injectStyle: false, // Generate separate CSS files for theme
  tsconfig: './tsconfig.build.json',
  clean: true,
  outDir: 'dist',
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    // Configure PostCSS for proper CSS processing
    options.loader = {
      ...options.loader,
      '.css': 'css'
    }
  }
})