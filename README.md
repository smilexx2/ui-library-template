# shadcn/ui Extension Library

A collection of additional React components that extend and complement shadcn/ui. Built with TypeScript and designed to seamlessly integrate with your existing shadcn/ui setup.

## Features

- 🔗 **Extends shadcn/ui**: Works alongside your existing shadcn/ui components
- ⚡ **Built with modern tools**: React 19, TypeScript, Tailwind CSS
- 🎨 **Consistent design**: Follows shadcn/ui design principles and patterns
- ♿ **Accessibility first**: ARIA compliant components
- 📦 **Tree-shakeable**: Import only what you need
- 🔧 **TypeScript**: Full type safety and IntelliSense support
- 📱 **Responsive**: Mobile-first design principles

## Prerequisites

This library requires shadcn/ui to be set up in your project. If you haven't set it up yet:

1. Follow the [shadcn/ui installation guide](https://ui.shadcn.com/docs/installation)
2. Install the base components you need from shadcn/ui
3. Then install this extension library

## Installation

```bash
npm install @your-username/ui-library
```

### Peer Dependencies

This library has peer dependencies that should already be in your project if you're using shadcn/ui:

```bash
npm install react react-dom @radix-ui/react-slot class-variance-authority clsx tailwind-merge tailwindcss
```

## Quick Start

```tsx
import React from "react"
// shadcn/ui components (install these from shadcn/ui)
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
// Extension components from this library
import { StatsCard, UserProfile } from "@your-username/ui-library"
import { Users } from "lucide-react"

function App() {
  return (
    <div className="space-y-4">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Welcome to Extension Library</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Get Started</Button>
        </CardContent>
      </Card>

      <StatsCard
        title="Total Users"
        value="1,234"
        trend={{ value: 12.5, label: "increase", period: "last month" }}
        icon={<Users className="h-4 w-4" />}
      />

      <UserProfile
        user={{
          name: "John Doe",
          email: "john@example.com",
          status: "online",
          role: "admin"
        }}
      />
    </div>
  )
}

export default App
```

## Extension Components

### Data Components

#### DataTable

A sortable data table component for displaying tabular data:

```tsx
import { DataTable } from "@your-username/ui-library"

const columns = [
  { key: "name", title: "Name", sortable: true },
  { key: "email", title: "Email", sortable: true },
  { 
    key: "status", 
    title: "Status", 
    render: (value) => <Badge>{value}</Badge> 
  },
]

const data = [
  { name: "John Doe", email: "john@example.com", status: "Active" },
  { name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
]

<DataTable
  data={data}
  columns={columns}
  onRowClick={(row) => console.log(row)}
  loading={false}
  emptyMessage="No users found"
/>
```

#### StatsCard

A card component for displaying statistics with trends:

```tsx
import { StatsCard } from "@your-username/ui-library"
import { Users } from "lucide-react"

<StatsCard
  title="Total Users"
  value="1,234"
  description="Registered users in the system"
  trend={{ value: 12.5, label: "increase", period: "last month" }}
  icon={<Users className="h-4 w-4" />}
  variant="positive"
/>

// Available variants: default, positive, negative, neutral
```

### Input Components

#### FileUpload

A drag-and-drop file upload component:

```tsx
import { FileUpload } from "@your-username/ui-library"

<FileUpload
  onFilesChange={(files) => console.log(files)}
  accept="image/*"
  multiple={true}
  maxSize={10 * 1024 * 1024} // 10MB
  maxFiles={5}
/>
```

### Media Components

#### Avatar

Enhanced avatar component with fallback support:

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@your-username/ui-library"

<Avatar>
  <AvatarImage src="https://github.com/username.png" alt="@username" />
  <AvatarFallback>UN</AvatarFallback>
</Avatar>
```

### Feedback Components

#### Spinner

Loading spinner with various sizes and variants:

```tsx
import { Spinner } from "@your-username/ui-library"

<Spinner size="md" variant="default" label="Loading content..." />

// Available sizes: sm, md, lg, xl
// Available variants: default, secondary, destructive, muted
```

### Composite Components

#### UserProfile

A composite component for displaying user information with status and role:

```tsx
import { UserProfile } from "@your-username/ui-library"

<UserProfile
  user={{
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://github.com/johndoe.png",
    status: "online",
    role: "admin"
  }}
  size="md"
  showStatus={true}
  showRole={true}
/>

// Available sizes: sm, md, lg
// Available statuses: online, offline, away
```

## Theming

This library inherits theming from your shadcn/ui setup. All components use the same CSS variables and follow the same theming patterns as shadcn/ui components.

Since you're already using shadcn/ui, your existing theme configuration will automatically apply to these extension components.

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/your-username/ui-library.git
cd ui-library

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the library for production
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run typecheck` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License. See [LICENSE](LICENSE) for more information.

## Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) - Base component designs
- [Radix UI](https://www.radix-ui.com/) - Primitive components
- [Tailwind CSS](https://tailwindcss.com/) - Styling system
- [Lucide](https://lucide.dev/) - Icon library
