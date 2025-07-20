# Publishing Setup

## Overview
Configure NPM publishing, version management, and release automation for all packages in the monorepo.

## Phase
Phase 3: Documentation & Publishing

## Priority
High

## Dependencies
- GitHub Actions Workflows
- Development Tooling

## Description
Set up automated publishing pipeline to distribute packages to NPM registry with proper versioning and release management.

## Acceptance Criteria
- [ ] NPM publishing configuration for all packages
- [ ] Changesets for version management configured
- [ ] Release automation workflow working
- [ ] Beta/canary release channels set up
- [ ] Package registry and scoped publishing working

## Implementation Steps

### 1. NPM Publishing Configuration
Update package.json files with:
```json
{
  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ]
}
```

### 2. Changesets Configuration
```bash
yarn add -D @changesets/cli
yarn changeset init
```
Configure `.changeset/config.json`:
```json
{
  "changelog": "@changesets/changelog-github",
  "commit": false,
  "fixed": [],
  "linked": [],
  "access": "public",
  "baseBranch": "main",
  "updateInternalDependencies": "patch",
  "ignore": ["docs", "storybook"]
}
```

### 3. Release Automation
Create GitHub workflow for:
- Automated version bumping
- Changelog generation
- Package publishing to NPM
- GitHub release creation
- Tag management

### 4. Beta/Canary Releases
Set up alternative release channels:
- `@smilexx2/ui@beta` for preview features
- `@smilexx2/ui@canary` for development builds
- Automated canary releases from main branch

### 5. Registry Configuration
- Configure NPM organization/scope
- Set up package access permissions
- Configure 2FA requirements
- Set up team access controls

## Files to Create/Modify
- Update all `package.json` files
- `.changeset/config.json`
- `.github/workflows/release.yml`
- `.npmrc` (for local development)
- `scripts/publish.js` (custom publishing logic)

## Workflow Configuration

### Release Workflow
```yaml
name: Release
on:
  push:
    branches: [main]
jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: actions/setup-node@v4
        with:
          registry-url: 'https://registry.npmjs.org'
      - run: yarn install --frozen-lockfile
      - run: yarn build
      - run: yarn test
      - name: Create Release Pull Request or Publish
        uses: changesets/action@v1
        with:
          publish: yarn release
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### Package.json Scripts
```json
{
  "scripts": {
    "changeset": "changeset",
    "changeset:version": "changeset version",
    "changeset:publish": "changeset publish",
    "release": "yarn build && yarn changeset:publish"
  }
}
```

## Publishing Checklist
- [ ] Package builds successfully
- [ ] All tests pass
- [ ] Documentation is up-to-date
- [ ] Version bump is appropriate
- [ ] Changelog is generated
- [ ] NPM token is valid
- [ ] Package access is configured

## Resources
- [Changesets Documentation](https://github.com/changesets/changesets)
- [NPM Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [NPM Scoped Packages](https://docs.npmjs.com/cli/v7/using-npm/scope)

## Estimated Effort
2-3 days

## Notes
- Test publishing process in dry-run mode first
- Set up package download analytics
- Consider provenance attestation for security
- Plan for handling breaking changes and deprecations