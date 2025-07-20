# CLI Tools

## Overview
Develop command-line tools to enhance developer productivity including component scaffolding, theme generation, icon management, and migration assistance.

## Phase
Phase 6: Developer Experience

## Priority
Medium

## Dependencies
- Core Components
- Advanced Features

## Description
Create a comprehensive CLI toolkit that streamlines common development tasks and reduces friction for developers using the component library.

## Acceptance Criteria
- [ ] Component scaffolding CLI with templates
- [ ] Theme generator for custom color schemes
- [ ] Icon management tool for bundling and optimization
- [ ] Migration assistant for upgrading between versions
- [ ] Package initialization wizard

## Implementation Steps

### 1. Component Scaffolding CLI

#### CLI Setup
```bash
yarn add -D commander inquirer chalk fs-extra
```

Create `packages/cli/`:
```typescript
// src/commands/create-component.ts
import { Command } from 'commander'
import inquirer from 'inquirer'
import { generateComponent } from '../generators/component'

export const createComponentCommand = new Command()
  .name('create-component')
  .description('Generate a new component with templates')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Component name:',
        validate: (input) => input.length > 0
      },
      {
        type: 'list',
        name: 'type',
        message: 'Component type:',
        choices: ['basic', 'compound', 'form', 'layout']
      },
      {
        type: 'confirm',
        name: 'withStories',
        message: 'Include Storybook stories?',
        default: true
      }
    ])
    
    await generateComponent(answers)
  })
```

#### Component Templates
```typescript
// templates/component.hbs
import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@smilexx2/ui-core'

const {{camelCase name}}Variants = cva(
  "{{baseClasses}}",
  {
    variants: {
      variant: {
        default: "{{defaultVariant}}",
        secondary: "{{secondaryVariant}}"
      },
      size: {
        default: "{{defaultSize}}",
        sm: "{{smallSize}}",
        lg: "{{largeSize}}"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface {{pascalCase name}}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof {{camelCase name}}Variants> {}

const {{pascalCase name}} = React.forwardRef<HTMLDivElement, {{pascalCase name}}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn({{camelCase name}}Variants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
{{pascalCase name}}.displayName = "{{pascalCase name}}"

export { {{pascalCase name}}, {{camelCase name}}Variants }
```

### 2. Theme Generator

#### Theme CLI Command
```typescript
// src/commands/generate-theme.ts
export const generateThemeCommand = new Command()
  .name('generate-theme')
  .description('Generate custom theme configuration')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'primary',
        message: 'Primary color (hex):',
        validate: (input) => /^#[0-9A-F]{6}$/i.test(input)
      },
      {
        type: 'list',
        name: 'preset',
        message: 'Color palette preset:',
        choices: ['minimal', 'vibrant', 'professional', 'custom']
      }
    ])
    
    await generateThemeConfig(answers)
  })
```

#### Color Palette Generation
```typescript
// utils/color-generator.ts
import { colord } from 'colord'

export const generatePalette = (baseColor: string) => {
  const base = colord(baseColor)
  
  return {
    50: base.lighten(0.4).toHex(),
    100: base.lighten(0.3).toHex(),
    200: base.lighten(0.2).toHex(),
    300: base.lighten(0.1).toHex(),
    400: base.lighten(0.05).toHex(),
    500: base.toHex(),
    600: base.darken(0.05).toHex(),
    700: base.darken(0.1).toHex(),
    800: base.darken(0.2).toHex(),
    900: base.darken(0.3).toHex(),
    950: base.darken(0.4).toHex()
  }
}
```

### 3. Icon Management Tool

#### Icon CLI Commands
```typescript
// src/commands/icons.ts
export const iconsCommand = new Command()
  .name('icons')
  .description('Manage icon assets')

iconsCommand
  .command('optimize')
  .description('Optimize SVG icons')
  .action(async () => {
    await optimizeIcons()
  })

iconsCommand
  .command('generate')
  .description('Generate icon components from SVGs')
  .action(async () => {
    await generateIconComponents()
  })
```

#### Icon Optimization
```bash
yarn add -D svgo
```

```typescript
// utils/icon-optimizer.ts
import { optimize } from 'svgo'
import { readdir, readFile, writeFile } from 'fs/promises'

export const optimizeIcons = async () => {
  const iconFiles = await readdir('src/icons')
  
  for (const file of iconFiles.filter(f => f.endsWith('.svg'))) {
    const content = await readFile(`src/icons/${file}`, 'utf8')
    const optimized = optimize(content, {
      plugins: [
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeViewBox',
        'removeHiddenElems'
      ]
    })
    
    await writeFile(`src/icons/optimized/${file}`, optimized.data)
  }
}
```

### 4. Migration Assistant

#### Migration CLI
```typescript
// src/commands/migrate.ts
export const migrateCommand = new Command()
  .name('migrate')
  .description('Migrate between library versions')
  .argument('<from>', 'Source version')
  .argument('<to>', 'Target version')
  .action(async (from, to) => {
    const migrationPath = findMigrationPath(from, to)
    await runMigration(migrationPath)
  })
```

#### Code Transformation
```bash
yarn add -D jscodeshift
```

```typescript
// migrations/v1-to-v2.ts
import { Transform } from 'jscodeshift'

const transform: Transform = (file, api) => {
  const j = api.jscodeshift
  const root = j(file.source)
  
  // Transform deprecated prop names
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: 'Button' }
      }
    })
    .find(j.JSXAttribute, {
      name: { name: 'type' }
    })
    .forEach(path => {
      path.node.name.name = 'variant'
    })
  
  return root.toSource()
}

export default transform
```

### 5. Package Initialization

#### Init Command
```typescript
// src/commands/init.ts
export const initCommand = new Command()
  .name('init')
  .description('Initialize project with UI library')
  .action(async () => {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'Choose your framework:',
        choices: ['React', 'Next.js', 'Vite', 'Create React App']
      },
      {
        type: 'checkbox',
        name: 'packages',
        message: 'Select packages to install:',
        choices: [
          '@smilexx2/ui-core',
          '@smilexx2/ui',
          '@smilexx2/custom-button'
        ]
      }
    ])
    
    await initializeProject(answers)
  })
```

## CLI Package Structure
```
packages/cli/
├── src/
│   ├── commands/
│   │   ├── create-component.ts
│   │   ├── generate-theme.ts
│   │   ├── icons.ts
│   │   ├── migrate.ts
│   │   └── init.ts
│   ├── templates/
│   │   ├── component.hbs
│   │   ├── stories.hbs
│   │   └── test.hbs
│   ├── utils/
│   │   ├── color-generator.ts
│   │   ├── file-generator.ts
│   │   └── migration-runner.ts
│   └── index.ts
├── bin/
│   └── ui-cli.js
└── package.json
```

## Installation and Usage

### Package Installation
```bash
npm install -g @smilexx2/cli
```

### Usage Examples
```bash
# Create new component
ui-cli create-component

# Generate theme
ui-cli generate-theme

# Optimize icons
ui-cli icons optimize

# Migrate code
ui-cli migrate v1.0.0 v2.0.0

# Initialize project
ui-cli init
```

## Testing Strategy
- Unit tests for all CLI commands
- Integration tests with temporary directories
- Snapshot tests for generated files
- Cross-platform compatibility testing

## Resources
- [Commander.js Documentation](https://github.com/tj/commander.js)
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js)
- [JSCodeshift](https://github.com/facebook/jscodeshift)
- [SVGO](https://github.com/svg/svgo)

## Estimated Effort
4-6 weeks

## Notes
- Ensure cross-platform compatibility
- Provide comprehensive help documentation
- Consider plugin architecture for extensibility
- Test with various project structures
- Maintain backward compatibility for migrations