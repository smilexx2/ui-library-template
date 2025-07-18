import { defineConfig } from "vite"
import { resolve } from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.test.ts"],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "UICore",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["clsx", "tailwind-merge"],
      output: {
        preserveModules: false,
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
})
