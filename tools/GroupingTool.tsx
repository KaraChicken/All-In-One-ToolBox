
import React, { useState } from 'react';
import { Users, Shuffle, Trash2, LayoutGrid } from 'lucide-react';

const GroupingTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<'numGroups' | 'sizePerGroup'>('numGroups');
  const [value, setValue] = useState(2);
  const [groups, setGroups] = useState<string[][]>([]);

  const handleGroup = () => {
    const list = input.split('\n').map(s => s.trim()).filter(s => s !== '');
    if (list.length === 0) return;

    // Shuffle
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    let result: string[][] = [];
    if (mode === 'numGroups') {
      const numGroups = value;
      for (let i = 0; i < numGroups; i++) result.push([]);
      shuffled.forEach((name, idx) => {
        result[idx % numGroups].push(name);
      });
    } else {
      const size = value;
      for (let i = 0; i < shuffled.length; i += size) {
        result.push(shuffled.slice(i, i + size));
      }
    }
    setGroups(result);
  };

  const colors = [
    'border-blue-400 bg-blue-50 text-blue-700',
    'border-emerald-400 bg-emerald-50 text-emerald-700',
    'border-amber-400 bg-amber-50 text-amber-700',
    'border-rose-400 bg-rose-50 text-rose-700',
    'border-indigo-400 bg-indigo-50 text-indigo-700',
    'border-purple-400 bg-purple-50 text-purple-700',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-gray-500 uppercase tracking-tight">成員清單</h3>
            <button onClick={() => setInput('')} className="text-gray-400 hover:text-red-500 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="輸入人員名單..."
            className="w-full h-48 p-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-emerald-400 transition-all resize-none"
          />
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <div className="flex p-1 bg-gray-100 rounded-xl gap-1">
            <button
              onClick={() => setMode('numGroups')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'numGroups' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
            >
              固定組數
            </button>
            <button
              onClick={() => setMode('sizePerGroup')}
              className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${mode === 'sizePerGroup' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}
            >
              每組人數
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-xs font-bold text-gray-400">{mode === 'numGroups' ? '要分成幾組？' : '每組幾個人？'}</span>
              <span className="text-xs font-black text-emerald-600 font-mono">{value}</span>
            </div>
            <input
              type="range"
              min="2"
              max="20"
              value={value}
              onChange={(e) => setValue(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
          </div>

          <button
            onClick={handleGroup}
            disabled={!input.trim()}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
          >
            <Shuffle size={20} /> 開始隨機分組
          </button>
        </div>
      </div>

      {groups.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {groups.map((group, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border-2 ${colors[idx % colors.length]}`}>
              <h4 className="text-[10px] font-black uppercase mb-3 opacity-60">第 {idx + 1} 組</h4>
              <ul className="space-y-1">
                {group.map((member, mIdx) => (
                  <li key={mIdx} className="text-sm font-bold">{member}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupingTool;
