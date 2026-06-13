
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
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [targetFormat, setTargetFormat] = useState('mp4');
  const [error, setError] = useState<string | null>(null);
  const [isSTMode, setIsSTMode] = useState(false);
  const ffmpegRef = useRef(new FFmpeg());

  const load = async () => {
    setLoading(true);
    startLoading('正在初始化影音引擎...');
    setError(null);
    const ffmpeg = ffmpegRef.current;
    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
    
    ffmpeg.on('log', ({ message }) => console.debug(message));
    ffmpeg.on('progress', ({ progress }) => setProgress(Math.round(progress * 100)));

    try {
      const isSABSupported = typeof SharedArrayBuffer !== 'undefined';
      if (!isSABSupported) {
        setIsSTMode(true);
      }

      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setLoaded(true);
    } catch (e: any) {
      setError(`影音核心載入失敗。這通常是因為手機瀏覽器安全性限制。若要修復，請使用電腦版瀏覽器。`);
    } finally {
      setLoading(false);
      stopLoading();
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
    state: { loaded, file, loading, progress, resultUrl, targetFormat, error, isSTMode },
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
