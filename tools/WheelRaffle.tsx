
import React, { useState, useMemo } from 'react';
import { Compass, Trash2, RotateCcw } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';

interface Props { lang: Language; }

const COLORS = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b', 
  '#10b981', '#06b6d4', '#3b82f6', '#fbbf24', '#a855f7'
];

const WheelRaffle: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [input, setInput] = useState('王小明\n李大華\n張君雅\n陳小強\n林志玲');
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  
  const participants = useMemo(() => 
    input.split('\n').map(s => s.trim()).filter(s => s !== ''),
    [input]
  );

  const handleSpin = () => {
    if (participants.length < 2 || isSpinning) return;
    
    setWinner(null);
    setIsSpinning(true);
    
    const extraSpins = 8 + Math.random() * 5; // 增加旋轉圈數
    const newRotation = rotation + (extraSpins * 360) + Math.random() * 360;
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = (newRotation % 360);
      const sliceSize = 360 / participants.length;
      // 輪盤順時針轉，指針在上方(270度)
      const winnerIndex = Math.floor(((360 - normalizedRotation + 270) % 360) / sliceSize);
      setWinner(participants[winnerIndex % participants.length]);
    }, 5000); // 增加等待感
  };

  const wheelSvg = useMemo(() => {
    const size = 300;
    const center = size / 2;
    const radius = size / 2 - 5;
    const total = participants.length;
    if (total === 0) return null;
    const sliceAngle = 360 / total;

    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible drop-shadow-2xl">
        <g style={{ 
          transform: `rotate(${rotation}deg)`, 
          transformOrigin: 'center', 
          transition: isSpinning ? 'transform 5s cubic-bezier(0.15, 0, 0.15, 1)' : 'none' 
        }}>
          {participants.map((p, i) => {
            const startAngle = i * sliceAngle;
            const endAngle = (i + 1) * sliceAngle;
            const x1 = center + radius * Math.cos((startAngle * Math.PI) / 180);
            const y1 = center + radius * Math.sin((startAngle * Math.PI) / 180);
            const x2 = center + radius * Math.cos((endAngle * Math.PI) / 180);
            const y2 = center + radius * Math.sin((endAngle * Math.PI) / 180);
            const largeArcFlag = sliceAngle > 180 ? 1 : 0;

            return (
              <g key={i}>
                <path
                  d={`M ${center} ${center} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={COLORS[i % COLORS.length]}
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x={center + (radius * 0.55) * Math.cos(((startAngle + sliceAngle / 2) * Math.PI) / 180)}
                  y={center + (radius * 0.55) * Math.sin(((startAngle + sliceAngle / 2) * Math.PI) / 180)}
                  fill="white"
                  fontSize={participants.length > 10 ? "8" : "12"}
                  fontWeight="900"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  transform={`rotate(${startAngle + sliceAngle / 2}, ${center + (radius * 0.55) * Math.cos(((startAngle + sliceAngle / 2) * Math.PI) / 180)}, ${center + (radius * 0.55) * Math.sin(((startAngle + sliceAngle / 2) * Math.PI) / 180)})`}
                >
                  {p.length > 6 ? p.slice(0, 5) + '..' : p}
                </text>
              </g>
            );
          })}
        </g>
        {/* 中心點 */}
        <circle cx={center} cy={center} r="15" fill="white" className="shadow-sm" />
        <circle cx={center} cy={center} r="10" fill="#1f2937" />
      </svg>
    );
  }, [participants, rotation, isSpinning]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* 左側輸入區 */}
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

        {/* 右側輪盤區 */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center space-y-8 bg-white p-8 md:p-12 rounded-[3rem] border border-gray-100 shadow-xl min-h-[500px] relative overflow-hidden">
          {/* 背景裝飾 */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
          
          {participants.length >= 2 ? (
            <>
              <div className="relative pt-6">
                {/* 指針 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 z-30 filter drop-shadow-md">
                   <div className="w-8 h-10 bg-gray-900 clip-path-pointer" />
                </div>
                {wheelSvg}
              </div>
              
              <div className="flex flex-col items-center gap-4 w-full">
                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="group relative px-12 py-4 bg-gray-900 text-white rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:scale-100 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Compass className={isSpinning ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'} />
                    {isSpinning ? t.raffleDrawing : t.spin}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
                
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                  {participants.length} Participants Ready
                </p>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4 py-20">
               <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-dashed border-gray-200">
                  <Compass size={40} className="text-gray-200" />
               </div>
               <p className="text-gray-400 font-bold max-w-[200px] mx-auto">{t.participantsNeeded}</p>
            </div>
          )}

          {winner && !isSpinning && (
            <div className="absolute inset-x-0 bottom-8 px-8 animate-in slide-in-from-bottom-8 duration-500">
              <div className="bg-emerald-500 text-white p-6 rounded-[2rem] shadow-2xl shadow-emerald-200 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80 mb-2">Winner Winner!</p>
                <h4 className="text-4xl font-black tracking-tight">{winner}</h4>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .clip-path-pointer {
          clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
        }
      `}</style>
    </div>
  );
};

export default WheelRaffle;
