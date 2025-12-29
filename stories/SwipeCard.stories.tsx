import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useCallback } from 'react';
import { SwipeCard } from '../src';

const meta: Meta<typeof SwipeCard> = {
  title: 'Components/SwipeCard',
  component: SwipeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A performant swipeable card component with smooth animations and multi-directional swipe support.

## Features
- 🎯 Swipe in all 4 directions (left, right, up, down)
- ⚡ 60 FPS animations with hardware acceleration
- 🎨 Customizable overlays with direction-specific styling
- 🔧 Configurable thresholds and velocity detection
- 📱 Works with touch, mouse, and trackpad

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| \`children\` | \`ReactNode\` | **required** | Content to render inside the card |
| \`className\` | \`string\` | \`''\` | Additional CSS class name |
| \`style\` | \`CSSProperties\` | \`undefined\` | Additional inline styles |
| \`onSwipeLeft\` | \`() => void\` | \`undefined\` | Callback when swiped left |
| \`onSwipeRight\` | \`() => void\` | \`undefined\` | Callback when swiped right |
| \`onSwipeUp\` | \`() => void\` | \`undefined\` | Callback when swiped up |
| \`onSwipeDown\` | \`() => void\` | \`undefined\` | Callback when swiped down |
| \`onSwipeStart\` | \`() => void\` | \`undefined\` | Callback when swipe gesture starts |
| \`onSwipeEnd\` | \`() => void\` | \`undefined\` | Callback when swipe gesture ends |
| \`threshold\` | \`number\` | \`100\` | Minimum distance (px) to trigger a swipe |
| \`velocityThreshold\` | \`number\` | \`0.5\` | Minimum velocity to trigger a swipe |
| \`maxRotation\` | \`number\` | \`15\` | Maximum rotation angle (degrees) during drag |
| \`exitDuration\` | \`number\` | \`300\` | Duration of exit animation (ms) |
| \`returnDuration\` | \`number\` | \`200\` | Duration of spring-back animation (ms) |
| \`enableRotation\` | \`boolean\` | \`true\` | Enable/disable rotation effect |
| \`preventSwipe\` | \`SwipeDirection[]\` | \`[]\` | Directions to prevent swiping |
| \`fadeOnSwipe\` | \`boolean\` | \`true\` | Enable/disable opacity fade while swiping |
| \`showOverlay\` | \`boolean\` | \`true\` | Show/hide the swipe direction overlay |
| \`swipeStyles\` | \`SwipeStyles\` | \`undefined\` | Custom styles for each swipe direction |
| \`cardKey\` | \`string \\| number\` | \`undefined\` | Unique key for the card (useful in lists) |

## SwipeStyles Type

\`\`\`typescript
interface SwipeStyles {
  right?: SwipeDirectionStyle;
  left?: SwipeDirectionStyle;
  up?: SwipeDirectionStyle;
  down?: SwipeDirectionStyle;
}

interface SwipeDirectionStyle {
  backgroundColor?: string;  // Overlay background color
  label?: string;            // Label text to display
  labelStyle?: CSSProperties; // Custom styles for the label
}
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      description: 'Content to render inside the card',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS class name',
      table: {
        defaultValue: { summary: "''" },
      },
    },
    style: {
      description: 'Additional inline styles for the card wrapper',
      table: {
        type: { summary: 'CSSProperties' },
      },
    },
    threshold: {
      control: { type: 'range', min: 50, max: 300, step: 10 },
      description: 'Minimum distance (in pixels) required to trigger a swipe',
      table: {
        defaultValue: { summary: '100' },
      },
    },
    velocityThreshold: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
      description: 'Minimum velocity required to trigger a swipe',
      table: {
        defaultValue: { summary: '0.5' },
      },
    },
    maxRotation: {
      control: { type: 'range', min: 0, max: 45, step: 1 },
      description: 'Maximum rotation angle in degrees during drag',
      table: {
        defaultValue: { summary: '15' },
      },
    },
    exitDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'Duration of the exit animation in milliseconds',
      table: {
        defaultValue: { summary: '300' },
      },
    },
    returnDuration: {
      control: { type: 'range', min: 100, max: 500, step: 25 },
      description: 'Duration of the spring-back animation in milliseconds',
      table: {
        defaultValue: { summary: '200' },
      },
    },
    enableRotation: {
      control: 'boolean',
      description: 'Enable/disable rotation effect during drag',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    showOverlay: {
      control: 'boolean',
      description: 'Show/hide the swipe direction overlay',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    fadeOnSwipe: {
      control: 'boolean',
      description: 'Enable/disable card opacity fade while swiping',
      table: {
        defaultValue: { summary: 'true' },
      },
    },
    preventSwipe: {
      control: 'multi-select',
      options: ['left', 'right', 'up', 'down'],
      description: 'Array of directions to prevent swiping in',
      table: {
        defaultValue: { summary: '[]' },
      },
    },
    swipeStyles: {
      description: 'Custom styles for each swipe direction (right, left, up, down). Each direction can have backgroundColor, label, and labelStyle.',
      table: {
        type: { summary: 'SwipeStyles' },
      },
    },
    onSwipeLeft: {
      action: 'swiped left',
      description: 'Callback fired when card is swiped left',
    },
    onSwipeRight: {
      action: 'swiped right',
      description: 'Callback fired when card is swiped right',
    },
    onSwipeUp: {
      action: 'swiped up',
      description: 'Callback fired when card is swiped up',
    },
    onSwipeDown: {
      action: 'swiped down',
      description: 'Callback fired when card is swiped down',
    },
    onSwipeStart: {
      action: 'swipe started',
      description: 'Callback fired when swipe gesture starts',
    },
    onSwipeEnd: {
      action: 'swipe ended',
      description: 'Callback fired when swipe gesture ends',
    },
    cardKey: {
      control: 'text',
      description: 'Unique key for the card (useful in lists)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SwipeCard>;

// Card styles
const cardStyle: React.CSSProperties = {
  width: 320,
  height: 420,
  borderRadius: 20,
  overflow: 'hidden',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  background: 'linear-gradient(145deg, #1f1f3a 0%, #2d2d4a 100%)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
};

const imageStyle: React.CSSProperties = {
  width: '100%',
  height: 260,
  objectFit: 'cover',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '6rem',
};

const contentStyle: React.CSSProperties = {
  padding: 24,
};

const nameStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#fff',
  margin: '0 0 8px 0',
  fontFamily: '"IBM Plex Sans", -apple-system, sans-serif',
};

const descStyle: React.CSSProperties = {
  fontSize: '0.95rem',
  color: '#a1a1aa',
  margin: 0,
  lineHeight: 1.6,
  fontFamily: '"IBM Plex Sans", -apple-system, sans-serif',
};

// Profile card data
const profiles = [
  { emoji: '🦊', name: 'Fiona Fox', desc: 'Loves hiking and outdoor adventures. Always up for a challenge!' },
  { emoji: '🐻', name: 'Bruno Bear', desc: 'Foodie and coffee enthusiast. Looking for someone to share brunch with.' },
  { emoji: '🦁', name: 'Leo Lion', desc: 'Music producer and night owl. Let\'s make beautiful music together.' },
  { emoji: '🐨', name: 'Koala Kate', desc: 'Professional napper and eucalyptus connoisseur.' },
];

// Basic card content
const BasicCard = ({ emoji = '🎴', name = 'Swipe Me', desc = 'Drag in any direction to see the magic!' }) => (
  <div style={cardStyle}>
    <div style={imageStyle}>{emoji}</div>
    <div style={contentStyle}>
      <h3 style={nameStyle}>{name}</h3>
      <p style={descStyle}>{desc}</p>
    </div>
  </div>
);

/**
 * The default SwipeCard with all four directional swipes enabled.
 */
export const Default: Story = {
  args: {
    threshold: 100,
    velocityThreshold: 0.5,
    maxRotation: 15,
    exitDuration: 300,
    returnDuration: 200,
    enableRotation: true,
    showOverlay: true,
  },
  render: (args) => (
    <div style={{ position: 'relative', width: 320, height: 420 }}>
      <SwipeCard
        {...args}
        onSwipeLeft={() => console.log('👈 Swiped Left')}
        onSwipeRight={() => console.log('👉 Swiped Right')}
        onSwipeUp={() => console.log('👆 Swiped Up')}
        onSwipeDown={() => console.log('👇 Swiped Down')}
      >
        <BasicCard />
      </SwipeCard>
    </div>
  ),
};

/**
 * Interactive demo showing swipe callbacks with visual feedback.
 */
export const InteractiveDemo: Story = {
  render: () => {
    const [lastAction, setLastAction] = useState<string>('Swipe the card!');
    const [count, setCount] = useState({ left: 0, right: 0, up: 0, down: 0 });

    const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
      const emojis = { left: '👎', right: '❤️', up: '⭐', down: '⏭' };
      const labels = { left: 'Rejected', right: 'Liked', up: 'Super Liked', down: 'Skipped' };
      setLastAction(`${emojis[direction]} ${labels[direction]}!`);
      setCount(prev => ({ ...prev, [direction]: prev[direction] + 1 }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        <div style={{ 
          padding: '16px 32px', 
          background: 'rgba(255,255,255,0.1)', 
          borderRadius: 12,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 600, 
            color: '#fff',
            fontFamily: '"IBM Plex Sans", sans-serif',
          }}>
            {lastAction}
          </span>
        </div>
        
        <div style={{ position: 'relative', width: 320, height: 420 }}>
          <SwipeCard
            onSwipeLeft={() => handleSwipe('left')}
            onSwipeRight={() => handleSwipe('right')}
            onSwipeUp={() => handleSwipe('up')}
            onSwipeDown={() => handleSwipe('down')}
            swipeStyles={{
              right: { backgroundColor: 'rgba(34, 197, 94, 0.7)', label: '❤️ LIKE' },
              left: { backgroundColor: 'rgba(239, 68, 68, 0.7)', label: '👎 NOPE' },
              up: { backgroundColor: 'rgba(234, 179, 8, 0.7)', label: '⭐ SUPER' },
              down: { backgroundColor: 'rgba(107, 114, 128, 0.7)', label: '⏭ SKIP' },
            }}
          >
            <BasicCard emoji="🎯" name="Interactive Demo" desc="Swipe in any direction and watch the counters update!" />
          </SwipeCard>
        </div>

        <div style={{ 
          display: 'flex', 
          gap: 16, 
          flexWrap: 'wrap', 
          justifyContent: 'center',
        }}>
          {Object.entries(count).map(([dir, num]) => (
            <div key={dir} style={{
              padding: '12px 20px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{num}</div>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>{dir}</div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * A stack of cards that can be swiped through, like a dating app.
 */
export const CardStack: Story = {
  render: () => {
    const [cards, setCards] = useState(profiles);
    const [swiped, setSwiped] = useState<string[]>([]);

    const removeCard = (index: number, direction: string) => {
      const card = cards[index];
      setSwiped(prev => [...prev, `${card.name}: ${direction}`]);
      setCards(prev => prev.filter((_, i) => i !== index));
    };

    const resetCards = () => {
      setCards(profiles);
      setSwiped([]);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        <div style={{ position: 'relative', width: 320, height: 420 }}>
          {cards.length === 0 ? (
            <div style={{
              ...cardStyle,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
            }}>
              <span style={{ fontSize: '4rem' }}>🎉</span>
              <h3 style={{ ...nameStyle, textAlign: 'center' }}>All Done!</h3>
              <button
                onClick={resetCards}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #a855f7, #e879f9)',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Start Over
              </button>
            </div>
          ) : (
            cards.map((profile, index) => (
              <SwipeCard
                key={profile.name}
                style={{
                  zIndex: cards.length - index,
                  transform: `scale(${1 - index * 0.03}) translateY(${index * 8}px)`,
                }}
                onSwipeLeft={() => removeCard(index, '👎 Rejected')}
                onSwipeRight={() => removeCard(index, '❤️ Liked')}
                onSwipeUp={() => removeCard(index, '⭐ Super Liked')}
                onSwipeDown={() => removeCard(index, '⏭ Skipped')}
              >
                <BasicCard {...profile} />
              </SwipeCard>
            )).reverse()
          )}
        </div>

        {swiped.length > 0 && (
          <div style={{
            maxWidth: 400,
            padding: 16,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 12,
          }}>
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#9ca3af', 
              marginBottom: 8,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>
              History
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {swiped.map((action, i) => (
                <span key={i} style={{
                  padding: '4px 12px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 100,
                  fontSize: '0.875rem',
                  color: '#e5e7eb',
                }}>
                  {action}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

/**
 * Tinder-style swipe with only left and right enabled.
 */
export const TinderStyle: Story = {
  args: {
    preventSwipe: ['up', 'down'],
    threshold: 120,
  },
  render: (args) => (
    <div style={{ position: 'relative', width: 320, height: 420 }}>
      <SwipeCard
        {...args}
        onSwipeLeft={() => console.log('👎 Passed')}
        onSwipeRight={() => console.log('❤️ Matched')}
        swipeStyles={{
          right: { 
            backgroundColor: 'rgba(16, 185, 129, 0.8)', 
            label: '💚 LIKE',
            labelStyle: { 
              color: '#fff',
              fontSize: '2.5rem',
              fontWeight: 800,
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }
          },
          left: { 
            backgroundColor: 'rgba(239, 68, 68, 0.8)', 
            label: '💔 NOPE',
            labelStyle: { 
              color: '#fff',
              fontSize: '2.5rem',
              fontWeight: 800,
              textShadow: '0 4px 12px rgba(0,0,0,0.4)',
            }
          },
        }}
      >
        <BasicCard 
          emoji="💘" 
          name="Tinder Style" 
          desc="Only horizontal swipes are enabled. Try swiping up or down - it won't work!" 
        />
      </SwipeCard>
    </div>
  ),
};

/**
 * Card with no rotation effect, just translation.
 */
export const NoRotation: Story = {
  args: {
    enableRotation: false,
    threshold: 100,
  },
  render: (args) => (
    <div style={{ position: 'relative', width: 320, height: 420 }}>
      <SwipeCard
        {...args}
        onSwipeLeft={() => console.log('Swiped Left')}
        onSwipeRight={() => console.log('Swiped Right')}
        onSwipeUp={() => console.log('Swiped Up')}
        onSwipeDown={() => console.log('Swiped Down')}
      >
        <BasicCard 
          emoji="📐" 
          name="No Rotation" 
          desc="This card moves without rotating. Great for content that shouldn't tilt." 
        />
      </SwipeCard>
    </div>
  ),
};

/**
 * Card with extreme rotation for a dramatic effect.
 */
export const DramaticRotation: Story = {
  args: {
    maxRotation: 45,
    exitDuration: 500,
    threshold: 80,
  },
  render: (args) => (
    <div style={{ position: 'relative', width: 320, height: 420 }}>
      <SwipeCard
        {...args}
        onSwipeLeft={() => console.log('Swiped Left')}
        onSwipeRight={() => console.log('Swiped Right')}
        swipeStyles={{
          right: { backgroundColor: 'rgba(168, 85, 247, 0.8)', label: '🎭 DRAMATIC!' },
          left: { backgroundColor: 'rgba(236, 72, 153, 0.8)', label: '🎭 WHOOSH!' },
        }}
      >
        <BasicCard 
          emoji="🎭" 
          name="Dramatic Effect" 
          desc="45° maximum rotation creates a theatrical swipe experience!" 
        />
      </SwipeCard>
    </div>
  ),
};

/**
 * Card without the overlay effect.
 */
export const NoOverlay: Story = {
  args: {
    showOverlay: false,
  },
  render: (args) => (
    <div style={{ position: 'relative', width: 320, height: 420 }}>
      <SwipeCard
        {...args}
        onSwipeLeft={() => console.log('Swiped Left')}
        onSwipeRight={() => console.log('Swiped Right')}
      >
        <BasicCard 
          emoji="🔲" 
          name="No Overlay" 
          desc="The card swipes cleanly without any color overlay or label." 
        />
      </SwipeCard>
    </div>
  ),
};

/**
 * Custom styled overlays for each direction.
 */
export const CustomOverlays: Story = {
  render: () => (
    <div style={{ position: 'relative', width: 320, height: 420 }}>
      <SwipeCard
        onSwipeLeft={() => console.log('Declined')}
        onSwipeRight={() => console.log('Approved')}
        onSwipeUp={() => console.log('Bookmarked')}
        onSwipeDown={() => console.log('Archived')}
        swipeStyles={{
          right: { 
            backgroundColor: 'rgba(6, 182, 212, 0.85)', 
            label: '✅ APPROVE',
            labelStyle: {
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: 3,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }
          },
          left: { 
            backgroundColor: 'rgba(244, 63, 94, 0.85)', 
            label: '❌ DECLINE',
            labelStyle: {
              fontSize: '1.75rem',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: 3,
              textShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }
          },
          up: { 
            backgroundColor: 'rgba(251, 191, 36, 0.85)', 
            label: '📌 BOOKMARK',
            labelStyle: {
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#1f2937',
            }
          },
          down: { 
            backgroundColor: 'rgba(75, 85, 99, 0.85)', 
            label: '📦 ARCHIVE',
            labelStyle: {
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#fff',
            }
          },
        }}
      >
        <BasicCard 
          emoji="🎨" 
          name="Custom Overlays" 
          desc="Each direction has unique colors, labels, and text styling." 
        />
      </SwipeCard>
    </div>
  ),
};

/**
 * Slow, deliberate animations for accessibility.
 */
export const SlowAnimations: Story = {
  args: {
    exitDuration: 800,
    returnDuration: 400,
    velocityThreshold: 1.5,
    threshold: 150,
  },
  render: (args) => (
    <div style={{ position: 'relative', width: 320, height: 420 }}>
      <SwipeCard
        {...args}
        onSwipeLeft={() => console.log('Swiped Left')}
        onSwipeRight={() => console.log('Swiped Right')}
      >
        <BasicCard 
          emoji="🐢" 
          name="Slow & Steady" 
          desc="Longer animations and higher thresholds for deliberate interactions." 
        />
      </SwipeCard>
    </div>
  ),
};

/**
 * Quick, snappy animations for a responsive feel.
 */
export const SnappyAnimations: Story = {
  args: {
    exitDuration: 150,
    returnDuration: 100,
    velocityThreshold: 0.3,
    threshold: 60,
  },
  render: (args) => (
    <div style={{ position: 'relative', width: 320, height: 420 }}>
      <SwipeCard
        {...args}
        onSwipeLeft={() => console.log('Swiped Left')}
        onSwipeRight={() => console.log('Swiped Right')}
      >
        <BasicCard 
          emoji="⚡" 
          name="Lightning Fast" 
          desc="Quick exit animations and low thresholds for rapid swiping." 
        />
      </SwipeCard>
    </div>
  ),
};

// ==========================================
// TINDER-STYLE PROFILE STACK EXAMPLE
// Exact replication of example/app.tsx
// ==========================================

type Gender = 'Female' | 'Male' | 'Non-Binary' | 'Other';

interface ActressProfile {
  id: string;
  name: string;
  age: number;
  gender: Gender;
  image: string;
}

const ACTRESS_PROFILES: ActressProfile[] = [
  {
    "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "name": "Emma Stone",
    "age": 36,
    "gender": "Female",
    "image": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  },
  {
    "id": "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
    "name": "Scarlett Johansson",
    "age": 40,
    "gender": "Female",
    "image": "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7"
  },
  {
    "id": "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
    "name": "Zendaya",
    "age": 28,
    "gender": "Female",
    "image": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e"
  },
  {
    "id": "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
    "name": "Margot Robbie",
    "age": 34,
    "gender": "Female",
    "image": "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91"
  },
  {
    "id": "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
    "name": "Gal Gadot",
    "age": 39,
    "gender": "Female",
    "image": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1"
  },
];

// Create a reversed copy once, outside the component to prevent recreation on every render
const REVERSED_ACTRESS_PROFILES = [...ACTRESS_PROFILES].reverse();

// Profile card styles matching example/app.css
const tinderCardStyle: React.CSSProperties = {
  width: 320,
  height: 460,
  borderRadius: 16,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.25)',
};

const cardOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  padding: 16,
  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.1))',
  color: 'white',
};

const profileInfoH2Style: React.CSSProperties = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
};

const ageStyle: React.CSSProperties = {
  fontWeight: 400,
  marginLeft: 6,
};

const genderStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  marginTop: 6,
  fontSize: 14,
  opacity: 0.9,
};

const genderIconStyle: React.CSSProperties = {
  fontSize: 18,
  marginRight: 6,
};

// Profile component matching example/Profile.tsx
const Profile: React.FC<{ profile: ActressProfile }> = ({ profile }) => (
  <div style={{ ...tinderCardStyle, backgroundImage: `url(${profile.image})` }}>
    <div style={cardOverlayStyle}>
      <div>
        <h2 style={profileInfoH2Style}>
          {profile.name} <span style={ageStyle}>{profile.age}</span>
        </h2>
        <div style={genderStyle}>
          <span style={genderIconStyle}>♀</span>
          <span>{profile.gender}</span>
        </div>
      </div>
    </div>
  </div>
);

// Demo container styles
const demoContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 24,
  padding: 20,
  fontFamily: '"IBM Plex Sans", -apple-system, sans-serif',
};

const instructionsStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#f3f4f6',
};

const cardContainerStyle: React.CSSProperties = {
  position: 'relative',
  width: 320,
  height: 460,
};

const statsStyle: React.CSSProperties = {
  display: 'flex',
  gap: 16,
  flexWrap: 'wrap',
  justifyContent: 'center',
};

const statItemStyle: React.CSSProperties = {
  padding: '12px 20px',
  background: 'rgba(255,255,255,0.05)',
  borderRadius: 8,
  border: '1px solid rgba(255,255,255,0.1)',
  textAlign: 'center',
};

/**
 * **Tinder-Style Profile Stack** - Exact replication of the example/app.tsx demo.
 * 
 * This example shows the complete implementation with:
 * - Custom actress profile cards with images
 * - Stacked card layout with scale/translate transforms
 * - Custom swipe overlay labels positioned in corners with rotation
 * - Stats tracking for each swipe direction
 * - Reset functionality when all cards are swiped
 * 
 * Key props used:
 * - `threshold={80}` - Lower threshold for easier swiping
 * - `velocityThreshold={0.3}` - Responsive velocity detection
 * - `maxRotation={15}` - Natural rotation during drag
 * - `fadeOnSwipe={false}` - Keep card fully visible while swiping
 * - `swipeStyles` - Custom label positions and styling per direction
 */
export const TinderProfileStack: Story = {
  parameters: {
    docs: {
      description: {
        story: `
This is an **exact replication** of the \`example/app.tsx\` demo application.

### Features Demonstrated:
- **Custom Profile Cards**: Beautiful profile cards with background images and overlay info
- **Card Stack Layout**: Multiple cards stacked with CSS transforms for depth effect
- **Custom Overlay Labels**: 
  - "LIKE" label (green, positioned top-right, rotated)
  - "NOPE" label (red, positioned top-left, rotated)
  - "Super" and "Skip" labels for up/down swipes
- **Swipe Stats**: Real-time tracking of swipe counts
- **Reset Functionality**: Restore all cards when deck is empty

### Key Configuration:
\`\`\`tsx
<SwipeCard
  threshold={80}
  velocityThreshold={0.3}
  maxRotation={15}
  fadeOnSwipe={false}
  swipeStyles={{
    right: {  
      label: 'LIKE', 
      labelStyle: { 
        position: 'absolute', 
        top: 20, 
        right: 20,
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#22c55e',
        border: '4px solid #22c55e',
        borderRadius: '8px',
        padding: '8px 16px',
        transform: 'rotate(-25deg)',
        letterSpacing: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      } 
    },
    left: { 
      label: 'NOPE',
      labelStyle: { 
        position: 'absolute', 
        top: 20, 
        left: 20,
        fontSize: '2.5rem',
        fontWeight: 'bold',
        color: '#ef4444',
        border: '4px solid #ef4444',
        borderRadius: '8px',
        padding: '8px 16px',
        transform: 'rotate(-25deg)',
        letterSpacing: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
      }
    },
    up: { backgroundColor: 'rgba(16, 185, 129, 0.8)', label: '⭐ Super' },
    down: { backgroundColor: 'rgba(168, 85, 247, 0.8)', label: '⏭ Skip' },
  }}
  style={{
    zIndex: index,
    transform: \`translateY(\${(cards.length - index - 1) * 8}px) scale(\${1 - (cards.length - index - 1) * 0.02})\`,
    pointerEvents: index === cards.length - 1 ? 'auto' : 'none',
  }}
>
  <Profile profile={card} />
</SwipeCard>
\`\`\`
        `,
      },
    },
  },
  render: () => {
    const [cards, setCards] = useState<ActressProfile[]>(REVERSED_ACTRESS_PROFILES);
    const [stats, setStats] = useState({ left: 0, right: 0, up: 0, down: 0 });

    const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
      setStats((prev) => ({
        ...prev,
        [direction]: prev[direction] + 1,
      }));
      setCards((prev) => prev.slice(0, -1));
    };

    const resetCards = () => {
      setCards(REVERSED_ACTRESS_PROFILES);
      setStats({ left: 0, right: 0, up: 0, down: 0 });
    };

    if (cards.length === 0) {
      return (
        <div style={demoContainerStyle}>
          <div style={instructionsStyle}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem' }}>All cards swiped!</h3>
            <p style={{ margin: 0, color: '#9ca3af' }}>Great job! Click the button below to reset.</p>
          </div>
          <button 
            onClick={resetCards}
            style={{
              padding: '15px 30px',
              borderRadius: 50,
              background: 'linear-gradient(135deg, #a855f7, #e879f9)',
              border: 'none',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            🔄 Reset Cards
          </button>
          <div style={statsStyle}>
            <div style={statItemStyle}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>← Left</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{stats.left}</div>
            </div>
            <div style={statItemStyle}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>→ Right</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{stats.right}</div>
            </div>
            <div style={statItemStyle}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>↑ Up</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{stats.up}</div>
            </div>
            <div style={statItemStyle}>
              <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>↓ Down</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{stats.down}</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={demoContainerStyle}>
        <div style={instructionsStyle}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem' }}>Try swiping in any direction!</h3>
          <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.9rem' }}>
            Swipe left ← / right → / up ↑ / down ↓ on the card
          </p>
        </div>

        <div style={cardContainerStyle}>
          {cards.map((card, index) => (
            <SwipeCard
              key={card.id}
              onSwipeLeft={() => handleSwipe('left')}
              onSwipeRight={() => handleSwipe('right')}
              onSwipeUp={() => handleSwipe('up')}
              onSwipeDown={() => handleSwipe('down')}
              threshold={80}
              velocityThreshold={0.3}
              maxRotation={15}
              fadeOnSwipe={false}
              swipeStyles={{
                right: {  
                  label: 'LIKE', 
                  labelStyle: { 
                    position: 'absolute', 
                    top: 20, 
                    right: 20,
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#22c55e',
                    border: '4px solid #22c55e',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    transform: 'rotate(-25deg)',
                    letterSpacing: '2px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  } 
                },
                left: { 
                  label: 'NOPE',
                  labelStyle: { 
                    position: 'absolute', 
                    top: 20, 
                    left: 20,
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#ef4444',
                    border: '4px solid #ef4444',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    transform: 'rotate(-25deg)',
                    letterSpacing: '2px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }
                },
                up: { backgroundColor: 'rgba(16, 185, 129, 0.8)', label: '⭐ Super' },
                down: { backgroundColor: 'rgba(168, 85, 247, 0.8)', label: '⏭ Skip' },
              }}
              style={{
                zIndex: index,
                transform: `translateY(${(cards.length - index - 1) * 8}px) scale(${1 - (cards.length - index - 1) * 0.02})`,
                pointerEvents: index === cards.length - 1 ? 'auto' : 'none',
              }}
            >
              <Profile profile={card} />
            </SwipeCard>
          ))}
        </div>

        <div style={statsStyle}>
          <div style={statItemStyle}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>← Left</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{stats.left}</div>
          </div>
          <div style={statItemStyle}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>→ Right</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{stats.right}</div>
          </div>
          <div style={statItemStyle}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>↑ Up</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{stats.up}</div>
          </div>
          <div style={statItemStyle}>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af', textTransform: 'uppercase' }}>↓ Down</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>{stats.down}</div>
          </div>
        </div>
      </div>
    );
  },
};

