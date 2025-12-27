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
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    threshold: {
      control: { type: 'range', min: 50, max: 300, step: 10 },
      description: 'Minimum distance (in pixels) required to trigger a swipe',
    },
    velocityThreshold: {
      control: { type: 'range', min: 0.1, max: 2, step: 0.1 },
      description: 'Minimum velocity required to trigger a swipe',
    },
    maxRotation: {
      control: { type: 'range', min: 0, max: 45, step: 1 },
      description: 'Maximum rotation angle in degrees during drag',
    },
    exitDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
      description: 'Duration of the exit animation in milliseconds',
    },
    returnDuration: {
      control: { type: 'range', min: 100, max: 500, step: 25 },
      description: 'Duration of the spring-back animation in milliseconds',
    },
    enableRotation: {
      control: 'boolean',
      description: 'Enable/disable rotation effect during drag',
    },
    showOverlay: {
      control: 'boolean',
      description: 'Show/hide the swipe direction overlay',
    },
    preventSwipe: {
      control: 'multi-select',
      options: ['left', 'right', 'up', 'down'],
      description: 'Array of directions to prevent swiping in',
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

