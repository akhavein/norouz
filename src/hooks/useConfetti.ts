import { useEffect, useRef } from 'react';
import type { NorouzPhase } from './useNorouzState';

export function useConfetti(phase: NorouzPhase, prefersReducedMotion: boolean) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (phase !== 'celebrating' || firedRef.current || prefersReducedMotion) return;
    firedRef.current = true;

    import('canvas-confetti').then(({ default: confetti }) => {
      // Initial burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#c8973e', '#e8b4b8', '#5b9ea6', '#7dad8a', '#fefdf8'],
      });

      // Second wave after 500ms
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5, x: 0.3 },
          colors: ['#c8973e', '#e8b4b8', '#5b9ea6'],
        });
      }, 500);

      // Third wave
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5, x: 0.7 },
          colors: ['#c8973e', '#7dad8a', '#e8b4b8'],
        });
      }, 1000);
    });
  }, [phase, prefersReducedMotion]);
}
