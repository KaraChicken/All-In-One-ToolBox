
import React, { useState } from 'react';
import { MessageSquareText, Search, ArrowRightLeft, ChevronLeft, ChevronRight, Copy, Check } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';
import { useVocabulary } from '../hooks/useLanguageData';

interface Props { lang: Language; }

const PhoneticTool: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [sourceLang, setSourceLang] = useState<Language>('zh');
  const [targetLang, setTargetLang] = useState<Language>('ja');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const vocabData = useVocabulary(search);

  const availableLangs: { id: Language; label: string }[] = [
    { id: 'zh', label: '繁中 拼音' },
    { id: 'en', label: 'ENG IPA' },
    { id: 'ja', label: '日語 羅馬字' },
    { id: 'ko', label: '韓語 羅馬拼音' },
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

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
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
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      {/* 語言切換面板 */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl flex flex-col items-center gap-6">
        <div className="flex items-center gap-3 border-b border-gray-50 pb-4 w-full justify-center">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg">
             <MessageSquareText size={18} />
          </div>
          <h3 className="text-sm font-black text-gray-800 tracking-tight">發音拼音對照</h3>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center w-full max-w-lg">
          {renderDialSelector(sourceLang, setSourceLang, 'Source Phonetic')}
          <div className="pt-4">
             <div className="bg-gray-100 p-2 rounded-full border border-gray-200">
                <ArrowRightLeft size={12} className="text-gray-400" />
             </div>
          </div>
          {renderDialSelector(targetLang, setTargetLang, 'Target Phonetic')}
        </div>
      </div>

      {/* 搜尋 */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for pronunciation keys..."
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-50 focus:border-indigo-100 rounded-[2rem] outline-none transition-all font-medium text-sm shadow-sm"
        />
      </div>

      {/* 發音清單 */}
      <div className="space-y-4 pb-20">
        {vocabData.flatMap(cat => cat.items).length > 0 ? vocabData.map((cat) => (
          <div key={cat.category} className="space-y-3">
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-2">{cat.category}</p>
             <div className="grid grid-cols-1 gap-3">
               {cat.items.map((item, idx) => {
                 const sourcePhonetic = (item as any)[`${sourceLang}_p`];
                 const targetPhonetic = (item as any)[`${targetLang}_p`];
                 const uniqueId = `${cat.category}-${idx}`;
                 
                 return (
                   <div key={uniqueId} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between gap-4">
                      
                      {/* 左側發音 */}
                      <div className="flex-1 min-w-0">
                         <div className="flex items-center gap-2 mb-1">
                            <span className="text-[8px] font-black text-indigo-300 uppercase tracking-tight">{sourceLang}</span>
                            <span className="text-xs font-bold text-gray-800 truncate">{(item as any)[sourceLang]}</span>
                         </div>
                         <div className="bg-indigo-50/50 px-3 py-1.5 rounded-xl border border-indigo-100/50 inline-block">
                            <span className="text-sm font-black text-indigo-600 font-mono tracking-tighter break-all">
                               {sourcePhonetic || 'N/A'}
                            </span>
                         </div>
                      </div>

                      {/* 中間對照符號 */}
                      <div className="text-gray-200">
                         <ChevronRight size={16} />
                      </div>

                      {/* 右側發音 */}
                      <div className="flex-1 min-w-0 text-right">
                         <div className="flex items-center justify-end gap-2 mb-1">
                            <span className="text-xs font-bold text-gray-800 truncate">{(item as any)[targetLang]}</span>
                            <span className="text-[8px] font-black text-purple-300 uppercase tracking-tight">{targetLang}</span>
                         </div>
                         <div className="bg-purple-50/50 px-3 py-1.5 rounded-xl border border-purple-100/50 inline-block">
                            <span className="text-sm font-black text-purple-600 font-mono tracking-tighter break-all">
                               {targetPhonetic || 'N/A'}
                            </span>
                         </div>
                      </div>

                      {/* 動作區 */}
                      <div className="flex flex-col gap-1">
                         <button 
                           onClick={() => handleCopy(`${sourcePhonetic} | ${targetPhonetic}`, uniqueId)}
                           className="p-2 hover:bg-gray-50 rounded-xl text-gray-300 hover:text-indigo-600 transition-colors"
                         >
                           {copiedId === uniqueId ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                         </button>
                      </div>
                   </div>
                 );
               })}
             </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-100">
             <p className="text-gray-400 font-bold">No results found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneticTool;
