import { useState, useEffect, useRef } from 'react';

export type PomodoroMode = 'focus' | 'shortBreak' | 'longBreak';

export interface PomodoroTimes {
  focus: number;      // minutes
  shortBreak: number; // minutes
  longBreak: number;  // minutes
}

export const useTimerViewModel = () => {
  const [mode, setMode] = useState<PomodoroMode>('focus');
  const [customTimes, setCustomTimes] = useState<PomodoroTimes>({
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [currentTask, setCurrentTask] = useState('');
  const [autoTransition, setAutoTransition] = useState(false);

  const timerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Initialize time based on mode
  useEffect(() => {
    setTimeLeft(customTimes[mode] * 60);
    setIsActive(false);
  }, [mode, customTimes]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer tick effect
  useEffect(() => {
    if (isActive) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, mode]);

  // Handle completion chime & automatic mode switching
  const handleTimerComplete = () => {
    setIsActive(false);
    playChime();

    if (mode === 'focus') {
      setPomodorosCompleted((prev) => prev + 1);
      // Auto transition to break after design session
      const nextMode = (pomodorosCompleted + 1) % 4 === 0 ? 'longBreak' : 'shortBreak';
      if (autoTransition) {
        setTimeout(() => {
          setMode(nextMode);
          setIsActive(true);
        }, 1000);
      } else {
        setMode(nextMode);
      }
    } else {
      // Transition back to focus
      if (autoTransition) {
        setTimeout(() => {
          setMode('focus');
          setIsActive(true);
        }, 1000);
      } else {
        setMode('focus');
      }
    }
  };

  // Safe chemical synthesized sound using Web Audio API
  const playChime = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // First beep
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc1.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.4);

      // Second beep slightly offset
      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        gain2.gain.setValueAtTime(0.15, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc2.start(ctx.currentTime);
        osc2.stop(ctx.currentTime + 0.5);
      }, 150);

    } catch (e) {
      console.error('Audio play error:', e);
    }
  };

  const start = () => {
    setIsActive(true);
  };

  const pause = () => {
    setIsActive(false);
  };

  const reset = () => {
    setIsActive(false);
    setTimeLeft(customTimes[mode] * 60);
  };

  const setTimeMinutes = (targetMode: PomodoroMode, minutes: number) => {
    const val = Math.max(1, Math.min(180, minutes)); // limit between 1 minute & 3 hours
    setCustomTimes((prev) => ({
      ...prev,
      [targetMode]: val,
    }));
  };

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getPercentage = () => {
    const initialSeconds = customTimes[mode] * 60;
    if (initialSeconds <= 0) return 100;
    return (timeLeft / initialSeconds) * 100;
  };

  return {
    state: {
      mode,
      timeLeft,
      isActive,
      customTimes,
      pomodorosCompleted,
      currentTask,
      autoTransition,
      progress: getPercentage(),
    },
    commands: {
      start,
      pause,
      reset,
      setMode,
      setTimeMinutes,
      setCurrentTask,
      setAutoTransition,
      setPomodorosCompleted,
      triggerTestChime: playChime
    },
    utils: {
      formatTime,
    },
  };
};
