import { ReactNode, CSSProperties } from 'react';

/**
 * Swipe direction types
 */
export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

/**
 * Callback function signatures for swipe events
 */
export interface SwipeCallbacks {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
}

/**
 * Configuration options for swipe behavior
 */
export interface SwipeConfig {
  /** Minimum distance (in pixels) required to trigger a swipe */
  threshold?: number;
  /** Minimum velocity required to trigger a swipe */
  velocityThreshold?: number;
  /** Maximum rotation angle in degrees during drag */
  maxRotation?: number;
  /** Duration of the exit animation in milliseconds */
  exitDuration?: number;
  /** Duration of the spring-back animation in milliseconds */
  returnDuration?: number;
  /** Enable/disable rotation effect during drag */
  enableRotation?: boolean;
}

/**
 * Props for the SwipeCard component
 */
export interface SwipeCardProps extends SwipeCallbacks, SwipeConfig {
  /** Content to render inside the card */
  children: ReactNode;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
  /** Unique key for the card (useful in lists) */
  cardKey?: string | number;
}

/**
 * Internal gesture state for tracking swipe progress
 */
export interface GestureState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  deltaX: number;
  deltaY: number;
  velocity: number;
  direction: SwipeDirection | null;
  startTime: number;
}

/**
 * Return type of the useSwipe hook
 */
export interface UseSwipeReturn {
  ref: React.RefObject<HTMLDivElement>;
  transform: string;
  opacity: number;
  transition: string;
  isDragging: boolean;
}

