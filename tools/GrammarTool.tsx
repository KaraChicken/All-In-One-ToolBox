import React, { useState } from 'react';
import { GraduationCap, Info, Layers, BookOpen, Volume2, CheckCircle2, Languages, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';
import { useGrammar } from '../hooks/useLanguageData';

interface Props { lang: Language; }

type FilterLang = 'all' | 'zh' | 'en' | 'ja' | 'ko';

const GrammarTool: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [activeTab, setActiveTab] = useState(0);
  const [langFilter, setLangFilter] = useState<FilterLang>('all');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [showFormula, setShowFormula] = useState(true);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  const grammarData = useGrammar();

  const speakGrammar = (text: string, currentLang: Language, keyId: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\[\w+\]\s*/g, '').replace(/\([\s\S]*?\)/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      if (currentLang === 'zh') utterance.lang = 'zh-TW';
      else if (currentLang === 'en') utterance.lang = 'en-US';
      else if (currentLang === 'ja') utterance.lang = 'ja-JP';
      else if (currentLang === 'ko') utterance.lang = 'ko-KR';
      
      utterance.rate = 0.8; // Measured speed suitable for dictation and study
      
      utterance.onstart = () => {
        setSpeakingKey(keyId);
      };
      utterance.onend = () => {
        setSpeakingKey(null);
      };
      utterance.onerror = () => {
        setSpeakingKey(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis error:', e);
      setSpeakingKey(null);
    }
  };

  if (grammarData.length === 0) return null;

  const filterOptions: { id: FilterLang; label: string; accent: string; flag: string }[] = [
    { id: 'all', label: '顯示全部語言', accent: 'from-slate-600 to-slate-800', flag: '🌐' },
    { id: 'zh', label: '繁體中文', accent: 'from-indigo-600 to-indigo-700', flag: '🇹🇼' },
    { id: 'en', label: '英語', accent: 'from-blue-600 to-blue-700', flag: '🇺🇸' },
    { id: 'ja', label: '日本語', accent: 'from-rose-500 to-rose-600', flag: '🇯🇵' },
    { id: 'ko', label: '韓語', accent: 'from-emerald-500 to-emerald-600', flag: '🇰🇷' },
  ];

  // Filtering the languages object
  const rawLanguages = grammarData[activeTab].languages;
  const filteredLanguages = Object.entries(rawLanguages).filter(([key]) => {
    if (langFilter === 'all') return true;
    return key === langFilter;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-1 sm:px-4 text-slate-800 dark:text-slate-100">
      
      {/* 1. Dynamic Header Panel (Refined Layout mirroring Phonetics) */}
      <div className="bg-gradient-to-br from-indigo-50/40 via-white to-sky-50/20 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white p-2 rounded-xl shadow-md">
              <BookOpen size={20} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              多語文法對照學習系統
            </span>
          </div>
          <h2 id="grammar-tool-title" className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 dark:text-white">
            文法學習
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            點按整張結構卡片即時聆聽道地母語發音。高對比的中、英、日、韓二外語文語序、敬語語態及複數詞變化。
          </p>
        </div>

        {/* Right Switch Option Buttons like Phonetics View */}
        <div className="flex flex-wrap sm:flex-nowrap gap-2 shrink-0 self-start md:self-auto bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800 pb-2 sm:pb-1.5">
          <button
            type="button"
            onClick={() => {
              window.speechSynthesis.cancel();
              setSpeakingKey(null);
              setVoiceEnabled(!voiceEnabled);
            }}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 border ${
              voiceEnabled 
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 shadow-xs' 
                : 'text-slate-500 border-transparent hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span>{voiceEnabled ? '🔊 點讀發音：啟動' : '🔇 點讀發音：靜音'}</span>
          </button>
          
          <button
            type="button"
            onClick={() => setShowFormula(!showFormula)}
            className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 border ${
              showFormula 
                ? 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-slate-200 dark:border-slate-700 shadow-xs' 
                : 'text-slate-500 border-transparent hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span>{showFormula ? '👁️ 顯示結構公式' : '📄 僅看例句'}</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Tip Card (Strict LanguageHub Replica) */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 text-center sm:text-left shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <span className="flex items-center gap-2 justify-center sm:justify-start">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping shrink-0" />
          💡 提示：點按任何文法區塊卡片，即可播放對應語系母語音訊。
        </span>
        <span className="text-[10px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-950 px-2.5 py-1 rounded-lg">
          TTS 發音引擎版本 v1.0
        </span>
      </div>

      {/* 3. Grammar Category Navigation tabs */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm flex overflow-x-auto no-scrollbar gap-1.5">
        {grammarData.map((p, idx) => (
          <button
            key={idx}
            type="button"
            id={`grammar-tab-${idx}`}
            onClick={() => {
              window.speechSynthesis.cancel();
              setSpeakingKey(null);
              setActiveTab(idx);
            }}
            className={`flex-1 min-w-[130px] sm:min-w-0 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all whitespace-nowrap text-center ${
              activeTab === idx 
                ? 'bg-indigo-600 dark:bg-indigo-505 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            📚 {p.title}
          </button>
        ))}
      </div>

      {/* 4. Language Classification Segment Filter */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-3">
        <div className="flex items-center gap-2 px-1">
          <Languages size={14} className="text-indigo-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 font-sans">
            語言選擇篩選 (Select Target Language)
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                window.speechSynthesis.cancel();
                setSpeakingKey(null);
                setLangFilter(opt.id);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                langFilter === opt.id
                  ? 'bg-gradient-to-r text-white shadow-sm scale-[1.02] border border-transparent'
                  : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-350 border border-slate-100 dark:border-slate-750'
              }`}
              style={{
                backgroundImage: langFilter === opt.id ? `linear-gradient(to right, var(--tw-gradient-stops))` : undefined,
                ['--tw-gradient-from' as any]: langFilter === opt.id ? (opt.id === 'all' ? '#475569' : opt.id === 'zh' ? '#4f46e5' : opt.id === 'en' ? '#2563eb' : opt.id === 'ja' ? '#f43f5e' : '#10b981') : undefined,
                ['--tw-gradient-to' as any]: langFilter === opt.id ? (opt.id === 'all' ? '#1e293b' : opt.id === 'zh' ? '#3730a3' : opt.id === 'en' ? '#1d4ed8' : opt.id === 'ja' ? '#be123c' : '#047857') : undefined,
              }}
            >
              <span>{opt.flag}</span>
              <span>{opt.label}</span>
              {langFilter === opt.id && <CheckCircle2 size={13} className="text-white ml-0.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Topic Banner description */}
        <div className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 rounded-[2.5rem] border border-indigo-100 dark:border-slate-800 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 dark:opacity-[0.03]">
            <Layers size={120} />
          </div>
          
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full text-[10px] font-black uppercase">
              <Layers size={11} /> 當前研究句型範疇
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight">
              {grammarData[activeTab].title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              {grammarData[activeTab].desc}
            </p>
          </div>
        </div>

        {/* 5. Dynamic Interactive "Talking" Bento-Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredLanguages.map(([key, data]) => {
            const currentItem = data as any;
            const cardKey = `${activeTab}-${key}`;
            const isCurrentlySpeaking = speakingKey === cardKey;

            // Brand Colors based on grammar selection mapping
            const themeColors = {
              zh: {
                border: 'hover:border-indigo-400 dark:hover:border-indigo-800',
                text: 'text-indigo-600 dark:text-indigo-400',
                bg: 'bg-indigo-50/50 dark:bg-indigo-950/10',
                accent: 'text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/50',
                glow: 'shadow-indigo-100 dark:shadow-none'
              },
              en: {
                border: 'hover:border-blue-400 dark:hover:border-blue-800',
                text: 'text-blue-600 dark:text-blue-400',
                bg: 'bg-blue-50/50 dark:bg-blue-950/10',
                accent: 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/50',
                glow: 'shadow-blue-100 dark:shadow-none'
              },
              ja: {
                border: 'hover:border-rose-400 dark:hover:border-rose-800',
                text: 'text-rose-600 dark:text-rose-400',
                bg: 'bg-rose-50/50 dark:bg-rose-950/10',
                accent: 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50',
                glow: 'shadow-rose-100 dark:shadow-none'
              },
              ko: {
                border: 'hover:border-emerald-400 dark:hover:border-emerald-800',
                text: 'text-emerald-600 dark:text-emerald-400',
                bg: 'bg-emerald-50/50 dark:bg-emerald-950/10',
                accent: 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50',
                glow: 'shadow-emerald-100 dark:shadow-none'
              }
            }[key as 'zh' | 'en' | 'ja' | 'ko'] || {
              border: 'hover:border-indigo-400',
              text: 'text-indigo-600',
              bg: 'bg-indigo-50/50',
              accent: 'text-indigo-700 bg-indigo-50',
              glow: ''
            };

            return (
              <button 
                key={key} 
                onClick={() => speakGrammar(currentItem.example, key as Language, cardKey)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    speakGrammar(currentItem.example, key as Language, cardKey);
                  }
                }}
                className={`w-full text-left bg-white dark:bg-slate-900/60 p-6 rounded-[2.2rem] border min-h-[190px] ${
                  isCurrentlySpeaking 
                    ? `border-indigo-500 dark:border-indigo-500 scale-[1.01] shadow-md ring-2 ring-indigo-500/10` 
                    : `border-gray-100 dark:border-slate-800/60`
                } ${themeColors.border} shadow-xs hover:shadow-md transition-all duration-300 active:scale-98 group hover:-translate-y-0.5 outline-none flex flex-col justify-between`}
              >
                 {/* Card Header row */}
                 <div className="flex justify-between items-center w-full mb-3 border-b border-slate-50 dark:border-slate-800/60 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {key === 'zh' ? '🇹🇼' : key === 'en' ? '🇺🇸' : key === 'ja' ? '🇯🇵' : '🇰🇷'}
                      </span>
                      <span className={`text-[12px] font-black uppercase tracking-wider ${themeColors.text}`}>
                        {currentItem.name}
                      </span>
                      <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${themeColors.accent} opacity-90`}>
                        點按卡片發音
                      </span>
                    </div>

                    {/* Real-time speaking soundwave or volume indicator */}
                    <div className="shrink-0 h-5 flex items-center justify-center">
                      {isCurrentlySpeaking ? (
                        <div className="flex items-end gap-1 px-1 h-3.5">
                          <span className={`w-0.75 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]`} />
                          <span className={`w-0.75 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]`} />
                          <span className={`w-0.75 h-1.5 bg-indigo-500 rounded-full animate-bounce`} />
                        </div>
                      ) : (
                        <div className="p-1 rounded-lg bg-slate-50 dark:bg-slate-900/50 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 group-hover:text-indigo-600 transition-all">
                          <Volume2 size={13} />
                        </div>
                      )}
                    </div>
                 </div>
                 
                 {/* Card Content parameters */}
                 <div className="space-y-3 w-full">
                    {showFormula && (
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                          [架構規律 Word Order / Suffixes]
                        </p>
                        <p className="text-xs sm:text-[13px] font-black text-slate-700 dark:text-slate-350 font-mono tracking-tight bg-slate-50/50 dark:bg-slate-950/20 py-1.5 px-3 rounded-lg border border-slate-100/50 dark:border-slate-800/40">
                          {currentItem.pattern}
                        </p>
                      </div>
                    )}

                    {/* Example block styled with extreme display size */}
                    <div className={`p-4 rounded-xl ${themeColors.bg} border border-dashed border-slate-150 dark:border-slate-800/40`}>
                      <span className="block text-[8px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1.5">
                        [真實例句範例 Example]
                      </span>
                      <p className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-50 inline-block tracking-wide">
                        {currentItem.example}
                      </p>
                    </div>
                 </div>
              </button>
            );
          })}
        </div>

        {/* 6. Legal notice footer section */}
        <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/75 dark:border-amber-900/40 p-4 rounded-2xl flex items-center gap-3">
          <div className="p-2 bg-white dark:bg-slate-900 rounded-xl text-amber-500 shadow-sm shrink-0">
             <Info size={16} />
          </div>
          <p className="text-[10px] sm:text-[11px] text-amber-800/80 dark:text-amber-400/80 font-medium leading-relaxed mb-0">
            文法自學系統之語音由網頁主機的內建高傳真 Speech Synthesis 發音合成器載入。若點按無聲，請確認作業系統的媒體聲音已開啟或瀏覽器未處於硬體静音。
          </p>
        </div>

      </div>
    </div>
  );
};

export default GrammarTool;
