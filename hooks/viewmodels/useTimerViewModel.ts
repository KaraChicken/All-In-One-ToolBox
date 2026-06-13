
import { useState, useEffect, useRef } from 'react';

export const useTimerViewModel = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [input, setInputState] = useState({ h: 0, m: 0, s: 0 });
  const timerRef = useRef<number | null>(null);

  const setInput = (newInput: { h: number, m: number, s: number }) => {
    // 邏輯約束：如果小時等於 24，分與秒必須為 0
    if (newInput.h >= 24) {
      setInputState({ h: 24, m: 0, s: 0 });
    } else {
      setInputState(newInput);
    }
  };

  const start = () => {
    if (isActive) return;
    let seconds = remaining;
    if (seconds <= 0) {
      seconds = input.h * 3600 + input.m * 60 + input.s;
    }
    if (seconds <= 0) return;
    if (remaining <= 0) setTotalSeconds(seconds);
    setRemaining(seconds);
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const reset = () => {
    setIsActive(false);
    setRemaining(0);
    setTotalSeconds(0);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const quickSet = (m: number) => {
    const s = m * 60;
    setTotalSeconds(s);
    setRemaining(s);
    // 快速設定也需符合 24 小時約束
    if (m >= 1440) { // 24 * 60 = 1440
      setInput({ h: 24, m: 0, s: 0 });
    } else {
      setInput({ h: Math.floor(m / 60), m: m % 60, s: 0 });
    }
  };

  useEffect(() => {
    if (isActive && remaining > 0) {
      timerRef.current = window.setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            setIsActive(false);
            if (timerRef.current) clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isActive, remaining]);

  const getFormattedParts = (total: number) => {
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return { h, m, s };
  };

  const formatTime = (total: number) => {
    const { h, m, s } = getFormattedParts(total);
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progress = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 100;

  return {
    state: { remaining, progress, isActive, input, totalSeconds },
    commands: { start, pause, reset, quickSet, setInput },
    utils: { formatTime, getFormattedParts }
  };
};
