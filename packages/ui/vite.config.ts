import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/**/*.ts", "src/**/*.tsx"],
      exclude: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: "./src/index.ts",
        "components/ui/button": "./src/components/ui/button.tsx",
      },
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        const extension = format === "es" ? "js" : "cjs"
        return `${entryName}.${extension}`
      },
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@smilexx2/ui-core",
        "class-variance-authority",
        "@radix-ui/react-slot",
      ],
      output: [
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          assetFileNames: assetInfo => {
            if (assetInfo.name?.endsWith(".css")) {
              return "index.css"
            }
            return assetInfo.name as string
          },
        },
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].cjs",
          assetFileNames: assetInfo => {
            if (assetInfo.name?.endsWith(".css")) {
              return "index.css"
            }
            return assetInfo.name as string
          },
        },
      ],
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
})
