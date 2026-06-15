
import React, { useState } from 'react';
import { Monitor, Mic, MicOff, Play, Square, Pause, Download, AlertCircle, Info, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useScreenRecorderViewModel } from '../hooks/viewmodels/useScreenRecorderViewModel';

const ScreenRecorder: React.FC = () => {
  const vm = useScreenRecorderViewModel();
  const [includeMic, setIncludeMic] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);

  const handleMicToggle = async () => {
    if (vm.state.isRecording) return;
    
    if (!includeMic) {
      setMicError(null);
      try {
        // Request mic permission on user click to comply with user active consent guideline
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Stop all tracks immediately so we don't hold the microphone open
        stream.getTracks().forEach(track => track.stop());
        setIncludeMic(true);
      } catch (err: any) {
        console.error('Failed to grant microphone permission:', err);
        setMicError('啟用麥克風失敗，請確保在瀏覽器中允許麥克風存取。');
        setIncludeMic(false);
      }
    } else {
      setIncludeMic(false);
      setMicError(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 py-2">
      {/* 狀態橫幅 */}
      <div className={`p-4 rounded-2xl flex items-center justify-between border transition-all ${
        vm.state.isRecording 
          ? 'bg-rose-50 border-rose-100 text-rose-700' 
          : vm.state.permissionGranted 
            ? 'bg-emerald-50 border-emerald-100 text-emerald-700'
            : 'bg-slate-50 border-slate-100 text-slate-500'
      }`}>
        <div className="flex items-center gap-3">
          {vm.state.isRecording ? (
            <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
          ) : vm.state.permissionGranted ? (
            <ShieldCheck size={18} className="text-emerald-500" />
          ) : (
            <ShieldAlert size={18} className="text-slate-400" />
          )}
          <span className="text-[11px] font-black uppercase tracking-widest">
            {vm.state.isRecording 
              ? (vm.state.isPaused ? '錄影暫停中' : '錄製進行中') 
              : vm.state.permissionGranted 
                ? '權限已授權' 
                : '待授權錄影權限'}
          </span>
        </div>
        {vm.state.isRecording && (
          <div className="font-mono font-black text-sm tabular-nums">
            {vm.utils.formatTime(vm.state.recordingTime)}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* 控制面板 */}
        <div className="space-y-6">
          <div className="bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="space-y-2">
              <h3 className="text-sm font-black text-slate-800 tracking-tight">錄影設定</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Configure your recording</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={handleMicToggle}
                disabled={vm.state.isRecording}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                  includeMic ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-slate-50 border-slate-100 text-slate-400'
                } ${vm.state.isRecording ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}`}
              >
                <div className="flex items-center gap-3">
                  {includeMic ? <Mic size={20} className="text-emerald-600" /> : <MicOff size={20} />}
                  <div className="text-left">
                    <span className="text-xs font-black block">啟用麥克風音訊</span>
                    {micError && <span className="text-[9px] text-rose-500 font-bold">{micError}</span>}
                  </div>
                </div>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${includeMic ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${includeMic ? 'left-6' : 'left-1'}`} />
                </div>
              </button>
            </div>

            <div className="pt-4 space-y-3">
              {!vm.state.isRecording ? (
                <button
                  onClick={() => vm.commands.startRecording(includeMic)}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                >
                  <Monitor size={18} /> 請求權限並開始錄影
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={vm.state.isPaused ? vm.commands.resumeRecording : vm.commands.pauseRecording}
                    className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-black transition-all"
                  >
                    {vm.state.isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />}
                    {vm.state.isPaused ? '繼續錄影' : '暫停'}
                  </button>
                  <button
                    onClick={vm.commands.stopRecording}
                    className="flex-1 py-4 bg-rose-600 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-rose-700 transition-all shadow-lg shadow-rose-100"
                  >
                    <Square size={16} fill="currentColor" /> 停止錄影
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 flex items-start gap-3">
            <Info size={16} className="text-blue-500 mt-0.5" />
            <p className="text-[10px] text-blue-700 font-medium leading-relaxed">
              點擊「開始錄影」後，瀏覽器將跳出系統權限詢問。您可以選擇錄製「整個螢幕」、「特定分頁」或「特定視窗」。錄影完成後將直接生成 WebM 檔案供下載。
            </p>
          </div>
        </div>

        {/* 預覽與下載 */}
        <div className="bg-slate-100 rounded-[2.5rem] border border-slate-200 min-h-[300px] flex flex-col items-center justify-center p-6 relative overflow-hidden group">
          {vm.state.recordedUrl ? (
            <div className="w-full space-y-4 animate-in zoom-in-95">
              <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <video src={vm.state.recordedUrl} controls className="w-full h-full object-contain" />
              </div>
              <a
                href={vm.state.recordedUrl}
                download={`smarttool_record_${Date.now()}.webm`}
                className="flex items-center justify-center gap-2 w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
              >
                <Download size={18} /> 下載錄影檔案 (WebM)
              </a>
              <p className="text-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                檔案保存在您的瀏覽器中，重新錄製將覆蓋此內容
              </p>
            </div>
          ) : vm.state.isRecording ? (
            <div className="flex flex-col items-center gap-4 animate-pulse">
              <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center">
                <Monitor className="text-rose-500" size={32} />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-slate-600">錄製中...</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-widest">Recording in progress</p>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-4 opacity-30">
              <Monitor size={48} className="mx-auto text-slate-400" />
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">錄影預覽區</p>
            </div>
          )}

          {vm.state.error && (
            <div className="absolute inset-x-6 bottom-6 p-4 bg-rose-500 text-white rounded-2xl flex items-center gap-3 shadow-xl animate-in slide-in-from-bottom-4">
              <AlertCircle size={20} />
              <p className="text-xs font-bold">{vm.state.error}</p>
            </div>
          )}
        </div>
      </div>

      {/* 提示腳註 */}
      <div className="flex items-center justify-center gap-4 py-4 opacity-30">
        <div className="h-px flex-1 bg-slate-200" />
        <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">Secure Client-side Recording • v1.0</p>
        <div className="h-px flex-1 bg-slate-200" />
      </div>
    </div>
  );
};

export default ScreenRecorder;
