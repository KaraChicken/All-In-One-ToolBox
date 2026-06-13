
import { useState, useEffect, useRef, useCallback } from 'react';

export interface Lap {
  id: number;
  time: number;
  diff: number;
}

export const useStopwatchViewModel = () => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive) {
      const startTime = Date.now() - time;
      timerRef.current = window.setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive]);

  const formatTime = useCallback((ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }, []);

  const commands = {
    start: () => setIsActive(true),
    pause: () => setIsActive(false),
    reset: () => {
      setIsActive(false);
      setTime(0);
      setLaps([]);
    },
    lap: () => {
      if (!isActive) return;
      const lastLapTime = laps.length > 0 ? laps[0].time : 0;
      const newLap: Lap = {
        id: laps.length + 1,
        time: time,
        diff: time - lastLapTime
      };
      setLaps(prev => [newLap, ...prev]);
    }
  };

  return {
    state: { time, isActive, laps },
    commands,
    utils: { formatTime }
  };
};
