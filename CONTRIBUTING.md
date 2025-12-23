# Contributing to SwipeOn React

Thank you for your interest in contributing to SwipeOn React! We welcome contributions from the community.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/swipeon-react.git
   cd swipeon-react
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```

## Development Workflow

### Running the Demo

```bash
cd example
npm install
npm run dev
```

The demo will be available at `http://localhost:3000`

### Building the Library

```bash
npm run build
```

This will create the distribution files in the `dist/` directory.

### Development Mode

```bash
npm run dev
```

This runs the build in watch mode, automatically rebuilding when you make changes.

## Code Guidelines

### TypeScript

- Use TypeScript for all new code
- Ensure proper type definitions
- Avoid using `any` type unless absolutely necessary
- Export types that users might need

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Performance

- Prioritize performance in all changes
- Use `requestAnimationFrame` for animations
- Avoid unnecessary re-renders
- Test on both desktop and mobile devices

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```
feat: add support for custom easing functions
fix: resolve memory leak in gesture cleanup
docs: update API reference with new props
```

## Pull Request Process

1. **Create a feature branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them with clear messages

3. **Test your changes** thoroughly:
   - Build the library: `npm run build`
   - Test the demo app
   - Check for TypeScript errors

4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request** on GitHub:
   - Provide a clear description of the changes
   - Reference any related issues
   - Include screenshots/GIFs for UI changes

## Reporting Issues

### Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/OS information
- Code snippet (if applicable)

### Feature Requests

When requesting features, please include:
- Clear description of the feature
- Use cases and examples
- Why this feature would be beneficial

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn and grow

## Questions?

Feel free to open an issue with the `question` label if you need help or clarification.

## License

By contributing to SwipeOn React, you agree that your contributions will be licensed under the MIT License.

