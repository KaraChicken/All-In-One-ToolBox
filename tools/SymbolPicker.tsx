
import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

const SYMBOL_GROUPS = [
  { name: '常用', symbols: ['❤️', '✨', '🔥', '✅', '⭐', '🚀', '📍', '💬', '🔔', '💡'] },
  { name: '箭頭', symbols: ['➔', '➘', '➙', '➚', '➛', '➜', '➝', '➞', '➟', '➠', '➡', '➢', '➣', '➤', '➥', '➦', '➧', '➨', '➩', '➪', '➫', '➬', '➭', '➮', '➯', '➰', '➱', '➲', '➳', '➴', '➵', '➶', '➷', '➸', '➹', '➺', '➻', '➼', '➽', '➾'] },
  { name: '數學', symbols: ['π', '∞', 'Σ', '√', '∫', '≈', '≠', '≤', '≥', '±', '×', '÷', '∆', 'Ω', 'µ', 'α', 'β', 'γ', 'θ'] },
  { name: '形狀', symbols: ['■', '□', '▢', '▣', '▤', '▥', '▦', '▧', '▨', '▩', '▪', '▫', '▬', '▭', '▮', '▯', '▰', '▱', '▲', '△', '▴', '▵', '▶', '▷', '▸', '▹', '►', '▻', '▼', '▽', '▾', '▿', '◀', '◁', '◂', '◃', '◄', '◅', '◆', '◇', '◈', '◉', '◊', '○', '◌', '◍', '◎', '●', '◐', '◑', '◒', '◓', '◔', '◕', '◖', '◗', '◘', '◙', '◚', '◛', '◜', '◝', '◞', '◟', '◠', '◡', '◢', '◣', '◤', '◥', '◦', '◧', '◨', '◩', '◪', '◫', '◬', '◭', '◮', '◯'] },
];

const SymbolPicker: React.FC = () => {
  const [lastCopied, setLastCopied] = useState<string | null>(null);

  const copySymbol = (s: string) => {
    navigator.clipboard.writeText(s);
    setLastCopied(s);
    setTimeout(() => setLastCopied(null), 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold">特殊符號表</h2>
        <p className="text-gray-500">點擊符號即可自動複製到剪貼簿</p>
      </div>

      <div className="space-y-6">
        {SYMBOL_GROUPS.map((group) => (
          <div key={group.name} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">{group.name}</h3>
            <div className="flex flex-wrap gap-2">
              {group.symbols.map((s, i) => (
                <button
                  key={i}
                  onClick={() => copySymbol(s)}
                  className="w-12 h-12 flex items-center justify-center text-xl bg-gray-50 hover:bg-indigo-600 hover:text-white rounded-xl transition-all relative overflow-hidden"
                >
                  {s}
                  {lastCopied === s && (
                    <div className="absolute inset-0 bg-green-500/90 flex items-center justify-center animate-in fade-in duration-200">
                      <Check size={20} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {lastCopied && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-900 text-white rounded-full text-sm font-medium shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
          已複製: {lastCopied}
        </div>
      )}
    </div>
  );
};

export default SymbolPicker;
