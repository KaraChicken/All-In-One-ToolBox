
import { useState, useMemo, useCallback, useEffect } from 'react';
import { Category, Language } from '../../types';
import { TOOLS } from '../../constants';

const STORAGE_KEY = 'smarttool_favorites';

export const useAppViewModel = () => {
  const [lang, setLang] = useState<Language>('zh');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  const toggleFavorite = useCallback((toolId: string) => {
    setFavorites(prev => {
      const next = prev.includes(toolId) ? prev.filter(id => id !== toolId) : [...prev, toolId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const favoriteTools = useMemo(() => TOOLS.filter(t => favorites.includes(t.id)), [favorites]);

  const filteredTools = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return TOOLS.filter(tool => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory || (activeCategory === 'Popular' && tool.isPopular);
      return matchesCategory && (tool.name[lang].toLowerCase().includes(query) || tool.description[lang].toLowerCase().includes(query));
    });
  }, [activeCategory, searchQuery, lang]);

  const openTool = useCallback((toolId: string) => {
    setActiveToolId(toolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const closeTool = useCallback(() => {
    setActiveToolId(null);
  }, []);

  const selectCategory = useCallback((cat: Category) => {
    setActiveCategory(cat);
    setActiveToolId(null); // 切換分類時回到列表
  }, []);

  return {
    lang, setLang,
    activeCategory, setActiveCategory: selectCategory,
    searchQuery, setSearchQuery,
    activeToolId,
    filteredTools,
    favorites,
    favoriteTools,
    commands: {
      openTool,
      closeTool,
      toggleFavorite
    }
  };
};
