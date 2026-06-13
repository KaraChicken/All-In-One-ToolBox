
import { Language } from '../types';

export interface VocabItem {
  zh: string;
  zh_p: string; // 拼音
  en: string;
  en_p: string; // IPA or pronunciation hint
  ja: string;
  ja_p: string; // 羅馬字
  ko: string;
  ko_p: string; // 羅馬拼音
  note: string;
}

export interface VocabCategory {
  category: string;
  items: VocabItem[];
}

export interface GrammarPoint {
  title: string;
  desc: string;
  languages: Record<Language, {
    name: string;
    pattern: string;
    example: string;
    color: string;
  }>;
}

export const VOCAB_DATA: VocabCategory[] = [
  {
    category: 'Greetings (打招呼)',
    items: [
      { zh: '你好', zh_p: 'nǐ hǎo', en: 'Hello', en_p: '/həˈloʊ/', ja: 'こんにちは', ja_p: 'kon-nichi-wa', ko: '안녕하세요', ko_p: 'an-nyeong-ha-se-yo', note: 'Standard greeting' },
      { zh: '謝謝', zh_p: 'xiè xie', en: 'Thank you', en_p: '/θæŋk juː/', ja: 'ありがとう', ja_p: 'arigatō', ko: '감사합니다', ko_p: 'gam-sa-ham-ni-da', note: 'Gratitude' },
      { zh: '對不起', zh_p: 'duì bù qǐ', en: 'I am sorry', en_p: '/ˈsɑːri/', ja: 'ごめんなさい', ja_p: 'gomen-nasai', ko: '죄송합니다', ko_p: 'joe-song-ham-ni-da', note: 'Apology' },
      { zh: '再見', zh_p: 'zài jiàn', en: 'Goodbye', en_p: '/ˌɡʊdˈbaɪ/', ja: 'さようなら', ja_p: 'sayōnara', ko: '안녕히 가세요', ko_p: 'an-nyeong-hi ga-se-yo', note: 'Farewell' },
    ]
  },
  {
    category: 'Travel (旅遊)',
    items: [
      { zh: '機場', zh_p: 'jī chǎng', en: 'Airport', en_p: '/ˈerpɔːrt/', ja: '空港', ja_p: 'kūkō', ko: '공항', ko_p: 'gong-hang', note: 'Transportation' },
      { zh: '飯店', ja: 'ホテル', ja_p: 'hoteru', zh_p: 'fàn diàn', en: 'Hotel', en_p: '/hoʊˈtɛl/', ko: '호텔', ko_p: 'ho-tel', note: 'Accommodation' },
      { zh: '護照', zh_p: 'hù zhào', en: 'Passport', en_p: '/ˈpæspɔːrt/', ja: 'パスポート', ja_p: 'pasupōto', ko: '여권', ko_p: 'yeo-gwon', note: 'Document' },
      { zh: '地圖', zh_p: 'dì tú', en: 'Map', en_p: '/mæp/', ja: '地図', ja_p: 'chizu', ko: '지도', ko_p: 'ji-do', note: 'Navigation' },
    ]
  },
  {
    category: 'Dining (飲食)',
    items: [
      { zh: '水', zh_p: 'shuǐ', en: 'Water', en_p: '/ˈwɔːtər/', ja: '水', ja_p: 'mizu', ko: '물', ko_p: 'mul', note: 'Essential drink' },
      { zh: '好吃的', zh_p: 'hǎo chī de', en: 'Delicious', en_p: '/dɪˈlɪʃəs/', ja: '美味しい', ja_p: 'oishii', ko: '맛있어요', ko_p: 'ma-si-sseo-yo', note: 'Compliment' },
      { zh: '買單', zh_p: 'mǎi dān', en: 'Check / Bill', en_p: '/tʃek/', ja: '会計', ja_p: 'kaikei', ko: '계산서', ko_p: 'gye-san-seo', note: 'Payment' },
      { zh: '選單', zh_p: 'xuǎn dān', en: 'Menu', en_p: '/ˈmenjuː/', ja: 'メニュー', ja_p: 'menyū', ko: '메뉴', ko_p: 'me-nyu', note: 'Ordering' },
    ]
  }
];

export const GRAMMAR_DATA: GrammarPoint[] = [
  {
    title: 'Basic Sentence Structure (句型結構)',
    desc: 'How Subject, Verb, and Object are arranged.',
    languages: {
      zh: { name: 'Chinese', pattern: 'S + V + O', example: '我 [S] 吃 [V] 蘋果 [O]', color: 'text-indigo-600' },
      en: { name: 'English', pattern: 'S + V + O', example: 'I [S] eat [V] an apple [O]', color: 'text-blue-600' },
      ja: { name: 'Japanese', pattern: 'S + O + V', example: '私 [S] は 🍎 [O] を 食べます [V]', color: 'text-rose-600' },
      ko: { name: 'Korean', pattern: 'S + O + V', example: '나 [S] 는 🍎 [O] 를 먹어요 [V]', color: 'text-emerald-600' }
    }
  },
  {
    title: 'Politeness & Honorifics (敬語系統)',
    desc: 'Cultural variations in formality.',
    languages: {
      zh: { name: 'Chinese', pattern: 'Simple (您/你)', example: '您好 vs 你好', color: 'text-indigo-600' },
      en: { name: 'English', pattern: 'Contextual', example: 'Could you vs Can you', color: 'text-blue-600' },
      ja: { name: 'Japanese', pattern: 'Complex (Keigo)', example: 'です/ます vs だ', color: 'text-rose-600' },
      ko: { name: 'Korean', pattern: 'Complex (Jondaetmal)', example: '해요 vs 해', color: 'text-emerald-600' }
    }
  },
  {
    title: 'Plurality (複數型)',
    desc: 'How multiples are handled.',
    languages: {
      zh: { name: 'Chinese', pattern: 'Static', example: '很多蘋果 (No change to noun)', color: 'text-indigo-600' },
      en: { name: 'English', pattern: 'Suffix "-s"', example: 'Apples', color: 'text-blue-600' },
      ja: { name: 'Japanese', pattern: 'Static', example: 'たくさんの林檎 (No change)', color: 'text-rose-600' },
      ko: { name: 'Korean', pattern: 'Suffix "-deul"', example: '사과들', color: 'text-emerald-600' }
    }
  }
];
