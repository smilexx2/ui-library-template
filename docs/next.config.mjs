import nextra from "nextra"
import path from "path"
import { fileURLToPath } from "url"

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Set up Nextra with its configuration
const withNextra = nextra({})

// Export the final Next.js config with Nextra included
export default withNextra({})
