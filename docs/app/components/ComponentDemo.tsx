"use client"

import { useState } from "react"
import { Copy, Eye, Code } from "lucide-react"

interface ComponentDemoProps {
  code: string
  scope?: Record<string, any>
  noInline?: boolean
}

export function ComponentDemo({ code, scope = {}, noInline = false }: ComponentDemoProps) {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden my-6 bg-card shadow-sm">
      {/* Preview Section */}
      <div className="p-6 bg-background border-b border-border">
        <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
          <h3 className="text-xl font-semibold mb-3 text-foreground">Hello World!</h3>
          <p className="text-muted-foreground mb-4">
            This is a React Live demo. You can edit this code and see the changes in real-time.
          </p>
          <button className="btn btn-primary">Click me!</button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="btn btn-ghost flex items-center space-x-2 text-xs"
          >
            {showCode ? <Eye className="h-4 w-4" /> : <Code className="h-4 w-4" />}
            <span>{showCode ? "Hide" : "Show"} Code</span>
          </button>
          <button
            onClick={copyToClipboard}
            className="btn btn-ghost flex items-center space-x-2 text-xs"
          >
            <Copy className="h-4 w-4" />
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Code Display */}
      {showCode && (
        <div className="relative">
          <pre
            className="react-live-editor"
            style={{
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
              fontSize: 14,
              lineHeight: 1.5,
              padding: "1rem",
              backgroundColor: "hsl(var(--muted))",
              color: "hsl(var(--foreground))",
              margin: 0,
              overflow: "auto",
            }}
          >
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  )
}
