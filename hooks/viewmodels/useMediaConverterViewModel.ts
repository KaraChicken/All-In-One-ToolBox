
import { useState, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { useGlobalLoading } from '../../context/LoadingContext';

export const useMediaConverterViewModel = () => {
  const { startLoading, stopLoading } = useGlobalLoading();
  const [loaded, setLoaded] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [initProgress, setInitProgress] = useState(0);
  const [initializing, setInitializing] = useState(false);
  const [initLogs, setInitLogs] = useState<string[]>([]);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState('mp4');
  const [error, setError] = useState<string | null>(null);
  const [isSTMode, setIsSTMode] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    setLoading(true);
    setInitializing(true);
    setInitProgress(0);
    setInitLogs([]);
    setError(null);
    const ffmpeg = ffmpegRef.current;
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    
    const appendLog = (msg: string) => {
      setInitLogs(prev => [...prev.slice(-99), `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

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
      if (!isSABSupported) {
        setIsSTMode(true);
        appendLog('⚠️ Notice: SharedArrayBuffer is not supported by your browser. Running in fallback thread-compatibility mode.');
      } else {
        appendLog('System check: High-speed multithreading enabled.');
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
    startLoading('正在轉換影音格式，請稍候...');
    setProgress(0);
    setError(null);

    const ffmpeg = ffmpegRef.current;
    const inputName = 'input.' + file.name.split('.').pop();
    const outputName = `output.${targetFormat}`;

    try {
      await ffmpeg.writeFile(inputName, await fetchFile(file));
      
      let args = ['-i', inputName];
      if (targetFormat === 'gif') {
        args.push('-vf', 'fps=10,scale=320:-1:flags=lanczos', '-split', '[a][b]', '[a]palettegen[p];[b][p]paletteuse');
      } else if (targetFormat === 'mp3') {
        args.push('-vn', '-ab', '128k', '-ar', '44100');
      }
      args.push(outputName);

      await ffmpeg.exec(args);
      
      const data = await ffmpeg.readFile(outputName);
      const url = URL.createObjectURL(new Blob([(data as any).buffer], { 
        type: targetFormat === 'mp3' ? 'audio/mpeg' : (targetFormat === 'gif' ? 'image/gif' : 'video/mp4') 
      }));
      setResultUrl(url);
    } catch (e: any) {
      setError(`轉檔失敗: ${e.message}。建議縮小檔案大小再試一次。`);
    } finally {
      setLoading(false);
      stopLoading();
    }
  };

  return {
    state: { loaded, file, loading, progress, initProgress, initLogs, initializing, resultUrl, targetFormat, error, isSTMode },
    commands: {
      load,
      convert,
      setFile: (f: File | null) => {
        setFile(f);
        setResultUrl(null);
        setError(null);
      },
      setTargetFormat,
      resetResult: () => setResultUrl(null)
    }
  };
};
