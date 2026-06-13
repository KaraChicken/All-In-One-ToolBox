
import React from 'react';
import { Play, Pause, RotateCcw, Bell, Hourglass } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';
import { useTimerViewModel } from '../hooks/viewmodels/useTimerViewModel';

interface Props { lang: Language; }

const TimerTool: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const vm = useTimerViewModel();

  const radius = 135; 
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (vm.state.progress / 100) * circumference;

  const { h, m, s } = vm.utils.getFormattedParts(vm.state.remaining);
  const isUrgent = vm.state.remaining > 0 && vm.state.remaining <= 10;
  const isFinished = vm.state.remaining === 0 && vm.state.totalSeconds > 0;

  const fontSizeClass = h > 0 
    ? "text-4xl md:text-5xl" 
    : "text-5xl md:text-6xl";

  const isMaxHour = vm.state.input.h === 24;

  return (
    <div className="max-w-md mx-auto space-y-8">
      {/* 核心儀表板區 */}
      <div className="relative flex justify-center items-center">
        <div className={`absolute w-48 h-48 md:w-56 md:h-56 rounded-full blur-[50px] transition-all duration-1000 opacity-20 ${
          isFinished ? 'bg-rose-500 opacity-40 scale-125' : 
          vm.state.isActive ? 'bg-emerald-500 scale-100' : 'bg-slate-300 scale-90'
        }`} />

        <svg 
          viewBox="0 0 300 300" 
          className="w-64 h-64 md:w-80 md:h-80 transform -rotate-90 shrink-0 drop-shadow-xl"
        >
          <circle 
            cx="150" 
            cy="150" 
            r={radius} 
            className="stroke-slate-100/80 fill-none" 
            strokeWidth="10" 
          />
          
          <circle
            cx="150"
            cy="150"
            r={radius}
            className={`fill-none transition-all duration-1000 ease-linear ${
              isFinished ? 'stroke-rose-500 animate-pulse' : 
              isUrgent ? 'stroke-amber-500' : 'stroke-emerald-500'
            }`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${isFinished ? '#f43f5e' : isUrgent ? '#f59e0b' : '#10b981'})` }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div className={`flex flex-col items-center justify-center transition-all duration-500 ${
            isFinished ? 'text-rose-600' : 
            isUrgent ? 'text-amber-600' : 
            vm.state.isActive ? 'text-emerald-600' : 'text-slate-800'
          }`}>
            
            <div className={`font-mono font-black tabular-nums tracking-tighter text-center leading-none ${fontSizeClass}`}>
              <div className="flex items-center justify-center drop-shadow-sm">
                {h > 0 && (
                  <>
                    <span>{h.toString().padStart(2, '0')}</span>
                    <span className="opacity-30 text-3xl mx-0.5">:</span>
                  </>
                )}
                <span>{m.toString().padStart(2, '0')}</span>
                <span className="opacity-30 text-3xl mx-0.5">:</span>
                <span>{s.toString().padStart(2, '0')}</span>
              </div>
            </div>

            <div className="flex gap-4 mt-2 opacity-40 text-[9px] font-black uppercase tracking-[0.2em] leading-none">
              {h > 0 && <span>{t.unitHour}</span>}
              <span>{t.unitMinute}</span>
              <span>{t.unitSecond}</span>
            </div>

            <div className="absolute bottom-[15%] w-full flex justify-center">
              {vm.state.isActive ? (
                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-emerald-100">
                  <Hourglass size={10} className="animate-spin" /> Counting
                </div>
              ) : isFinished ? (
                <div className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 border border-rose-100 animate-bounce">
                  <Bell size={10} /> {t.timerFinish}
                </div>
              ) : (
                <div className="px-3 py-1 bg-slate-50 text-slate-400 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">
                  Ready
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 space-y-6">
        {!vm.state.isActive && vm.state.remaining === 0 && (
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: t.unitHour, val: vm.state.input.h, key: 'h', max: 24, disabled: false },
              { label: t.unitMinute, val: vm.state.input.m, key: 'm', max: 59, disabled: isMaxHour },
              { label: t.unitSecond, val: vm.state.input.s, key: 's', max: 59, disabled: isMaxHour },
            ].map((item) => (
              <div 
                key={item.key} 
                className={`bg-white p-3 rounded-2xl border transition-all ${
                  item.disabled 
                    ? 'opacity-40 bg-slate-50 border-slate-100 grayscale cursor-not-allowed' 
                    : 'border-slate-100 shadow-sm focus-within:ring-2 focus-within:ring-emerald-500/20'
                } text-center`}
              >
                <input
                  type="number"
                  placeholder="0"
                  disabled={item.disabled}
                  value={item.val === 0 ? '' : item.val}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    const newVal = Math.min(item.max, Math.max(0, parseInt(e.target.value) || 0));
                    vm.commands.setInput({ ...vm.state.input, [item.key]: newVal });
                  }}
                  className={`w-full bg-transparent text-xl font-black text-slate-800 text-center outline-none font-mono ${item.disabled ? 'cursor-not-allowed' : ''}`}
                />
                <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{item.label}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-2">
          {[1, 5, 10, 30].map(m => (
            <button 
              key={m} 
              onClick={() => vm.commands.quickSet(m)} 
              className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black hover:bg-emerald-600 hover:text-white transition-all active:scale-95"
            >
              {m}{t.unitMinute}
            </button>
          ))}
        </div>

        <div className="flex justify-center items-center gap-8">
          {/* 重置按鈕 - 正圓形 */}
          <button 
            onClick={vm.commands.reset} 
            className="w-16 h-16 flex items-center justify-center bg-slate-100 text-slate-400 rounded-full hover:bg-slate-200 transition-all active:scale-90 shadow-sm border border-slate-200/50"
          >
            <RotateCcw size={24} />
          </button>
          
          {/* 主控制按鈕 - 正圓形 */}
          <button
            onClick={vm.state.isActive ? vm.commands.pause : vm.commands.start}
            className={`w-24 h-24 md:w-32 md:h-32 rounded-full shadow-2xl transition-all flex items-center justify-center active:scale-95 border-8 border-white ${
              vm.state.isActive 
                ? 'bg-slate-900 text-white shadow-slate-300' 
                : 'bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700'
            }`}
          >
            {vm.state.isActive 
              ? <Pause fill="currentColor" size={40} /> 
              : <Play fill="currentColor" size={40} className="ml-2" />
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimerTool;
