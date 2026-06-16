import React, { useState } from 'react';
import { 
  Volume2, Search, BookOpen, Languages, ArrowRightLeft, 
  ChevronLeft, ChevronRight, CheckCircle2, Bookmark, 
  LayoutGrid, Heart, AlertTriangle, Coins, Home, Plane, 
  Clock, Utensils, Info, Check, Eye, EyeOff
} from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';
import { useVocabulary } from '../hooks/useLanguageData';

interface Props { lang: Language; }

interface PresetOption {
  label: string;
  source: Language;
  target: Language;
  badge: string;
  desc: string;
}

const VocabularyTool: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [sourceLang, setSourceLang] = useState<Language>('zh');
  const [targetLang, setTargetLang] = useState<Language>('en');
  const [search, setSearch] = useState('');
  const [showPhonetic, setShowPhonetic] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);

  const vocabData = useVocabulary(search);

  const availableLangs: { id: Language; label: string; color: string; locale: string; flag: string }[] = [
    { id: 'zh', label: '繁中 (Chinese)', color: 'indigo', locale: 'zh-TW', flag: '🇹🇼' },
    { id: 'en', label: 'ENG (English)', color: 'blue', locale: 'en-US', flag: '🇺🇸' },
    { id: 'ja', label: '日本語 (Japanese)', color: 'rose', locale: 'ja-JP', flag: '🇯🇵' },
    { id: 'ko', label: '한국어 (Korean)', color: 'emerald', locale: 'ko-KR', flag: '🇰🇷' },
  ];

  const presets: PresetOption[] = [
    { label: '日語自學對照', source: 'zh', target: 'ja', badge: '🇹🇼 ⇄ 🇯🇵', desc: '中文與日語五十音單字基礎對比' },
    { label: '韓語自學對照', source: 'zh', target: 'ko', badge: '🇹🇼 ⇄ 🇰🇷', desc: '中文與韓語常用外來語、敬語對比' },
    { label: '國際英語常用', source: 'zh', target: 'en', badge: '🇹🇼 ⇄ 🇺🇸', desc: '旅行與商務英文單字對比學習' },
    { label: '日韓雙語對比', source: 'ja', target: 'ko', badge: '🇯🇵 ⇄ 🇰🇷', desc: '驚人相似的日韓語文漢字詞及助詞拼音' },
  ];

  // Defined Category Metadata with gorgeous colors & styles matching the language learning suite
  const categories = [
    { id: 'all', label: '全部單字', emoji: '🗂️', icon: LayoutGrid, bg: 'from-slate-600 to-slate-800', border: 'border-slate-350', text: 'text-slate-600 dark:text-slate-400' },
    { id: '日常問候', label: '問候社交', emoji: '👋', icon: Heart, bg: 'from-indigo-600 to-indigo-700', border: 'border-indigo-250', text: 'text-indigo-600 dark:text-indigo-400' },
    { id: '餐飲美食', label: '餐飲美食', emoji: '🍜', icon: Utensils, bg: 'from-amber-500 to-amber-600', border: 'border-amber-250', text: 'text-amber-600 dark:text-amber-450' },
    { id: '購物、金流', label: '購物退稅', emoji: '🛒', icon: Coins, bg: 'from-emerald-600 to-emerald-700', border: 'border-emerald-250', text: 'text-emerald-600 dark:text-emerald-450' },
    { id: '交通出行', label: '交通問路', emoji: '✈️', icon: Plane, bg: 'from-blue-600 to-blue-700', border: 'border-blue-250', text: 'text-blue-600 dark:text-blue-450' },
    { id: '住宿與客房', label: '住宿客房', emoji: '🏨', icon: Home, bg: 'from-violet-600 to-violet-700', border: 'border-violet-250', text: 'text-violet-600 dark:text-violet-450' },
    { id: '緊急求助', label: '緊急救護', emoji: '🚨', icon: AlertTriangle, bg: 'from-rose-500 to-rose-600', border: 'border-rose-250', text: 'text-rose-600 dark:text-rose-450' },
    { id: '實用時間', label: '時間數字', emoji: '📅', icon: Clock, bg: 'from-cyan-600 to-cyan-700', border: 'border-cyan-250', text: 'text-cyan-600 dark:text-cyan-450' }
  ];

  const filteredVocab = vocabData.filter(cat => {
    if (activeCategory === 'all') return true;
    return cat.category.toLowerCase().includes(activeCategory.toLowerCase());
  });

  const getCategoryCount = (id: string) => {
    if (id === 'all') {
      return vocabData.reduce((acc, cat) => acc + cat.items.length, 0);
    }
    const match = vocabData.find(cat => cat.category.toLowerCase().includes(id.toLowerCase()));
    return match ? match.items.length : 0;
  };

  const selectPreset = (p: PresetOption) => {
    setSourceLang(p.source);
    setTargetLang(p.target);
  };

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

  const speakText = (text: string, currentLang: Language, itemIndex: string) => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const targetObj = availableLangs.find(l => l.id === currentLang);
      utterance.lang = targetObj ? targetObj.locale : 'en-US';
      utterance.rate = 0.8;
      
      utterance.onstart = () => {
        setSpeakingKey(`${itemIndex}-${currentLang}`);
      };
      utterance.onend = () => {
        setSpeakingKey(null);
      };
      utterance.onerror = () => {
        setSpeakingKey(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis helper failed:', e);
      setSpeakingKey(null);
    }
  };

  const currentPresetActive = presets.find(p => p.source === sourceLang && p.target === targetLang);

  const renderDialSelector = (
    current: Language, 
    onSet: (l: Language) => void, 
    label: string
  ) => {
    const langObj = availableLangs.find(l => l.id === current)!;
    
    return (
      <div className="flex flex-col items-center w-full min-w-0">
        <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 font-mono">{label}</p>
        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 p-1 rounded-2xl border border-slate-100 dark:border-slate-800 w-full transition-all hover:border-slate-200 dark:hover:border-slate-700">
          <button 
            type="button"
            onClick={() => cycleLanguage(current, 'prev', onSet)}
            className="p-2 hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm rounded-xl text-slate-400 hover:text-indigo-600 transition-all flex-shrink-0"
          >
            <ChevronLeft size={14} />
          </button>
          
          <div className="flex-1 text-center py-2 overflow-hidden min-w-0 flex items-center justify-center gap-1.5">
            <span className="text-sm">{langObj.flag}</span>
            <div className="text-xs font-black uppercase tracking-tight truncate text-slate-800 dark:text-slate-100">
              {langObj.label}
            </div>
          </div>

          <button 
            type="button"
            onClick={() => cycleLanguage(current, 'next', onSet)}
            className="p-2 hover:bg-white dark:hover:bg-slate-900 hover:shadow-sm rounded-xl text-slate-400 hover:text-indigo-600 transition-all flex-shrink-0"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-1 sm:px-4 text-slate-800 dark:text-slate-100">
      
      {/* 1. Header Panel */}
      <div className="bg-gradient-to-br from-indigo-50/50 via-white to-orange-50/20 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-2 rounded-xl shadow-md">
              <Languages size={20} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              Vocabulary Classification Suite
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 dark:text-white">
            生活常用單字
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            精心挑選中、英、日、韓日常生活關鍵必備單字。支援雙語轉輪、細碎維度分類、羅馬拼音、母語即時高質感語音朗讀。
          </p>
        </div>

        {/* Pronunciation & Phonetic controls */}
        <div className="flex gap-2 shrink-0 self-start md:self-auto bg-slate-100 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800">
          <button 
            type="button"
            onClick={() => setShowPhonetic(!showPhonetic)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl transition-all text-xs font-bold leading-tight ${
              showPhonetic 
                ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border border-slate-200 dark:border-slate-700 shadow-xs' 
                : 'text-slate-500 border-transparent hover:text-slate-700 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-805'
            }`}
          >
            {showPhonetic ? <Eye size={13} /> : <EyeOff size={13} />}
            <span>拼音標註：{showPhonetic ? '顯現' : '隱藏'}</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Category Bento Box dashboard (詳細分類) */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.2rem] border border-gray-100 dark:border-slate-800/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-50 dark:border-slate-800/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 p-1.5 rounded-lg">
              <Bookmark size={14} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 font-sans">
              生活維度分類學習 (Vocabulary Category Dashboard)
            </span>
          </div>
          <span className="text-[9px] font-bold py-0.5 px-2.5 rounded-full bg-slate-150 dark:bg-slate-950 text-slate-500">
            全部單字量：{getCategoryCount('all')} 字
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.filter(cat => cat.id === 'all' || getCategoryCount(cat.id) > 0).map((cat) => {
            const isSelected = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);
            const IconComponent = cat.icon;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  window.speechSynthesis.cancel();
                  setActiveCategory(cat.id);
                }}
                className={`flex flex-col items-center justify-between p-3.5 rounded-2xl border text-center transition-all duration-300 relative group min-h-[96px] outline-none ${
                  isSelected
                    ? 'bg-gradient-to-br from-indigo-50/70 to-slate-50/20 dark:from-indigo-950/40 dark:to-slate-950 text-indigo-700 dark:text-indigo-300 border-indigo-400 dark:border-indigo-800 shadow-sm scale-[1.03]'
                    : 'bg-slate-50/50 dark:bg-slate-800/30 hover:bg-slate-50 dark:hover:bg-slate-800 border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-xs'
                }`}
              >
                {/* Badge Indicator decoration */}
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500" />
                )}

                <div className={`p-1.5 rounded-xl transition-transform group-hover:scale-110 duration-300 ${
                  isSelected ? 'bg-indigo-100/50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300' : 'bg-white dark:bg-slate-900 text-slate-500'
                }`}>
                  <IconComponent size={18} />
                </div>

                <div className="space-y-0.5">
                  <p className="text-[10px] font-black tracking-tight text-slate-700 dark:text-slate-350">
                    {cat.label}
                  </p>
                  <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 font-mono">
                    {count} 個單字
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Preset Comparisons Layout (二外自學習快速配置) */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center gap-2 px-1">
          <div className="bg-violet-100 dark:bg-violet-950/80 p-1.5 rounded-lg text-violet-600 dark:text-violet-400">
            <Bookmark size={14} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 font-sans">
            語言模式快速自學習對照組 (Study Mode Presets)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {presets.map((p, idx) => {
            const isActive = sourceLang === p.source && targetLang === p.target;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => selectPreset(p)}
                className={`p-4 rounded-2xl text-left transition-all border outline-none flex flex-col justify-between h-[100px] ${
                  isActive 
                    ? 'bg-gradient-to-br from-indigo-50/60 to-violet-50/30 dark:from-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100 border-indigo-200 dark:border-indigo-900 shadow-sm scale-[1.02]' 
                    : 'bg-slate-50/50 dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-850'
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <span className="text-[11px] font-black uppercase tracking-tight text-indigo-600 dark:text-indigo-400 font-sans">
                    {p.label}
                  </span>
                  <span className="text-[9px] font-black font-mono px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-2xs">
                    {p.badge}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-2 w-full font-medium leading-relaxed">
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Language Dial Matcher Dashboard (旋鈕轉盤) */}
      <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col items-center gap-6">
        <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4 border-b border-slate-50 dark:border-slate-800/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-100 dark:shadow-none">
              <Languages size={18} />
            </div>
            <h3 className="text-xs sm:text-sm font-black text-slate-800 dark:text-white tracking-tight">雙語自訂轉輪對置</h3>
          </div>
          
          <div className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
            💡 選定後下方對照表將即時適配您挑選的源語系與目標語系
          </div>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-2 sm:gap-4 items-center w-full max-w-lg">
          {renderDialSelector(sourceLang, setSourceLang, '比對主維度隨選 (Source)')}
          
          <div className="pt-4">
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full border border-slate-200 dark:border-slate-750 transition-all hover:bg-slate-200 active:rotate-180 duration-300 cursor-pointer">
              <ArrowRightLeft size={12} className="text-slate-500 dark:text-slate-450" />
            </div>
          </div>

          {renderDialSelector(targetLang, setTargetLang, '比對副維度隨選 (Target)')}
        </div>
      </div>

      {/* 5. Search Input Bar inside selected view */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`在「${categories.find(c => c.id === activeCategory)?.label || '當前'}」分類中搜尋單字 (如：你好, 謝謝, Menu, Airport)...`}
          className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-800 focus:border-indigo-150 rounded-2xl outline-none transition-all font-medium text-xs sm:text-sm shadow-xs dark:text-slate-100"
        />
      </div>

      {/* 6. Vocab Categories list (分類渲染模組) */}
      <div className="space-y-10 pb-24">
        {filteredVocab.length > 0 ? filteredVocab.map((category, idx) => {
          const matchedMeta = categories.find(c => category.category.includes(c.id));
          const Emoji = matchedMeta?.emoji || '📚';
          const AccentText = matchedMeta?.text || 'text-indigo-600';

          return (
            <div key={idx} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">{Emoji}</span>
                  <h4 className={`text-xs sm:text-[13px] font-black ${AccentText} uppercase tracking-widest font-sans`}>
                    {category.category}
                  </h4>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold font-mono">
                  {category.items.length} 個對照組
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {category.items.map((item, iIdx) => {
                  const sourceText = (item as any)[sourceLang];
                  const targetText = (item as any)[targetLang];
                  const sourcePinyin = (item as any)[`${sourceLang}_p`];
                  const targetPinyin = (item as any)[`${targetLang}_p`];
                  
                  const isSourceSpeaking = speakingKey === `${idx}-${iIdx}-${sourceLang}`;
                  const isTargetSpeaking = speakingKey === `${idx}-${iIdx}-${targetLang}`;

                  return (
                    <div 
                      key={iIdx} 
                      className="bg-white dark:bg-slate-900 rounded-[2.2rem] border border-gray-100 dark:border-slate-800/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between p-5 min-h-[160px] group"
                    >
                      {/* Top Row: Language Indicators & Soundwave triggers */}
                      <div className="grid grid-cols-2 gap-3 border-b border-slate-50 dark:border-slate-800/60 pb-3 mb-3">
                        {/* Source Side */}
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 font-mono tracking-widest uppercase">
                            {sourceLang === 'zh' ? '🇹🇼 繁中' : sourceLang === 'en' ? '🇺🇸 ENG' : sourceLang === 'ja' ? '🇯🇵 日本語' : '🇰🇷 한국어'}
                          </span>
                          <button 
                            type="button" 
                            onClick={() => speakText(sourceText, sourceLang, `${idx}-${iIdx}`)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isSourceSpeaking 
                                ? 'bg-indigo-150 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 animate-pulse' 
                                : 'bg-slate-50 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-slate-400 hover:text-indigo-600'
                            }`}
                            title="朗讀發音"
                          >
                            <Volume2 size={13} className={isSourceSpeaking ? 'scale-110' : ''} />
                          </button>
                        </div>

                        {/* Target Side */}
                        <div className="flex items-center justify-between border-l border-slate-100 dark:border-slate-800 pl-3">
                          <span className="text-[9px] font-black text-emerald-500 font-mono tracking-widest uppercase">
                            {targetLang === 'zh' ? '🇹🇼 繁中' : targetLang === 'en' ? '🇺🇸 ENG' : targetLang === 'ja' ? '🇯🇵 日本語' : '🇰🇷 한국어'}
                          </span>
                          <button 
                            type="button" 
                            onClick={() => speakText(targetText, targetLang, `${idx}-${iIdx}`)}
                            className={`p-1.5 rounded-lg transition-all ${
                              isTargetSpeaking 
                                ? 'bg-emerald-150 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 animate-pulse' 
                                : 'bg-slate-50 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950 text-slate-400 hover:text-emerald-500'
                            }`}
                            title="朗讀發音"
                          >
                            <Volume2 size={13} className={isTargetSpeaking ? 'scale-110' : ''} />
                          </button>
                        </div>
                      </div>

                      {/* Middle row: Text Display */}
                      <div className="grid grid-cols-2 gap-3 items-start my-auto">
                        
                        {/* Source Term Content */}
                        <div className="space-y-1">
                          <p className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-155 tracking-tight break-words">
                            {sourceText}
                          </p>
                          {showPhonetic && sourcePinyin && (
                            <p className="text-[10px] text-indigo-400 dark:text-indigo-300 font-bold italic font-mono leading-tight">
                              {sourcePinyin}
                            </p>
                          )}
                        </div>

                        {/* Target Term Content */}
                        <div className="space-y-1 border-l border-slate-100 dark:border-slate-800 pl-3">
                          <p className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 tracking-tight break-words">
                            {targetText}
                          </p>
                          {showPhonetic && targetPinyin && (
                            <p className="text-[10px] text-slate-450 dark:text-slate-500 font-bold italic font-mono leading-tight">
                              {targetPinyin}
                            </p>
                          )}
                        </div>

                      </div>

                      {/* Footer Row: Note description */}
                      <div className="mt-3 pt-2 border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between text-[10px] text-slate-400">
                        <span className="truncate max-w-[80%] font-medium">
                          💡 備註：{item.note || '生活必備字彙'}
                        </span>
                        <span className="text-[9px] font-black text-slate-350 dark:text-slate-600 uppercase font-mono tracking-tighter shrink-0">
                          v1.0對比
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          );
        }) : (
          <div className="text-center py-24 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800">
             <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-slate-350 dark:text-slate-600" />
             </div>
             <p className="text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest text-xs">該分類中查無與 "{search}" 相關的單字記錄</p>
          </div>
        )}
      </div>

      {/* 7. Bottom Legal Notice Footer */}
      <div className="bg-amber-50/40 dark:bg-amber-950/10 border border-amber-100/75 dark:border-amber-900/40 p-4 rounded-2xl flex items-center gap-3">
        <div className="p-2 bg-white dark:bg-slate-900 rounded-xl text-amber-500 shadow-sm shrink-0">
           <Info size={16} />
        </div>
        <p className="text-[10px] sm:text-[11px] text-amber-800/80 dark:text-amber-400/80 font-medium leading-relaxed mb-0">
          單字對比庫之發音完全依據作業系統及語音合成器調度讀取。如發生點讀無聲之情形，請檢驗揚聲器通道或切換拼音功能狀態再點閱試念。
        </p>
      </div>

    </div>
  );
};

export default VocabularyTool;
