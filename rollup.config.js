import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import typescript from "@rollup/plugin-typescript"
import peerDepsExternal from "rollup-plugin-peer-deps-external"
import postcss from "rollup-plugin-postcss"
import { readFileSync } from "fs"

const packageJson = JSON.parse(readFileSync("./package.json", "utf8"))

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: false,
      exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts", "**/*.stories.tsx"],
    }),
  ],
  external: ["react", "react-dom"],
}
