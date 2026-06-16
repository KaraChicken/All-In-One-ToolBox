
import React from 'react';
import { Video, Upload, Download, RefreshCw, X, AlertCircle, FileText, CheckCircle2, Zap, Smartphone, Film, Music, Image, Sliders, Settings, Clock } from 'lucide-react';
import { Language } from '../types';
import { useMediaConverterViewModel } from '../hooks/viewmodels/useMediaConverterViewModel';

interface Props { lang: Language; }

const MediaConverter: React.FC<Props> = ({ lang }) => {
  const vm = useMediaConverterViewModel();
  const logContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [vm.state.initLogs]);

  const formatCategories = [
    {
      id: 'video',
      title: '影片格式 Video',
      icon: Film,
      items: [
        { ext: 'mp4', label: 'MP4', desc: 'H.264 / 相容性極佳' },
        { ext: 'webm', label: 'WebM', desc: 'VP9 / 網頁高效壓縮' },
        { ext: 'mkv', label: 'MKV', desc: '多音軌與多字幕支援' },
        { ext: 'avi', label: 'AVI', desc: '傳統不失真格式' },
        { ext: 'mov', label: 'MOV', desc: 'Apple 蘋果標準格式' },
      ],
    },
    {
      id: 'audio',
      title: '音訊格式 Audio',
      icon: Music,
      items: [
        { ext: 'mp3', label: 'MP3', desc: 'LAME / 最常見音訊' },
        { ext: 'wav', label: 'WAV', desc: '無損 PCM 原始高音質' },
        { ext: 'aac', label: 'AAC', desc: '進階音訊編碼格式' },
        { ext: 'm4a', label: 'M4A', desc: 'Apple M4A 精簡格式' },
        { ext: 'ogg', label: 'OGG', desc: 'Vorbis 開放音樂格式' },
      ],
    },
    {
      id: 'animation',
      title: '動畫圖片 Image',
      icon: Image,
      items: [
        { ext: 'gif', label: 'GIF Animation', desc: '10fps / 迷因動圖最佳選' },
      ],
    },
  ];

  const [activeTab, setActiveTab] = React.useState<string>('video');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      vm.commands.setFile(e.target.files[0]);
    }
  };

  const isVideoFormat = ['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(vm.state.targetFormat);
  const isAudioFormat = ['mp3', 'wav', 'aac', 'm4a', 'ogg'].includes(vm.state.targetFormat);
  const isGifFormat = vm.state.targetFormat === 'gif';

  return (
    <div className="max-w-4xl mx-auto space-y-4 px-2">
      {!vm.state.loaded ? (
        <div className="bg-white dark:bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center space-y-6 shadow-sm">
          {vm.state.initializing ? (
            <div className="space-y-6 animate-in fade-in duration-300 max-w-xl mx-auto">
              <div className="bg-indigo-50 dark:bg-indigo-950/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <Video className="text-indigo-600 dark:text-indigo-400" size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">正在啟動影音核心轉檔引擎...</h3>
                <p className="text-slate-450 dark:text-slate-500 text-[11px] sm:text-xs leading-relaxed max-w-xs mx-auto">
                  首次載入將啟用 WebAssembly 機制與高效能解碼硬體加速
                </p>
              </div>

              {/* Progress Bar + Percentage */}
              <div className="w-full space-y-2.5">
                <div className="flex items-center justify-between text-xs font-black tracking-wider text-indigo-600 dark:text-indigo-400">
                  <span className="uppercase text-[9px] sm:text-[10px] bg-indigo-50 dark:bg-indigo-950/40 px-2.5 py-0.5 rounded-full select-none">
                    {vm.state.initProgress < 100 ? 'Initializer Thread' : 'Ready'}
                  </span>
                  <span className="font-mono text-sm sm:text-base">{vm.state.initProgress}%</span>
                </div>
                <div className="overflow-hidden h-3 rounded-full bg-slate-100 dark:bg-slate-800 p-0.5 border border-slate-200/50 dark:border-slate-700/50">
                  <div 
                    style={{ width: `${vm.state.initProgress}%` }} 
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                  />
                </div>
                <p className="text-[9px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1 min-h-[14px]">
                  {vm.state.initProgress < 40 ? '正在下載基礎編解碼核心檔案...' : 
                   vm.state.initProgress < 85 ? '正在載入動態 WebAssembly 加速模組...' : 
                   vm.state.initProgress < 100 ? '正在設定沙盒效能與防溢位安全性...' : '轉檔核心啟動成功！'}
                </p>
              </div>

              {/* Terminal Logs View */}
              <div className="w-full text-left space-y-1">
                <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900 border-b border-slate-850 rounded-t-xl">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                    <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                    <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-slate-500 select-none uppercase tracking-widest">
                    INITIALIZATION TERMINAL LOG
                  </span>
                </div>
                <div 
                  ref={logContainerRef}
                  className="bg-slate-950 text-emerald-400 font-mono text-[10px] sm:text-[11px] p-3 sm:p-4 rounded-b-xl border-x border-b border-slate-900 shadow-inner h-40 overflow-y-auto space-y-1"
                >
                  {vm.state.initLogs && vm.state.initLogs.length > 0 ? (
                    vm.state.initLogs.map((log: string, idx: number) => {
                      let color = 'text-slate-300';
                      if (log.includes('❌') || log.includes('error') || log.includes('Fatal')) {
                        color = 'text-rose-400';
                      } else if (log.includes('⚠️') || log.includes('Notice') || log.includes('Warning')) {
                        color = 'text-amber-400';
                      } else if (log.includes('🚀') || log.includes('started') || log.includes('successfully!')) {
                        color = 'text-emerald-400 font-bold';
                      } else if (log.includes('[Core]')) {
                        color = 'text-indigo-400';
                      }
                      return (
                        <div key={idx} className={`${color} leading-relaxed break-all whitespace-pre-wrap`}>
                          {log}
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-slate-500 italic animate-pulse">
                      Initializing trace thread...
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-indigo-50 dark:bg-indigo-950/30 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-inner">
                 <Video className="text-indigo-600 dark:text-indigo-400" size={32} />
              </div>
              <div className="space-y-2 max-w-lg mx-auto">
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">設定核心解碼執行緒</h3>
                <p className="text-slate-400 dark:text-slate-500 text-xs leading-relaxed px-4">
                  轉檔需要在瀏覽器內載入高性能 WebAssembly 沙盒。推薦根據本機裝置規格與相容性來手動配置執行緒模式：
                </p>

                {/* 執行緒切換選項 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 max-w-md mx-auto text-left select-none">
                  <button
                    type="button"
                    onClick={() => vm.commands.setIsSTMode(false)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-start gap-1 relative text-left outline-none ${
                      !vm.state.isSTMode
                        ? 'border-indigo-600 bg-indigo-55/20 dark:bg-indigo-950/20 shadow-sm shadow-indigo-100/50'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1.5 rounded-lg ${!vm.state.isSTMode ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-800'}`}>
                        <Zap size={11} />
                      </div>
                      <span className="text-xs font-black text-slate-800 dark:text-slate-100">高速模式 (多執行緒)</span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-bold">
                      支援多核心 CPU 高速並行編解碼。對於影片/大檔案處理速度加倍。需 SharedArrayBuffer 支援（部分舊機不可用）。
                    </span>
                    {!vm.state.isSTMode && (
                      <span className="absolute top-3 right-3 text-[9px] font-black uppercase text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30">
                        啟用
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => vm.commands.setIsSTMode(true)}
                    className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-start gap-1 relative text-left outline-none ${
                      vm.state.isSTMode
                        ? 'border-amber-600 bg-amber-55/15 dark:bg-amber-950/15 shadow-sm shadow-amber-50'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 hover:border-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`p-1.5 rounded-lg ${vm.state.isSTMode ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500 dark:bg-slate-800'}`}>
                        <Smartphone size={11} />
                      </div>
                      <span className="text-xs font-black text-slate-800 dark:text-slate-100">相容模式 (單執行緒)</span>
                    </div>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal font-bold">
                      採取單核心循序漸進編解碼。在 iOS/手機瀏覽器或其他舊版本架構下 100% 能相容運作，記憶體消耗更低。
                    </span>
                    {vm.state.isSTMode && (
                      <span className="absolute top-3 right-3 text-[9px] font-black uppercase text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md bg-amber-50/80 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/30">
                        啟用
                      </span>
                    )}
                  </button>
                </div>
              </div>
              
              {vm.state.error && (
                <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 text-rose-600 dark:text-rose-400 rounded-2xl text-[11px] font-bold max-w-md mx-auto">
                  {vm.state.error}
                </div>
              )}

              <button 
                onClick={vm.commands.load}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-2 mx-auto shadow-lg shadow-indigo-100 dark:shadow-none"
              >
                <Zap size={18} />
                啟動轉檔引擎
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className={`p-3 px-4 rounded-2xl flex items-center justify-between gap-3 border ${vm.state.isSTMode ? 'bg-amber-50/60 dark:bg-amber-950/15 border-amber-100 dark:border-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-indigo-50/60 dark:bg-indigo-950/15 border-indigo-100 dark:border-indigo-900/30 text-indigo-700 dark:text-indigo-400'}`}>
              <div className="flex items-center gap-2.5">
                {vm.state.isSTMode ? <Smartphone size={15} /> : <Zap size={15} />}
                <span className="text-[10px] font-extrabold uppercase tracking-wider">
                  核心解碼狀態：{vm.state.isSTMode ? '相容模式 (單執行緒)' : '高速運行中 (多執行緒)'}
                </span>
              </div>
              <button
                onClick={vm.commands.resetEngine}
                className="px-2.5 py-1 text-[9px] font-black bg-white dark:bg-slate-800 hover:bg-slate-100 hover:text-slate-900 dark:hover:text-slate-100 dark:hover:bg-slate-700 rounded-xl border border-slate-200/50 dark:border-slate-700/60 transition shadow-sm active:scale-95"
                title="重新設定執行緒數量與模式規格"
              >
                🔄 重設執行緒
              </button>
            </div>
            
            {vm.state.hasThreadFallback && (
              <div className="p-3.5 px-4 rounded-2xl bg-amber-50/20 dark:bg-amber-955/5 border border-amber-100/50 dark:border-amber-900/20 text-slate-600 dark:text-slate-300">
                <p className="text-[10.5px] font-black text-amber-750 dark:text-amber-400 flex items-center gap-1.5 leading-normal">
                  <span>⚠️ 偵測到瀏覽器沙盒限制</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-100/60 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 uppercase font-black tracking-tight scale-90 origin-left">
                    自動相容降級
                  </span>
                </p>
                <div className="text-[10px] space-y-1.5 mt-1.5 leading-relaxed text-slate-500 dark:text-slate-400 font-bold">
                  <p>
                    原先您選擇了「高速模式 (多執行緒)」，但此瀏覽器版面 (例如內嵌預覽 Iframe) 限制了多執行緒，轉檔引擎已自動切換至「相容模式」進行編譯，以確保轉檔 100% 成功。
                  </p>
                  <p className="text-[9.5px] text-indigo-600 dark:text-indigo-400 border-t border-dashed border-amber-200/50 dark:border-amber-900/30 pt-1.5 font-black">
                    💡 點擊右上角「在新分頁打開」應用程式：由於我們已配置 COOP/COEP 獨立執行安全標頭，在新分頁中重新啟動轉檔即可完美解鎖多執行緒核心性能！
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {/* File input card */}
              <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                <label className="relative group cursor-pointer block">
                  <input type="file" onChange={handleFileChange} className="hidden" accept="video/*,audio/*" />
                  <div className="border-2 border-dashed border-gray-50 group-hover:border-indigo-200 group-hover:bg-indigo-50/30 rounded-[1.5rem] p-6 text-center transition-all">
                    {vm.state.file ? (
                      <div className="flex items-center gap-3 text-left">
                         <div className="bg-indigo-600 text-white p-2 rounded-xl">
                            <FileText size={20} />
                         </div>
                         <div className="min-w-0 flex-1">
                            <p className="text-xs font-black text-gray-800 truncate">{vm.state.file.name}</p>
                            <p className="text-[10px] text-gray-400">{(vm.state.file.size / 1024 / 1024).toFixed(2)} MB</p>
                         </div>
                         <button onClick={(e) => { e.preventDefault(); vm.commands.setFile(null); }} className="p-2 hover:bg-white rounded-full">
                            <X size={14} />
                         </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                         <Upload className="mx-auto text-gray-200" size={24} />
                         <p className="text-xs font-bold text-gray-400">選擇影音檔案</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>

              {/* Format selection and classification tabs */}
              <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                  <div className="flex items-center gap-1.5">
                    <Sliders size={15} className="text-indigo-600" />
                    <span className="text-xs font-extrabold text-gray-800">選擇轉換格式</span>
                  </div>
                  {/* Category tabs */}
                  <div className="flex bg-gray-50 p-1 rounded-xl">
                    {formatCategories.map(cat => {
                      const Icon = cat.icon;
                      const isActive = activeTab === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveTab(cat.id);
                            // Auto select first format of newly opened category tab
                            if (cat.items.length > 0) {
                              vm.commands.setTargetFormat(cat.items[0].ext);
                            }
                          }}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${isActive ? 'bg-white shadow-xs text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                          <Icon size={11} className={isActive ? 'text-indigo-600' : 'text-gray-400'} />
                          <span>{cat.title.split(' ')[0]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Categories format grid display */}
                <div className="grid grid-cols-1 gap-2.5">
                  {formatCategories.find(c => c.id === activeTab)?.items.map(f => {
                    const isSelected = vm.state.targetFormat === f.ext;
                    return (
                      <button
                        key={f.ext}
                        onClick={() => vm.commands.setTargetFormat(f.ext)}
                        className={`flex items-center justify-between text-left p-3 rounded-xl border-2 transition-all ${isSelected ? 'bg-indigo-50/50 border-indigo-600' : 'bg-gray-50/50 border-transparent hover:border-gray-200'}`}
                      >
                        <div className="flex flex-col">
                          <span className={`text-xs font-black uppercase ${isSelected ? 'text-indigo-600' : 'text-gray-800'}`}>{f.label}</span>
                          <span className="text-[10px] text-gray-400 font-medium">{f.desc}</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-indigo-600 bg-indigo-600' : 'border-gray-300'}`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {/* Extra conversion custom options panel */}
              <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2">
                  <Settings size={15} className="text-indigo-650 text-indigo-600" />
                  <span className="text-xs font-extrabold text-gray-800">進階轉碼選項參數</span>
                </div>

                <div className="space-y-4 divide-y divide-gray-50">
                  {/* Conversion Mode Selection with Detailed Explanations */}
                  <div className="pt-1 space-y-3 pb-2 select-none">
                    <label className="block text-[11px] font-bold text-gray-600">
                      🎯 轉換優化模式 (Optimize Mode)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        {
                          id: 'compatibility',
                          title: '相容性優先',
                          subtitle: '網頁 & 行動端通用',
                          icon: Smartphone,
                          desc: '將影音轉換為最通用的解碼規格（強制 YUV420p 色彩與 libx264 進階相容編碼），保證可在任何瀏覽器、通訊軟體與蘋果 (Apple QuickTime) 裝置上流暢播放，排除黑屏音影錯誤。'
                        },
                        {
                          id: 'speed',
                          title: '極速轉檔',
                          subtitle: '深度節省等待時間',
                          icon: Zap,
                          desc: '自動套用極速 CPU 壓縮配置（Ultrafast 預設），大幅縮短瀏覽器 Wasm 安全沙盒中的影音轉碼秒數，對於日常快速轉檔、高頻剪輯、大檔案與臨時測試非常有感。'
                        },
                        {
                          id: 'quality',
                          title: '極致畫質',
                          subtitle: '精準壓縮留存首選',
                          icon: Film,
                          desc: '套用慢速高品質編解碼（Slow 進階優化與 CRF 18 高清晰度目標配置），以更多的運算時間換取高逼真、低失真的畫質渲染效果，適合重要作品、影音檔案永久保存。'
                        }
                      ].map(modeOpt => {
                        const isSelected = vm.state.conversionMode === modeOpt.id;
                        const ModeIcon = modeOpt.icon;
                        return (
                          <button
                            key={modeOpt.id}
                            type="button"
                            onClick={() => vm.commands.setConversionMode(modeOpt.id as 'compatibility' | 'speed' | 'quality')}
                            className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-start relative group ${
                              isSelected
                                ? 'border-indigo-600 bg-indigo-50/20'
                                : 'bg-gray-50/50 border-transparent hover:border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 mb-2.5">
                              <div className={`p-1.5 rounded-xl transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none' : 'bg-gray-200/60 text-gray-500'}`}>
                                <ModeIcon size={12} />
                              </div>
                              <div>
                                <span className="text-[11px] font-black block text-gray-800">
                                  {modeOpt.title}
                                </span>
                                <span className="text-[9px] text-gray-400 block font-bold tracking-tight">
                                  {modeOpt.subtitle}
                                </span>
                              </div>
                            </div>
                            <p className="text-[10px] text-gray-500 leading-relaxed font-bold">
                              {modeOpt.desc}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Trim Clip parameters */}
                  <div className="pt-4 space-y-2">
                    <label className="flex items-center justify-between text-[11px] font-bold text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} />
                        影音片段裁剪 (Trim)
                      </span>
                      <span className="text-[9px] text-gray-400">留空代表轉換完整片段</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="block text-[9px] text-gray-400 mb-0.5">開始時間 (HH:MM:SS 或秒)</span>
                        <input
                          type="text"
                          value={vm.state.startTime}
                          onChange={(e) => vm.commands.setStartTime(e.target.value)}
                          placeholder="例如: 00:00:05"
                          className="w-full text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-105 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-300 placeholder:font-normal"
                        />
                      </div>
                      <div>
                        <span className="block text-[9px] text-gray-400 mb-0.5">裁剪長度 (填寫秒數)</span>
                        <input
                          type="text"
                          value={vm.state.duration}
                          onChange={(e) => vm.commands.setDuration(e.target.value)}
                          placeholder="例如: 15"
                          className="w-full text-xs font-bold px-3 py-2 bg-gray-50 border border-gray-105 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder:text-gray-300 placeholder:font-normal"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Resolution Scaler - Video Specific */}
                  {isVideoFormat && (
                    <div className="pt-3.5 space-y-2">
                      <label className="block text-[11px] font-bold text-gray-600">
                        影像解析配製 (Resolution Scaling)
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                        {[
                          { value: 'original', label: '原始比例' },
                          { value: '1920x1080', label: '1080p' },
                          { value: '1280x720', label: '720p' },
                          { value: '854x480', label: '480p' },
                          { value: '640x360', label: '360p' },
                        ].map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => vm.commands.setResolution(opt.value)}
                            className={`py-1.5 rounded-lg text-[9px] font-black text-center border capitalize transition-all ${vm.state.resolution === opt.value ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' : 'bg-gray-50 hover:bg-gray-100 border-transparent text-gray-500'}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Frame rate - Video / GIF specific */}
                  {(isVideoFormat || isGifFormat) && (
                    <div className="pt-3.5 space-y-2">
                      <label className="block text-[11px] font-bold text-gray-600">
                        畫面影格限制 (Frame Rate Caps)
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { value: 'original', label: '原始影格' },
                          { value: '60', label: '60 FPS' },
                          { value: '30', label: '30 FPS' },
                          { value: '15', label: '15 FPS' },
                        ].map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => vm.commands.setFps(opt.value)}
                            className={`py-1.5 rounded-lg text-[9px] font-black text-center border transition-all ${vm.state.fps === opt.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 hover:bg-gray-100 border-transparent text-gray-500'}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dynamic Speed controls */}
                  <div className="pt-3.5 space-y-2">
                    <label className="block text-[11px] font-bold text-gray-600">
                      重製播放速度 (Speed Multiplication)
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5">
                      {[
                        { value: '0.5', label: '0.5x 慢速' },
                        { value: '0.75', label: '0.75x' },
                        { value: '1.0', label: '1.0x 正常' },
                        { value: '1.25', label: '1.25x' },
                        { value: '1.5', label: '1.5x' },
                        { value: '2.0', label: '2.0x 快速' },
                      ].map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => vm.commands.setSpeed(opt.value)}
                          className={`py-1.5 rounded-lg text-[9px] font-black text-center border transition-all ${vm.state.speed === opt.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 hover:bg-gray-100 border-transparent text-gray-500'}`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Audio quality compression - Video and Audio specific */}
                  {(isVideoFormat || isAudioFormat) && !vm.state.muteAudio && (
                    <div className="pt-3.5 space-y-2">
                      <label className="block text-[11px] font-bold text-gray-600">
                        音軌壓縮位元率 (Audio Bitrate)
                      </label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { value: '128k', label: '128 kbps (標準)' },
                          { value: '192k', label: '192 kbps (良好)' },
                          { value: '256k', label: '256 kbps (超高)' },
                          { value: '320k', label: '320 kbps (高傳真)' },
                        ].map(opt => (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => vm.commands.setAudioBitrate(opt.value)}
                            className={`py-1.5 rounded-lg text-[9px] font-black text-center border transition-all ${vm.state.audioBitrate === opt.value ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 hover:bg-gray-100 border-transparent text-gray-500'}`}
                          >
                            {opt.label.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Mute toggle - Video only */}
                  {isVideoFormat && (
                    <div className="pt-3.5 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-gray-600">影片靜音 (Mute Trailing Audio)</span>
                        <span className="text-[9px] text-gray-400">移除轉換後影片中的所有音軌</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => vm.commands.setMuteAudio(!vm.state.muteAudio)}
                        className={`w-10 h-6 rounded-full transition-all relative ${vm.state.muteAudio ? 'bg-indigo-600' : 'bg-gray-200'}`}
                      >
                        <div className={`w-4 border-2 border-transparent h-4 rounded-full bg-white absolute top-1 transition-all ${vm.state.muteAudio ? 'left-5' : 'left-1'}`} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-3">
                  <button 
                    onClick={vm.commands.convert}
                    disabled={!vm.state.file || vm.state.loading}
                    className="w-full py-4 bg-indigo-650 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all disabled:opacity-50"
                  >
                    {vm.state.loading ? <RefreshCw className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                    {vm.state.loading ? `處理中 ${vm.state.progress}%` : '開始執行轉檔'}
                  </button>
                </div>
              </div>

              <div className="bg-gray-55/70 dark:bg-slate-900/50 rounded-[2.5rem] border border-gray-150/50 dark:border-slate-800/80 min-h-[320px] flex flex-col items-center justify-center p-6 relative overflow-hidden">
               {vm.state.loading && (
                 <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6 text-center animate-in fade-in">
                    <div className="w-full max-w-xs space-y-4">
                       <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest animate-pulse">
                         {vm.state.isSTMode ? '正在逐幀轉碼中，請稍候...' : '高速處理中...'}
                       </p>
                       <div className="overflow-hidden h-2.5 rounded-full bg-indigo-100">
                          <div style={{ width: `${vm.state.progress}%` }} className="h-full bg-indigo-600 transition-all duration-300"></div>
                       </div>
                    </div>
                 </div>
               )}

               {vm.state.resultUrl ? (
                 <div className="w-full space-y-4 animate-in zoom-in-95">
                    <div className="bg-white p-1.5 rounded-[1.5rem] shadow-xl border border-gray-100">
                       {vm.state.targetFormat === 'mp3' || vm.state.targetFormat === 'wav' || vm.state.targetFormat === 'aac' || vm.state.targetFormat === 'm4a' || vm.state.targetFormat === 'ogg' ? (
                         <audio src={vm.state.resultUrl} controls className="w-full" />
                       ) : vm.state.targetFormat === 'gif' ? (
                         <img src={vm.state.resultUrl} className="w-full rounded-[1.2rem] max-h-[240px] object-contain mx-auto" alt="Result" />
                       ) : (
                         <video src={vm.state.resultUrl} controls className="w-full rounded-[1.2rem] max-h-[240px] mx-auto" />
                       )}
                    </div>
                    <a 
                      href={vm.state.resultUrl} 
                      download={`smart_tool_${Date.now()}.${vm.state.targetFormat}`}
                      className="flex items-center justify-center gap-2 w-full py-3.5 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all"
                    >
                      <Download size={18} /> 下載檔案
                    </a>
                    <button onClick={vm.commands.resetResult} className="w-full text-[10px] font-black text-gray-400 uppercase tracking-widest">
                       再轉一個
                    </button>
                 </div>
               ) : (
                 <div className="text-center opacity-20">
                    <Video size={48} className="mx-auto text-gray-200 mb-2" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">準備就緒</p>
                 </div>
               )}

               {vm.state.error && (
                 <div className="mt-4 p-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl flex items-center gap-2 text-[10px] font-bold">
                    <AlertCircle size={14} /> {vm.state.error}
                 </div>
               )}
            </div>
          </div>
        </div>

          {/* Terminal Log Panel */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-1.5">
                <FileText size={15} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-extrabold text-gray-800 dark:text-slate-100">轉檔即時日誌 Terminal Logs</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
              </div>
            </div>
            
            <div 
              ref={logContainerRef}
              className="bg-slate-950 text-emerald-400 font-mono text-[10px] sm:text-[11px] p-4 rounded-xl border border-slate-900 shadow-inner h-48 overflow-y-auto space-y-1"
            >
              {vm.state.initLogs && vm.state.initLogs.length > 0 ? (
                vm.state.initLogs.map((log: string, idx: number) => {
                  let color = 'text-slate-350';
                  if (log.includes('❌') || log.includes('error') || log.includes('Fatal')) {
                    color = 'text-rose-400';
                  } else if (log.includes('⚠️') || log.includes('Notice') || log.includes('Warning')) {
                    color = 'text-amber-400';
                  } else if (log.includes('🚀') || log.includes('started') || log.includes('successfully!') || log.includes('🎬') || log.includes('✅') || log.includes('📥')) {
                    color = 'text-emerald-400 font-bold';
                  } else if (log.includes('[Core]')) {
                    color = 'text-indigo-400';
                  }
                  return (
                    <div key={idx} className={`${color} leading-relaxed break-all whitespace-pre-wrap`}>
                      {log}
                    </div>
                  );
                })
              ) : (
                <div className="text-slate-500 italic animate-pulse">
                  Terminal ready... waiting for actions...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaConverter;
