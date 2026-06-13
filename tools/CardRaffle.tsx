
import React, { useState, useMemo, useEffect } from 'react';
import { Layers, RotateCcw, Trash2, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';

interface Props { lang: Language; }

const CardRaffle: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [input, setInput] = useState('Apple\nBanana\nCherry\nDate\nEggplant\nFig');
  const [revealed, setRevealed] = useState<number[]>([]);
  
  // 透過 useMemo 確保名單改變時才會重新隨機排序
  const participants = useMemo(() => {
    const list = input.split('\n').map(s => s.trim()).filter(s => s !== '');
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [input]);

  // 當輸入改變時，重置所有翻開的狀態，達到「即時更新」效果
  useEffect(() => {
    setRevealed([]);
  }, [input]);

  const handleReveal = (index: number) => {
    if (revealed.includes(index)) return;
    setRevealed(prev => [...prev, index]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 輸入區域 */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.raffleTitle}</h3>
            <div className="flex gap-2">
              <button onClick={() => setRevealed([])} className="p-2 text-gray-400 hover:text-indigo-600 transition-colors bg-gray-50 rounded-lg">
                <RotateCcw size={16} />
              </button>
              <button onClick={() => setInput('')} className="p-2 text-gray-400 hover:text-rose-500 transition-colors bg-gray-50 rounded-lg">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.rafflePlaceholder}
            className="w-full h-[400px] p-4 bg-gray-50 border-2 border-gray-100 focus:border-indigo-400 rounded-3xl outline-none transition-all resize-none font-medium text-sm leading-relaxed shadow-inner"
          />
        </div>

        {/* 卡牌顯示區 */}
        <div className="lg:col-span-8 bg-white p-6 md:p-10 rounded-[3rem] border border-gray-100 shadow-xl min-h-[500px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
          
          {participants.length > 0 ? (
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-gray-50 pb-4">
                <div>
                  <h4 className="text-xl font-black text-gray-800">{t.flipCard}</h4>
                  <p className="text-xs text-gray-400 font-bold uppercase mt-1">Total {participants.length} Cards</p>
                </div>
                <div className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-black font-mono shadow-lg shadow-indigo-100">
                  {revealed.length} / {participants.length}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {participants.map((p, i) => (
                  <div 
                    key={`${i}-${input.length}`} // 關鍵：input長度改變時重新渲染
                    onClick={() => handleReveal(i)}
                    className="aspect-[3/4] cursor-pointer group perspective"
                  >
                    <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${revealed.includes(i) ? 'rotate-y-180' : 'hover:-translate-y-2'}`}>
                      {/* 卡背 */}
                      <div className="absolute inset-0 bg-indigo-600 rounded-2xl border-4 border-white shadow-lg flex flex-col items-center justify-center backface-hidden overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-indigo-400 to-indigo-900" />
                        <Layers className="text-white/30 mb-2" size={32} />
                        <div className="w-8 h-1 bg-white/20 rounded-full" />
                        <div className="absolute inset-2 border border-white/10 rounded-xl pointer-events-none" />
                      </div>
                      
                      {/* 正面 (Revealed) */}
                      <div className="absolute inset-0 bg-white rounded-2xl border-4 border-indigo-50 shadow-inner flex flex-col items-center justify-center rotate-y-180 backface-hidden p-3 text-center">
                         <Sparkles className="text-indigo-200 mb-2" size={16} />
                         <span className="text-sm font-black text-indigo-700 leading-tight">{p}</span>
                         <div className="mt-auto text-[8px] font-black text-indigo-300 uppercase">Revealed</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-gray-400 py-20">
               <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-4 border border-gray-100 rotate-12">
                 <Layers size={40} className="text-gray-200" />
               </div>
               <p className="text-sm font-bold max-w-[200px] text-center">{t.participantsNeeded}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .perspective { perspective: 1200px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default CardRaffle;
