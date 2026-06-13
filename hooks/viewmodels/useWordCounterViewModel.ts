
import { useState, useMemo } from 'react';

export const useWordCounterViewModel = () => {
  const [text, setText] = useState('');

  const stats = useMemo(() => {
    return {
      chars: text.length,
      charsNoSpace: text.replace(/\s/g, '').length,
      words: text.trim() ? text.trim().split(/\s+/).length : 0,
      lines: text.trim() ? text.split('\n').length : 0,
    };
  }, [text]);

  const commands = {
    setText: (val: string) => setText(val),
    clear: () => setText('')
  };

  return {
    state: { text, stats },
    commands
  };
};
