
import React from 'react';
import { Search, Flame, Star } from 'lucide-react';
import { Tool, Language, Category } from '../types';
import { getIcon } from '../constants';
import { UI_STRINGS } from '../i18n';

interface ToolGridProps {
  tools: Tool[];
  favorites: string[];
  activeCategory: Category;
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
      <button 
        key={tool.id} 
        onClick={() => onToolClick(tool.id)}
        className="group relative bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all duration-300 text-center flex flex-col items-center ripple"
      >
        <button 
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(tool.id); }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all z-10 ${isFav ? 'text-emerald-600 bg-emerald-100/50' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`}
        >
          <Star size={18} fill={isFav ? "currentColor" : "none"} />
        </button>

        <div className={`mb-5 p-5 rounded-[1.75rem] transition-all duration-500 flex items-center justify-center ${
          tool.category === 'Developer' ? 'bg-emerald-100/50 text-emerald-700' :
          tool.category === 'Text' ? 'bg-blue-100/50 text-blue-700' :
          tool.category === 'Language' ? 'bg-teal-100/50 text-teal-700' :
          'bg-slate-100/50 text-slate-700'
        } group-hover:scale-110 group-hover:bg-white group-hover:shadow-lg`}>
          {getIcon(tool.icon, "w-8 h-8 md:w-9 md:h-9")}
        </div>
        
        <h3 className="text-sm md:text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mb-2 tracking-tight">
          {tool.name[lang]}
        </h3>
        <p className="text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed line-clamp-2 px-1">
          {tool.description[lang]}
        </p>
      </button>
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
              {t[activeCategory.toLowerCase() as keyof typeof t] || activeCategory}
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
