
import React, { useState, useMemo } from 'react';
import { CircleDot, Trash2, Sparkles, RefreshCcw } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';

interface Props { lang: Language; }

const BallRaffle: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [input, setInput] = useState('001\n002\n003\n004\n005\n006\n007\n008\n009\n010');
  const [winner, setWinner] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const participants = useMemo(() => 
    input.split('\n').map(s => s.trim()).filter(s => s !== ''),
    [input]
  );

  const handleDraw = () => {
    if (participants.length === 0 || isAnimating) return;
    
    setIsAnimating(true);
    setWinner(null);

    // 模擬搖獎過程，增加驚喜感
    setTimeout(() => {
      const idx = Math.floor(Math.random() * participants.length);
      setWinner(participants[idx]);
      setIsAnimating(false);
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左側：名單輸入 */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">{t.raffleTitle}</h3>
            <button onClick={() => setInput('')} className="p-2 text-gray-400 hover:text-rose-500 transition-colors bg-gray-50 rounded-lg">
              <Trash2 size={16} />
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.rafflePlaceholder}
            className="w-full h-[320px] p-4 bg-gray-50 border-2 border-gray-100 focus:border-indigo-400 rounded-3xl outline-none transition-all resize-none font-medium text-sm leading-relaxed shadow-inner"
          />
        </div>

        {/* 右側：搖獎機 */}
        <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl min-h-[500px] flex flex-col items-center justify-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500" />
          
          {participants.length > 0 ? (
            <>
              {/* 彩球機主體 */}
              <div className="relative w-72 h-72 bg-gray-50 rounded-full border-[12px] border-gray-200 shadow-[inset_0_4px_12px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-black/5 pointer-events-none z-20" />
                
                {/* 裝飾性的小球 - 會隨著名單即時更新 (限制最大顯示球數) */}
                <div className="relative w-full h-full">
                  {[...Array(Math.min(participants.length, 24))].map((_, i) => (
                    <div 
                      key={i} 
                      className={`absolute w-10 h-10 rounded-full shadow-lg border-2 border-white/50 ${isAnimating ? 'animate-ball-bounce' : ''}`}
                      style={{ 
                        backgroundColor: ['#6366f1', '#f43f5e', '#f59e0b', '#10b981', '#a855f7'][i % 5],
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 0.4}s`,
                        animationDuration: `${0.2 + Math.random() * 0.4}s`,
                        zIndex: 10
                      }}
                    />
                  ))}
                </div>

                {isAnimating && (
                   <div className="absolute inset-0 bg-indigo-500/5 backdrop-blur-[2px] z-30 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <RefreshCcw className="text-indigo-600 animate-spin mb-2" size={48} />
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Rolling...</span>
                      </div>
                   </div>
                )}
              </div>

              {/* 抽球按鈕 */}
              <div className="w-full max-w-sm space-y-4">
                <button
                  onClick={handleDraw}
                  disabled={isAnimating}
                  className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-[2rem] font-black text-lg hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  <CircleDot className={isAnimating ? 'animate-pulse' : ''} />
                  {isAnimating ? t.raffleDrawing : t.drawBall}
                </button>
                <div className="flex justify-center">
                  <span className="bg-gray-100 text-gray-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {participants.length} BALLS IN MACHINE
                  </span>
                </div>
              </div>

              {/* 中獎顯示 */}
              {winner && !isAnimating && (
                <div className="absolute inset-x-8 bottom-8 flex justify-center animate-in zoom-in-50 duration-500">
                  <div className="bg-white border-4 border-indigo-600 px-10 py-6 rounded-[2.5rem] shadow-2xl relative">
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center shadow-lg">
                      <Sparkles size={20} />
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-1">Result</p>
                      <h4 className="text-4xl font-black text-indigo-700 tracking-tight">{winner}</h4>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center space-y-4 py-20">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                  <CircleDot size={40} className="text-gray-200" />
               </div>
               <p className="text-sm font-bold text-gray-400 max-w-[200px]">{t.participantsNeeded}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ball-bounce {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -50px) scale(0.9); }
          50% { transform: translate(-30px, 40px) scale(1.1); }
          75% { transform: translate(45px, 10px) scale(0.95); }
        }
        .animate-ball-bounce {
          animation: ball-bounce 0.6s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default BallRaffle;
