
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
    id: 'countdown-timer', 
    name: { zh: '番茄鐘', en: 'Pomodoro Timer', ja: 'ポモドーロ・テクニック', ko: '포모도로 타이머' },
    description: { 
      zh: '專注與休息間隔循環，打造高效率工作的生產力神器', 
      en: 'Focus and rest intervals to elevate work efficiency and output',
      ja: '集中と休憩のサイクルを回し、生産性を劇的に高めるタイマー',
      ko: '집중과 휴식의 순환 주기를 통해 업무 및 학습 효율을 고극대화하는 생산성 도구'
    }, 
    category: 'Daily', icon: 'Timer', path: '/timer', isPopular: true 
  },
  { 
    id: 'password-gen', 
    name: { zh: '密碼產生器', en: 'Password Generator', ja: 'パスワード生成', ko: '維碼產生器' },
    description: { 
      zh: '生成高強度安全隨機密碼', 
      en: 'Create high-strength secure passwords',
      ja: '強力で安全なパスワードを生成',
      ko: '고강度 보안 무작위 비밀번호 생성'
    }, 
    category: 'Developer', icon: 'Key', path: '/password-gen' 
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
    id: 'lang-learning', 
    name: { zh: '拼音學習', en: 'Phonetics Learning', ja: '発音・ピンイン学習', ko: '발음 및 병음 학습' },
    description: { 
      zh: '包含日語五十音與韓語四十音，提供點選即時母語發音與羅馬拼音對照', 
      en: 'Includes Japanese Gojuon and Korean Hangul with click-to-speak voice guidance',
      ja: '日本語五十音と韓国語四十音の音声およびふりがな記述を収録',
      ko: '일본어 50음과 한국어 40음의 발음 지표와 함께 오디오 가이드를 제공'
    }, 
    category: 'Language', icon: 'GraduationCap', path: '/lang-learning', isPopular: true 
  },
  { 
    id: 'lang-grammar', 
    name: { zh: '文法學習', en: 'Grammar Learning', ja: '文法学習', ko: '기초 문법 학습' },
    description: { 
      zh: '精選中、英、日、韓基礎語序與典型句型結構對照，支援隨選即時語音朗讀', 
      en: 'Compare and study basic sentence structures across Chinese, English, Japanese, and Korean',
      ja: '中国語、英語、日本語、韓国語の基本的な文法構造と例文を対照学習',
      ko: '중국어, 영어, 일본어, 한국어의 기초 문법과 문장 구조 비교 학습'
    }, 
    category: 'Language', icon: 'BookOpen', path: '/lang-grammar', isPopular: true 
  },
  { 
    id: 'lang-vocab', 
    name: { zh: '生活常用單字', en: 'Useful Words', ja: '生活単語帳', ko: '생활 기초 단어' },
    description: { 
      zh: '中、英、日、韓生活常用詞彙，支援雙語自訂轉輪比照與母語語音播放', 
      en: 'Essential daily vocabulary across 4 languages with custom bilateral comparison dials and TTS',
      ja: '4ヶ国語の日常生活、旅行、食事でよく使う単語。バイリンガル選択ダイヤルと読み上げ搭載',
      ko: '4개 국어 일상생활 필수 어휘. 상호작용 가능한 이중 언어 매칭 장치 및 인공지능 발음 탑재'
    }, 
    category: 'Language', icon: 'Languages', path: '/lang-vocab', isPopular: true 
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
