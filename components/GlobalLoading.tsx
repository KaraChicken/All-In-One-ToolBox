
import React from 'react';
import { Loader2, Zap } from 'lucide-react';
import { useGlobalLoading } from '../context/LoadingContext';

const GlobalLoading: React.FC = () => {
  const { isLoading, message } = useGlobalLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/20 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(16,185,129,0.25)] border border-emerald-100 flex flex-col items-center gap-6 max-w-xs w-full mx-4 transform animate-in zoom-in-95 duration-300">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-400/20 rounded-full blur-xl animate-pulse" />
          <div className="relative bg-emerald-600 text-white p-5 rounded-[2rem] shadow-lg shadow-emerald-200">
            <Zap size={32} fill="currentColor" className="animate-bounce" />
          </div>
          <Loader2 className="absolute -top-2 -right-2 text-emerald-500 animate-spin" size={24} />
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-lg font-black text-slate-900 tracking-tight">{message}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] animate-pulse">SmartTool Hub Engine</p>
        </div>

        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 w-1/2 animate-[loading_1.5s_infinite_ease-in-out]" />
        </div>
      </div>

      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default GlobalLoading;
