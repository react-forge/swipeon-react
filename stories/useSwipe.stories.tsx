import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useSwipe } from '../src';

const meta: Meta = {
  title: 'Hooks/useSwipe',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The \`useSwipe\` hook provides low-level gesture handling for building custom swipe interfaces.
It returns the gesture state and CSS values you can apply to any element.

## Usage

\`\`\`tsx
import { useSwipe } from 'swipeon-react';

function CustomCard() {
  const { ref, transform, opacity, transition, isDragging, deltaX, deltaY } = useSwipe({
    onSwipeLeft: () => console.log('Swiped left'),
    onSwipeRight: () => console.log('Swiped right'),
  }, {
    threshold: 100,
    maxRotation: 15,
  });

  return (
    <div 
      ref={ref}
      style={{ transform, opacity, transition }}
    >
      Custom content
    </div>
  );
}
\`\`\`

## Return Values

| Property | Type | Description |
|----------|------|-------------|
| \`ref\` | \`RefObject<HTMLDivElement>\` | Attach to your swipeable element |
| \`transform\` | \`string\` | CSS transform string |
| \`opacity\` | \`number\` | Current opacity (fades on swipe) |
| \`transition\` | \`string\` | CSS transition string |
| \`isDragging\` | \`boolean\` | Whether a drag is in progress |
| \`deltaX\` | \`number\` | Horizontal movement from start |
| \`deltaY\` | \`number\` | Vertical movement from start |
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const boxStyle: React.CSSProperties = {
  width: 280,
  height: 180,
  borderRadius: 16,
  background: 'linear-gradient(145deg, #2d1b69 0%, #11998e 100%)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  fontFamily: '"IBM Plex Sans", sans-serif',
  boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
  border: '1px solid rgba(255,255,255,0.1)',
};

const labelStyle: React.CSSProperties = {
  fontSize: '0.7rem',
  color: 'rgba(255,255,255,0.6)',
  textTransform: 'uppercase',
  letterSpacing: 2,
  marginBottom: 4,
};

const valueStyle: React.CSSProperties = {
  fontSize: '1.5rem',
  fontWeight: 700,
  fontFamily: '"JetBrains Mono", monospace',
};

/**
 * Demonstrates the useSwipe hook with a custom element.
 */
export const BasicUsage: Story = {
  render: () => {
    const { ref, transform, opacity, transition, isDragging, deltaX, deltaY } = useSwipe({
      onSwipeLeft: () => console.log('👈 Swiped Left'),
      onSwipeRight: () => console.log('👉 Swiped Right'),
      onSwipeUp: () => console.log('👆 Swiped Up'),
      onSwipeDown: () => console.log('👇 Swiped Down'),
    }, {
      threshold: 100,
      maxRotation: 12,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        <div style={{ position: 'relative' }}>
          <div
            ref={ref}
            style={{
              ...boxStyle,
              transform,
              opacity,
              transition,
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
            }}
          >
            <span style={{ fontSize: '3rem', marginBottom: 8 }}>🎣</span>
            <span style={{ fontWeight: 600 }}>useSwipe Hook</span>
            <span style={{ fontSize: '0.85rem', opacity: 0.7 }}>Drag me around!</span>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: 16,
          padding: 20,
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 12,
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={labelStyle}>Delta X</div>
            <div style={valueStyle}>{deltaX.toFixed(0)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={labelStyle}>Delta Y</div>
            <div style={valueStyle}>{deltaY.toFixed(0)}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={labelStyle}>Dragging</div>
            <div style={valueStyle}>{isDragging ? '✓' : '—'}</div>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Shows how to build custom swipe feedback using the delta values.
 */
export const CustomFeedback: Story = {
  render: () => {
    const [lastSwipe, setLastSwipe] = useState<string | null>(null);
    
    const { ref, transform, opacity, transition, isDragging, deltaX, deltaY } = useSwipe({
      onSwipeLeft: () => setLastSwipe('⬅️ LEFT'),
      onSwipeRight: () => setLastSwipe('➡️ RIGHT'),
      onSwipeUp: () => setLastSwipe('⬆️ UP'),
      onSwipeDown: () => setLastSwipe('⬇️ DOWN'),
    }, {
      threshold: 80,
      enableRotation: false,
    });

    // Calculate custom visual feedback
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const progress = Math.min((absX + absY) / 160, 1);
    
    let borderColor = 'rgba(255,255,255,0.1)';
    let glowColor = 'transparent';
    
    if (isDragging && progress > 0.2) {
      if (deltaX > 30) {
        borderColor = `rgba(34, 197, 94, ${progress})`;
        glowColor = `rgba(34, 197, 94, ${progress * 0.4})`;
      } else if (deltaX < -30) {
        borderColor = `rgba(239, 68, 68, ${progress})`;
        glowColor = `rgba(239, 68, 68, ${progress * 0.4})`;
      } else if (deltaY < -30) {
        borderColor = `rgba(59, 130, 246, ${progress})`;
        glowColor = `rgba(59, 130, 246, ${progress * 0.4})`;
      } else if (deltaY > 30) {
        borderColor = `rgba(168, 85, 247, ${progress})`;
        glowColor = `rgba(168, 85, 247, ${progress * 0.4})`;
      }
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {lastSwipe && (
          <div style={{
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: 8,
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#fff',
          }}>
            Last: {lastSwipe}
          </div>
        )}
        
        <div
          ref={ref}
          style={{
            width: 300,
            height: 200,
            borderRadius: 20,
            background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontFamily: '"IBM Plex Sans", sans-serif',
            transform,
            opacity,
            transition,
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'none',
            border: `3px solid ${borderColor}`,
            boxShadow: `0 0 30px ${glowColor}, 0 20px 40px -15px rgba(0,0,0,0.5)`,
          }}
        >
          <span style={{ fontSize: '2.5rem', marginBottom: 12 }}>🌈</span>
          <span style={{ fontWeight: 600, fontSize: '1.1rem' }}>Custom Feedback</span>
          <span style={{ fontSize: '0.85rem', opacity: 0.7, marginTop: 4 }}>
            Border glows based on direction
          </span>
        </div>

        <div style={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: 'rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          <div style={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            background: '#e879f9',
            position: 'absolute',
            transform: `translate(${deltaX * 0.3}px, ${deltaY * 0.3}px)`,
            transition: isDragging ? 'none' : 'transform 200ms ease-out',
            boxShadow: '0 0 20px rgba(232, 121, 249, 0.5)',
          }} />
          <span style={{ 
            fontSize: '0.7rem', 
            color: '#6b7280', 
            position: 'absolute',
            bottom: -24,
          }}>
            Direction Indicator
          </span>
        </div>
      </div>
    );
  },
};

/**
 * Demonstrates all configuration options for the hook.
 */
export const ConfigurationOptions: Story = {
  render: () => {
    const [config, setConfig] = useState({
      threshold: 100,
      velocityThreshold: 0.5,
      maxRotation: 15,
      enableRotation: true,
    });

    const { ref, transform, opacity, transition, isDragging } = useSwipe({
      onSwipeLeft: () => console.log('Left'),
      onSwipeRight: () => console.log('Right'),
    }, config);

    const sliderStyle: React.CSSProperties = {
      width: '100%',
      accentColor: '#a855f7',
    };

    const inputGroupStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        <div
          ref={ref}
          style={{
            ...boxStyle,
            width: 260,
            height: 160,
            transform,
            opacity,
            transition,
            cursor: isDragging ? 'grabbing' : 'grab',
            touchAction: 'none',
          }}
        >
          <span style={{ fontSize: '2.5rem' }}>⚙️</span>
          <span style={{ fontWeight: 600 }}>Configurable</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          padding: 24,
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 16,
          minWidth: 380,
          fontFamily: '"IBM Plex Sans", sans-serif',
          color: '#fff',
        }}>
          <div style={inputGroupStyle}>
            <label style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              Threshold: {config.threshold}px
            </label>
            <input
              type="range"
              min={50}
              max={200}
              value={config.threshold}
              onChange={(e) => setConfig(c => ({ ...c, threshold: +e.target.value }))}
              style={sliderStyle}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              Velocity: {config.velocityThreshold}
            </label>
            <input
              type="range"
              min={0.1}
              max={2}
              step={0.1}
              value={config.velocityThreshold}
              onChange={(e) => setConfig(c => ({ ...c, velocityThreshold: +e.target.value }))}
              style={sliderStyle}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              Max Rotation: {config.maxRotation}°
            </label>
            <input
              type="range"
              min={0}
              max={45}
              value={config.maxRotation}
              onChange={(e) => setConfig(c => ({ ...c, maxRotation: +e.target.value }))}
              style={sliderStyle}
            />
          </div>
          
          <div style={inputGroupStyle}>
            <label style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
              Enable Rotation
            </label>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 8,
              cursor: 'pointer',
            }}>
              <input
                type="checkbox"
                checked={config.enableRotation}
                onChange={(e) => setConfig(c => ({ ...c, enableRotation: e.target.checked }))}
                style={{ width: 18, height: 18, accentColor: '#a855f7' }}
              />
              <span>{config.enableRotation ? 'On' : 'Off'}</span>
            </label>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Building a custom card game with the hook.
 */
export const CardGameExample: Story = {
  render: () => {
    const cards = ['🃏', '🂠', '🂡', '🂢'];
    const [currentCard, setCurrentCard] = useState(0);
    const [score, setScore] = useState(0);

    const { ref, transform, opacity, transition, isDragging, deltaX } = useSwipe({
      onSwipeRight: () => {
        setScore(s => s + 10);
        setCurrentCard(c => (c + 1) % cards.length);
      },
      onSwipeLeft: () => {
        setScore(s => Math.max(0, s - 5));
        setCurrentCard(c => (c + 1) % cards.length);
      },
    }, {
      threshold: 80,
      preventSwipe: ['up', 'down'],
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{
          padding: '12px 32px',
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
          borderRadius: 100,
          color: '#1f2937',
          fontWeight: 700,
          fontSize: '1.25rem',
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}>
          Score: {score}
        </div>

        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ textAlign: 'center', color: '#ef4444' }}>
            <div style={{ fontSize: '2rem' }}>👎</div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>-5 pts</div>
          </div>

          <div
            ref={ref}
            style={{
              width: 180,
              height: 240,
              borderRadius: 16,
              background: isDragging 
                ? deltaX > 0 
                  ? 'linear-gradient(145deg, #065f46, #10b981)' 
                  : 'linear-gradient(145deg, #991b1b, #ef4444)'
                : 'linear-gradient(145deg, #1e1e3f, #2d2d5a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '5rem',
              boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)',
              border: '2px solid rgba(255,255,255,0.1)',
              transform,
              opacity,
              transition,
              cursor: isDragging ? 'grabbing' : 'grab',
              touchAction: 'none',
            }}
          >
            {cards[currentCard]}
          </div>

          <div style={{ textAlign: 'center', color: '#22c55e' }}>
            <div style={{ fontSize: '2rem' }}>👍</div>
            <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>+10 pts</div>
          </div>
        </div>

        <p style={{ 
          color: '#6b7280', 
          fontSize: '0.9rem',
          fontFamily: '"IBM Plex Sans", sans-serif',
        }}>
          Swipe right to collect, left to discard
        </p>
      </div>
    );
  },
};

