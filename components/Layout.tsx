
// Fix: Added missing React import to provide access to the React namespace for types like React.ReactNode and React.FC.
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Home, Zap, Flame, Layers, Star, Languages as LangIcon, ChevronLeft, Globe } from 'lucide-react';
import { Category, Language } from '../types';
import { TOOLS, getIcon } from '../constants';
import { UI_STRINGS } from '../i18n';

interface LayoutProps {
  children: React.ReactNode;
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeToolId: string | null;
  onBack: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, activeCategory, setActiveCategory, searchQuery, setSearchQuery, activeToolId, onBack, lang, setLang
}) => {
  const t = UI_STRINGS[lang];
  const categories: Category[] = ['All', 'Popular', 'Developer', 'Text', 'Math', 'Language', 'Daily'];
  const activeTool = activeToolId ? TOOLS.find(tool => tool.id === activeToolId) : null;

  const getNavIcon = (cat: Category, active: boolean) => {
    const size = 22;
    const props = { size, className: active ? 'text-emerald-900' : 'text-slate-500' };
    switch (cat) {
      case 'All': return <Home {...props} fill={active ? 'currentColor' : 'none'} />;
      case 'Popular': return <Flame {...props} fill={active ? 'currentColor' : 'none'} />;
      case 'Developer': return <Layers {...props} />;
      case 'Text': return <LangIcon {...props} />;
      default: return <Star {...props} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Android Top App Bar */}
      <header className="sticky top-0 z-[1000] bg-white/80 backdrop-blur-2xl border-b border-slate-100 px-4 py-3 md:px-8 md:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {activeTool ? (
              <button onClick={onBack} className="p-2.5 -ml-2 hover:bg-slate-100 rounded-full text-slate-900 transition-all ripple">
                <ChevronLeft size={24} />
              </button>
            ) : (
              <Link to="/" className="flex items-center gap-2 shrink-0">
                <div className="bg-emerald-600 text-white p-2 rounded-xl shadow-lg shadow-emerald-100">
                  < Zap size={20} fill="currentColor" />
                </div>
              </Link>
            )}
            
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              {activeTool ? activeTool.name[lang] : (
                <span className="hidden sm:inline">SmartTool<span className="text-emerald-600 font-black">Hub</span></span>
              )}
            </h1>
          </div>

          {!activeTool && (
            <div className="flex-1 max-w-xl">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder={t.searchPlaceholder} 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-100/80 border-2 border-transparent focus:bg-white focus:border-emerald-500/20 rounded-full outline-none transition-all text-sm font-medium" 
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value as Language)} 
              className="bg-slate-100 px-3 py-1.5 rounded-full text-[10px] font-black text-slate-600 outline-none uppercase cursor-pointer"
            >
              <option value="zh">繁中</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-7xl mx-auto w-full relative">
        {/* Sidebar - Desktop only */}
        {!activeTool && (
          <aside className="hidden lg:block sticky top-[81px] h-[calc(100vh-81px)] w-64 p-6 overflow-y-auto">
            <nav className="space-y-2">
              {categories.map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setActiveCategory(cat)} 
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-[1.75rem] transition-all relative overflow-hidden group ripple ${activeCategory === cat ? 'bg-emerald-100 text-emerald-900 font-bold' : 'text-slate-600 hover:bg-slate-50'}`}
                >
                  {getNavIcon(cat, activeCategory === cat)}
                  <span className="text-sm tracking-tight">{t[cat.toLowerCase() as keyof typeof t] || cat}</span>
                </button>
              ))}
            </nav>
          </aside>
        )}

        <main className={`flex-1 p-4 md:p-8 lg:p-10 min-w-0 ${!activeTool ? 'pb-24 lg:pb-8' : 'pb-8'}`}>
          {children}
        </main>
      </div>

      {/* Android Bottom Navigation - Mobile only */}
      {!activeTool && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-100 z-[3000] px-2 py-3 flex justify-around items-center safe-area-inset-bottom shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
          {['All', 'Popular', 'Developer', 'Text', 'Daily'].map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button 
                key={cat} 
                onClick={() => setActiveCategory(cat as Category)}
                className="flex flex-col items-center gap-1.5 flex-1 relative group"
              >
                <div className={`px-5 py-1 rounded-full transition-all duration-300 ${isActive ? 'bg-emerald-100' : 'bg-transparent'}`}>
                  {getNavIcon(cat as Category, isActive)}
                </div>
                <span className={`text-[10px] font-bold tracking-tight transition-colors ${isActive ? 'text-emerald-900' : 'text-slate-500'}`}>
                  {t[cat.toLowerCase() as keyof typeof t] || cat}
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default Layout;
