
import React, { useState, useMemo } from 'react';
import { Copy, Check, Calculator, Equal } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';

interface Props { lang: Language; }

const PercentageCalculator: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [copied, setCopied] = useState<number | null>(null);

  // 計算邏輯狀態
  const [basic, setBasic] = useState({ p: '10', total: '100' });
  const [ratio, setRatio] = useState({ val: '20', total: '100' });
  const [reverse, setReverse] = useState({ val: '100', p: '60' }); // ? 的 X% 等於 Y
  const [change, setChange] = useState({ from: '100', to: '120' });
  const [add, setAdd] = useState({ val: '100', p: '10' });

  const basicResult = useMemo(() => {
    const p = parseFloat(basic.p);
    const total = parseFloat(basic.total);
    if (isNaN(p) || isNaN(total)) return '0';
    return ((p / 100) * total).toFixed(2).replace(/\.00$/, '');
  }, [basic]);

  const ratioResult = useMemo(() => {
    const val = parseFloat(ratio.val);
    const total = parseFloat(ratio.total);
    if (isNaN(val) || isNaN(total) || total === 0) return '0';
    return ((val / total) * 100).toFixed(2).replace(/\.00$/, '');
  }, [ratio]);

  const reverseResult = useMemo(() => {
    const val = parseFloat(reverse.val);
    const p = parseFloat(reverse.p);
    if (isNaN(val) || isNaN(p) || p === 0) return '0';
    return (val / (p / 100)).toFixed(2).replace(/\.00$/, '');
  }, [reverse]);

  const changeResult = useMemo(() => {
    const from = parseFloat(change.from);
    const to = parseFloat(change.to);
    if (isNaN(from) || isNaN(to) || from === 0) return { val: '0', type: 'increase' };
    const diff = ((to - from) / from) * 100;
    return {
      val: Math.abs(diff).toFixed(2).replace(/\.00$/, ''),
      type: diff >= 0 ? 'increase' : 'decrease'
    };
  }, [change]);

  const addResult = useMemo(() => {
    const val = parseFloat(add.val);
    const p = parseFloat(add.p);
    if (isNaN(val) || isNaN(p)) return '0';
    return (val * (1 + p / 100)).toFixed(2).replace(/\.00$/, '');
  }, [add]);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const InputField = ({ value, onChange, suffix = '', prefix = '' }: any) => (
    <div className="relative inline-flex items-center">
      {prefix && <span className="mr-1 text-xs text-gray-400 font-bold">{prefix}</span>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-20 sm:w-24 px-2 py-1.5 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 rounded-lg outline-none transition-all font-mono font-bold text-center text-sm"
      />
      {suffix && <span className="ml-1 text-xs text-gray-400 font-bold">{suffix}</span>}
    </div>
  );

  const ResultBadge = ({ text, id, typeBadge, prefixText = '' }: any) => (
    <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 group/res w-full sm:w-auto">
      {prefixText && <span className="text-[10px] text-blue-400 font-bold uppercase mr-1">{prefixText}</span>}
      <span className="text-blue-700 font-black font-mono text-sm">{text}</span>
      {typeBadge}
      <button 
        onClick={() => handleCopy(text, id)} 
        className="text-blue-300 hover:text-blue-600 transition-colors ml-auto"
      >
        {copied === id ? <Check size={14} /> : <Copy size={14} />}
      </button>
    </div>
  );

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* 類型 1: X% of Y = ? */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <InputField value={basic.p} onChange={(v: string) => setBasic({ ...basic, p: v })} suffix="%" />
            <span>{t.percentOf}</span>
            <InputField value={basic.total} onChange={(v: string) => setBasic({ ...basic, total: v })} />
          </div>
          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-0">
            <Equal size={14} className="text-gray-300" />
            <ResultBadge text={basicResult} id={1} />
          </div>
        </div>

        {/* 類型 2: X is what % of Y? */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <InputField value={ratio.val} onChange={(v: string) => setRatio({ ...ratio, val: v })} />
            <span>{t.isWhatPercent}</span>
            <InputField value={ratio.total} onChange={(v: string) => setRatio({ ...ratio, total: v })} />
          </div>
          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-50">
            <Equal size={14} className="text-gray-300" />
            <ResultBadge text={`${ratioResult}%`} id={2} />
          </div>
        </div>

        {/* 類型 3 (更新): ? 的 X% 等於 Y (多少的 60% 等於 100) */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span className="text-blue-500 font-bold">{t.whatNumber}</span>
            <span>{t.ofWhat}</span>
            <InputField value={reverse.p} onChange={(v: string) => setReverse({ ...reverse, p: v })} suffix="%" />
            <span>{t.equals}</span>
            <InputField value={reverse.val} onChange={(v: string) => setReverse({ ...reverse, val: v })} />
          </div>
          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-50">
            <Equal size={14} className="text-gray-300" />
            <ResultBadge text={reverseResult} id={5} prefixText={t.whatNumber} />
          </div>
        </div>

        {/* 類型 4: Inc/Dec X by Y% */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <InputField value={add.val} onChange={(v: string) => setAdd({ ...add, val: v })} />
            <select 
              value={add.p.startsWith('-') ? 'minus' : 'plus'} 
              onChange={(e) => setAdd({ ...add, p: e.target.value === 'minus' ? (Math.abs(parseFloat(add.p)) * -1).toString() : Math.abs(parseFloat(add.p)).toString() })}
              className="bg-gray-50 border border-gray-200 rounded-lg px-1 py-1.5 outline-none text-xs font-bold"
            >
              <option value="plus">{t.percentIncrease}</option>
              <option value="minus">{t.percentDecrease}</option>
            </select>
            <InputField value={Math.abs(parseFloat(add.p)).toString()} onChange={(v: string) => setAdd({ ...add, p: add.p.startsWith('-') ? (parseFloat(v) * -1).toString() : v })} suffix="%" />
          </div>
          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-50">
            <Equal size={14} className="text-gray-300" />
            <ResultBadge text={addResult} id={3} />
          </div>
        </div>

        {/* 類型 5: Change from X to Y */}
        <div className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 md:col-span-2">
          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <span>{t.percentChangeFrom}</span>
            <InputField value={change.from} onChange={(v: string) => setChange({ ...change, from: v })} />
            <span>{t.to}</span>
            <InputField value={change.to} onChange={(v: string) => setChange({ ...change, to: v })} />
          </div>
          <div className="flex items-center gap-2 mt-auto pt-2 border-t border-gray-50">
            <Equal size={14} className="text-gray-300" />
            <ResultBadge 
              text={`${changeResult.val}%`} 
              id={4} 
              typeBadge={
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase ${changeResult.type === 'increase' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                  {changeResult.type === 'increase' ? t.percentIncrease : t.percentDecrease}
                </span>
              }
            />
          </div>
        </div>

      </div>

      <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl flex items-center gap-3">
        <Calculator size={14} className="text-blue-400" />
        <p className="text-[10px] text-blue-600/70 font-medium">
          輸入數值即時運算結果，點擊藍色區域即可快速複製。
        </p>
      </div>
    </div>
  );
};

export default PercentageCalculator;
