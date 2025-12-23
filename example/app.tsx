import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { SwipeCard } from '../src/index';

interface Card {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
}

const DEMO_CARDS: Card[] = [
  {
    id: 1,
    title: 'React',
    description: 'A JavaScript library for building user interfaces',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=400&fit=crop',
    color: '#61dafb',
  },
  {
    id: 2,
    title: 'TypeScript',
    description: 'JavaScript with syntax for types',
    image: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=400&h=400&fit=crop',
    color: '#3178c6',
  },
  {
    id: 3,
    title: 'Node.js',
    description: 'JavaScript runtime built on Chrome V8',
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=400&fit=crop',
    color: '#339933',
  },
  {
    id: 4,
    title: 'GraphQL',
    description: 'A query language for your API',
    image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=400&fit=crop',
    color: '#e10098',
  },
  {
    id: 5,
    title: 'Docker',
    description: 'Accelerate how you build, share, and run modern applications',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=400&fit=crop',
    color: '#2496ed',
  },
];

const App: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(DEMO_CARDS);
  const [stats, setStats] = useState({
    left: 0,
    right: 0,
    up: 0,
    down: 0,
  });

  const currentCard = cards[cards.length - 1];

  const handleSwipe = (direction: 'left' | 'right' | 'up' | 'down') => {
    setStats((prev) => ({
      ...prev,
      [direction]: prev[direction] + 1,
    }));

    // Remove the card after swipe
    setTimeout(() => {
      setCards((prev) => prev.slice(0, -1));
    }, 300);
  };

  const resetCards = () => {
    setCards(DEMO_CARDS);
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
            style={{
              zIndex: index,
              transform: `scale(${1 - (cards.length - index - 1) * 0.05})`,
            }}
          >
            <div
              className="card-content"
              style={{
                background: `linear-gradient(135deg, ${card.color}22 0%, ${card.color}44 100%)`,
              }}
            >
              <img
                src={card.image}
                alt={card.title}
                className="card-image"
              />
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
              <div style={{ marginTop: '20px', fontSize: '0.9em', color: '#999' }}>
                Card {cards.length - index} of {DEMO_CARDS.length}
              </div>
            </div>
          </SwipeCard>
        ))}
      </div>

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
};

// Mount the app
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

