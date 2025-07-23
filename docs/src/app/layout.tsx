import { Footer, Layout, Navbar } from "nextra-theme-docs"
import { Banner, Head } from "nextra/components"
import { getPageMap } from "nextra/page-map"
import "nextra-theme-docs/style.css"
import "./globals.css"

export const metadata = {
  // Define your metadata here
  // For more information on metadata API, see: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
}

const banner = <Banner storageKey="ui-library">shadcn/ui Extension Library Documentation</Banner>
const navbar = (
  <Navbar
    logo={<b>UI Library</b>}
    // ... Your additional navbar options
  />
)
const footer = <Footer>MIT {new Date().getFullYear()} © UI Library Template.</Footer>

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* Your additional tags should be passed as `children` of `<Head>` element */}
      </Head>
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/smilexx2/ui-library-template/tree/master/docs"
          footer={footer}
          // Theme configuration
          darkMode={true}
          nextThemes={{
            defaultTheme: "system",
            storageKey: "nextra-theme",
          }}
          // ... Your additional layout options
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
