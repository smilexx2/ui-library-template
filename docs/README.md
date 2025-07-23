# UI Library Documentation

This is the documentation site for the @smilexx2 UI library packages, built with [Next.js](https://nextjs.org) and [Nextra](https://nextra.site/).

## Features

- 📚 **MDX Documentation**: Write documentation in Markdown with React components
- 🎨 **Interactive Examples**: Live code editing with react-live integration
- 🌙 **Dark Mode**: Automatic theme switching support
- 🔍 **Search**: Built-in search functionality
- 📱 **Responsive**: Mobile-friendly documentation

## Getting Started

First, install dependencies:

```bash
yarn install
```

Then run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the documentation.

## Project Structure

```
docs/
├── src/
│   ├── app/                    # Next.js app directory
│   ├── components/             # React components
│   │   ├── LiveCodeBlock.tsx   # Interactive code editor
│   │   └── ui-components.tsx   # UI library component exports
│   ├── content/                # Documentation content
│   │   ├── index.mdx          # Home page
│   │   ├── installation.mdx   # Installation guide
│   │   ├── components.mdx     # Components overview
│   │   └── components/        # Individual component docs
│   │       └── button.mdx     # Button documentation
│   └── mdx-components.js      # MDX component mapping
├── public/                    # Static assets
└── package.json              # Dependencies and scripts
```

## Writing Documentation

### Adding a New Page

1. Create a new `.mdx` file in the `src/content/` directory
2. Add the page to `_meta.json` for navigation
3. Write your content using Markdown and React components

### Using Interactive Examples

Use the `<LiveCodeBlock>` component for interactive code examples:

```jsx
<LiveCodeBlock
  code={`() => {
  const [count, setCount] = React.useState(0)
  
  return (
    <CustomButton onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </CustomButton>
  )
}`}
/>
```

The LiveCodeBlock automatically includes:
- React
- CustomButton
- Spinner
- Any other components from ui-components.tsx

### Available Components in MDX

- `CustomButton` - Enhanced button component
- `Spinner` - Loading spinner component
- `LiveCodeBlock` - Interactive code editor
- All default Nextra components

## Scripts

- `yarn dev` - Start development server with Turbopack
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

## Technologies

- **Next.js 15.4** - React framework
- **Nextra 4.2** - Documentation theme
- **react-live 4.1** - Interactive code examples
- **Tailwind CSS 4.1** - Styling
- **TypeScript 5.8** - Type safety

## Contributing

1. Keep documentation clear and concise
2. Include interactive examples where helpful
3. Test all code examples before committing
4. Follow the existing structure and patterns

## Learn More

- [Nextra Documentation](https://nextra.site/docs)
- [MDX Documentation](https://mdxjs.com/)
- [react-live Documentation](https://github.com/FormidableLabs/react-live)