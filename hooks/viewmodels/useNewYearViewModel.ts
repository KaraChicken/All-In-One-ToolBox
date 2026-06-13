
import { useState, useEffect, useCallback } from 'react';

export const TIMEZONES = [
  { id: 'Asia/Taipei', label: '台北 (Taipei)', offset: 8 },
  { id: 'Asia/Tokyo', label: '東京 (Tokyo)', offset: 9 },
  { id: 'Asia/Seoul', label: '首爾 (Seoul)', offset: 9 },
  { id: 'Europe/London', label: '倫敦 (London)', offset: 0 },
  { id: 'Europe/Paris', label: '巴黎 (Paris)', offset: 1 },
  { id: 'America/New_York', label: '紐約 (New York)', offset: -5 },
  { id: 'America/Los_Angeles', label: '洛杉磯 (L.A.)', offset: -8 },
  { id: 'Australia/Sydney', label: '雪梨 (Sydney)', offset: 11 },
  { id: 'UTC', label: '國際標準時間 (UTC)', offset: 0 },
];

export const useNewYearViewModel = () => {
  const [timezoneId, setTimezoneId] = useState('Asia/Taipei');
  const [diff, setDiff] = useState(0);

  const calculateDiff = useCallback(() => {
    const now = new Date();
    
    // 獲取當前選擇時區的當前年份與下一個跨年時刻
    // 我們使用 Intl 獲取該時區的當前時間，來確定目標年份
    const tzNowStr = now.toLocaleString('en-US', { timeZone: timezoneId });
    const tzNowDate = new Date(tzNowStr);
    const targetYear = tzNowDate.getFullYear() + 1;
    
    // 目標是該時區的 1 月 1 日 00:00:00
    // 為了計算絕對時間差，我們需要找出該時區目標時刻對應的 UTC 時間
    const targetDateStr = `${targetYear}-01-01T00:00:00`;
    
    // 使用技巧：建立一個代表目標時區時間的 Date 對象
    // 透過格式化獲取其 UTC 偏移並計算
    const targetLocal = new Date(targetDateStr);
    
    // 更穩健的方法：使用 Intl.DateTimeFormat 找出目標時刻的毫秒數
    // 這裡我們簡化處理，直接比較選定時區的當前毫秒與目標毫秒
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: timezoneId,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const getPart = (p: string) => parseInt(parts.find(x => x.type === p)?.value || '0');
    
    const tzYear = getPart('year');
    const nextYear = tzYear + 1;
    
    // 目標時間在該時區的 Unix Timestamp
    // 我們透過構造一個在選定時區為 00:00:00 的 Date 對象來計算
    const targetInTz = new Date(now.toLocaleString('en-US', { timeZone: timezoneId }));
    targetInTz.setFullYear(nextYear, 0, 1);
    targetInTz.setHours(0, 0, 0, 0);

    // 當前在該時區的時間
    const currentInTz = new Date(now.toLocaleString('en-US', { timeZone: timezoneId }));
    currentInTz.setMilliseconds(now.getMilliseconds());

    const msDiff = targetInTz.getTime() - currentInTz.getTime();
    setDiff(Math.max(0, msDiff));
  }, [timezoneId]);

  useEffect(() => {
    const timer = setInterval(calculateDiff, 40); // 25fps 更新以獲得平滑毫秒感
    return () => clearInterval(timer);
  }, [calculateDiff]);

  const getTimeParts = () => {
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const ms = Math.floor((diff % 1000) / 10); // 兩位毫秒
    
    return { days, hours, minutes, seconds, ms };
  };

  return {
    state: { timezoneId, diff, ...getTimeParts() },
    commands: { setTimezoneId },
  };
};
