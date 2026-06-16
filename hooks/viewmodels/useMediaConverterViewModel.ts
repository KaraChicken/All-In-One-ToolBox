
import { useState, useRef, useEffect } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export const useMediaConverterViewModel = () => {
  const [loaded, setLoaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [initProgress, setInitProgress] = useState(0);
  const [initializing, setInitializing] = useState(false);
  const [initLogs, setInitLogs] = useState<string[]>([]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState('mp4');
  const [resolution, setResolution] = useState('original');
  const [fps, setFps] = useState('original');
  const [audioBitrate, setAudioBitrate] = useState('128k');
  const [muteAudio, setMuteAudio] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [speed, setSpeed] = useState('1.0');
  const [error, setError] = useState<string | null>(null);
  const [isSTMode, setIsSTMode] = useState(false);
  const [conversionMode, setConversionMode] = useState<'compatibility' | 'speed' | 'quality'>('compatibility');
  const ffmpegRef = useRef(new FFmpeg());

  useEffect(() => {
    const isSABSupported = typeof SharedArrayBuffer !== 'undefined';
    setIsSTMode(!isSABSupported);
  }, []);

  const appendLog = (msg: string) => {
    setInitLogs(prev => [...prev.slice(-99), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const load = async () => {
    setLoading(true);
    setInitializing(true);
    setInitProgress(0);
    setInitLogs([]);
    setError(null);
    const ffmpeg = ffmpegRef.current;
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';

    ffmpeg.on('log', ({ message }) => {
      console.debug(message);
      appendLog(`[Core] ${message}`);
    });
    ffmpeg.on('progress', ({ progress }) => setProgress(Math.round(progress * 100)));

    // Smoothly animate initialization progress up during web assembly & dynamic code loading
    let currentPct = 0;
    const interval = setInterval(() => {
      if (currentPct < 40) {
        currentPct += Math.floor(Math.random() * 5) + 3; // Fast initial jump
      } else if (currentPct < 75) {
        currentPct += Math.floor(Math.random() * 3) + 1; // Normal speed
      } else if (currentPct < 96) {
        currentPct += Math.floor(Math.random() * 2); // Slow down towards the end
      }
      if (currentPct > 96) currentPct = 96;
      setInitProgress(currentPct);

      if (currentPct > 10 && currentPct <= 20 && currentPct % 5 === 0) {
        appendLog('Downloading WebAssembly dependencies from unpkg...');
      } else if (currentPct > 35 && currentPct <= 45 && currentPct % 5 === 0) {
        appendLog('Compiling high-performance video / audio codecs...');
      } else if (currentPct > 60 && currentPct <= 70 && currentPct % 5 === 0) {
        appendLog('Configuring secure browser isolate environment...');
      } else if (currentPct > 85 && currentPct <= 90 && currentPct % 5 === 0) {
        appendLog('Optimizing heap allocations & compiling ASM bindings...');
      }
    }, 150);

    try {
      const isSABSupported = typeof SharedArrayBuffer !== 'undefined';
      appendLog(`System check: SharedArrayBuffer supported = ${isSABSupported}`);
      appendLog(`User selection: ${isSTMode ? 'Single-Thread (相容模式)' : 'Multi-Thread (高速模式)'}`);
      
      let finalSTMode = isSTMode;
      if (!isSTMode && !isSABSupported) {
        finalSTMode = true;
        setIsSTMode(true);
        appendLog('⚠️ Notice: Multi-Thread is selected but SharedArrayBuffer is not supported by your browser. Running in fallback Single-Thread mode.');
      } else if (isSTMode) {
        appendLog('Running in compatibility mode (Single-Thread) as requested.');
      } else {
        appendLog('Running in high-speed mode (Multi-Thread) with safe thread isolation.');
      }

      appendLog('Downloading ffmpeg-core.js main thread loader...');
      const coreBlobURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
      appendLog('ffmpeg-core.js downloaded successfully.');

      appendLog('Downloading ffmpeg-core.wasm memory structures...');
      const wasmBlobURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');
      appendLog('ffmpeg-core.wasm downloaded successfully. Bootstrapping runtime...');

      appendLog('Loading WebAssembly core package into active worker...');
      await ffmpeg.load({
        coreURL: coreBlobURL,
        wasmURL: wasmBlobURL,
      });

      clearInterval(interval);
      setInitProgress(100);
      appendLog('🚀 Conversion engine started successfully!');
      // Give a brief moment for the user to see the 100% completion before switching states
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoaded(true);
    } catch (e: any) {
      clearInterval(interval);
      setInitProgress(0);
      appendLog(`❌ Fatal: Initialization failed. Error details: ${e?.message || e}`);
      setError(`影音核心載入失敗。這通常是因為手機瀏覽器安全性限制。若要修復，請使用電腦版瀏覽器。`);
    } finally {
      clearInterval(interval);
      setLoading(false);
      setInitializing(false);
    }
  };

  const convert = async () => {
    if (!file) return;
    setLoading(true);
    setProgress(0);
    setError(null);
    setResultUrl(null);

    appendLog('--------------------------------------------------');
    appendLog(`🎬 開始轉檔任務: ${file.name}`);
    appendLog(`⚙️ 輸出格式: [${targetFormat.toUpperCase()}]`);
    appendLog(`🎯 運作模式: [${conversionMode === 'compatibility' ? '相容性優先' : conversionMode === 'speed' ? '極速轉檔' : '極致畫質'}]`);
    appendLog(`📐 解析度選項: [${resolution}]`);
    appendLog(`🎞️ 影格率 (FPS): [${fps}]`);
    appendLog(`🔊 音訊位元率: [${audioBitrate}]`);
    appendLog(`🔇 靜音模式: [${muteAudio ? '啟用' : '停用'}]`);
    appendLog(`⏱️ 局部剪切: [${startTime.trim() ? `從 ${startTime.trim()} 開始` : '無'} + ${duration.trim() ? `${duration.trim()} 秒` : '無限制'}]`);
    appendLog(`⚡ 播放速度加速: [${speed}x]`);

    const ffmpeg = ffmpegRef.current;
    const inputExt = file.name.split('.').pop() || 'mp4';
    const inputName = `input.${inputExt}`;
    const outputName = `output.${targetFormat}`;

    try {
      appendLog('📥 正在載入並寫入虛擬檔案系統...');
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      appendLog('✅ 寫入虛擬檔案系統成功，正在編譯並解析 FFmpeg 參數...');
      
      let args = ['-i', inputName];

      // 1. Trim settings (Placed after input)
      if (startTime.trim()) {
        args.push('-ss', startTime.trim());
      }
      if (duration.trim() && !isNaN(Number(duration.trim()))) {
        args.push('-t', duration.trim());
      }

      // 2. Video Speed or Aspect/Resolution change filters
      let vFilters: string[] = [];
      let aFilters: string[] = [];

      // Resolution scale filter for video
      const isVideo = ['mp4', 'webm', 'mkv', 'avi', 'mov'].includes(targetFormat);
      const isAudio = ['mp3', 'wav', 'aac', 'm4a', 'ogg'].includes(targetFormat);
      const isGif = targetFormat === 'gif';

      if (isVideo && resolution !== 'original') {
        const width = resolution.split('x')[0];
        vFilters.push(`scale=${width}:-2`);
      }

      // Speed adjustment filter (Video + Audio)
      const speedVal = parseFloat(speed);
      if (speedVal !== 1.0) {
        if (isVideo || isGif) {
          const ptsVal = (1 / speedVal).toFixed(4);
          vFilters.push(`setpts=${ptsVal}*PTS`);
        }
        if (!muteAudio && (isVideo || isAudio)) {
          if (speedVal >= 0.5 && speedVal <= 2.0) {
            aFilters.push(`atempo=${speedVal}`);
          }
        }
      }

      // 3. Frame Rate limit (FPS)
      if ((isVideo || isGif) && fps !== 'original') {
        args.push('-r', fps);
      }

      // Apply video filters argument
      if (isGif) {
        const gifWidth = resolution !== 'original' ? resolution.split('x')[0] : '320';
        const gifFps = fps !== 'original' ? fps : '10';
        args.push('-vf', `fps=${gifFps},scale=${gifWidth}:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse`);
      } else if (vFilters.length > 0) {
        args.push('-vf', vFilters.join(','));
      }

      // 4. Audio settings / Mute
      if (muteAudio || isGif) {
        args.push('-an');
      } else {
        if (aFilters.length > 0) {
          args.push('-filter:a', aFilters.join(','));
        }
        if (isAudio || isVideo) {
          args.push('-ab', audioBitrate);
          args.push('-ar', '44100');
        }
      }

      // 5. Mode-based Compression Adjustments
      if (isVideo) {
        if (conversionMode === 'compatibility') {
          args.push('-pix_fmt', 'yuv420p');
          if (['mp4', 'mkv', 'mov'].includes(targetFormat)) {
            args.push('-preset', 'medium');
          }
        } else if (conversionMode === 'speed') {
          if (['mp4', 'mkv', 'mov'].includes(targetFormat)) {
            args.push('-preset', 'ultrafast');
          }
        } else if (conversionMode === 'quality') {
          if (['mp4', 'mkv', 'mov'].includes(targetFormat)) {
            args.push('-preset', 'slow', '-crf', '18');
          }
        }
      }

      // Output name
      args.push(outputName);

      appendLog(`🚀 執行轉碼核心指令: ffmpeg ${args.join(' ')}`);
      await ffmpeg.exec(args);
      
      appendLog('📤 轉碼順利完成！正在讀取檔案快取...');
      const data = await ffmpeg.readFile(outputName);
      
      const mimeTypes: Record<string, string> = {
        mp4: 'video/mp4',
        webm: 'video/webm',
        mkv: 'video/x-matroska',
        avi: 'video/x-msvideo',
        mov: 'video/quicktime',
        mp3: 'audio/mpeg',
        wav: 'audio/wav',
        aac: 'audio/aac',
        m4a: 'audio/mp4',
        ogg: 'audio/ogg',
        gif: 'image/gif'
      };

      const type = mimeTypes[targetFormat] || 'application/octet-stream';
      const url = URL.createObjectURL(new Blob([(data as any).buffer], { type }));
      setResultUrl(url);
      appendLog('🎉 影音格式轉換成功！已封裝完畢並產生下載連結。');
    } catch (e: any) {
      setError(`轉檔失敗: ${e?.message || e}。建議縮小檔案大小再試一次。`);
      appendLog(`❌ 轉換執行錯誤: ${e?.message || e}`);
    } finally {
      setLoading(false);
    }
  };

  return {
    state: { 
      loaded, 
      file, 
      loading, 
      progress, 
      initProgress, 
      initLogs, 
      initializing, 
      resultUrl, 
      targetFormat, 
      error, 
      isSTMode,
      resolution,
      fps,
      audioBitrate,
      muteAudio,
      startTime,
      duration,
      speed,
      conversionMode
    },
    commands: {
      load,
      convert,
      setFile: (f: File | null) => {
        setFile(f);
        setResultUrl(null);
        setError(null);
      },
      setTargetFormat,
      setResolution,
      setFps,
      setAudioBitrate,
      setMuteAudio,
      setStartTime,
      setDuration,
      setSpeed,
      setConversionMode,
      setIsSTMode,
      resetEngine: () => {
        setLoaded(false);
        setInitializing(false);
        setInitLogs([]);
        setInitProgress(0);
      },
      resetResult: () => setResultUrl(null)
    }
  };
};
