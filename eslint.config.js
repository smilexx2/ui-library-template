// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'

export default [js.configs.recommended, {
  files: ['packages/**/*.{js,jsx,ts,tsx}'],
  plugins: {
    '@typescript-eslint': typescript,
    react,
    'react-hooks': reactHooks,
  },
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    globals: {
      React: 'readonly',
      HTMLButtonElement: 'readonly',
      HTMLElement: 'readonly',
      MouseEvent: 'readonly',
      setTimeout: 'readonly',
      clearTimeout: 'readonly',
      console: 'readonly',
      window: 'readonly',
      document: 'readonly',
    },
  },
  rules: {
    ...typescript.configs.recommended.rules,
    ...react.configs.recommended.rules,
    ...reactHooks.configs.recommended.rules,
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-undef': 'off', // TypeScript handles this
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}, ...storybook.configs["flat/recommended"], ...storybook.configs["flat/recommended"]];