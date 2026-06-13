
import { useState, useRef, useCallback } from 'react';

export const useScreenRecorderViewModel = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startTimer = () => {
    timerRef.current = window.setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    stopTimer();
    setIsRecording(false);
    setIsPaused(false);
    setPermissionGranted(false);
  }, []);

  const startRecording = async (includeMic: boolean = false) => {
    setError(null);
    setRecordedUrl(null);
    chunksRef.current = [];

    try {
      // 請求螢幕擷取權限
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: { ideal: 30 } },
        audio: true // 包含系統音訊（如果瀏覽器與使用者支援）
      });

      let combinedStream = screenStream;

      if (includeMic) {
        try {
          // 請求麥克風權限
          const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const tracks = [...screenStream.getVideoTracks(), ...micStream.getAudioTracks()];
          combinedStream = new MediaStream(tracks);
        } catch (micErr) {
          console.warn('Microphone permission denied, continuing with screen audio only.');
        }
      }

      streamRef.current = combinedStream;
      setPermissionGranted(true);

      const mediaRecorder = new MediaRecorder(combinedStream, {
        mimeType: 'video/webm;codecs=vp9'
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
      };

      // 監聽使用者點擊瀏覽器的「停止分享」按鈕
      screenStream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordingTime(0);
      startTimer();

    } catch (err: any) {
      if (err.name === 'NotAllowedError') {
        setError('權限遭拒：請允許存取您的螢幕以開始錄影。');
      } else {
        setError(`啟動錄影失敗：${err.message}`);
      }
      setPermissionGranted(false);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      stopTimer();
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      startTimer();
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':');
  };

  return {
    state: { isRecording, isPaused, recordingTime, recordedUrl, error, permissionGranted },
    commands: { startRecording, stopRecording, pauseRecording, resumeRecording },
    utils: { formatTime }
  };
};
