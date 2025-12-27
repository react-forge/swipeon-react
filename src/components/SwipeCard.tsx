import React, { CSSProperties, useMemo, memo } from 'react';
import { useSwipe } from '../hooks/useSwipe';
import { SwipeCardProps, SwipeCallbacks, SwipeConfig } from '../types';

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
 *   swipeStyles={{
 *     right: { 
 *       backgroundColor: 'rgba(34, 197, 94, 0.6)', 
 *       label: '👍 Like',
 *       labelStyle: { position: 'absolute', top: 20, right: 20 }
 *     },
 *     left: { 
 *       backgroundColor: 'rgba(239, 68, 68, 0.6)', 
 *       label: '👎 Nope',
 *       labelStyle: { position: 'absolute', top: 20, left: 20 }
 *     },
 *   }}
 * >
 *   <div>Your content here</div>
 * </SwipeCard>
 * ```
 */

// Default label style - constant, no need to recreate
const DEFAULT_LABEL_STYLE: CSSProperties = {
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#fff',
  textTransform: 'uppercase',
  letterSpacing: '2px',
  textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
};

// Default styles for each direction - constant
const DEFAULT_SWIPE_STYLES = {
  right: { backgroundColor: 'rgba(34, 197, 94, 0.6)', label: '✓ Accept', labelStyle: DEFAULT_LABEL_STYLE },
  left: { backgroundColor: 'rgba(239, 68, 68, 0.6)', label: '✗ Reject', labelStyle: DEFAULT_LABEL_STYLE },
  up: { backgroundColor: 'rgba(59, 130, 246, 0.6)', label: '⭐ Super', labelStyle: DEFAULT_LABEL_STYLE },
  down: { backgroundColor: 'rgba(168, 85, 247, 0.6)', label: '⏭ Skip', labelStyle: DEFAULT_LABEL_STYLE },
} as const;

// Empty array constant to prevent recreating on each render
const EMPTY_PREVENT_SWIPE: readonly string[] = [];

const SwipeCardInner: React.FC<SwipeCardProps> = ({
  children,
  className = '',
  style,
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
  preventSwipe = EMPTY_PREVENT_SWIPE as any,
  swipeStyles,
  showOverlay: showOverlayProp = true,
}) => {
  // Memoize callbacks object to prevent unnecessary hook updates
  const callbacks: SwipeCallbacks = useMemo(() => ({
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    onSwipeStart,
    onSwipeEnd,
  }), [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, onSwipeStart, onSwipeEnd]);

  // Memoize config object
  const config: SwipeConfig = useMemo(() => ({
    threshold,
    velocityThreshold,
    maxRotation,
    exitDuration,
    returnDuration,
    enableRotation,
    preventSwipe,
  }), [threshold, velocityThreshold, maxRotation, exitDuration, returnDuration, enableRotation, preventSwipe]);

  const { ref, transform, opacity, transition, isDragging, deltaX, deltaY } = useSwipe(callbacks, config);

  // Memoize merged swipe styles
  const mergedSwipeStyles = useMemo(() => ({
    right: { 
      ...DEFAULT_SWIPE_STYLES.right, 
      ...swipeStyles?.right,
      labelStyle: { ...DEFAULT_SWIPE_STYLES.right.labelStyle, ...swipeStyles?.right?.labelStyle }
    },
    left: { 
      ...DEFAULT_SWIPE_STYLES.left, 
      ...swipeStyles?.left,
      labelStyle: { ...DEFAULT_SWIPE_STYLES.left.labelStyle, ...swipeStyles?.left?.labelStyle }
    },
    up: { 
      ...DEFAULT_SWIPE_STYLES.up, 
      ...swipeStyles?.up,
      labelStyle: { ...DEFAULT_SWIPE_STYLES.up.labelStyle, ...swipeStyles?.up?.labelStyle }
    },
    down: { 
      ...DEFAULT_SWIPE_STYLES.down, 
      ...swipeStyles?.down,
      labelStyle: { ...DEFAULT_SWIPE_STYLES.down.labelStyle, ...swipeStyles?.down?.labelStyle }
    },
  }), [
    swipeStyles?.right, 
    swipeStyles?.left, 
    swipeStyles?.up, 
    swipeStyles?.down,
  ]);

  // Calculate swipe state - these are cheap, no need to memoize
  const absX = Math.abs(deltaX);
  const absY = Math.abs(deltaY);
  const isPrimaryHorizontal = absX >= absY;
  const swipeDistance = isPrimaryHorizontal ? absX : absY;
  const swipeProgress = Math.min(swipeDistance / threshold, 1);
  
  const isSwipingRight = isPrimaryHorizontal && deltaX > 20;
  const isSwipingLeft = isPrimaryHorizontal && deltaX < -20;
  const isSwipingUp = !isPrimaryHorizontal && deltaY < -20;
  const isSwipingDown = !isPrimaryHorizontal && deltaY > 20;
  
  const isActionInProgress = swipeProgress >= 0.15;
  const showOverlay = showOverlayProp && isDragging && swipeDistance > 10;

  // Calculate current direction info - single calculation
  const currentDirection = useMemo(() => {
    if (isSwipingRight) return 'right' as const;
    if (isSwipingLeft) return 'left' as const;
    if (isSwipingUp) return 'up' as const;
    if (isSwipingDown) return 'down' as const;
    return null;
  }, [isSwipingRight, isSwipingLeft, isSwipingUp, isSwipingDown]);

  const currentStyle = currentDirection ? mergedSwipeStyles[currentDirection] : null;
  const backgroundColor = currentStyle?.backgroundColor ?? 'transparent';
  const labelConfig = currentStyle ? { label: currentStyle.label, labelStyle: currentStyle.labelStyle } : null;

  // Memoize card style - only recalculate when values change
  const cardStyle: CSSProperties = useMemo(() => ({
    ...style,
    transform,
    opacity,
    transition,
    touchAction: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    cursor: isDragging ? 'grabbing' : 'grab',
    willChange: isDragging ? 'transform, opacity' : 'auto',
    position: 'absolute',
  }), [style, transform, opacity, transition, isDragging]);

  // Memoize overlay style
  const overlayStyle: CSSProperties = useMemo(() => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'inherit',
    pointerEvents: 'none',
    zIndex: 10,
    opacity: showOverlay ? swipeProgress : 0,
    transition: isDragging ? 'none' : 'opacity 200ms ease-out',
    backgroundColor: showOverlay ? backgroundColor : 'transparent',
  }), [showOverlay, swipeProgress, isDragging, backgroundColor]);

  // Memoize computed label style
  const computedLabelStyle: CSSProperties = useMemo(() => ({
    ...labelConfig?.labelStyle,
    transform: `scale(${0.8 + swipeProgress * 0.4})`,
    opacity: swipeProgress,
  }), [labelConfig?.labelStyle, swipeProgress]);

  return (
    <div
      ref={ref}
      className={`swipeon-card ${className}`}
      style={cardStyle}
    >
      {children}
      <div style={overlayStyle}>
        {showOverlay && isActionInProgress && labelConfig?.label && (
          <span style={computedLabelStyle}>
            {labelConfig.label}
          </span>
        )}
      </div>
    </div>
  );
};

// Memoize the entire component to prevent unnecessary re-renders from parent
export const SwipeCard = memo(SwipeCardInner);

export default SwipeCard;
