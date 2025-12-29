# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2025-12-29

### 🔧 Patch Release

- Version bump and improvements

## [1.0.6] - 2025-12-29

### 🔧 Patch Release

- Version bump and improvements

## [1.0.4] - 2025-12-29

### 🔧 Patch Release

- Added automated changelog updates on publish
- Enhanced publish scripts with patch, minor, and major version support
- Improved development workflow documentation

## [1.0.3] - 2025-12-28

### 🔧 Patch Release

- Bug fixes and stability improvements
- Documentation updates

## [1.0.2] - 2025-12-28

### 🔧 Patch Release

- Minor bug fixes
- Performance optimizations

## [1.0.1] - 2025-12-27

### 🔧 Patch Release

- Post-release bug fixes
- Documentation improvements

## [1.0.0] - 2025-12-27

### 🎉 First Stable Release

This marks the first stable release of SwipeOn React! The library is now production-ready with a complete feature set and stable API.

### Added
- Production-ready `SwipeCard` component for building Tinder-like interfaces
- `useSwipe` hook for advanced customization and full control
- Direction-specific overlay support with dynamic opacity based on swipe progress
- Comprehensive TypeScript definitions for all props and callbacks
- Full documentation and Storybook examples

### Features
- 🚀 High-performance 60fps animations with hardware acceleration
- 🎯 4-way swipe support (left, right, up, down)
- 📱 Unified touch and mouse input handling via Pointer Events API
- 🎨 Configurable rotation effects during drag
- ⚡ Velocity-based swipe detection for natural feel
- 🪶 Zero external dependencies (React 16.8+ only)
- 🔧 Highly configurable thresholds, durations, and animations

### Performance
- Uses `requestAnimationFrame` for smooth gesture tracking
- Hardware-accelerated CSS transforms (`translate3d`)
- Optimized state management to minimize re-renders
- CSS `will-change` hints for browser optimization

---

## [0.0.1-alpha.3] - 2025-12-27

### Fixed
- Bug fixes and minor improvements
- Stability enhancements

## [0.0.1-alpha.1] - 2025-12-23

### Added
- Initial alpha release
- Basic swipe functionality for cards (images)
- Support for 4-way swipes (left, right, up, down)
- Smooth animations using CSS transforms and requestAnimationFrame
- High-performance gesture tracking with pointer events
- TypeScript support with comprehensive type definitions
- Configurable thresholds and animation durations
- Optional rotation effects during drag
- Zero external dependencies (except React)
- Touch and mouse event support
- Hardware-accelerated animations
- Demo application with interactive examples
- Comprehensive documentation

### Features
- `SwipeCard` component for easy integration
- `useSwipe` hook for advanced customization
- Velocity-based swipe detection
- Spring-back animation when swipe is cancelled
- Customizable callbacks for all swipe directions
- Smooth 60fps animations
- Optimized for mobile and desktop

### Performance
- Uses `requestAnimationFrame` for smooth updates
- Hardware-accelerated CSS transforms (`translate3d`)
- Minimal re-renders with efficient state management
- Passive event listeners where appropriate
- CSS containment and `will-change` optimization

[1.0.7]: https://github.com/react-forge/swipeon-react/releases/tag/v1.0.7
[1.0.6]: https://github.com/react-forge/swipeon-react/releases/tag/v1.0.6
[1.0.4]: https://github.com/react-forge/swipeon-react/releases/tag/v1.0.4
[1.0.3]: https://github.com/react-forge/swipeon-react/releases/tag/v1.0.3
[1.0.2]: https://github.com/react-forge/swipeon-react/releases/tag/v1.0.2
[1.0.1]: https://github.com/react-forge/swipeon-react/releases/tag/v1.0.1
[1.0.0]: https://github.com/react-forge/swipeon-react/releases/tag/v1.0.0
[0.0.1-alpha.3]: https://github.com/react-forge/swipeon-react/releases/tag/v0.0.1-alpha.3
[0.0.1-alpha.1]: https://github.com/react-forge/swipeon-react/releases/tag/v0.0.1-alpha.1
