import { useEffect, useState, useRef } from 'react';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
}

export function useCountdown(target: Date | null): CountdownValues {
  const [values, setValues] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false,
  });
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!target) return;

    function tick() {
      const diff = target!.getTime() - Date.now();

      if (diff <= 0) {
        setValues({ days: 0, hours: 0, minutes: 0, seconds: 0, isComplete: true });
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      setValues({
        days: Math.floor(totalSeconds / 86400),
        hours: Math.floor((totalSeconds % 86400) / 3600),
        minutes: Math.floor((totalSeconds % 3600) / 60),
        seconds: totalSeconds % 60,
        isComplete: false,
      });
    }

    tick();
    intervalRef.current = setInterval(tick, 250);
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [target]);

  return values;
}
