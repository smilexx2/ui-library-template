# Development Tooling

## Overview
Set up development tooling including git hooks, commit standards, and automated changelog generation.

## Phase
Phase 2: CI/CD & Automation

## Priority
High

## Dependencies
None

## Description
Implement development tools to maintain code quality, enforce commit standards, and automate routine tasks.

## Acceptance Criteria
- [ ] Husky configured for git hooks
- [ ] lint-staged set up for pre-commit checks
- [ ] Commitizen configured for conventional commits
- [ ] Automated changelog generation working
- [ ] Team documentation for development workflow

## Implementation Steps

### 1. Git Hooks with Husky
```bash
yarn add -D husky
yarn husky install
```
- Set up pre-commit hook for linting
- Add commit-msg hook for commit validation
- Configure pre-push hook for tests

### 2. Lint-Staged Configuration
```bash
yarn add -D lint-staged
```
Create `.lintstagedrc.json`:
```json
{
  "*.{ts,tsx,js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.{md,json}": [
    "prettier --write"
  ]
}
```

### 3. Conventional Commits
```bash
yarn add -D commitizen cz-conventional-changelog @commitlint/cli @commitlint/config-conventional
```
- Configure commitizen for consistent commit messages
- Set up commitlint for validation
- Add commit message templates

### 4. Changelog Generation
- Configure automatic changelog from conventional commits
- Integrate with release workflow
- Set up changelog formatting rules

### 5. Developer Documentation
- Create CONTRIBUTING.md with workflow guidelines
- Document commit message conventions
- Add setup instructions for new developers

## Files to Create/Modify
- `.husky/pre-commit`
- `.husky/commit-msg`
- `.husky/pre-push`
- `.lintstagedrc.json`
- `.commitlintrc.json`
- `CONTRIBUTING.md`
- Update package.json scripts

## Configuration Examples

### commitlint.config.js
```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      ['ui', 'core', 'custom-button', 'docs', 'storybook', 'ci']
    ]
  }
}
```

### package.json scripts
```json
{
  "scripts": {
    "commit": "cz",
    "prepare": "husky install"
  }
}
```

## Resources
- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged](https://github.com/okonet/lint-staged)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Commitizen](https://github.com/commitizen/cz-cli)

## Estimated Effort
1-2 days

## Notes
- Test hooks thoroughly before team adoption
- Consider team preferences for commit message format
- Provide escape mechanisms for emergency commits