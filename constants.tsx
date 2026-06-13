
import React from 'react';
import { 
  Code2, Type, Calculator, Image as ImageIcon, FileJson, 
  Hash, Scissors, Wrench, QrCode, Key, Smile, AlignLeft, 
  Activity, Settings, Star, Flame, Sparkles, Users, Trophy, Dices,
  Percent, Compass, Layers, CircleDot, Languages, BookOpen, GraduationCap,
  MessageSquareText, Video, Timer, Watch, PartyPopper, Monitor
} from 'lucide-react';
import { Tool } from './types';

export const TOOLS: Tool[] = [
  // Developer
  { 
    id: 'json-formatter', 
    name: { zh: 'JSON 格式化', en: 'JSON Formatter', ja: 'JSONフォーマッタ', ko: 'JSON 포맷터' },
    description: { 
      zh: '美化、驗證與壓縮 JSON 數據', 
      en: 'Beautify, validate and compress JSON data',
      ja: 'JSONデータの整形、検証、壓縮',
      ko: 'JSON 데이터 미화, 검증 및 압축'
    }, 
    category: 'Developer', icon: 'FileJson', path: '/json-formatter', isPopular: true 
  },
  { 
    id: 'media-converter', 
    name: { zh: '影音轉檔器', en: 'Media Converter', ja: 'メディア轉換', ko: '미디어 변환기' },
    description: { 
      zh: '瀏覽器內轉檔 MP4, GIF, MP3', 
      en: 'Convert MP4, GIF, MP3 in browser',
      ja: 'ブラウザでMP4、GIF、MP3を変換',
      ko: '브라우저에서 MP4, GIF, MP3 변환'
    }, 
    category: 'Developer', icon: 'Video', path: '/media-converter', isPopular: true 
  },
  { 
    id: 'screen-recorder', 
    name: { zh: '螢幕錄影器', en: 'Screen Recorder', ja: '畫面録畫', ko: '화면 녹화기' },
    description: { 
      zh: '在線擷取螢幕與麥克風，支援下載 MP4', 
      en: 'Capture screen and mic, download as MP4',
      ja: '畫面とマイクをキャプチャし、MP4としてダウンロード',
      ko: '화면과 마이크를 캡처하고 MP4로 다운로드'
    }, 
    category: 'Developer', icon: 'Monitor', path: '/screen-recorder', isPopular: true 
  },
  { 
    id: 'qr-gen', 
    name: { zh: 'QR Code 產生器', en: 'QR Code Generator', ja: 'QRコード作成', ko: 'QR 코드 생성기' },
    description: { 
      zh: '快速將網址或文字轉為二維碼', 
      en: 'Generate QR codes from URLs or text',
      ja: 'URLやテキスト從QRコードを生成',
      ko: 'QR 코드 생성기'
    }, 
    category: 'Developer', icon: 'QrCode', path: '/qr-gen', isPopular: true 
  },

  // Daily
  { 
    id: 'new-year-countdown', 
    name: { zh: '全球跨年倒數', en: 'New Year Countdown', ja: '年越しカウントダウン', ko: '새해 카운트다운' },
    description: { 
      zh: '全球時區跨年追蹤，精確至毫秒', 
      en: 'Global timezone countdown to New Year',
      ja: '世界中のタイムゾーンでのカウントダウン',
      ko: '전 세계 시간대별 새해 카운트다운'
    }, 
    category: 'Daily', icon: 'PartyPopper', path: '/new-year', isPopular: true 
  },
  { 
    id: 'countdown-timer', 
    name: { zh: '倒數計時器', en: 'Countdown Timer', ja: 'タイマー', ko: '타이머' },
    description: { 
      zh: '設定時間倒數，提醒重要事項', 
      en: 'Set a countdown for tasks',
      ja: 'タスクのカウントダウンを設定',
      ko: '작업 카운트다운 설정'
    }, 
    category: 'Daily', icon: 'Timer', path: '/timer', isPopular: true 
  },
  { 
    id: 'stopwatch', 
    name: { zh: '專業碼錶', en: 'Stopwatch', ja: 'ストップウォッチ', ko: '스톱워치' },
    description: { 
      zh: '精確紀錄時間，支援計圈功能', 
      en: 'Precise timing with lap support',
      ja: 'ラップサポート付きの正確なタイミング',
      ko: '랩 지원 기능이 있는 정밀한 타이밍'
    }, 
    category: 'Daily', icon: 'Watch', path: '/stopwatch' 
  },
  { 
    id: 'raffle', 
    name: { zh: '隨機抽籤', en: 'Random Raffle', ja: 'ランダム抽選', ko: '랜덤 추첨' },
    description: { 
      zh: '從名單中隨機抽選中獎者', 
      en: 'Pick random winners from a list',
      ja: 'リストからランダムに當選者を選択',
      ko: '명단에서 무작위로 당첨자 추첨'
    }, 
    category: 'Daily', icon: 'Sparkles', path: '/raffle', isPopular: true 
  },
  { 
    id: 'bmi-calc', 
    name: { zh: 'BMI 計算器', en: 'BMI Calculator', ja: 'BMI計算機', ko: 'BMI 계산기' },
    description: { 
      zh: '計算身體質量指數與健康建議', 
      en: 'Calculate BMI and get health advice',
      ja: 'BMIの計算と健康アドバイス',
      ko: '체질량 지수 계산 및 건강 조언'
    }, 
    category: 'Daily', icon: 'Activity', path: '/bmi-calc' 
  },
  { 
    id: 'password-gen', 
    name: { zh: '密碼產生器', en: 'Password Generator', ja: 'パスワード生成', ko: '維碼產生器' },
    description: { 
      zh: '生成高強度安全隨機密碼', 
      en: 'Create high-strength secure passwords',
      ja: '強力で安全なパスワードを生成',
      ko: '고강도 보안 무작위 비밀번호 생성'
    }, 
    category: 'Developer', icon: 'Key', path: '/password-gen' 
  },
  { 
    id: 'symbols', 
    name: { zh: '特殊符號表', en: 'Special Symbols', ja: '特殊記號表', ko: '특수 문자' },
    description: { 
      zh: '常用符號與表情點擊即複製', 
      en: 'Common symbols and emojis, click to copy',
      ja: '記號や絵文字をクリックでコピー',
      ko: '자주 사용하는 기호와 이모지 클릭 복사'
    }, 
    category: 'Text', icon: 'Smile', path: '/symbols', isPopular: true 
  },
  { 
    id: 'word-counter', 
    name: { zh: '字數統計', en: 'Word Counter', ja: '文字數カウント', ko: '글자 수 세기' },
    description: { 
      zh: '計算字數、字元數與行數', 
      en: 'Count words, characters and lines',
      ja: '文字數、單語數、行數をカウント',
      ko: '글자 수, 단어 수, 줄 수 계산'
    }, 
    category: 'Text', icon: 'Type', path: '/word-counter', isPopular: true 
  },
  { 
    id: 'percent-calc', 
    name: { zh: '百分比計算', en: 'Percentage Calculator', ja: '百分率計算', ko: '백분율 계산기' },
    description: { 
      zh: '計算比例、增減百分比與折扣', 
      en: 'Calculate ratios, percentage change, and discounts',
      ja: '比率、增減率、割引の計算',
      ko: '비율, 증감률 및 할인 계산'
    }, 
    category: 'Math', icon: 'Percent', path: '/percent-calc', isPopular: true 
  },
  { 
    id: 'unit-converter', 
    name: { zh: '單位換算', en: 'Unit Converter', ja: '單位換算', ko: '단位變換器' },
    description: { 
      zh: '長度、重量、面積等常用換算', 
      en: 'Convert length, weight, area, etc.',
      ja: '長度、重さ、面積などの変換',
      ko: '길이, 무게, 면적 등 단위 변환'
    }, 
    category: 'Math', icon: 'Calculator', path: '/unit-converter' 
  },
  { 
    id: 'lang-vocab', 
    name: { zh: '多語單字庫', en: 'Vocab Explorer', ja: '多言語單語帳', ko: '다국어 단어장' },
    description: { 
      zh: '中英日韓常用生活單字對照', 
      en: 'Compare vocabulary across 4 languages',
      ja: '4言語の生活單語を比較學習',
      ko: '4개 국어 생활 단어 비교 학습'
    }, 
    category: 'Language', icon: 'BookOpen', path: '/lang-vocab', isPopular: true 
  },
  { 
    id: 'lang-phonetic', 
    name: { zh: '發音對照表', en: 'Phonetic Table', ja: '發音對照表', ko: '발음 대조표' },
    description: { 
      zh: '查看單字拼音與發音指南', 
      en: 'Check word pinyin and phonetic guides',
      ja: '單語のピンインと發音ガイドを確認',
      ko: '단어의 병음 및 발음 가이드 확인'
    }, 
    category: 'Language', icon: 'MessageSquareText', path: '/lang-phonetic' 
  },
];

export const getIcon = (iconName: string, className?: string) => {
  const icons: Record<string, React.ElementType> = {
    Code2, Type, Calculator, ImageIcon, FileJson, Hash, 
    Scissors, Wrench, QrCode, Key, Smile, AlignLeft, 
    Activity, Settings, Star, Flame, Sparkles, Users, Trophy, Dices, Percent,
    Compass, Layers, CircleDot, Languages, BookOpen, GraduationCap, MessageSquareText, Video,
    Timer, Watch, PartyPopper, Monitor
  };
  const Icon = icons[iconName] || Wrench;
  return <Icon className={className || "w-5 h-5"} />;
};
