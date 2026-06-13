
import React, { useState } from 'react';
import { GraduationCap, Info, Layers, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';
import { useGrammar } from '../hooks/useLanguageData';

interface Props { lang: Language; }

const GrammarTool: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [activeTab, setActiveTab] = useState(0);

  // 使用 Hook 注入資料
  const grammarData = useGrammar();

  if (grammarData.length === 0) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* 導航 */}
      <div className="bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm flex overflow-x-auto no-scrollbar gap-1">
        {grammarData.map((p, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`flex-1 min-w-[120px] py-3 px-4 rounded-2xl text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === idx ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-400 hover:bg-gray-50'}`}
          >
            {p.title}
          </button>
        ))}
      </div>

      {/* 詳細內容 */}
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-[3rem] border border-indigo-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <GraduationCap size={120} />
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-[10px] font-black uppercase mb-4">
              <Layers size={12} /> Grammar Structure
            </div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight mb-2">
              {grammarData[activeTab].title}
            </h2>
            <p className="text-gray-500 font-medium">
              {grammarData[activeTab].desc}
            </p>
          </div>
        </div>

        {/* 對照網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(grammarData[activeTab].languages).map(([key, data]) => (
            <div key={key} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
               <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs font-black uppercase tracking-widest ${(data as any).color}`}>{(data as any).name}</span>
                  <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-300 group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                    <ArrowRight size={14} />
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Pattern</p>
                    <p className="text-xl font-black text-gray-800 font-mono tracking-tighter">{(data as any).pattern}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2">Real Example</p>
                    <p className="text-sm font-bold text-gray-700">{(data as any).example}</p>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-white rounded-xl text-blue-400 shadow-sm">
             <Info size={16} />
          </div>
          <p className="text-[10px] text-blue-600/70 font-medium leading-relaxed">
            此工具顯示之語言結構由系統內建，不受網站全局語系切換影響內容，方便您在不同語境下對照學習。
          </p>
        </div>
      </div>
    </div>
  );
};

export default GrammarTool;
