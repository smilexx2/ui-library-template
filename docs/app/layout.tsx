import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "shadcn/ui Extensions",
  description: "A collection of extension components that build on top of shadcn/ui",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
