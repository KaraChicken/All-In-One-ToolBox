
import React, { useState } from 'react';
import { Plus, Minus, RotateCcw, Trophy, Trash2 } from 'lucide-react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';

interface Props { lang: Language; }

const Scoreboard: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const [teams, setTeams] = useState([
    { id: '1', name: lang === 'zh' ? '隊伍 A' : (lang === 'en' ? 'Team A' : 'チーム A'), score: 0 },
    { id: '2', name: lang === 'zh' ? '隊伍 B' : (lang === 'en' ? 'Team B' : 'チーム B'), score: 0 }
  ]);

  const updateScore = (id: string, delta: number) => {
    setTeams(prev => prev.map(t => t.id === id ? { ...t, score: Math.max(0, t.score + delta) } : t));
  };

  const addTeam = () => {
    if (teams.length >= 6) return;
    const newTeam = {
      id: Math.random().toString(36).substr(2, 9),
      name: `${lang === 'zh' ? '隊伍' : 'Team'} ${String.fromCharCode(65 + teams.length)}`,
      score: 0
    };
    setTeams([...teams, newTeam]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button onClick={addTeam} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
            <Plus size={14} /> {t.scoreboardAdd}
          </button>
          <button onClick={() => setTeams(prev => prev.map(t => ({ ...t, score: 0 })))} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all flex items-center gap-2">
            <RotateCcw size={14} /> {t.scoreboardReset}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {teams.map((team) => (
          <div key={team.id} className="bg-gray-900 text-white rounded-[2rem] p-8 shadow-xl border border-gray-800 relative group">
            <button onClick={() => setTeams(prev => prev.filter(v => v.id !== team.id))} className="absolute top-4 right-4 p-2 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all">
              <Trash2 size={16} />
            </button>
            <div className="text-center space-y-4">
              <input
                value={team.name}
                onChange={(e) => setTeams(prev => prev.map(v => v.id === team.id ? { ...v, name: e.target.value } : v))}
                className="bg-transparent border-none text-center text-gray-400 font-bold uppercase tracking-widest outline-none focus:text-indigo-400"
              />
              <div className="text-8xl font-black font-mono tracking-tighter tabular-nums py-4">{team.score}</div>
              <div className="flex justify-center gap-4">
                <button onClick={() => updateScore(team.id, -1)} className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center hover:bg-gray-800 active:scale-90 transition-all"><Minus size={20} /></button>
                <button onClick={() => updateScore(team.id, 1)} className="flex-1 py-3 bg-indigo-600 rounded-2xl font-black text-lg hover:bg-indigo-500 active:scale-95 transition-all shadow-lg shadow-indigo-900/20">+1</button>
                <button onClick={() => updateScore(team.id, 5)} className="px-4 py-3 bg-white text-gray-900 rounded-2xl font-black text-lg hover:bg-gray-100 active:scale-95 transition-all">+5</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3">
        <Trophy size={16} className="text-amber-500" />
        <p className="text-[10px] text-amber-800 font-bold">{t.scoreboardTip}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
