
import React, { useState } from 'react';
import { Sparkles, Trash2, ListChecks, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';

interface Props { lang: Language; }

const RaffleTool: React.FC<Props> = ({ lang }) => {
  const [input, setInput] = useState('');
  const [count, setCount] = useState(1);
  const [results, setResults] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const t = UI_STRINGS[lang];

  const handleDraw = () => {
    const list = input.split('\n').map(s => s.trim()).filter(s => s !== '');
    if (list.length === 0) return;

    setIsDrawing(true);
    setResults([]);

    setTimeout(() => {
      const shuffled = [...list];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const array = new Uint32Array(1);
        window.crypto.getRandomValues(array);
        const j = array[0] % (i + 1);
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setResults(shuffled.slice(0, Math.min(count, list.length)));
      setIsDrawing(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-tight">{t.raffleTitle}</h3>
            <button onClick={() => setInput('')} className="text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.rafflePlaceholder}
            className="w-full h-64 p-4 bg-gray-50 border-2 border-gray-100 focus:border-purple-400 rounded-2xl outline-none transition-all resize-none font-medium"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between">
              <span className="text-xs font-bold text-gray-400">{t.raffleCount}</span>
              <span className="text-xs font-black text-purple-600 font-mono">{count}</span>
            </div>
            <input
              type="range" min="1" max="100" value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <button
              onClick={handleDraw}
              disabled={isDrawing || !input.trim()}
              className="w-full py-4 bg-purple-600 text-white rounded-2xl font-black hover:bg-purple-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isDrawing ? <RotateCcw size={20} className="animate-spin" /> : <Sparkles size={20} />}
              {isDrawing ? t.raffleDrawing : t.raffleBtn}
            </button>
          </div>

          <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 min-h-[200px] flex flex-col items-center justify-center">
            {results.length > 0 ? (
              <div className="w-full space-y-3">
                <p className="text-center text-[10px] font-black text-purple-400 uppercase tracking-widest mb-2">{t.raffleResult} 🎉</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {results.map((res, idx) => (
                    <div key={idx} className="bg-white px-4 py-2 rounded-xl shadow-sm border border-purple-200 text-purple-700 font-bold animate-in zoom-in-50 duration-300">{res}</div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 opacity-40">
                <ListChecks size={48} className="mx-auto mb-2" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaffleTool;
