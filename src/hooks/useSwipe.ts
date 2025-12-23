import { useRef, useState, useCallback, useEffect } from 'react';
import { SwipeConfig, SwipeCallbacks, GestureState, UseSwipeReturn } from '../types';
import {
  getSwipeDirection,
  calculateRotation,
  calculateOpacity,
  calculateVelocity,
  getEventCoordinates,
} from '../utils/helpers';

const DEFAULT_CONFIG: Required<SwipeConfig> = {
  threshold: 100,
  velocityThreshold: 0.5,
  maxRotation: 15,
  exitDuration: 300,
  returnDuration: 200,
  enableRotation: true,
};

export const useSwipe = (
  callbacks: SwipeCallbacks = {},
  config: SwipeConfig = {}
): UseSwipeReturn => {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const {
    threshold,
    velocityThreshold,
    maxRotation,
    exitDuration,
    returnDuration,
    enableRotation,
  } = mergedConfig;

  const ref = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const [gestureState, setGestureState] = useState<GestureState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    deltaX: 0,
    deltaY: 0,
    velocity: 0,
    direction: null,
    startTime: 0,
  });

  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px) rotate(0deg)');
  const [opacity, setOpacity] = useState(1);
  const [transition, setTransition] = useState('none');

  // Handle swipe start
  const handleSwipeStart = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      const coords = getEventCoordinates(event as any);
      const now = Date.now();

      setGestureState({
        isDragging: true,
        startX: coords.x,
        startY: coords.y,
        currentX: coords.x,
        currentY: coords.y,
        deltaX: 0,
        deltaY: 0,
        velocity: 0,
        direction: null,
        startTime: now,
      });

      setTransition('none');
      
      if (callbacks.onSwipeStart) {
        callbacks.onSwipeStart();
      }
    },
    [callbacks]
  );

  // Handle swipe move
  const handleSwipeMove = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      if (!gestureState.isDragging) return;

      const coords = getEventCoordinates(event as any);
      const deltaX = coords.x - gestureState.startX;
      const deltaY = coords.y - gestureState.startY;

      // Update gesture state
      setGestureState((prev: GestureState) => ({
        ...prev,
        currentX: coords.x,
        currentY: coords.y,
        deltaX,
        deltaY,
      }));

      // Use RAF for smooth updates
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const rotation = enableRotation ? calculateRotation(deltaX, maxRotation) : 0;
        const newOpacity = calculateOpacity(deltaX, deltaY, threshold);

        setTransform(
          `translate3d(${deltaX}px, ${deltaY}px, 0px) rotate(${rotation}deg)`
        );
        setOpacity(newOpacity);
      });
    },
    [gestureState.isDragging, gestureState.startX, gestureState.startY, enableRotation, maxRotation, threshold]
  );

  // Handle swipe end
  const handleSwipeEnd = useCallback(() => {
    if (!gestureState.isDragging) return;

    const { deltaX, deltaY, startTime } = gestureState;
    const timeDelta = Date.now() - startTime;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = calculateVelocity(distance, timeDelta);

    const direction = getSwipeDirection(deltaX, deltaY, threshold / 2);
    const shouldSwipe =
      distance >= threshold || velocity >= velocityThreshold;

    if (shouldSwipe && direction) {
      // Execute swipe
      setTransition(`transform ${exitDuration}ms ease-out, opacity ${exitDuration}ms ease-out`);
      
      // Calculate exit position (move far enough off screen)
      const multiplier = 2;
      const exitX = deltaX * multiplier;
      const exitY = deltaY * multiplier;
      const rotation = enableRotation ? calculateRotation(exitX, maxRotation * 2) : 0;

      setTransform(
        `translate3d(${exitX}px, ${exitY}px, 0px) rotate(${rotation}deg)`
      );
      setOpacity(0);

      // Trigger callback after animation
      setTimeout(() => {
        switch (direction) {
          case 'left':
            callbacks.onSwipeLeft?.();
            break;
          case 'right':
            callbacks.onSwipeRight?.();
            break;
          case 'up':
            callbacks.onSwipeUp?.();
            break;
          case 'down':
            callbacks.onSwipeDown?.();
            break;
        }
        
        if (callbacks.onSwipeEnd) {
          callbacks.onSwipeEnd();
        }

        // Reset after callback
        setTimeout(() => {
          setTransition('none');
          setTransform('translate3d(0px, 0px, 0px) rotate(0deg)');
          setOpacity(1);
        }, 50);
      }, exitDuration);
    } else {
      // Spring back
      setTransition(
        `transform ${returnDuration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity ${returnDuration}ms ease-out`
      );
      setTransform('translate3d(0px, 0px, 0px) rotate(0deg)');
      setOpacity(1);

      if (callbacks.onSwipeEnd) {
        callbacks.onSwipeEnd();
      }
    }

    setGestureState((prev: GestureState) => ({ ...prev, isDragging: false }));
  }, [
    gestureState,
    threshold,
    velocityThreshold,
    exitDuration,
    returnDuration,
    enableRotation,
    maxRotation,
    callbacks,
  ]);

  // Attach event listeners
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handlePointerDown = (e: PointerEvent) => {
      handleSwipeStart(e);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (gestureState.isDragging) {
        handleSwipeMove(e);
      }
    };

    const handlePointerUp = () => {
      handleSwipeEnd();
    };

    element.addEventListener('pointerdown', handlePointerDown);

    if (gestureState.isDragging) {
      document.addEventListener('pointermove', handlePointerMove);
      document.addEventListener('pointerup', handlePointerUp);
      document.addEventListener('pointercancel', handlePointerUp);
    }

    return () => {
      element.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('pointercancel', handlePointerUp);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gestureState.isDragging, handleSwipeStart, handleSwipeMove, handleSwipeEnd]);

  return {
    ref,
    transform,
    opacity,
    transition,
    isDragging: gestureState.isDragging,
  };
};

