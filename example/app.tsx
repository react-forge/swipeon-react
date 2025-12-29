import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SwipeCard } from 'swipeon-react';
import { ACTRESS_PROFILES, ActressProfile } from './actress';
import { Profile } from './Profile';

// Create a reversed copy once, outside the component to prevent mutation
const reversedProfiles: ActressProfile[] = [...ACTRESS_PROFILES].reverse();

const App: React.FC = () => {
  const [cards, setCards] = useState<ActressProfile[]>(reversedProfiles);
  const [stats, setStats] = useState({
    left: 0,
    right: 0,
    up: 0,
    down: 0,
  });

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    setStats((prev) => ({
      ...prev,
      [direction]: prev[direction] + 1,
    }));

    // Remove the card immediately - the animation has already completed when this callback fires
    setCards((prev) => prev.slice(0, -1));
  };

  const resetCards = () => {
    setCards(reversedProfiles);
    setStats({ left: 0, right: 0, up: 0, down: 0 });
  };

  if (cards.length === 0) {
    return (
      <div className="demo-container">
        <div className="instructions">
          <h3>All cards swiped!</h3>
          <p>Great job! Click the button below to reset.</p>
        </div>
        <button className="control-btn" onClick={resetCards} style={{ width: 'auto', padding: '15px 30px', borderRadius: '50px' }}>
          🔄 Reset Cards
        </button>
        <div className="stats">
          <div className="stat-item">
            <div className="stat-label">← Left</div>
            <div className="stat-value">{stats.left}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">→ Right</div>
            <div className="stat-value">{stats.right}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">↑ Up</div>
            <div className="stat-value">{stats.up}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">↓ Down</div>
            <div className="stat-value">{stats.down}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="demo-container">
      <div className="instructions">
        <h3>Try swiping in any direction!</h3>
        <p>Swipe left ← / right → / up ↑ / down ↓ on the card or use the buttons below</p>
      </div>

      <div className="card-container">
        {/* Render cards in reverse order so the last one is on top */}
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
            // Overlay customization props - per-direction labels and styles
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
            <Profile profile={card} key={card.id} />
          </SwipeCard>
        ))}
      </div>
    </div>
  );
};

// Mount the app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

