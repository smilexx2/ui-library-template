import nextra from "nextra"

export default nextra({})({
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  turbopack: {
    resolveAlias: {
      "next-mdx-import-source-file": "./mdx-components.js",
    },
  },
})
