
import React from 'react';
import { Video, Upload, Download, RefreshCw, X, AlertCircle, FileText, CheckCircle2, Zap, Smartphone } from 'lucide-react';
import { Language } from '../types';
import { useMediaConverterViewModel } from '../hooks/viewmodels/useMediaConverterViewModel';

interface Props { lang: Language; }

const MediaConverter: React.FC<Props> = ({ lang }) => {
  const vm = useMediaConverterViewModel();

  const formats = [
    { ext: 'mp4', label: 'MP4 (Video)' },
    { ext: 'gif', label: 'GIF (Image)' },
    { ext: 'webm', label: 'WebM (Video)' },
    { ext: 'mp3', label: 'MP3 (Audio)' },
    { ext: 'wav', label: 'WAV (Audio)' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      vm.commands.setFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 px-2">
      {!vm.state.loaded ? (
        <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] border-2 border-dashed border-gray-100 text-center space-y-6 shadow-sm">
          <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-inner">
             <Video className="text-indigo-600" size={32} />
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-black text-gray-800">行動影音轉檔模式</h3>
            <p className="text-gray-400 text-xs leading-relaxed max-w-xs mx-auto">
              {vm.state.isSTMode 
                ? '偵測到環境限制，將使用「相容模式」運行。手機轉檔速度會較慢，請保持螢幕開啟。' 
                : '您的環境支援高速轉檔。'}
            </p>
          </div>
          
          {vm.state.error && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-[11px] font-bold">
              {vm.state.error}
            </div>
          )}

          <button 
            onClick={vm.commands.load}
            disabled={vm.state.loading}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50 shadow-lg shadow-indigo-100"
          >
            {vm.state.loading ? <RefreshCw className="animate-spin" size={18} /> : <Zap size={18} />}
            {vm.state.loading ? '載入中...' : '啟動轉檔引擎'}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className={`p-3 rounded-2xl flex items-center gap-3 border ${vm.state.isSTMode ? 'bg-amber-50 border-amber-100 text-amber-700' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
            {vm.state.isSTMode ? <Smartphone size={16} /> : <Zap size={16} />}
            <span className="text-[10px] font-black uppercase tracking-widest">
              {vm.state.isSTMode ? '相容模式 (單執行緒)' : '高速模式 (多執行緒)'}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
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

              <div className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {formats.map(f => (
                    <button
                      key={f.ext}
                      onClick={() => vm.commands.setTargetFormat(f.ext)}
                      className={`px-3 py-2.5 rounded-xl text-[10px] font-black transition-all border-2 ${vm.state.targetFormat === f.ext ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-400 border-gray-50'}`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={vm.commands.convert}
                  disabled={!vm.state.file || vm.state.loading}
                  className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-black active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {vm.state.loading ? <RefreshCw className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
                  {vm.state.loading ? `處理中 ${vm.state.progress}%` : '開始轉檔'}
                </button>
              </div>
            </div>

            <div className="bg-gray-50 rounded-[2.5rem] border border-gray-100 min-h-[320px] flex flex-col items-center justify-center p-6 relative overflow-hidden">
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
                       {vm.state.targetFormat === 'mp3' || vm.state.targetFormat === 'wav' ? (
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
      )}
    </div>
  );
};

export default MediaConverter;
