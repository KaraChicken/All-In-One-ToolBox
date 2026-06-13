
import React from 'react';
import { Type, Trash2 } from 'lucide-react';
import { useWordCounterViewModel } from '../hooks/viewmodels/useWordCounterViewModel';

const WordCounter: React.FC = () => {
  const vm = useWordCounterViewModel();

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: '字元數', value: vm.state.stats.chars, color: 'text-violet-600', bg: 'bg-violet-50' },
          { label: '不含空格', value: vm.state.stats.charsNoSpace, color: 'text-fuchsia-600', bg: 'bg-fuchsia-50' },
          { label: '單字數', value: vm.state.stats.words, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '行數', value: vm.state.stats.lines, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        ].map((item) => (
          <div key={item.label} className={`${item.bg} p-5 rounded-3xl border border-white shadow-sm text-center transform transition-all hover:scale-105`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
            <p className={`text-3xl font-black ${item.color} font-mono tracking-tight`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="relative group">
        <textarea
          value={vm.state.text}
          onChange={(e) => vm.commands.setText(e.target.value)}
          placeholder="在此輸入或貼上文字..."
          className="w-full h-80 p-6 bg-slate-50 border-2 border-slate-100 focus:border-violet-400 focus:bg-white rounded-[2rem] outline-none transition-all resize-none font-medium leading-relaxed"
        />
        <button
          onClick={vm.commands.clear}
          className="absolute bottom-6 right-6 p-3 bg-white/90 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-2xl transition-all border border-slate-100 shadow-xl active:scale-90"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default WordCounter;
