import { useMDXComponents as getThemeComponents } from "nextra-theme-docs" // nextra-theme-blog or your custom theme
import { CustomButton, Spinner } from "./components/ui-components"

// Get the default MDX components
const themeComponents = getThemeComponents()

// Merge components
export function useMDXComponents(components) {
  return {
    ...themeComponents,
    ...components,
    // Add UI library components for use in MDX
    CustomButton,
    Spinner,
  }
}
