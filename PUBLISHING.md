# Publishing Guide

This guide explains how to publish `swipeon-react` to npm.

## Prerequisites

1. **npm account**: You need an npm account. Create one at [npmjs.com](https://www.npmjs.com/signup)
2. **npm login**: Login to npm from your terminal:
   ```bash
   npm login
   ```

## Pre-publish Checklist

Before publishing, ensure:

- [ ] All tests pass (if applicable)
- [ ] Code is properly linted
- [ ] Version number is updated in `package.json`
- [ ] `CHANGELOG.md` is updated with changes
- [ ] `README.md` is up to date
- [ ] All dependencies are installed: `npm install`
- [ ] Build succeeds: `npm run build`
- [ ] `dist/` folder contains the built files

## Version Numbering

Follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version (1.0.0): Breaking changes
- **MINOR** version (0.1.0): New features, backwards compatible
- **PATCH** version (0.0.1): Bug fixes, backwards compatible

### Alpha/Beta Releases

For pre-release versions:
- Alpha: `0.0.1-alpha-1`, `0.0.1-alpha-2`, etc.
- Beta: `0.0.1-beta-1`, `0.0.1-beta-2`, etc.
- Release Candidate: `0.0.1-rc-1`, `0.0.1-rc-2`, etc.

## Publishing Steps

### 1. Update Version

Update version in `package.json`:
```json
{
  "version": "0.0.1-alpha-1"
}
```

### 2. Update Changelog

Add changes to `CHANGELOG.md` under the new version.

### 3. Build the Package

```bash
npm run build
```

This will:
- Clean the `dist/` directory
- Compile TypeScript
- Generate type definitions
- Create ESM and CJS bundles
- Minify the code

### 4. Test the Build Locally

Test the built package locally before publishing:

```bash
npm pack
```

This creates a `.tgz` file you can install locally for testing:

```bash
cd ../test-project
npm install ../swipeon-react/swipeon-react-0.0.1-alpha-1.tgz
```

### 5. Publish to npm

For alpha/beta versions, use the `--tag` flag:

```bash
npm publish --tag alpha
```

For stable releases:

```bash
npm publish
```

### 6. Verify Publication

Check the package on npm:
```
https://www.npmjs.com/package/swipeon-react
```

## Post-publish

1. **Create Git tag**:
   ```bash
   git tag v0.0.1-alpha-1
   git push origin v0.0.1-alpha-1
   ```

2. **Create GitHub release**: Create a release on GitHub with the changelog

3. **Announce**: Share on social media, forums, etc.

## Publishing Tags

- `latest`: Default tag for stable releases
- `alpha`: For alpha releases (use `--tag alpha`)
- `beta`: For beta releases (use `--tag beta`)
- `next`: For next version previews

Users can install specific tags:
```bash
npm install swipeon-react@alpha
npm install swipeon-react@beta
npm install swipeon-react@latest
```

## Unpublishing

If you need to unpublish (within 72 hours):

```bash
npm unpublish swipeon-react@0.0.1-alpha-1
```

**Note**: Unpublishing is discouraged. Use deprecation instead:

```bash
npm deprecate swipeon-react@0.0.1-alpha-1 "This version has been deprecated"
```

## Troubleshooting

### "Package already exists"
- Version already published. Bump the version number.

### "403 Forbidden"
- Not logged in: Run `npm login`
- No permission: Check package name availability
- Organization package: Ensure you have write access

### Build errors
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npx tsc --noEmit`
- Verify rollup config: `rollup.config.js`

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Publishing Guide](https://docs.npmjs.com/cli/v8/commands/npm-publish)

