import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'components/ui/button': './src/components/ui/button.tsx',
  },
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  injectStyle: true,
  external: [
    'react',
    'react-dom',
    'react/jsx-runtime',
    '@smilexx2/ui-core',
    'class-variance-authority',
    '@radix-ui/react-slot',
  ],
  tsconfig: './tsconfig.build.json',
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
})