
import React from 'react';
import { AlertCircle, Info } from 'lucide-react';
import { useBMIViewModel } from '../hooks/viewmodels/useBMIViewModel';

const BMICalculator: React.FC = () => {
  const vm = useBMIViewModel();

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div className="space-y-4 md:space-y-6">
          <div className="bg-slate-50 p-5 md:p-6 rounded-xl md:rounded-2xl border border-slate-100 space-y-4">
            <h3 className="text-xs font-bold text-slate-500 flex items-center gap-2">
              <Info size={14} /> 輸入數值
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">身高 (cm)</label>
                <input
                  type="number"
                  value={vm.state.height}
                  onChange={(e) => vm.commands.setHeight(e.target.value)}
                  className="w-full px-4 py-2.5 md:py-3 bg-white border-2 border-slate-100 rounded-xl focus:border-emerald-400 outline-none transition-all font-mono text-base md:text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">體重 (kg)</label>
                <input
                  type="number"
                  value={vm.state.weight}
                  onChange={(e) => vm.commands.setWeight(e.target.value)}
                  className="w-full px-4 py-2.5 md:py-3 bg-white border-2 border-slate-100 rounded-xl focus:border-emerald-400 outline-none transition-all font-mono text-base md:text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-6 md:p-8 bg-white rounded-2xl md:rounded-3xl border-2 border-dashed border-slate-100 relative overflow-hidden">
          <div className="text-center z-10">
            <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase mb-2">您的 BMI 指數</p>
            <h2 className={`text-4xl md:text-6xl font-black mb-2 ${vm.state.evaluation.color.replace('indigo', 'emerald')}`}>{vm.state.bmi}</h2>
            <div className={`inline-block px-4 py-1 rounded-full text-white font-bold text-[10px] md:text-xs ${vm.state.evaluation.bg.replace('indigo', 'emerald')}`}>
              {vm.state.evaluation.label}
            </div>
          </div>
          
          <div className="mt-6 md:mt-8 w-full space-y-2 z-10">
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-blue-500" style={{ width: '18.5%' }} />
              <div className="h-full bg-emerald-500" style={{ width: '24%' }} />
              <div className="h-full bg-yellow-500" style={{ width: '20%' }} />
              <div className="h-full bg-orange-500" style={{ width: '15%' }} />
              <div className="h-full bg-red-500" style={{ width: '22.5%' }} />
            </div>
            <div className="flex justify-between text-[8px] md:text-[10px] text-slate-400 font-bold px-1">
              <span>18.5</span>
              <span>24</span>
              <span>27</span>
              <span>30</span>
              <span>35</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`p-4 rounded-xl md:rounded-2xl border flex gap-3 md:gap-4 items-start ${vm.state.bmi > 0 ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
        <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl bg-white shadow-sm ${vm.state.evaluation.color.replace('indigo', 'emerald')}`}>
          <AlertCircle size={18} />
        </div>
        <div>
          <h4 className="font-bold text-emerald-900 text-xs md:text-sm">健康建議</h4>
          <p className="text-emerald-700 text-[10px] md:text-xs mt-1 leading-relaxed">
            {vm.state.bmi > 0 ? vm.state.evaluation.hint : '請輸入身高與體重以獲取建議。'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BMICalculator;
