import React, { CSSProperties } from 'react';
import { useSwipe } from '../hooks/useSwipe';
import { SwipeCardProps } from '../types';

/**
 * SwipeCard Component
 * 
 * A performant swipeable card component with smooth animations.
 * Supports swipe in all four directions: left, right, up, and down.
 * 
 * @example
 * ```tsx
 * <SwipeCard
 *   onSwipeLeft={() => console.log('Swiped left')}
 *   onSwipeRight={() => console.log('Swiped right')}
 *   threshold={100}
 * >
 *   <div>Your content here</div>
 * </SwipeCard>
 * ```
 */
export const SwipeCard: React.FC<SwipeCardProps> = ({
  children,
  className = '',
  style = {},
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onSwipeStart,
  onSwipeEnd,
  threshold = 100,
  velocityThreshold = 0.5,
  maxRotation = 15,
  exitDuration = 300,
  returnDuration = 200,
  enableRotation = true,
}) => {
  const callbacks = {
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwipeStart,
    onSwipeEnd,
  };

  const config = {
    threshold,
    velocityThreshold,
    maxRotation,
    exitDuration,
    returnDuration,
    enableRotation,
  };

  const { ref, transform, opacity, transition, isDragging } = useSwipe(callbacks, config);

  const cardStyle: CSSProperties = {
    ...style,
    transform,
    opacity,
    transition,
    touchAction: 'none', // Prevent default touch behaviors
    userSelect: 'none', // Prevent text selection during drag
    WebkitUserSelect: 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
    willChange: isDragging ? 'transform, opacity' : 'auto',
    position: 'relative',
  };

  return (
    <div
      ref={ref}
      className={`swipeon-card ${className}`}
      style={cardStyle}
    >
      {children}
    </div>
  );
};

export default SwipeCard;

