const config = {
  logo: <span>UI Library</span>,
  project: {
    link: "https://github.com/your-username/ui-library",
  },
  docsRepositoryBase: "https://github.com/your-username/ui-library",
  footer: {
    text: "UI Library Documentation",
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – UI Library",
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="UI Library" />
      <meta property="og:description" content="shadcn/ui Extensions" />
    </>
  ),
}

export default config
