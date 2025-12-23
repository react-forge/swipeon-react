# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1-alpha-1] - 2025-12-23

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

[0.0.1-alpha-1]: https://github.com/react-forge/swipeon-react/releases/tag/v0.0.1-alpha-1

