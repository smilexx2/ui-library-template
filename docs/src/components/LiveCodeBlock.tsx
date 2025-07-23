"use client"

import React from "react"
import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live"
import { themes } from "prism-react-renderer"
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
  // Default scope with React and UI components
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
        theme={themes.nightOwl}
        language={language}
        noInline={noInline}
      >
        <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Live Editor
          </div>
          <div className="rounded-md overflow-hidden">
            <LiveEditor
              className="font-mono text-sm"
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: 14,
                backgroundColor: "transparent",
              }}
            />
          </div>
        </div>

        <div className="p-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</div>
          <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 p-4">
            <LiveError className="text-red-600 dark:text-red-400 font-mono text-sm mb-2" />
            <LivePreview />
          </div>
        </div>
      </LiveProvider>
    </div>
  )
}

export default LiveCodeBlock
