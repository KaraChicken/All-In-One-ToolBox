
import React from 'react';
import { Search, Flame, Star } from 'lucide-react';
import { Tool, Language, Category } from '../types';
import { getIcon } from '../constants';
import { UI_STRINGS } from '../i18n';

interface ToolGridProps {
  tools: Tool[];
  favorites: string[];
  activeCategory?: Category;
  favoriteTools?: Tool[];
  onToolClick: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  lang: Language;
  showFavoritesSection?: boolean;
}

const ToolGrid: React.FC<ToolGridProps> = ({ 
  tools, favorites, activeCategory, favoriteTools = [], onToolClick, onToggleFavorite, lang, showFavoritesSection = false
}) => {
  const t = UI_STRINGS[lang];

  const renderTool = (tool: Tool) => {
    const isFav = favorites.includes(tool.id);
    return (
      <div 
        key={tool.id} 
        onClick={() => onToolClick(tool.id)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToolClick(tool.id);
          }
        }}
        role="button"
        tabIndex={0}
        className="group relative bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] dark:hover:shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:border-emerald-200 dark:hover:border-emerald-800/50 hover:-translate-y-1.5 transition-all duration-300 text-center flex flex-col items-center ripple w-full h-full cursor-pointer select-none"
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(tool.id); }}
          className={`absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 rounded-full transition-all z-10 ${isFav ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-100/50 dark:bg-emerald-950/50' : 'text-slate-300 dark:text-slate-600 opacity-100 sm:opacity-0 group-hover:opacity-100'}`}
        >
          <Star size={16} className="sm:w-[18px] sm:h-[18px]" fill={isFav ? "currentColor" : "none"} />
        </button>

        <div className={`mb-3 sm:mb-5 p-3 sm:p-5 rounded-xl sm:rounded-[1.75rem] transition-all duration-500 flex items-center justify-center ${
          tool.category === 'Developer' ? 'bg-emerald-100/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400' :
          tool.category === 'Text' ? 'bg-blue-100/50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400' :
          tool.category === 'Language' ? 'bg-teal-100/50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400' :
          'bg-slate-100/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300'
        } group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-slate-800 group-hover:shadow-lg`}>
          {getIcon(tool.icon, "w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9")}
        </div>
        
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors mb-1 sm:mb-2 tracking-tight">
          {tool.name[lang]}
        </h3>
        <p className="text-[10px] sm:text-[11px] md:text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed line-clamp-2 px-0.5 sm:px-1">
          {tool.description[lang]}
        </p>
      </div>
    );
  };

  if (tools.length === 0 && favoriteTools.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-[2.5rem] border border-slate-100 animate-in fade-in">
        <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="text-slate-300" size={32} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">{t.noTools}</h3>
        <p className="text-slate-500 mt-2 text-sm">{t.noToolsDesc}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {showFavoritesSection && favoriteTools.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">{t.favorites}</h2>
            <div className="h-px flex-1 bg-slate-100" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {favoriteTools.map(renderTool)}
          </div>
        </div>
      )}

      {(tools.length > 0 || !showFavoritesSection) && (
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
              {lang === 'zh' ? '所有工具' : 'All Tools'}
            </h2>
            <div className="h-px flex-1 bg-slate-100" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {tools.map(renderTool)}
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolGrid;
