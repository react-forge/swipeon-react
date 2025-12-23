# Getting Started with SwipeOn React

This guide will help you set up the development environment and start working with the SwipeOn React library.

## Installation

### 1. Install Dependencies

First, install the project dependencies:

```bash
npm install
```

### 2. Build the Library

Build the library to create the distribution files:

```bash
npm run build
```

This will create:
- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `dist/index.d.ts` - TypeScript type definitions
- Source maps for debugging

### 3. Run the Demo

To see the library in action:

```bash
cd example
npm install
npm run dev
```

The demo will open at `http://localhost:3000`

## Development Workflow

### Watch Mode

For continuous development, use watch mode:

```bash
npm run dev
```

This will rebuild the library automatically when you make changes to the source files.

### Project Structure

```
swipeon-react/
├── src/                      # Source code
│   ├── components/           # React components
│   │   └── SwipeCard.tsx    # Main SwipeCard component
│   ├── hooks/                # Custom React hooks
│   │   └── useSwipe.ts      # Core swipe logic hook
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts         # All type exports
│   ├── utils/                # Utility functions
│   │   └── helpers.ts       # Helper functions
│   └── index.ts             # Main entry point
├── example/                  # Demo application
│   ├── app.tsx              # Demo React app
│   ├── index.html           # Demo HTML
│   └── package.json         # Demo dependencies
├── dist/                     # Build output (generated)
├── package.json             # Package configuration
├── tsconfig.json            # TypeScript configuration
├── rollup.config.js         # Build configuration
└── README.md                # Documentation
```

## Making Changes

### 1. Modify Source Code

All source code is in the `src/` directory:

- **Components**: Add/modify React components in `src/components/`
- **Hooks**: Add/modify hooks in `src/hooks/`
- **Types**: Update TypeScript types in `src/types/`
- **Utils**: Add helper functions in `src/utils/`

### 2. Test Your Changes

Test your changes in the demo app:

1. In one terminal, run watch mode:
   ```bash
   npm run dev
   ```

2. In another terminal, run the demo:
   ```bash
   cd example
   npm run dev
   ```

3. Make changes to source files and see them reflected in the demo

### 3. Build for Production

When ready, build the production version:

```bash
npm run build
```

## Key Files Explained

### `src/hooks/useSwipe.ts`

The core hook that handles:
- Pointer/touch event tracking
- Gesture state management
- Animation calculations
- Velocity and threshold detection

### `src/components/SwipeCard.tsx`

The main component that:
- Uses the `useSwipe` hook
- Applies styles and animations
- Handles callbacks
- Manages the card element

### `src/types/index.ts`

TypeScript definitions for:
- Component props
- Hook configuration
- Callback functions
- Internal state types

### `rollup.config.js`

Build configuration that:
- Compiles TypeScript
- Generates type definitions
- Creates ESM and CJS bundles
- Minifies the code

## Development Tips

### Performance

The library uses several performance optimizations:
- `requestAnimationFrame` for smooth animations
- `transform3d` for hardware acceleration
- `will-change` CSS property
- Minimal re-renders with refs

### TypeScript

- All code is written in TypeScript
- Type definitions are automatically generated
- Use proper types for all functions and components

### Testing Changes

1. **Local testing**: Use `npm link` to test in other projects:
   ```bash
   npm link
   cd ../your-test-project
   npm link swipeon-react
   ```

2. **Pack testing**: Create a tarball for testing:
   ```bash
   npm pack
   # Install the .tgz file in another project
   ```

## Common Tasks

### Adding a New Feature

1. Add types in `src/types/index.ts`
2. Implement logic in `src/hooks/useSwipe.ts` or create new hook
3. Update `src/components/SwipeCard.tsx` if needed
4. Export from `src/index.ts`
5. Update documentation in `README.md`
6. Test in demo app

### Fixing a Bug

1. Identify the issue
2. Fix in appropriate file(s)
3. Test in demo app
4. Update `CHANGELOG.md`
5. Build and verify: `npm run build`

### Updating Documentation

1. Update `README.md` for user-facing changes
2. Update JSDoc comments in code
3. Update `CHANGELOG.md` with changes
4. Update demo app if needed

## Next Steps

- Read the [README.md](README.md) for usage examples
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- See [PUBLISHING.md](PUBLISHING.md) for publishing instructions
- Explore the demo app in `example/` for inspiration

## Getting Help

- Open an issue on GitHub
- Check existing documentation
- Review the demo app code
- Read the source code comments

Happy coding! 🚀

