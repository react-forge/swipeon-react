import { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { SwipeConfig, SwipeCallbacks, GestureState, UseSwipeReturn, SwipeDirection } from '../types';
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
  preventSwipe: [],
  fadeOnSwipe: true,
};

export const useSwipe = (
  callbacks: SwipeCallbacks = {},
  config: SwipeConfig = {}
): UseSwipeReturn => {
  // Memoize config to prevent unnecessary recalculations
  const mergedConfig = useMemo(() => ({ ...DEFAULT_CONFIG, ...config }), [
    config.threshold,
    config.velocityThreshold,
    config.maxRotation,
    config.exitDuration,
    config.returnDuration,
    config.enableRotation,
    config.fadeOnSwipe,
    // Use JSON for array comparison (preventSwipe is typically small)
    JSON.stringify(config.preventSwipe),
  ]);

  const {
    threshold,
    velocityThreshold,
    maxRotation,
    exitDuration,
    returnDuration,
    enableRotation,
    preventSwipe,
    fadeOnSwipe,
  } = mergedConfig;

  const ref = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  
  // Store callbacks in ref to avoid dependency issues
  const callbacksRef = useRef(callbacks);
  callbacksRef.current = callbacks;

  // Use refs for animation values that don't need to trigger re-renders during drag
  const transformRef = useRef('translate3d(0px, 0px, 0px) rotate(0deg)');
  const opacityRef = useRef(1);
  const transitionRef = useRef('none');

  // Single state for values that need to trigger re-renders
  const [renderState, setRenderState] = useState({
    transform: 'translate3d(0px, 0px, 0px) rotate(0deg)',
    opacity: 1,
    transition: 'none',
  });

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

  // Batch update render state
  const updateRenderState = useCallback((updates: Partial<typeof renderState>) => {
    setRenderState(prev => {
      const newState = { ...prev, ...updates };
      // Only update if values actually changed
      if (
        prev.transform === newState.transform &&
        prev.opacity === newState.opacity &&
        prev.transition === newState.transition
      ) {
        return prev;
      }
      return newState;
    });
  }, []);

  // Safe setTimeout that tracks timeouts for cleanup
  const safeTimeout = useCallback((fn: () => void, delay: number) => {
    const id = setTimeout(() => {
      timeoutRefs.current.delete(id);
      fn();
    }, delay);
    timeoutRefs.current.add(id);
    return id;
  }, []);

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

      transitionRef.current = 'none';
      updateRenderState({ transition: 'none' });
      
      callbacksRef.current.onSwipeStart?.();
    },
    [updateRenderState]
  );

  // Handle swipe move - use refs to avoid closure issues
  const gestureStateRef = useRef(gestureState);
  gestureStateRef.current = gestureState;

  const handleSwipeMove = useCallback(
    (event: PointerEvent | TouchEvent | MouseEvent) => {
      const state = gestureStateRef.current;
      if (!state.isDragging) return;

      const coords = getEventCoordinates(event as any);
      let deltaX = coords.x - state.startX;
      let deltaY = coords.y - state.startY;

      // Constrain movement based on preventSwipe directions
      if (preventSwipe.includes('left') && deltaX < 0) deltaX = 0;
      if (preventSwipe.includes('right') && deltaX > 0) deltaX = 0;
      if (preventSwipe.includes('up') && deltaY < 0) deltaY = 0;
      if (preventSwipe.includes('down') && deltaY > 0) deltaY = 0;

      // Update gesture state
      setGestureState(prev => ({
        ...prev,
        currentX: coords.x,
        currentY: coords.y,
        deltaX,
        deltaY,
      }));

      // Use RAF for smooth updates - cancel previous frame
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(() => {
        const rotation = enableRotation ? calculateRotation(deltaX, maxRotation) : 0;
        const newOpacity = fadeOnSwipe ? calculateOpacity(deltaX, deltaY, threshold) : 1;
        const newTransform = `translate3d(${deltaX}px, ${deltaY}px, 0px) rotate(${rotation}deg)`;

        // Update refs immediately for internal use
        transformRef.current = newTransform;
        opacityRef.current = newOpacity;

        // Batch update to React state
        updateRenderState({
          transform: newTransform,
          opacity: newOpacity,
        });
      });
    },
    [enableRotation, maxRotation, threshold, preventSwipe, fadeOnSwipe, updateRenderState]
  );

  // Handle swipe end
  const handleSwipeEnd = useCallback(() => {
    const state = gestureStateRef.current;
    if (!state.isDragging) return;

    const { deltaX, deltaY, startTime } = state;
    const timeDelta = Date.now() - startTime;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = calculateVelocity(distance, timeDelta);

    const direction = getSwipeDirection(deltaX, deltaY, threshold / 2);
    const shouldSwipe = distance >= threshold || velocity >= velocityThreshold;

    // Check if direction is prevented
    const isDirectionPrevented = direction && preventSwipe.includes(direction);

    if (shouldSwipe && direction && !isDirectionPrevented) {
      // Execute swipe
      const exitTransition = `transform ${exitDuration}ms ease-out, opacity ${exitDuration}ms ease-out`;
      
      // Calculate exit position (move far enough off screen)
      const multiplier = 2;
      const exitX = deltaX * multiplier;
      const exitY = deltaY * multiplier;
      const rotation = enableRotation ? calculateRotation(exitX, maxRotation * 2) : 0;
      const exitTransform = `translate3d(${exitX}px, ${exitY}px, 0px) rotate(${rotation}deg)`;

      updateRenderState({
        transition: exitTransition,
        transform: exitTransform,
        opacity: 0,
      });

      // Trigger callback after animation
      safeTimeout(() => {
        switch (direction) {
          case 'left':
            callbacksRef.current.onSwipeLeft?.();
            break;
          case 'right':
            callbacksRef.current.onSwipeRight?.();
            break;
          case 'up':
            callbacksRef.current.onSwipeUp?.();
            break;
          case 'down':
            callbacksRef.current.onSwipeDown?.();
            break;
        }
        
        callbacksRef.current.onSwipeEnd?.();

        // Reset after callback
        safeTimeout(() => {
          updateRenderState({
            transition: 'none',
            transform: 'translate3d(0px, 0px, 0px) rotate(0deg)',
            opacity: 1,
          });
        }, 50);
      }, exitDuration);
    } else {
      // Spring back
      const returnTransition = `transform ${returnDuration}ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity ${returnDuration}ms ease-out`;
      
      updateRenderState({
        transition: returnTransition,
        transform: 'translate3d(0px, 0px, 0px) rotate(0deg)',
        opacity: 1,
      });

      callbacksRef.current.onSwipeEnd?.();
    }

    setGestureState(prev => ({ ...prev, isDragging: false }));
  }, [
    threshold,
    velocityThreshold,
    exitDuration,
    returnDuration,
    enableRotation,
    maxRotation,
    preventSwipe,
    updateRenderState,
    safeTimeout,
  ]);

  // Stable event handler refs to avoid re-attaching listeners
  const handlersRef = useRef({
    handleSwipeStart,
    handleSwipeMove,
    handleSwipeEnd,
  });
  handlersRef.current = { handleSwipeStart, handleSwipeMove, handleSwipeEnd };

  // Attach event listeners with stable references
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const onPointerDown = (e: PointerEvent) => {
      handlersRef.current.handleSwipeStart(e);
    };

    element.addEventListener('pointerdown', onPointerDown);

    return () => {
      element.removeEventListener('pointerdown', onPointerDown);
    };
  }, []); // Empty deps - handlers are accessed via ref

  // Attach document listeners when dragging
  useEffect(() => {
    if (!gestureState.isDragging) return;

    const onPointerMove = (e: PointerEvent) => {
      handlersRef.current.handleSwipeMove(e);
    };

    const onPointerUp = () => {
      handlersRef.current.handleSwipeEnd();
    };

    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp);
    document.addEventListener('pointercancel', onPointerUp);

    return () => {
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);
      document.removeEventListener('pointercancel', onPointerUp);
    };
  }, [gestureState.isDragging]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // Clear all pending timeouts
      timeoutRefs.current.forEach(id => clearTimeout(id));
      timeoutRefs.current.clear();
    };
  }, []);

  // Programmatic swipe function
  const swipe = useCallback((direction: SwipeDirection) => {
    // Check if direction is prevented
    if (preventSwipe.includes(direction)) {
      return;
    }

    // Calculate exit coordinates based on direction
    const exitDistance = 500; // Distance to move off screen
    let exitX = 0;
    let exitY = 0;

    switch (direction) {
      case 'left':
        exitX = -exitDistance;
        break;
      case 'right':
        exitX = exitDistance;
        break;
      case 'up':
        exitY = -exitDistance;
        break;
      case 'down':
        exitY = exitDistance;
        break;
    }

    const rotation = enableRotation ? calculateRotation(exitX, maxRotation * 2) : 0;
    const exitTransform = `translate3d(${exitX}px, ${exitY}px, 0px) rotate(${rotation}deg)`;
    const exitTransition = `transform ${exitDuration}ms ease-out, opacity ${exitDuration}ms ease-out`;

    updateRenderState({
      transition: exitTransition,
      transform: exitTransform,
      opacity: 0,
    });

    // Trigger callback after animation
    safeTimeout(() => {
      switch (direction) {
        case 'left':
          callbacksRef.current.onSwipeLeft?.();
          break;
        case 'right':
          callbacksRef.current.onSwipeRight?.();
          break;
        case 'up':
          callbacksRef.current.onSwipeUp?.();
          break;
        case 'down':
          callbacksRef.current.onSwipeDown?.();
          break;
      }

      callbacksRef.current.onSwipeEnd?.();

      // Reset after callback
      safeTimeout(() => {
        updateRenderState({
          transition: 'none',
          transform: 'translate3d(0px, 0px, 0px) rotate(0deg)',
          opacity: 1,
        });
      }, 50);
    }, exitDuration);
  }, [preventSwipe, enableRotation, maxRotation, exitDuration, updateRenderState, safeTimeout]);

  return {
    ref,
    transform: renderState.transform,
    opacity: renderState.opacity,
    transition: renderState.transition,
    isDragging: gestureState.isDragging,
    deltaX: gestureState.deltaX,
    deltaY: gestureState.deltaY,
    swipe,
  };
};
