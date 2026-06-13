
import { useState, useMemo } from 'react';

export const useBMIViewModel = () => {
  const [height, setHeight] = useState<string>('170');
  const [weight, setWeight] = useState<string>('65');

  const bmi = useMemo(() => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (!h || !w || h <= 0) return 0;
    return parseFloat((w / (h * h)).toFixed(1));
  }, [height, weight]);

  const evaluation = useMemo(() => {
    if (bmi <= 0) return { label: '未計算', color: 'text-gray-400', bg: 'bg-gray-400', hint: '請輸入資料。' };
    if (bmi < 18.5) return { label: '體重過輕', color: 'text-blue-500', bg: 'bg-blue-500', hint: '建議多補充營養並進行適度重量訓練。' };
    if (bmi < 24) return { label: '正常範圍', color: 'text-emerald-500', bg: 'bg-emerald-500', hint: '太棒了！請繼續保持均衡飲食與運動習慣。' };
    if (bmi < 27) return { label: '過重', color: 'text-yellow-500', bg: 'bg-yellow-500', hint: '注意到體重有增加趨勢，建議調整飲食並規規律運動。' };
    if (bmi < 30) return { label: '輕度肥胖', color: 'text-orange-500', bg: 'bg-orange-500', hint: '建議諮詢專業營養師，開始控制熱量攝取。' };
    if (bmi < 35) return { label: '中度肥胖', color: 'text-red-500', bg: 'bg-red-500', hint: '肥胖已可能影響健康，建議安排身體檢查。' };
    return { label: '重度肥胖', color: 'text-rose-700', bg: 'bg-rose-700', hint: '強烈建議就醫諮詢，制定專業的減重計畫。' };
  }, [bmi]);

  return {
    state: { height, weight, bmi, evaluation },
    commands: {
      setHeight,
      setWeight
    }
  };
};
