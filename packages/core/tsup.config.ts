import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'lib/utils': './src/lib/utils.ts',
  },
  format: ['esm', 'cjs'],
  dts: {
    resolve: true,
  },
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'clsx',
    'tailwind-merge',
  ],
  tsconfig: './tsconfig.build.json',
})