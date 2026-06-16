
// Fix: Added missing React import to provide access to the React namespace for types like React.ReactNode and React.FC.
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, Sun, Moon, Zap } from 'lucide-react';
import { Category, Language } from '../types';
import { TOOLS } from '../constants';
import { UI_STRINGS } from '../i18n';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory?: Category;
  setActiveCategory?: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeToolId: string | null;
  onBack: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, searchQuery, setSearchQuery, activeToolId, onBack, lang, setLang, theme, setTheme
}) => {
  const t = UI_STRINGS[lang];
  const activeTool = activeToolId ? TOOLS.find(tool => tool.id === activeToolId) : null;
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Android Top App Bar */}
      <header className="sticky top-0 z-[1000] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-b border-slate-100 dark:border-slate-800 px-3 py-2 sm:px-4 sm:py-3 md:px-8 md:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {activeTool ? (
              <button onClick={onBack} className="p-2 -ml-1 sm:p-2.5 sm:-ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-900 dark:text-slate-100 transition-all ripple">
                <ChevronLeft size={22} className="sm:w-[24px] sm:h-[24px]" />
              </button>
            ) : (
              <Link to="/" className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <div className="bg-emerald-600 text-white p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg shadow-emerald-100 dark:shadow-none">
                  <Zap size={18} className="sm:w-[20px] sm:h-[20px]" fill="currentColor" />
                </div>
              </Link>
            )}
            
            <h1 className="text-xs sm:text-sm md:text-md lg:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50">
              {activeTool ? activeTool.name[lang] : (
                <span className="text-slate-900 dark:text-white flex items-center gap-1 sm:gap-1.5">
                  <span className="font-extrabold tracking-tight shrink-0 text-xs sm:text-sm md:text-base">
                    {lang === 'zh' ? '萬能工具箱' : 'All-in-One'}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-black text-[9px] sm:text-[10px] md:text-[11px] px-1.5 py-0.5 sm:px-2 sm:py-1 bg-emerald-100/80 dark:bg-emerald-950/40 rounded-full select-none uppercase tracking-wide shrink-0">
                    {lang === 'zh' ? 'SmartTool Hub' : 'Hub'}
                  </span>
                </span>
              )}
            </h1>
          </div>

          {!activeTool && (
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={14} />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-8 sm:pl-11 pr-3 sm:pr-4 py-1.5 sm:py-2.5 bg-slate-100/80 dark:bg-slate-800/80 border border-transparent focus:bg-white dark:focus:bg-slate-900 focus:border-emerald-500/20 rounded-full outline-none transition-all text-xs sm:text-sm font-medium dark:text-slate-100" 
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
              className="p-1.5 sm:p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 transition-all ripple"
              title={theme === 'light' ? '切換至深色模式 / Switch to Dark Mode' : '切換至淺色模式 / Switch to Light Mode'}
            >
              {theme === 'light' ? <Moon size={18} className="sm:w-[20px] sm:h-[20px] text-slate-600" /> : <Sun size={18} className="sm:w-[20px] sm:h-[20px] text-amber-400" />}
            </button>
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Language)} 
              className="bg-slate-100 dark:bg-slate-800 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black text-slate-600 dark:text-slate-300 outline-none uppercase cursor-pointer"
            >
              <option value="zh">繁中</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full relative">
        <main className="flex-1 p-3 sm:p-6 md:p-8 lg:p-10 min-w-0 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
