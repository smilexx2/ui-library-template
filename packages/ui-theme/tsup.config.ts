import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: './src/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: { resolve: true },
  injectStyle: true,
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