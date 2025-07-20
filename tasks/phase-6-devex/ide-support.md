# IDE Support

## Overview
Develop comprehensive IDE integration including VS Code extension with snippets, IntelliSense improvements, component preview panel, and auto-import helpers.

## Phase
Phase 6: Developer Experience

## Priority
Medium

## Dependencies
- Component Documentation
- CLI Tools

## Description
Create IDE extensions and tools that provide seamless development experience with intelligent code completion, visual previews, and productivity shortcuts.

## Acceptance Criteria
- [ ] VS Code extension with comprehensive snippets
- [ ] Enhanced IntelliSense for component props
- [ ] Component preview panel for live editing
- [ ] Auto-import helpers for efficient coding
- [ ] Syntax highlighting for component variants

## Implementation Steps

### 1. VS Code Extension Development

#### Extension Setup
```bash
npm install -g yo generator-code
yo code
```

Project structure:
```
ui-library-vscode/
├── src/
│   ├── extension.ts
│   ├── providers/
│   │   ├── completionProvider.ts
│   │   ├── hoverProvider.ts
│   │   └── previewProvider.ts
│   ├── commands/
│   │   ├── insertComponent.ts
│   │   └── previewComponent.ts
│   └── utils/
│       ├── parser.ts
│       └── componentData.ts
├── snippets/
│   ├── react.json
│   └── typescript.json
├── syntaxes/
│   └── ui-library.tmLanguage.json
├── package.json
└── README.md
```

#### Extension Manifest
```json
{
  "name": "ui-library-helpers",
  "displayName": "UI Library Helpers",
  "description": "IntelliSense and snippets for @smilexx2/ui",
  "version": "1.0.0",
  "engines": {
    "vscode": "^1.74.0"
  },
  "categories": ["Snippets", "Other"],
  "activationEvents": [
    "onLanguage:typescript",
    "onLanguage:typescriptreact",
    "onLanguage:javascript",
    "onLanguage:javascriptreact"
  ],
  "contributes": {
    "snippets": [
      {
        "language": "typescriptreact",
        "path": "./snippets/react.json"
      }
    ],
    "commands": [
      {
        "command": "ui-library.insertComponent",
        "title": "Insert UI Component"
      },
      {
        "command": "ui-library.previewComponent",
        "title": "Preview Component"
      }
    ]
  }
}
```

### 2. Code Snippets

#### Component Snippets
```json
{
  "Button Component": {
    "prefix": "ui-button",
    "body": [
      "<Button${1| variant=\"default\", variant=\"destructive\", variant=\"outline\", variant=\"secondary\", variant=\"ghost\", variant=\"link\"|} ${2| size=\"default\", size=\"sm\", size=\"lg\", size=\"icon\"|}>",
      "\t$3",
      "</Button>"
    ],
    "description": "Insert Button component with variants"
  },
  "Button with Icon": {
    "prefix": "ui-button-icon",
    "body": [
      "<Button ${1|variant=\"default\",variant=\"outline\"|} size=\"icon\">",
      "\t<${2:IconName} className=\"h-4 w-4\" />",
      "</Button>"
    ],
    "description": "Button with icon"
  },
  "Custom Button": {
    "prefix": "ui-custom-button",
    "body": [
      "<CustomButton ${1|variant=\"default\",variant=\"primary\",variant=\"secondary\"|} ${2|size=\"default\",size=\"sm\",size=\"lg\"|}>",
      "\t$3",
      "</CustomButton>"
    ],
    "description": "Insert CustomButton component"
  }
}
```

#### Hook Snippets
```json
{
  "useTheme Hook": {
    "prefix": "ui-use-theme",
    "body": [
      "const { theme, setTheme } = useTheme()"
    ],
    "description": "Use theme hook"
  },
  "useBreakpoint Hook": {
    "prefix": "ui-use-breakpoint",
    "body": [
      "const breakpoint = useBreakpoint()"
    ],
    "description": "Use breakpoint hook"
  }
}
```

### 3. IntelliSense Enhancement

#### Completion Provider
```typescript
// src/providers/completionProvider.ts
import * as vscode from 'vscode'
import { getComponentProps } from '../utils/componentData'

export class UILibraryCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    const linePrefix = document.lineAt(position).text.substr(0, position.character)
    
    if (!linePrefix.includes('<Button')) {
      return []
    }
    
    const props = getComponentProps('Button')
    return props.map(prop => {
      const item = new vscode.CompletionItem(prop.name, vscode.CompletionItemKind.Property)
      item.detail = prop.type
      item.documentation = new vscode.MarkdownString(prop.description)
      item.insertText = `${prop.name}={$1}`
      item.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' }
      return item
    })
  }
}
```

#### Hover Provider
```typescript
// src/providers/hoverProvider.ts
export class UILibraryHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Hover | undefined {
    const range = document.getWordRangeAtPosition(position)
    const word = document.getText(range)
    
    if (word === 'Button') {
      const contents = new vscode.MarkdownString()
      contents.appendMarkdown('**Button Component**\n\n')
      contents.appendMarkdown('A versatile button component with multiple variants and sizes.\n\n')
      contents.appendCodeblock('tsx', '<Button variant="default" size="md">Click me</Button>')
      return new vscode.Hover(contents)
    }
  }
}
```

### 4. Component Preview Panel

#### Preview Provider
```typescript
// src/providers/previewProvider.ts
export class ComponentPreviewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'ui-library.componentPreview'
  
  private _view?: vscode.WebviewView
  
  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView
    
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: []
    }
    
    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview)
  }
  
  private _getHtmlForWebview(webview: vscode.Webview) {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Component Preview</title>
        </head>
        <body>
          <div id="preview-root"></div>
          <script>
            // React preview implementation
          </script>
        </body>
      </html>
    `
  }
}
```

### 5. Auto-Import Helpers

#### Import Provider
```typescript
// src/providers/importProvider.ts
export class UILibraryImportProvider implements vscode.CodeActionProvider {
  provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range | vscode.Selection,
    context: vscode.CodeActionContext
  ): vscode.CodeAction[] {
    const actions: vscode.CodeAction[] = []
    
    const text = document.getText(range)
    const componentMatch = text.match(/<(\w+)/)
    
    if (componentMatch) {
      const componentName = componentMatch[1]
      const availableComponents = ['Button', 'CustomButton', 'Input', 'Select']
      
      if (availableComponents.includes(componentName)) {
        const action = new vscode.CodeAction(
          `Import ${componentName} from @smilexx2/ui`,
          vscode.CodeActionKind.QuickFix
        )
        action.edit = new vscode.WorkspaceEdit()
        action.edit.insert(
          document.uri,
          new vscode.Position(0, 0),
          `import { ${componentName} } from '@smilexx2/ui'\n`
        )
        actions.push(action)
      }
    }
    
    return actions
  }
}
```

### 6. Component Data Management

#### Component Metadata
```typescript
// src/utils/componentData.ts
interface ComponentProp {
  name: string
  type: string
  description: string
  required: boolean
  defaultValue?: string
}

interface ComponentData {
  name: string
  props: ComponentProp[]
  examples: string[]
}

export const componentData: Record<string, ComponentData> = {
  Button: {
    name: 'Button',
    props: [
      {
        name: 'variant',
        type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
        description: 'The visual variant of the button',
        required: false,
        defaultValue: '"default"'
      },
      {
        name: 'size',
        type: '"default" | "sm" | "lg" | "icon"',
        description: 'The size of the button',
        required: false,
        defaultValue: '"default"'
      }
    ],
    examples: [
      '<Button variant="default">Default</Button>',
      '<Button variant="outline" size="sm">Small Outline</Button>'
    ]
  }
}
```

## Extension Features

### 1. Command Palette Integration
- "Insert UI Component" command
- "Preview Component" command
- "Generate Component Boilerplate" command

### 2. Syntax Highlighting
- Custom highlighting for component variants
- CSS class name highlighting
- Prop value highlighting

### 3. File Templates
- Component file templates
- Test file templates
- Story file templates

## Installation and Distribution

### VS Code Marketplace
```bash
# Build extension
vsce package

# Publish to marketplace
vsce publish
```

### Manual Installation
```bash
# Install .vsix file
code --install-extension ui-library-helpers-1.0.0.vsix
```

## Configuration

### Extension Settings
```json
{
  "ui-library.enablePreview": true,
  "ui-library.autoImport": true,
  "ui-library.snippetPrefix": "ui-",
  "ui-library.previewTheme": "light"
}
```

## Testing Strategy
- Unit tests for providers and utilities
- Integration tests with VS Code API
- Manual testing across different project types
- Performance testing for large files

## Resources
- [VS Code Extension API](https://code.visualstudio.com/api)
- [Language Server Protocol](https://microsoft.github.io/language-server-protocol/)
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Estimated Effort
3-4 weeks

## Notes
- Consider support for other IDEs (WebStorm, Sublime)
- Provide comprehensive documentation
- Include keyboard shortcuts for common actions
- Ensure performance with large codebases
- Plan for regular updates with new components