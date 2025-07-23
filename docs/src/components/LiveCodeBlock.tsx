"use client"

import React from "react"
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
  const isDark = resolvedTheme === "dark"

  const defaultScope = {
    React,
    CustomButton,
    Spinner,
    ...scope,
  }

  return (
    <div
      className={`rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden ${className}`}
    >
      <LiveProvider
        code={code.trim()}
        scope={defaultScope}
        theme={isDark ? themes.nightOwl : themes.github}
        language={language}
        noInline={noInline}
      >
        <div
          className={`p-4 border-b ${
            isDark ? "bg-gray-900 border-gray-800" : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Live Editor
          </div>
          <div className="rounded-md overflow-hidden">
            <LiveEditor
              className="font-mono text-sm"
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: isDark ? "#111827" : "#ffffff",
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            />
          </div>
        </div>

        <div className="p-4">
          <div className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
            Preview
          </div>
          <div
            className={`rounded-md border p-4 ${
              isDark ? "border-gray-700 bg-gray-950" : "border-gray-200 bg-white"
            }`}
          >
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
