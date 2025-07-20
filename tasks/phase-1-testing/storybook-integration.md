# Storybook Integration and Story Migration

## Overview
Comprehensive guide for migrating from default Storybook examples to real component stories that showcase the actual UI library components.

## Phase
Phase 1: Testing Infrastructure

## Priority
Medium

## Dependencies
- Unit Testing Setup (Phase 4: Storybook Integration)

## Description
Replace the default Button/Header/Page stories with meaningful stories for the actual components in the UI library packages. This establishes a proper development environment for component testing and documentation.

## Current State Analysis

### Existing Default Stories (to be replaced)
- `storybook/src/stories/Button.stories.ts` - Generic button example
- `storybook/src/stories/Header.stories.ts` - Placeholder header component
- `storybook/src/stories/Page.stories.ts` - Sample page layout
- `storybook/src/stories/Configure.mdx` - Setup documentation

### Target Component Stories
- **@smilexx2/ui-core**: Utility function demonstrations
- **@smilexx2/ui**: Button component with all variants
- **@smilexx2/custom-button**: Enhanced button features

## Implementation Plan

### Phase 1: Core Component Stories

#### 1. UI Core Utilities Story
- Create utilities.stories.tsx demonstrating cn() function usage
- Show class merging examples with input/output displays
- Demonstrate Tailwind class precedence and conditional classes
- Include practical examples developers would actually use

#### 2. UI Button Component Stories
- Create comprehensive Button stories with all variants and sizes
- Add proper argTypes for interactive controls in Storybook
- Include stories for states (normal, disabled), icons, and accessibility
- Demonstrate buttonVariants utility for applying styles to other elements

#### 3. Custom Button Component Stories
- Create CustomButton stories showcasing enhanced features
- Include animation demonstrations and comparisons with standard Button
- Show all variants with custom enhancements
- Provide practical usage examples and configuration options

### Phase 2: Interactive Stories with Tests

#### 4. Interactive Button Stories
- Create interaction stories using @storybook/test for user workflows
- Test click interactions, keyboard navigation, and focus management
- Verify disabled state behavior and accessibility compliance
- Include multi-button interaction patterns

### Phase 3: Documentation and Examples

#### 5. Component Showcase Story
- Create comprehensive showcase demonstrating all components working together
- Include real-world usage examples (user profile cards, forms, etc.)
- Show accessibility features with proper ARIA labels and focus management
- Demonstrate consistent theming and styling across components

## Migration Steps

### Step 1: Remove Default Stories
- Remove placeholder Button/Header/Page story files and components
- Clean up default example assets and styles
- Keep Configure.mdx but prepare for library-specific updates

### Step 2: Create New Story Structure
- Create organized directory structure by package and purpose
- Separate core utilities, UI components, custom components, interactions, and showcase
- Establish consistent naming conventions for story files

### Step 3: Update Storybook Configuration
- Update main.ts to include all necessary addons (interactions, a11y, vitest)
- Configure TypeScript settings for proper component documentation
- Set up story discovery patterns for the new structure

### Step 4: Update Configure.mdx
- Replace generic welcome content with library-specific documentation
- Include installation instructions and import examples
- Document the story organization and how to use the Storybook effectively
- Add development workflow guidance for using interaction tests

## Acceptance Criteria
- [ ] Default Button/Header/Page stories removed
- [ ] Real component stories created for all packages
- [ ] Interactive stories with user interaction tests
- [ ] Accessibility testing integrated into stories  
- [ ] Component showcase demonstrating real-world usage
- [ ] Updated Configure.mdx with library-specific documentation
- [ ] Organized story structure with logical categorization
- [ ] All stories use actual components from the monorepo packages

## Files to Create/Modify
- `storybook/src/stories/ui-core/utilities.stories.tsx`
- `storybook/src/stories/ui/button.stories.tsx`
- `storybook/src/stories/custom/custom-button.stories.tsx`
- `storybook/src/stories/interactions/button-interactions.stories.tsx`
- `storybook/src/stories/showcase/component-showcase.stories.tsx`
- Update `storybook/src/stories/Configure.mdx`
- Update `.storybook/main.ts` configuration
- Remove default story files

## Resources
- [Storybook Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Storybook Interaction Testing](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
- [Storybook Accessibility Testing](https://storybook.js.org/docs/react/writing-tests/accessibility-testing)

## Estimated Effort
1 day

## Notes
- Focus on showcasing actual components, not generic examples
- Include practical usage examples that developers would actually use
- Ensure all stories demonstrate proper accessibility patterns
- Use interaction tests to verify component behavior
- Organize stories logically by package and purpose
- Maintain consistency with shadcn/ui documentation patterns