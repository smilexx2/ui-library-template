"use client"

import { ComponentDemo } from "./components/ComponentDemo"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 text-foreground bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            shadcn/ui Extensions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A collection of extension components that build on top of shadcn/ui
          </p>
        </div>

        <div className="space-y-8">
          {/* Installation Section */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Installation</h2>
            <div className="bg-muted/50 border border-border rounded-lg p-4">
              <code className="text-sm font-mono text-foreground">
                npm install @your-username/ui-library
              </code>
            </div>
          </div>

          {/* React Live Demo Section */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">React Live Demo</h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Here's a working React Live demo. You can edit the code and see changes in real-time:
            </p>

            <ComponentDemo
              code={`function Example() {
  return (
    <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
      <h3 className="text-xl font-semibold mb-3 text-foreground">Hello World!</h3>
      <p className="text-muted-foreground mb-4 leading-relaxed">
        This is a React Live demo. You can edit this code and see the changes in real-time.
      </p>
      <button className="btn btn-primary">
        Click me!
      </button>
    </div>
  )
}`}
              scope={{}}
            />
          </div>

          {/* Components Section */}
          <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Components</h2>
            <p className="text-muted-foreground leading-relaxed">
              Documentation for individual components coming soon...
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
