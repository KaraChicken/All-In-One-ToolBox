
import React from 'react';
import { Copy, Trash2, Check, AlertCircle } from 'lucide-react';
import { useJSONFormatterViewModel } from '../hooks/viewmodels/useJSONFormatterViewModel';

const JSONFormatter: React.FC = () => {
  const vm = useJSONFormatterViewModel();

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">JSON Formatter</h2>
          <p className="text-xs md:text-sm text-gray-400">Validate and prettify your JSON code</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <textarea
            value={vm.state.input}
            onChange={(e) => vm.commands.setInput(e.target.value)}
            placeholder="Paste your JSON here..."
            className={`w-full h-64 md:h-80 p-4 font-mono text-xs md:text-sm bg-gray-50 border-2 rounded-xl md:rounded-2xl focus:bg-white transition-all outline-none ${vm.state.error ? 'border-red-300' : 'border-gray-200 focus:border-emerald-500'}`}
          />
          {vm.state.error && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 p-3 bg-red-50 text-red-700 text-[10px] md:text-xs rounded-lg border border-red-100">
              <AlertCircle size={14} />
              {vm.state.error}
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 md:p-4 bg-white border border-gray-100 rounded-xl md:rounded-2xl shadow-sm">
          <div className="flex flex-wrap justify-center gap-1.5 md:gap-2">
            <button onClick={() => vm.commands.prettify(2)} className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-[10px] md:text-xs font-bold">2 Space</button>
            <button onClick={() => vm.commands.prettify(4)} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-[10px] md:text-xs font-bold">4 Space</button>
            <button onClick={vm.commands.minify} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors text-[10px] md:text-xs font-bold">Minify</button>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 justify-center">
            <button onClick={vm.commands.copy} className="flex-1 sm:flex-none p-2 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all flex items-center justify-center gap-2">
              {vm.state.copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
              <span className="text-[10px] md:text-xs font-bold">{vm.state.copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button onClick={vm.commands.clear} className="flex-1 sm:flex-none p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all flex items-center justify-center gap-2">
              <Trash2 size={16} />
              <span className="text-[10px] md:text-xs font-bold">Clear</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;
