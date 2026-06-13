
import React from 'react';
import { Play, Pause, RotateCcw, Flag, Timer } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';
import { useStopwatchViewModel } from '../hooks/viewmodels/useStopwatchViewModel';

interface Props { lang: Language; }

const StopwatchTool: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const vm = useStopwatchViewModel();

  const timeFormatted = vm.utils.formatTime(vm.state.time);
  const [mainTime, msTime] = timeFormatted.split('.');

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-in fade-in duration-700">
      {/* 核心計時顯示區 */}
      <div className="relative group">
        <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full scale-110" />
        
        <div className="relative bg-white p-12 md:p-20 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/40 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-emerald-600 mb-2">
            <Timer size={18} className={vm.state.isActive ? 'animate-pulse' : ''} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Stopwatch Engine</span>
          </div>

          <div className="flex items-baseline justify-center font-mono tabular-nums tracking-tighter">
            <span className="text-6xl md:text-9xl font-black text-slate-900 leading-none">
              {mainTime}
            </span>
            <span className="text-2xl md:text-4xl font-bold text-emerald-500 ml-2">
              .{msTime}
            </span>
          </div>

          {!vm.state.isActive && vm.state.time > 0 && (
             <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest animate-pulse">計時暫停中</p>
          )}
        </div>
      </div>

      {/* 控制中心：全圓形化設計 */}
      <div className="flex items-center justify-center gap-8">
        {/* 重置按鈕 - 圓形 */}
        <button
          onClick={vm.commands.reset}
          disabled={vm.state.time === 0 || vm.state.isActive}
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-slate-50 text-slate-400 rounded-full border border-slate-100 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-100 transition-all active:scale-90 disabled:opacity-20 disabled:pointer-events-none shadow-sm"
          title={t.timerReset}
        >
          <RotateCcw size={28} />
        </button>

        {/* 主控制按鈕 - 巨大圓形 */}
        <button
          onClick={vm.state.isActive ? vm.commands.pause : vm.commands.start}
          className={`relative w-28 h-28 md:w-36 md:h-36 rounded-full shadow-2xl transition-all active:scale-95 flex items-center justify-center overflow-hidden border-8 border-white group ${
            vm.state.isActive 
              ? 'bg-slate-900 text-white shadow-slate-300' 
              : 'bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-700'
          }`}
        >
          {vm.state.isActive 
            ? <Pause fill="currentColor" size={42} className="relative z-10" /> 
            : <Play fill="currentColor" size={42} className="ml-2 relative z-10" />
          }
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* 計圈按鈕 - 圓形 */}
        <button
          onClick={vm.commands.lap}
          disabled={!vm.state.isActive}
          className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 hover:bg-emerald-100 transition-all active:scale-90 disabled:opacity-20 disabled:pointer-events-none shadow-sm"
          title={t.stopwatchLap}
        >
          <Flag size={28} />
        </button>
      </div>

      {/* 計圈清單 */}
      <div className="space-y-4">
        {vm.state.laps.length > 0 && (
          <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden animate-in slide-in-from-bottom-8">
            <div className="px-8 py-4 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Lap History</h4>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full uppercase">
                {vm.state.laps.length} Laps
              </span>
            </div>
            
            <div className="max-h-80 overflow-y-auto smooth-scroll divide-y divide-slate-50">
              {vm.state.laps.map((lap, index) => (
                <div key={lap.id} className="flex items-center justify-between px-8 py-5 hover:bg-slate-50/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 group-hover:bg-emerald-100 group-hover:text-emerald-700 transition-colors">
                      {vm.state.laps.length - index}
                    </span>
                    <div>
                      <p className="text-sm font-black text-slate-800 font-mono tracking-tight">
                        {vm.utils.formatTime(lap.time)}
                      </p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">Split Time</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-emerald-600 font-mono">
                      +{vm.utils.formatTime(lap.diff)}
                    </p>
                    <p className="text-[9px] font-bold text-slate-300 uppercase">Difference</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
        <div className="p-2 bg-white rounded-xl text-slate-400 shadow-sm">
           <Timer size={14} />
        </div>
        <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
          碼錶精度可達百分之一秒，適合各類運動、實驗或日常計時需求。建議在暫停計時後再點擊重置按鈕。
        </p>
      </div>
    </div>
  );
};

export default StopwatchTool;
