import React, { useState } from 'react';
import { 
  Play, Pause, RotateCcw, Bell, Hourglass, 
  Brain, Coffee, Milestone, PlayCircle, Settings, ClipboardList, Check, X, Sliders, Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { UI_STRINGS } from '../i18n';
import { useTimerViewModel, PomodoroMode } from '../hooks/viewmodels/useTimerViewModel';

interface Props { lang: Language; }

const TimerTool: React.FC<Props> = ({ lang }) => {
  const t = UI_STRINGS[lang];
  const vm = useTimerViewModel();
  const [editingTask, setEditingTask] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const radius = 135; 
  const circumference = 2 * Math.PI * radius;
  // Progress goes from full to zero in a Pomodoro timer
  const offset = circumference - (vm.state.progress / 100) * circumference;

  const modeColors = {
    focus: {
      primary: 'emerald-600',
      text: 'text-emerald-700 dark:text-emerald-400',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-100 dark:border-emerald-900/30',
      stroke: 'stroke-emerald-500',
      gradient: 'from-emerald-500 to-teal-600'
    },
    shortBreak: {
      primary: 'sky-600',
      text: 'text-sky-700 dark:text-sky-400',
      bgLight: 'bg-sky-50 dark:bg-sky-950/30',
      border: 'border-sky-100 dark:border-sky-900/30',
      stroke: 'stroke-sky-500',
      gradient: 'from-sky-500 to-blue-600'
    },
    longBreak: {
      primary: 'indigo-600',
      text: 'text-indigo-700 dark:text-indigo-400',
      bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
      border: 'border-indigo-100 dark:border-indigo-900/30',
      stroke: 'stroke-indigo-500',
      gradient: 'from-indigo-500 to-purple-600'
    }
  };

  const activeTheme = modeColors[vm.state.mode];

  const strings = {
    zh: {
      title: '番茄工作鐘',
      subtitle: '高效專注與休養生息的完美循環',
      focus: '專注時間',
      shortBreak: '短暫休息',
      longBreak: '長時休息',
      sessionCompleted: '今日累計番茄',
      taskPlaceholder: '設定當前專注任務名稱...',
      taskLabel: '當前專注任務',
      adjustTitle: '自訂工作與休息時間',
      autoTransition: '自動輪替下個階段',
      testSound: '測試鈴聲',
      setOk: '確認',
      tipPomodoro: '專注 25 分鐘，休息 5 分鐘。每 4 個番茄後可進行一次 15 分鐘的長休息。規律循環，保持專注！',
      settingsBtn: '偏好設定',
      closeSettings: '完成儲存',
      presetsTitle: '快捷時間套用',
      presetStandard: '經典番茄 (25分專注 / 5分休息)',
      presetClassicName: '經典 25/5 分',
      presetSprintName: '快速衝刺 15/3 分',
      presetDeepName: '深度耐力 50/10 分',
      resetPomodoros: '重設今日番茄數',
      confirmReset: '確定清除所有計數嗎？',
      autoTransitionLabel: '當前階段結束後直接開始下一階段計時',
      settingsHeader: '番茄鐘設定選單',
      manualAdjust: '手動微調長度 (分鐘)',
      workLabel: '工作專注長度',
      shortBreakLabel: '短暫休息長度',
      longBreakLabel: '長時休息長度',
      counting: '專注中',
      paused: '已暫停'
    },
    en: {
      title: 'Pomodoro Timer',
      subtitle: 'Achieve peak focus and balanced recovery intervals',
      focus: 'Focus Session',
      shortBreak: 'Short Break',
      longBreak: 'Long Break',
      sessionCompleted: 'Today\'s Completed Pomodoros',
      taskPlaceholder: 'Enter focus task title...',
      taskLabel: 'Active Task Goal',
      adjustTitle: 'Customize Times',
      autoTransition: 'Auto-transition logic',
      testSound: 'Test Alert sound',
      setOk: 'Set',
      tipPomodoro: 'Focus for 25 minutes, then rest for 5. After 4 cycles, treat yourself to a longer 15-minute break!',
      settingsBtn: 'Settings',
      closeSettings: 'Save & Close',
      presetsTitle: 'Select Time Preset',
      presetStandard: 'Classic Pomodoro',
      presetClassicName: 'Classic 25/5 Min',
      presetSprintName: 'Sprint 15/3 Min',
      presetDeepName: 'Deep 50/10 Min',
      resetPomodoros: 'Reset completion count',
      confirmReset: 'Are you sure you want to reset completions?',
      autoTransitionLabel: 'Automatically starts next phase without approval delay',
      settingsHeader: 'Pomodoro Settings',
      manualAdjust: 'Manual Adjustment (Minutes)',
      workLabel: 'Focus Session Limit',
      shortBreakLabel: 'Short Break Limit',
      longBreakLabel: 'Long Break Limit',
      counting: 'Counting',
      paused: 'Paused'
    },
    ja: {
      title: 'ポモドーロ・タイマー',
      subtitle: '最高の集中と理想的な休息サイクルをデザインする',
      focus: '集中セッション',
      shortBreak: '短い休憩',
      longBreak: '長い休憩',
      sessionCompleted: '完了したポモドーロ',
      taskPlaceholder: '集中するタスクをセット...',
      taskLabel: 'アクティブタスク',
      adjustTitle: 'セッション時間の調整',
      autoTransition: '自動的にフェーズ切替',
      testSound: 'アラーム音テスト',
      setOk: '決定',
      tipPomodoro: '25分間集中し、5分間休む。4回のポモドーロ完了後に、15分間の長い休憩をとれます！',
      settingsBtn: '設定',
      closeSettings: '設定を保存',
      presetsTitle: 'クイックプリセット',
      presetStandard: 'クラシックポモドーロ',
      presetClassicName: '定番 25/5 分',
      presetSprintName: 'スプリント 15/3 分',
      presetDeepName: 'ディープ 50/10 分',
      resetPomodoros: '完了数をリセットする',
      confirmReset: '完了したポモドーロ数をリセットしますか？',
      autoTransitionLabel: '確認なしで次のフェーズを自動的に開始します',
      settingsHeader: 'ポモドーロ設定',
      manualAdjust: '手動時間調整 (分)',
      workLabel: '集中時間長',
      shortBreakLabel: '短い休憩時間長',
      longBreakLabel: '長い休憩時間長',
      counting: '集中時間内',
      paused: '一時停止中'
    },
    ko: {
      title: '포모도로 타이머',
      subtitle: '집중과 온전한 휴식을 통한 최고의 생산성 도구',
      focus: '집중 세션',
      shortBreak: '짧은 휴식',
      longBreak: '긴 휴식',
      sessionCompleted: '오늘 달성한 포모도로',
      taskPlaceholder: '지정할 집중 업무 기록...',
      taskLabel: '현재 작업 목표',
      adjustTitle: '세션 세부 변경',
      autoTransition: '자동 간격 타이머 적용',
      testSound: '알림 사운드 재생',
      setOk: '확인',
      tipPomodoro: '25분간 깊게 집중하고, 5분간 숨을 고르세요. 4번 완성하면 15분간의 달콤한 긴 휴식이 주어집니다!',
      settingsBtn: '업무 환경 설정',
      closeSettings: '설정 저장 완료',
      presetsTitle: '간편 시간 즐겨찾기',
      presetStandard: '원래 포모도로',
      presetClassicName: '기본 25/5 분',
      presetSprintName: '단기 스프린트 15/3 분',
      presetDeepName: '고강도 집중 50/10 분',
      resetPomodoros: '완료 카운터 초기화',
      confirmReset: '정말로 완료 횟수를 지우시겠습니까?',
      autoTransitionLabel: '다음 피리어드가 자동으로 재생 시작됩니다',
      settingsHeader: '포모도로 환경 설정',
      manualAdjust: '시간 직접 변경 (분)',
      workLabel: '집중 시간 길이',
      shortBreakLabel: '쉬는 시간 길이',
      longBreakLabel: '긴 쉬는 시간 길이',
      counting: '진행 중',
      paused: '일시정지'
    }
  };

  const localized = strings[lang] || strings['en'];

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    vm.commands.setCurrentTask(taskInput);
    setEditingTask(false);
  };

  // Quick preset loading function
  const applyPreset = (focusVal: number, shortVal: number, longVal: number) => {
    vm.commands.setTimeMinutes('focus', focusVal);
    vm.commands.setTimeMinutes('shortBreak', shortVal);
    vm.commands.setTimeMinutes('longBreak', longVal);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      
      {/* 美觀頂部 Title 欄與偏好設定按鈕 */}
      <div className="flex items-center justify-between px-2 py-1">
        <div>
          <h1 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2">
            <span>🍅</span> {localized.title}
          </h1>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 font-bold mt-0.5">
            {localized.subtitle}
          </p>
        </div>
        
        <button
          onClick={() => setShowSettings(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-600 dark:text-slate-300 text-xs font-black transition-all shadow-sm active:scale-95 group"
          title={localized.settingsBtn}
          id="pomodoro-settings-trigger"
        >
          <Settings size={14} className="group-hover:rotate-45 transition-transform duration-300" />
          <span>{localized.settingsBtn}</span>
        </button>
      </div>

      {/* 頂部模式選擇按鈕 */}
      <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100/85 dark:bg-slate-800/60 rounded-[1.75rem] border border-slate-200/40">
        {(['focus', 'shortBreak', 'longBreak'] as PomodoroMode[]).map((m) => {
          const isSelected = vm.state.mode === m;
          const colors = modeColors[m];
          return (
            <button
              key={m}
              onClick={() => vm.commands.setMode(m)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 sm:py-3.5 px-3 rounded-2xl transition-all font-black text-xs sm:text-sm tracking-tight ${
                isSelected
                  ? `bg-white dark:bg-slate-900 text-${colors.primary} shadow-md`
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {m === 'focus' && <Brain size={16} />}
              {m === 'shortBreak' && <Coffee size={16} />}
              {m === 'longBreak' && <Milestone size={16} />}
              <span>{localized[m as keyof typeof localized]}</span>
            </button>
          );
        })}
      </div>

      {/* 核心儀表板區 */}
      <div className="relative flex justify-center items-center py-4 bg-white dark:bg-slate-900/10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/40 shadow-sm p-6 overflow-hidden">
        
        {/* 後方發光特效 */}
        <div className={`absolute w-44 h-44 md:w-56 md:h-56 rounded-full blur-[60px] transition-all duration-1000 opacity-20 ${
          vm.state.isActive ? `bg-${activeTheme.primary} scale-110` : 'bg-slate-300 dark:bg-slate-800 scale-95'
        }`} />

        <div className="relative">
          {/* 進度環 */}
          <svg 
            viewBox="0 0 300 300" 
            className="w-64 h-64 md:w-76 md:h-76 transform -rotate-90 shrink-0 select-none animate-[fadeIn_0.5s_ease-out_1]"
          >
            <circle 
              cx="150" 
              cy="150" 
              r={radius} 
              className="stroke-slate-100 dark:stroke-slate-800/30 fill-none" 
              strokeWidth="9" 
            />
            
            <circle
              cx="150"
              cy="150"
              r={radius}
              className={`fill-none transition-stroke duration-500 ${activeTheme.stroke}`}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ 
                transition: vm.state.isActive ? 'stroke-dashoffset 1s linear' : 'stroke-dashoffset 0.3s ease-out'
              }}
            />
          </svg>

          {/* 中央倒數時間 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-black tracking-[0.25em] text-slate-400 dark:text-slate-500 uppercase">
              {localized[vm.state.mode as keyof typeof localized]}
            </span>
            
            <div className="font-mono text-5xl md:text-6xl font-black tabular-nums tracking-tighter text-slate-800 dark:text-slate-100 mt-1">
              {vm.utils.formatTime()}
            </div>

            {/* 倒數狀態 */}
            <div className="mt-2.5">
              {vm.state.isActive ? (
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider flex items-center gap-1.5 ${activeTheme.bgLight} ${activeTheme.text}`}>
                  <Hourglass size={10} className="animate-spin" /> {localized.counting}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  {localized.paused}
                </span>
              )}
            </div>

            {/* 播放控制 */}
            <div className="flex items-center gap-3 mt-4 pointer-events-auto">
              <button 
                onClick={vm.commands.reset} 
                title="Reset"
                className="p-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full transition-all active:scale-90 border border-slate-100 dark:border-slate-800"
              >
                <RotateCcw size={16} />
              </button>
              
              <button
                onClick={vm.state.isActive ? vm.commands.pause : vm.commands.start}
                className={`p-4 rounded-full text-white transition-all active:scale-95 shadow-md ${
                  vm.state.isActive 
                    ? 'bg-slate-800 hover:bg-slate-900 dark:bg-slate-700' 
                    : `bg-${activeTheme.primary} hover:opacity-90`
                }`}
              >
                {vm.state.isActive ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-0.5" fill="currentColor" />}
              </button>

              <button 
                onClick={vm.commands.triggerTestChime} 
                title={localized.testSound}
                className="p-2.5 bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/80 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-full transition-all active:scale-90 border border-slate-100 dark:border-slate-800"
              >
                <Bell size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 當前專注任務 */}
      <div className="bg-white dark:bg-slate-900/40 p-4 rounded-[2rem] border border-slate-100 dark:border-slate-800/40 shadow-sm">
        {editingTask ? (
          <form onSubmit={handleSaveTask} className="flex gap-2">
            <input
              type="text"
              autoFocus
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder={localized.taskPlaceholder}
              maxLength={40}
              className="flex-1 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl text-sm outline-none border focus:ring-2 focus:ring-emerald-500/20"
            />
            <button 
              type="submit" 
              className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-black hover:bg-emerald-700 transition"
            >
              {localized.setOk}
            </button>
          </form>
        ) : (
          <div 
            onClick={() => {
              setTaskInput(vm.state.currentTask);
              setEditingTask(true);
            }}
            className="flex items-center justify-between cursor-pointer group px-1 py-0.5"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
                {localized.taskLabel}
              </span>
              <p className={`text-sm font-bold ${vm.state.currentTask ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 dark:text-slate-500 italic font-normal'}`}>
                {vm.state.currentTask || localized.taskPlaceholder}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 dark:bg-slate-800/60 text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-all">
              <ClipboardList size={16} />
            </div>
          </div>
        )}
      </div>

      {/* 累計番茄統計顯示 (從主要設置區移出) */}
      <div className="p-5 bg-white dark:bg-slate-900/40 rounded-[2rem] border border-slate-100 dark:border-slate-800/40 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider">
            {localized.sessionCompleted}
          </span>
          {vm.state.pomodorosCompleted > 0 && (
            <button 
              onClick={() => {
                if (window.confirm(localized.confirmReset)) {
                  vm.commands.setPomodorosCompleted(0);
                }
              }}
              className="text-[10px] font-black text-slate-400 hover:text-rose-500 transition-colors uppercase tracking-wider flex items-center gap-1"
            >
              <Trash2 size={12} />
              {localized.resetPomodoros}
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 min-h-[2.5rem]">
          {vm.state.pomodorosCompleted === 0 ? (
            <p className="text-[11px] text-slate-400 dark:text-slate-500 italic">No Pomodoros completed yet. Start working!</p>
          ) : (
            Array.from({ length: Math.min(24, vm.state.pomodorosCompleted) }).map((_, i) => (
              <span 
                key={i} 
                className="text-2xl inline-block animate-[bounce_0.5s_ease-out_1]" 
                title={`Pomodoro #${i + 1}`}
              >
                🍅
              </span>
            ))
          )}
          {vm.state.pomodorosCompleted > 24 && (
            <span className="text-xs font-extrabold text-slate-500 font-mono">
              +{vm.state.pomodorosCompleted - 24}
            </span>
          )}
        </div>
      </div>

      {/* 小秘訣 */}
      <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-2xl border border-slate-100/60 dark:border-slate-805/40 text-[11px] text-slate-500 dark:text-slate-400 font-bold leading-relaxed">
        💡 {localized.tipPomodoro}
      </div>

      {/* ========================================================
          設定選單彈出視窗（ANIMATED SETTINGS DIALOG MODAL）
          ======================================================== */}
      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
            
            {/* 遮罩背景 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettings(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* 彈出視窗主體 */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-6 sm:p-7 overflow-y-auto max-h-[90vh]"
            >
              {/* 關閉按鈕 */}
              <button
                onClick={() => setShowSettings(false)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
              >
                <X size={18} />
              </button>

              {/* 選單標題 */}
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Sliders size={20} />
                </div>
                <div>
                  <h2 className="font-black text-slate-800 dark:text-slate-100">
                    {localized.settingsHeader}
                  </h2>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold tracking-wider uppercase">
                    Setup details
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-6">

                {/* 1. 快捷時間預設 (Quick Presets) */}
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block">
                    {localized.presetsTitle}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => applyPreset(25, 5, 15)}
                      className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-left hover:border-emerald-500 dark:hover:border-emerald-500 transition active:scale-95 flex flex-col"
                    >
                      <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">{localized.presetClassicName}</span>
                      <span className="text-[9px] text-slate-400 font-bold">25m / 5m</span>
                    </button>
                    <button
                      onClick={() => applyPreset(15, 3, 10)}
                      className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-left hover:border-sky-500 dark:hover:border-sky-500 transition active:scale-95 flex flex-col"
                    >
                      <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">{localized.presetSprintName}</span>
                      <span className="text-[9px] text-slate-400 font-bold">15m / 3m</span>
                    </button>
                    <button
                      onClick={() => applyPreset(50, 10, 20)}
                      className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 text-left hover:border-indigo-500 dark:hover:border-indigo-500 transition active:scale-95 flex flex-col"
                    >
                      <span className="text-[11px] font-black text-slate-700 dark:text-slate-200">{localized.presetDeepName}</span>
                      <span className="text-[9px] text-slate-400 font-bold">50m / 10m</span>
                    </button>
                  </div>
                </div>

                {/* 2. 自訂工作時間與休息長度 */}
                <div className="space-y-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block">
                    {localized.manualAdjust}
                  </span>

                  {/* Focus */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                        {localized.workLabel}
                      </span>
                      <p className="text-[9px] text-slate-400 font-bold">Default: 25 min</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={vm.state.customTimes.focus <= 1}
                        onClick={() => vm.commands.setTimeMinutes('focus', vm.state.customTimes.focus - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-black border border-slate-100 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-35"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-black text-slate-800 dark:text-slate-100 font-mono">
                        {vm.state.customTimes.focus}
                      </span>
                      <button
                        disabled={vm.state.customTimes.focus >= 180}
                        onClick={() => vm.commands.setTimeMinutes('focus', vm.state.customTimes.focus + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-black border border-slate-100 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Short Break */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                        {localized.shortBreakLabel}
                      </span>
                      <p className="text-[9px] text-slate-400 font-bold">Default: 5 min</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={vm.state.customTimes.shortBreak <= 1}
                        onClick={() => vm.commands.setTimeMinutes('shortBreak', vm.state.customTimes.shortBreak - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-black border border-slate-100 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-35"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-black text-slate-800 dark:text-slate-100 font-mono">
                        {vm.state.customTimes.shortBreak}
                      </span>
                      <button
                        disabled={vm.state.customTimes.shortBreak >= 180}
                        onClick={() => vm.commands.setTimeMinutes('shortBreak', vm.state.customTimes.shortBreak + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-black border border-slate-100 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Long Break */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                        {localized.longBreakLabel}
                      </span>
                      <p className="text-[9px] text-slate-400 font-bold">Default: 15 min</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        disabled={vm.state.customTimes.longBreak <= 1}
                        onClick={() => vm.commands.setTimeMinutes('longBreak', vm.state.customTimes.longBreak - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-black border border-slate-100 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-35"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-black text-slate-800 dark:text-slate-100 font-mono">
                        {vm.state.customTimes.longBreak}
                      </span>
                      <button
                        disabled={vm.state.customTimes.longBreak >= 180}
                        onClick={() => vm.commands.setTimeMinutes('longBreak', vm.state.customTimes.longBreak + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-lg text-xs font-black border border-slate-100 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>

                {/* 3. 其他開關 */}
                <div className="space-y-4">
                  <span className="text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-wider block">
                    {localized.autoTransition}
                  </span>
                  
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-xs font-black text-slate-700 dark:text-slate-300">
                        {localized.autoTransition}
                      </span>
                      <p className="text-[9.5px] text-slate-400 dark:text-slate-500 leading-relaxed font-bold">
                        {localized.autoTransitionLabel}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer mt-0.5 shrink-0">
                      <input 
                        type="checkbox"
                        checked={vm.state.autoTransition}
                        onChange={(e) => vm.commands.setAutoTransition(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                </div>

                {/* 4. 底部署存確認 */}
                <div className="pt-2 flex items-center gap-2 justify-end">
                  <button
                    onClick={() => vm.commands.triggerTestChime()}
                    className="flex-1 py-3 px-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-300 text-xs font-black transition text-center"
                  >
                    🔊 {localized.testSound}
                  </button>
                  
                  <button
                    onClick={() => setShowSettings(false)}
                    className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition shadow-md shadow-emerald-100 dark:shadow-none text-center"
                    id="pomodoro-settings-close-btn"
                  >
                    {localized.closeSettings}
                  </button>
                </div>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default TimerTool;
