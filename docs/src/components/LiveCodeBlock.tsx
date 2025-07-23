"use client"

import React, { useEffect, useState } from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { themes } from "prism-react-renderer"
import { useTheme } from "nextra-theme-docs"
import { CustomButton, Spinner } from "../components/ui-components"

interface LiveCodeBlockProps {
  code: string
  scope?: Record<string, unknown>
  language?: string
  noInline?: boolean
  className?: string
}

export function LiveCodeBlock({
  code,
  scope = {},
  language = "jsx",
  noInline = false,
  className = "",
}: LiveCodeBlockProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(resolvedTheme === "dark")
  }, [resolvedTheme])

  const defaultScope = {
    React,
    CustomButton,
    Spinner,
    ...scope,
  }

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  if (!mounted) {
    return (
      <div className={`rounded-lg border border-border overflow-hidden ${className}`}>
        <div className="p-4 border-b border-border bg-muted">
          <div className="text-sm font-medium mb-2 text-foreground">Live Editor</div>
          <div className="rounded-md overflow-hidden bg-white">
            <div className="font-mono text-sm p-4 text-gray-500">Loading...</div>
          </div>
        </div>
        <div className="p-4">
          <div className="text-sm font-medium mb-2 text-foreground">Preview</div>
          <div className="rounded-md border border-border bg-card p-4">
            <div className="text-gray-500">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-lg border border-border overflow-hidden ${className}`}>
      <LiveProvider
        code={code.trim()}
        scope={defaultScope}
        theme={isDark ? themes.nightOwl : themes.github}
        language={language}
        noInline={noInline}
      >
        <div className={`p-4 border-b border-border`}>
          <div className={`text-sm font-medium mb-2 text-foreground`}>Live Editor</div>
          <div className={`rounded-md overflow-hidden ${isDark ? "" : "bg-white"}`}>
            <LiveEditor
              className="font-mono text-sm"
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: "transparent",
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            />
          </div>
        </div>

        <div className="p-4">
          <div className={`text-sm font-medium mb-2 text-foreground`}>Preview</div>
          <div className={`rounded-md border border-border bg-card p-4 dark:!border-0`}>
            <LiveError className="text-red-600 dark:text-red-400 font-mono text-sm mb-2" />
            <div className={isDark ? "dark" : ""}>
              <LivePreview />
            </div>
          </div>
        </div>
      </LiveProvider>
    </div>
  )
}

export default LiveCodeBlock
