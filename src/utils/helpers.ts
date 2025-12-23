import { SwipeDirection } from '../types';

/**
 * Calculate the distance between two points
 */
export const getDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
};

/**
 * Calculate velocity based on distance and time
 */
export const calculateVelocity = (distance: number, time: number): number => {
  if (time === 0) return 0;
  return Math.abs(distance / time);
};

/**
 * Determine the swipe direction based on deltas
 */
export const getSwipeDirection = (
  deltaX: number,
  deltaY: number,
  threshold: number = 50
): SwipeDirection | null => {
  const absDeltaX = Math.abs(deltaX);
  const absDeltaY = Math.abs(deltaY);

  // Need minimum movement
  if (absDeltaX < threshold && absDeltaY < threshold) {
    return null;
  }

  // Determine primary direction
  if (absDeltaX > absDeltaY) {
    return deltaX > 0 ? 'right' : 'left';
  } else {
    return deltaY > 0 ? 'down' : 'up';
  }
};

/**
 * Calculate rotation angle based on horizontal movement
 */
export const calculateRotation = (
  deltaX: number,
  maxRotation: number = 15,
  containerWidth: number = 300
): number => {
  const rotation = (deltaX / containerWidth) * maxRotation;
  return Math.max(-maxRotation, Math.min(maxRotation, rotation));
};

/**
 * Calculate opacity based on drag distance
 */
export const calculateOpacity = (
  deltaX: number,
  deltaY: number,
  threshold: number = 100
): number => {
  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  const opacity = 1 - distance / (threshold * 3);
  return Math.max(0.5, Math.min(1, opacity));
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, value));
};

/**
 * Get touch/pointer coordinates from event
 */
export const getEventCoordinates = (
  event: TouchEvent | PointerEvent | MouseEvent | any
): { x: number; y: number } => {
  if ('touches' in event && event.touches && event.touches.length > 0) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }
  
  if ('clientX' in event && 'clientY' in event) {
    return {
      x: event.clientX,
      y: event.clientY,
    };
  }
  
  return { x: 0, y: 0 };
};

