import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { useState } from 'react'
import { Copy, Eye, Code } from 'lucide-react'

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
    <div className="border rounded-lg overflow-hidden my-6">
      <LiveProvider code={code} scope={scope} noInline={noInline}>
        {/* Preview Section */}
        <div className="p-6 bg-background border-b">
          <LivePreview />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowCode(!showCode)}
              className="flex items-center space-x-1 px-2 py-1 text-xs rounded hover:bg-muted"
            >
              {showCode ? <Eye className="h-3 w-3" /> : <Code className="h-3 w-3" />}
              <span>{showCode ? 'Hide' : 'Show'} Code</span>
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1 px-2 py-1 text-xs rounded hover:bg-muted"
            >
              <Copy className="h-3 w-3" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Code Editor */}
        {showCode && (
          <div className="relative">
            <LiveEditor
              style={{
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                fontSize: 14,
                backgroundColor: 'hsl(var(--muted))',
                color: 'hsl(var(--foreground))',
              }}
            />
          </div>
        )}

        {/* Error Display */}
        <LiveError className="p-4 bg-destructive/10 text-destructive text-sm" />
      </LiveProvider>
    </div>
  )
}