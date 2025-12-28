# 🎴 SwipeOn React

[![npm version](https://img.shields.io/npm/v/swipeon-react.svg)](https://www.npmjs.com/package/swipeon-react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A high-performance, zero-dependency React swipe card library with smooth animations and multi-directional swipe support. Perfect for building Tinder-like interfaces, interactive card stacks, and gesture-based UI components.

## 🎬 Demo

<p align="center">
  <a href="assets/tinder-swipe-example.mp4">
    <img src="https://img.shields.io/badge/▶_Watch_Demo_Video-FF0000?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Watch Demo Video" />
  </a>
</p>

> 📹 **[Watch Demo Video](assets/tinder-swipe-example.mp4)** - Tinder-style profile cards with 4-direction swipes, custom overlay labels (LIKE/NOPE), and smooth 60fps animations.

## ✨ Features

- 🚀 **High Performance**: Optimized with `requestAnimationFrame` and hardware-accelerated transforms
- 🎯 **4-Way Swipe**: Support for left, right, up, and down swipes
- 📱 **Touch & Mouse**: Works seamlessly on both desktop and mobile devices
- 🎨 **Smooth Animations**: Butter-smooth 60fps animations with spring-back effects
- 💪 **TypeScript**: Full TypeScript support with comprehensive type definitions
- 🪶 **Zero Dependencies**: No external dependencies except React
- ⚙️ **Highly Configurable**: Customizable thresholds, velocities, and animations
- 🎭 **Rotation Effects**: Optional card rotation during drag for realistic feel

## 📦 Installation

```bash
npm install swipeon-react
```

```bash
yarn add swipeon-react
```

```bash
pnpm add swipeon-react
```

## 🚀 Quick Start

```tsx
import React from 'react';
import { SwipeCard } from 'swipeon-react';

function App() {
  return (
    <SwipeCard
      onSwipeLeft={() => console.log('Swiped left! 👈')}
      onSwipeRight={() => console.log('Swiped right! 👉')}
      onSwipeUp={() => console.log('Swiped up! 👆')}
      onSwipeDown={() => console.log('Swiped down! 👇')}
    >
      <div style={{ padding: '40px', background: '#fff', borderRadius: '10px' }}>
        <h2>Swipe me in any direction!</h2>
        <p>Works with mouse and touch</p>
      </div>
    </SwipeCard>
  );
}

export default App;
```

## 📖 API Reference

### SwipeCard Component

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **required** | Content to render inside the card |
| `onSwipeLeft` | `() => void` | `undefined` | Callback triggered when card is swiped left |
| `onSwipeRight` | `() => void` | `undefined` | Callback triggered when card is swiped right |
| `onSwipeUp` | `() => void` | `undefined` | Callback triggered when card is swiped up |
| `onSwipeDown` | `() => void` | `undefined` | Callback triggered when card is swiped down |
| `onSwipeStart` | `() => void` | `undefined` | Callback triggered when swipe starts |
| `onSwipeEnd` | `() => void` | `undefined` | Callback triggered when swipe ends |
| `threshold` | `number` | `100` | Minimum distance (px) required to trigger a swipe |
| `velocityThreshold` | `number` | `0.5` | Minimum velocity required to trigger a swipe |
| `maxRotation` | `number` | `15` | Maximum rotation angle (degrees) during drag |
| `exitDuration` | `number` | `300` | Duration (ms) of the exit animation |
| `returnDuration` | `number` | `200` | Duration (ms) of the spring-back animation |
| `enableRotation` | `boolean` | `true` | Enable/disable rotation effect during drag |
| `className` | `string` | `''` | Additional CSS class name |
| `style` | `CSSProperties` | `{}` | Additional inline styles |

### useSwipe Hook

For advanced use cases, you can use the `useSwipe` hook directly:

```tsx
import { useSwipe } from 'swipeon-react';

function CustomCard() {
  const { ref, transform, opacity, transition, isDragging } = useSwipe(
    {
      onSwipeLeft: () => console.log('Left!'),
      onSwipeRight: () => console.log('Right!'),
    },
    {
      threshold: 100,
      velocityThreshold: 0.5,
    }
  );

  return (
    <div
      ref={ref}
      style={{
        transform,
        opacity,
        transition,
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      Your content here
    </div>
  );
}
```

#### Hook Return Values

| Property | Type | Description |
|----------|------|-------------|
| `ref` | `RefObject<HTMLDivElement>` | Ref to attach to your swipeable element |
| `transform` | `string` | CSS transform value for positioning/rotation |
| `opacity` | `number` | Opacity value based on drag distance |
| `transition` | `string` | CSS transition value for animations |
| `isDragging` | `boolean` | Whether the element is currently being dragged |

## 💡 Examples

### Card Stack (Tinder-like)

```tsx
import React, { useState } from 'react';
import { SwipeCard } from 'swipeon-react';

const cards = [
  { id: 1, name: 'Card 1', image: '/card1.jpg' },
  { id: 2, name: 'Card 2', image: '/card2.jpg' },
  { id: 3, name: 'Card 3', image: '/card3.jpg' },
];

function CardStack() {
  const [deck, setDeck] = useState(cards);

  const handleRemove = () => {
    setTimeout(() => {
      setDeck((prev) => prev.slice(0, -1));
    }, 300);
  };

  if (deck.length === 0) {
    return <div>No more cards!</div>;
  }

  return (
    <div style={{ position: 'relative', width: '300px', height: '400px' }}>
      {deck.map((card, index) => (
        <SwipeCard
          key={card.id}
          onSwipeLeft={handleRemove}
          onSwipeRight={handleRemove}
          onSwipeUp={handleRemove}
          onSwipeDown={handleRemove}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: deck.length - index,
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            background: '#fff',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          }}>
            <img src={card.image} alt={card.name} style={{ width: '100%' }} />
            <h3>{card.name}</h3>
          </div>
        </SwipeCard>
      ))}
    </div>
  );
}
```

### Custom Thresholds

```tsx
<SwipeCard
  threshold={150}           // Require 150px movement
  velocityThreshold={0.8}   // Require faster swipes
  maxRotation={25}          // More dramatic rotation
  exitDuration={500}        // Slower exit animation
>
  <YourContent />
</SwipeCard>
```

### Disable Rotation

```tsx
<SwipeCard
  enableRotation={false}
  onSwipeLeft={() => console.log('Left')}
  onSwipeRight={() => console.log('Right')}
>
  <YourContent />
</SwipeCard>
```

### Only Horizontal Swipes

```tsx
<SwipeCard
  onSwipeLeft={() => handleSwipe('left')}
  onSwipeRight={() => handleSwipe('right')}
  // Don't provide onSwipeUp/onSwipeDown
>
  <YourContent />
</SwipeCard>
```

## 🎨 Styling

The component applies minimal styling by default. You can customize appearance using:

1. **CSS Classes**:
```tsx
<SwipeCard className="my-custom-card">
  <YourContent />
</SwipeCard>
```

2. **Inline Styles**:
```tsx
<SwipeCard 
  style={{ 
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
  }}
>
  <YourContent />
</SwipeCard>
```

3. **Styled Components / Emotion**:
```tsx
const StyledSwipeCard = styled(SwipeCard)`
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
`;
```

## ⚡ Performance Tips

1. **Use `key` prop**: When rendering multiple cards, always provide a unique `key`
2. **Optimize callbacks**: Use `useCallback` for swipe handlers to prevent unnecessary re-renders
3. **Limit card stack**: Don't render more than 3-5 cards in a stack
4. **Optimize images**: Use appropriately sized images to improve performance
5. **CSS containment**: The library uses `will-change` and `transform3d` for hardware acceleration

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Running the Demo

```bash
# Clone the repository
git clone https://github.com/react-forge/swipeon-react.git
cd swipeon-react

# Install dependencies
npm install

# Run the demo
cd example
npm install
npm run dev
```

The demo will open at `http://localhost:3000`

## 🛠️ Development

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Watch mode for development
npm run dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT © [react-forge](https://github.com/react-forge)

## 🙏 Acknowledgments

- Inspired by Tinder's swipe interface
- Built with React and TypeScript
- Uses Pointer Events API for unified input handling

## 📧 Support

- 🐛 [Report a bug](https://github.com/react-forge/swipeon-react/issues)
- 💡 [Request a feature](https://github.com/react-forge/swipeon-react/issues)
- 📖 [Read the docs](https://github.com/react-forge/swipeon-react#readme)

---

Made with ❤️ by [react-forge](https://github.com/react-forge)
