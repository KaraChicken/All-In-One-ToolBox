
import React from 'react';
import { Globe, Sparkles, MapPin, Clock } from 'lucide-react';
import { Language } from '../types';
import { useNewYearViewModel, TIMEZONES } from '../hooks/viewmodels/useNewYearViewModel';

interface Props { lang: Language; }

const NewYearCountdown: React.FC<Props> = ({ lang }) => {
  const vm = useNewYearViewModel();
  const { days, hours, minutes, seconds, ms, timezoneId } = vm.state;
  const selectedTz = TIMEZONES.find(t => t.id === timezoneId);

  const TimeCard = ({ val, label, sub = "" }: { val: number | string, label: string, sub?: string }) => (
    <div className="flex flex-col items-center group flex-1 min-w-0">
      <div className="bg-white/95 backdrop-blur-md p-2 xs:p-3 md:p-5 rounded-xl xs:rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 shadow-lg shadow-slate-200/50 w-full flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="flex items-baseline gap-0.5">
          <span className="text-xl xs:text-2xl md:text-5xl font-black text-slate-900 font-mono tabular-nums tracking-tighter">
            {val.toString().padStart(2, '0')}
          </span>
          {sub && <span className="text-[10px] xs:text-xs md:text-xl font-black text-emerald-500 font-mono tabular-nums">.{sub}</span>}
        </div>
      </div>
      <span className="mt-1.5 md:mt-2 text-[7px] xs:text-[8px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest md:tracking-[0.2em]">{label}</span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-10 py-2 md:py-4 px-1">
      {/* 核心倒數展示區 */}
      <div className="bg-slate-900 p-5 xs:p-6 md:p-16 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden shadow-2xl flex flex-col items-center gap-6 md:gap-12">
        {/* 背景裝飾 */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
           <div className="absolute top-0 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-emerald-500/10 rounded-full blur-[80px] md:blur-[120px]" />
           <div className="absolute bottom-0 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-teal-500/10 rounded-full blur-[80px] md:blur-[120px]" />
        </div>

        <div className="relative z-10 w-full max-w-2xl space-y-6 md:space-y-8">
          {/* 第一行：跨年倒數 */}
          <div className="flex justify-between gap-1.5 xs:gap-2 md:gap-6">
            <TimeCard val={days} label="Days" />
            <TimeCard val={hours} label="Hours" />
            <TimeCard val={minutes} label="Min" />
            <TimeCard val={seconds} label="Sec" sub={ms.toString().padStart(2, '0')} />
          </div>

          {/* 第二行：時區名稱 */}
          <div className="flex flex-col items-center gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            <div className="flex items-center gap-1.5 md:gap-2 px-4 md:px-6 py-1.5 md:py-2 bg-emerald-500/10 rounded-full border border-emerald-500/20 backdrop-blur-sm">
              <MapPin size={12} className="text-emerald-400 md:w-4 md:h-4" />
              <span className="text-emerald-400 text-xs md:text-lg font-black tracking-tight truncate max-w-[150px] xs:max-w-none">
                {selectedTz?.label}
              </span>
              <div className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5 md:ml-1" />
            </div>
            <p className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">Current Target Location</p>
          </div>
        </div>

        {/* 底部裝飾 (僅在較大螢幕顯示或縮小) */}
        <div className="hidden xs:flex absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 items-center gap-2 opacity-20">
          <Sparkles size={10} className="text-emerald-400 md:w-3 md:h-3" />
          <span className="text-[7px] md:text-[9px] text-white font-black uppercase tracking-widest">Global Celebration Tracker</span>
          <Sparkles size={10} className="text-emerald-400 md:w-3 md:h-3" />
        </div>
      </div>

      {/* 時區選擇器 */}
      <div className="bg-white p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4 md:space-y-6">
        <div className="flex items-center justify-between border-b border-slate-50 pb-3 md:pb-4">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-slate-100 p-2 md:p-2.5 rounded-xl md:rounded-2xl text-slate-600">
              <Globe size={16} md:size={18} />
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-black text-slate-800 tracking-tight">全球時區切換</h3>
              <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">Select Celebration Timezone</p>
            </div>
          </div>
          <div className="flex items-center gap-1 px-2 md:px-3 py-1 bg-slate-50 rounded-lg border border-slate-100">
             <Clock size={10} className="text-slate-400 md:w-3 md:h-3" />
             <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase">GMT {selectedTz?.offset && selectedTz.offset >= 0 ? `+${selectedTz.offset}` : selectedTz?.offset}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3">
          {TIMEZONES.map((tz) => (
            <button
              key={tz.id}
              onClick={() => vm.commands.setTimezoneId(tz.id)}
              className={`px-3 md:px-4 py-2.5 md:py-3 rounded-xl md:rounded-2xl text-[9px] md:text-xs font-black transition-all border-2 text-center flex flex-col items-center gap-0.5 md:gap-1 group ${
                timezoneId === tz.id 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-100 scale-105' 
                  : 'bg-slate-50 text-slate-500 border-slate-50 hover:bg-white hover:border-emerald-100 hover:text-emerald-600'
              }`}
            >
              <span className="truncate w-full">{tz.label.split(' ')[0]}</span>
              <span className={`text-[7px] md:text-[8px] opacity-60 ${timezoneId === tz.id ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`}>
                UTC{tz.offset >= 0 ? `+${tz.offset}` : tz.offset}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 提示腳註 */}
      <div className="flex items-center justify-center gap-2 md:gap-4 py-2 md:py-4 opacity-30">
        <div className="h-px flex-1 bg-slate-200" />
        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">Smart Precision Timing • v2.2</p>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
};

export default NewYearCountdown;
