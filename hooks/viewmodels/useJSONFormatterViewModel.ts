
import { useState } from 'react';

export const useJSONFormatterViewModel = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const formatJSON = (space: number) => {
    try {
      if (!input.trim()) return;
      const parsed = JSON.parse(input);
      setInput(JSON.stringify(parsed, null, space));
      setError('');
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`);
    }
  };

  const commands = {
    setInput: (val: string) => {
      setInput(val);
      if (error) setError('');
    },
    prettify: (space: number) => formatJSON(space),
    minify: () => {
      try {
        if (!input.trim()) return;
        const parsed = JSON.parse(input);
        setInput(JSON.stringify(parsed));
        setError('');
      } catch (e: any) {
        setError(`Invalid JSON: ${e.message}`);
      }
    },
    copy: () => {
      navigator.clipboard.writeText(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    },
    clear: () => {
      setInput('');
      setError('');
    }
  };

  return {
    state: { input, error, copied },
    commands
  };
};
