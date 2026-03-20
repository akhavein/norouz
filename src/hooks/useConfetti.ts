import { useEffect, useRef } from 'react';
import type { NorouzPhase } from './useNorouzState';

export function useConfetti(phase: NorouzPhase, prefersReducedMotion: boolean) {
  const firedRef = useRef(false);

  useEffect(() => {
    if (phase !== 'celebrating' || firedRef.current || prefersReducedMotion) return;
    firedRef.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];

    import('canvas-confetti').then(({ default: confetti }) => {
      // Initial burst
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#b08530', '#e8b4b8', '#3d7a82', '#7dad8a', '#fefdf8'],
      });

      // Second wave after 500ms
      timers.push(setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5, x: 0.3 },
          colors: ['#b08530', '#e8b4b8', '#3d7a82'],
        });
      }, 500));

      // Third wave
      timers.push(setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5, x: 0.7 },
          colors: ['#b08530', '#7dad8a', '#e8b4b8'],
        });
      }, 1000));
    });

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [phase, prefersReducedMotion]);
}
