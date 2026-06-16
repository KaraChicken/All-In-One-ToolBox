
import React, { useState, useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import Layout from './components/Layout';
import ToolGrid from './components/ToolGrid';
import GlobalLoading from './components/GlobalLoading';
import { LoadingProvider } from './context/LoadingContext';
import { TOOLS, getIcon } from './constants';
import { useAppViewModel } from './hooks/viewmodels/useAppViewModel';

// Tools Components
import QRCodeGenerator from './tools/QRCodeGenerator';
import PasswordGenerator from './tools/PasswordGenerator';
import UnitConverter from './tools/UnitConverter';
import LanguageHub from './tools/LanguageHub';
import GrammarTool from './tools/GrammarTool';
import VocabularyTool from './tools/VocabularyTool';
import MediaConverter from './tools/MediaConverter';
import TimerTool from './tools/TimerTool';
import ScreenRecorder from './tools/ScreenRecorder';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('smarttool_theme');
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('smarttool_theme', theme);
  }, [theme]);

  const vm = useAppViewModel();

  const renderToolContent = (toolId: string) => {
    const props = { lang: vm.lang };
    let content = null;
    
    switch (toolId) {
      case 'media-converter': content = <MediaConverter {...props} />; break;
      case 'screen-recorder': content = <ScreenRecorder />; break;
      case 'qr-gen': content = <QRCodeGenerator />; break;
      case 'password-gen': content = <PasswordGenerator />; break;
      case 'unit-converter': content = <UnitConverter />; break;
      case 'lang-learning': content = <LanguageHub {...props} />; break;
      case 'lang-grammar': content = <GrammarTool {...props} />; break;
      case 'lang-vocab': content = <VocabularyTool {...props} />; break;
      case 'countdown-timer': content = <TimerTool {...props} />; break;
      default: content = null;
    }

    if (!content) return null;

    return (
      <div className="animate-in fade-in slide-in-from-right-8 duration-500 ease-[cubic-bezier(0.2,0,0,1)] max-w-5xl mx-auto w-full px-2 sm:px-4 md:px-0">
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 md:p-10 rounded-2xl sm:rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_12px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
          {content}
        </div>
      </div>
    );
  };

  return (
    <LoadingProvider>
      <Router>
        <Layout 
          activeCategory={vm.activeCategory} 
          setActiveCategory={vm.setActiveCategory}
          searchQuery={vm.searchQuery}
          setSearchQuery={vm.setSearchQuery}
          activeToolId={vm.activeToolId}
          onBack={vm.commands.closeTool}
          lang={vm.lang}
          setLang={vm.setLang}
          theme={theme}
          setTheme={setTheme}
        >
          {vm.activeToolId ? (
            renderToolContent(vm.activeToolId)
          ) : (
            <div className="animate-in fade-in slide-in-from-left-4 duration-400">
              <ToolGrid 
                tools={vm.filteredTools} 
                favorites={vm.favorites}
                activeCategory={vm.activeCategory}
                favoriteTools={vm.favoriteTools}
                onToolClick={vm.commands.openTool} 
                onToggleFavorite={vm.commands.toggleFavorite}
                lang={vm.lang} 
                showFavoritesSection={vm.activeCategory === 'All' && !vm.searchQuery}
              />
            </div>
          )}
        </Layout>
        <GlobalLoading />
      </Router>
    </LoadingProvider>
  );
};

export default App;
