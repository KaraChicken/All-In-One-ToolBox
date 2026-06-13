
import React, { useState } from 'react';
import { Volume2, Search, BookOpen, Languages, ArrowRightLeft, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';
import { useVocabulary } from '../hooks/useLanguageData';

interface Props { lang: Language; }

const VocabularyTool: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [sourceLang, setSourceLang] = useState<Language>('zh');
  const [targetLang, setTargetLang] = useState<Language>('en');
  const [search, setSearch] = useState('');
  const [showPhonetic, setShowPhonetic] = useState(true);

  const vocabData = useVocabulary(search);

  const availableLangs: { id: Language; label: string; color: string }[] = [
    { id: 'zh', label: '繁中', color: 'indigo' },
    { id: 'en', label: 'ENG', color: 'blue' },
    { id: 'ja', label: '日語', color: 'rose' },
    { id: 'ko', label: '韓語', color: 'emerald' },
  ];

  const cycleLanguage = (current: Language, direction: 'prev' | 'next', setter: (l: Language) => void) => {
    const currentIndex = availableLangs.findIndex(l => l.id === current);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % availableLangs.length;
    } else {
      nextIndex = (currentIndex - 1 + availableLangs.length) % availableLangs.length;
    }
    setter(availableLangs[nextIndex].id);
  };

  const renderDialSelector = (
    current: Language, 
    onSet: (l: Language) => void, 
    label: string
  ) => {
    const langObj = availableLangs.find(l => l.id === current)!;
    
    return (
      <div className="flex flex-col items-center w-full min-w-0">
        <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5">{label}</p>
        <div className="flex items-center gap-1 bg-gray-50 p-1 rounded-2xl border border-gray-100 w-full">
          <button 
            onClick={() => cycleLanguage(current, 'prev', onSet)}
            className="p-1.5 sm:p-2 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-indigo-600 transition-all flex-shrink-0"
          >
            <ChevronLeft size={14} />
          </button>
          
          <div className="flex-1 text-center py-1 sm:py-2 overflow-hidden min-w-0">
            <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-tighter truncate text-gray-800">
              {langObj.label}
            </div>
          </div>

          <button 
            onClick={() => cycleLanguage(current, 'next', onSet)}
            className="p-1.5 sm:p-2 hover:bg-white hover:shadow-sm rounded-xl text-gray-400 hover:text-indigo-600 transition-all flex-shrink-0"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 sm:px-6">
      {/* 語言與發音切換面板 */}
      <div className="bg-white p-5 sm:p-6 rounded-[2.5rem] border border-gray-100 shadow-xl flex flex-col items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 border-b border-gray-50 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-100">
               <Languages size={18} />
            </div>
            <h3 className="text-sm font-black text-gray-800 tracking-tight">雙語撥輪對照</h3>
          </div>

          {/* 發音顯示切換鈕 */}
          <button 
            onClick={() => setShowPhonetic(!showPhonetic)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-[10px] font-black uppercase tracking-widest ${showPhonetic ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-gray-50 text-gray-400 border border-gray-100'}`}
          >
            {showPhonetic ? <Eye size={12} /> : <EyeOff size={12} />}
            發音提示：{showPhonetic ? '開啟' : '關閉'}
          </button>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 sm:gap-4 items-center w-full max-w-lg">
          {renderDialSelector(sourceLang, setSourceLang, 'Left Language')}
          
          <div className="pt-4">
             <div className="bg-gray-100 p-1.5 sm:p-2 rounded-full border border-gray-200">
                <ArrowRightLeft size={12} className="text-gray-400" />
             </div>
          </div>

          {renderDialSelector(targetLang, setTargetLang, 'Right Language')}
        </div>
      </div>

      {/* 搜尋欄 */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for words (Greetings, Travel, Food...)"
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-50 focus:border-indigo-100 rounded-[2rem] outline-none transition-all font-medium text-sm shadow-sm"
        />
      </div>

      {/* 單字對照清單 */}
      <div className="space-y-10 pb-24">
        {vocabData.length > 0 ? vocabData.map((category, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex items-center gap-3 px-2">
              <BookOpen size={14} className="text-indigo-400" />
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
                {category.category}
              </h4>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {category.items.map((item, iIdx) => (
                <div key={iIdx} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all overflow-hidden flex flex-col md:flex-row min-h-[140px]">
                    
                    {/* 左側對照 */}
                    <div className="flex-1 p-6 relative group-hover:bg-indigo-50/20 transition-colors flex flex-col justify-center min-w-0">
                       <span className="absolute top-4 left-6 text-[8px] font-black text-indigo-300 uppercase tracking-widest">{sourceLang}</span>
                       <div className="mt-2 space-y-1">
                          <h5 className="text-lg sm:text-xl font-black text-gray-800 tracking-tight break-words">
                            {(item as any)[sourceLang]}
                          </h5>
                          {showPhonetic && (item as any)[`${sourceLang}_p`] && (
                            <p className="text-[11px] text-indigo-400 font-bold italic font-mono animate-in fade-in duration-500">
                              {(item as any)[`${sourceLang}_p`]}
                            </p>
                          )}
                       </div>
                    </div>

                    {/* 中央動作區 */}
                    <div className="flex md:flex-col items-center justify-center p-3 bg-gray-50/50 group-hover:bg-indigo-50 transition-colors gap-2 border-y md:border-y-0 md:border-x border-gray-100">
                       <button className="p-3 bg-white text-indigo-500 rounded-2xl shadow-sm hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-110 active:scale-90 border border-gray-100">
                          <Volume2 size={16} />
                       </button>
                    </div>

                    {/* 右側對照 */}
                    <div className="flex-1 p-6 relative group-hover:bg-purple-50/20 transition-colors flex flex-col justify-center min-w-0">
                       <span className="absolute top-4 left-6 text-[8px] font-black text-purple-300 uppercase tracking-widest">{targetLang}</span>
                       <div className="mt-2 space-y-1">
                          <p className="text-lg sm:text-xl font-black text-purple-700 tracking-tight break-words">
                            {(item as any)[targetLang]}
                          </p>
                          {showPhonetic && (item as any)[`${targetLang}_p`] && (
                            <p className="text-[11px] text-purple-400 font-bold italic font-mono animate-in fade-in duration-500">
                              {(item as any)[`${targetLang}_p`]}
                            </p>
                          )}
                       </div>
                    </div>
                </div>
              ))}
            </div>
          </div>
        )) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
             <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                <Search className="text-gray-200" />
             </div>
             <p className="text-gray-400 font-black uppercase tracking-widest text-xs">No matches found for "{search}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyTool;
