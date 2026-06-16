import React, { useState } from 'react';
import { Globe, Volume2 } from 'lucide-react';
import { Language } from '../types';

interface Props { lang: Language; }

interface KanaItem {
  hiragana: string;
  katakana: string;
  romaji: string;
}

interface HangulItem {
  char: string;
  name: string;
  romaji: string;
  type: string;
}

const JAPANESE_KANA: { row: string; items: (KanaItem | null)[] }[] = [
  {
    row: 'ア (a)',
    items: [
      { hiragana: 'あ', katakana: 'ア', romaji: 'a' },
      { hiragana: 'い', katakana: 'イ', romaji: 'i' },
      { hiragana: 'う', katakana: 'ウ', romaji: 'u' },
      { hiragana: 'え', katakana: 'エ', romaji: 'e' },
      { hiragana: 'お', katakana: 'オ', romaji: 'o' },
    ]
  },
  {
    row: 'カ (k)',
    items: [
      { hiragana: 'か', katakana: 'カ', romaji: 'ka' },
      { hiragana: 'き', katakana: 'キ', romaji: 'ki' },
      { hiragana: 'く', katakana: 'ク', romaji: 'ku' },
      { hiragana: 'け', katakana: 'ケ', romaji: 'ke' },
      { hiragana: 'こ', katakana: 'コ', romaji: 'ko' },
    ]
  },
  {
    row: 'サ (s)',
    items: [
      { hiragana: 'さ', katakana: 'サ', romaji: 'sa' },
      { hiragana: 'し', katakana: 'シ', romaji: 'shi' },
      { hiragana: 'す', katakana: 'ス', romaji: 'su' },
      { hiragana: 'せ', katakana: 'セ', romaji: 'se' },
      { hiragana: 'そ', katakana: 'ソ', romaji: 'so' },
    ]
  },
  {
    row: 'タ (t)',
    items: [
      { hiragana: 'た', katakana: 'タ', romaji: 'ta' },
      { hiragana: 'ち', katakana: 'チ', romaji: 'chi' },
      { hiragana: 'つ', katakana: 'ツ', romaji: 'tsu' },
      { hiragana: 'て', katakana: 'テ', romaji: 'te' },
      { hiragana: 'と', katakana: 'ト', romaji: 'to' },
    ]
  },
  {
    row: 'ナ (n)',
    items: [
      { hiragana: 'な', katakana: 'ナ', romaji: 'na' },
      { hiragana: 'に', katakana: 'ニ', romaji: 'ni' },
      { hiragana: 'ぬ', katakana: 'ヌ', romaji: 'nu' },
      { hiragana: 'ね', katakana: 'ネ', romaji: 'ne' },
      { hiragana: 'の', katakana: 'ノ', romaji: 'no' },
    ]
  },
  {
    row: 'ハ (h)',
    items: [
      { hiragana: 'は', katakana: 'ハ', romaji: 'ha' },
      { hiragana: 'ひ', katakana: 'ヒ', romaji: 'hi' },
      { hiragana: 'ふ', katakana: 'フ', romaji: 'fu' },
      { hiragana: 'へ', katakana: 'ヘ', romaji: 'he' },
      { hiragana: 'ほ', katakana: 'ホ', romaji: 'ho' },
    ]
  },
  {
    row: 'マ (m)',
    items: [
      { hiragana: 'ま', katakana: 'マ', romaji: 'ma' },
      { hiragana: 'み', katakana: 'ミ', romaji: 'mi' },
      { hiragana: 'む', katakana: 'ム', romaji: 'mu' },
      { hiragana: 'め', katakana: 'メ', romaji: 'me' },
      { hiragana: 'も', katakana: 'モ', romaji: 'mo' },
    ]
  },
  {
    row: 'ヤ (y)',
    items: [
      { hiragana: 'や', katakana: 'ヤ', romaji: 'ya' },
      null,
      { hiragana: 'ゆ', katakana: 'ユ', romaji: 'yu' },
      null,
      { hiragana: 'よ', katakana: 'ヨ', romaji: 'yo' },
    ]
  },
  {
    row: 'ラ (r)',
    items: [
      { hiragana: 'ら', katakana: 'ラ', romaji: 'ra' },
      { hiragana: 'り', katakana: 'リ', romaji: 'ri' },
      { hiragana: 'る', katakana: 'ル', romaji: 'ru' },
      { hiragana: 'れ', katakana: 'レ', romaji: 're' },
      { hiragana: 'ろ', katakana: 'ロ', romaji: 'ro' },
    ]
  },
  {
    row: 'ワ (w)',
    items: [
      { hiragana: 'わ', katakana: 'ワ', romaji: 'wa' },
      null,
      null,
      null,
      { hiragana: 'を', katakana: 'ヲ', romaji: 'wo' },
    ]
  },
  {
    row: 'ん (n)',
    items: [
      { hiragana: 'ん', katakana: 'ン', romaji: 'n' },
      null,
      null,
      null,
      null
    ]
  }
];

const KOREAN_VOWELS: HangulItem[] = [
  { char: 'ㅏ', name: 'a', romaji: 'a', type: '基本元音' },
  { char: '랴', name: 'ya', romaji: 'ya', type: '基本元音' },
  { char: 'ㅓ', name: 'eo', romaji: 'eo (ㄛ)', type: '基本元音' },
  { char: 'ㅕ', name: 'yeo', romaji: 'yeo (ㄧㄛ)', type: '基本元音' },
  { char: 'ㅗ', name: 'o', romaji: 'o (ㄡ)', type: '基本元音' },
  { char: 'ㅛ', name: 'yo', romaji: 'yo (ㄧㄡ)', type: '基本元音' },
  { char: 'ㅜ', name: 'u', romaji: 'u (ㄨ)', type: '基本元音' },
  { char: 'ㅠ', name: 'yu', romaji: 'yu (ㄧㄨ)', type: '基本元音' },
  { char: 'ㅡ', name: 'eu', romaji: 'eu (ㄜ)', type: '基本元音' },
  { char: 'ㅣ', name: 'i', romaji: 'i (ㄧ)', type: '基本元音' },
  { char: 'ㅐ', name: 'ae', romaji: 'ae (ㄞ)', type: '複合元音' },
  { char: 'ㅒ', name: 'yae', romaji: 'yae (ㄧㄞ)', type: '複合元音' },
  { char: 'ㅔ', name: 'e', romaji: 'e (ㄟ)', type: '複合元音' },
  { char: 'ㅖ', name: 'ye', romaji: 'ye (ㄧㄟ)', type: '複合元音' },
  { char: 'ㅘ', name: 'wa', romaji: 'wa (ㄨㄚ)', type: '複合元音' },
  { char: 'ㅙ', name: 'wae', romaji: 'wae (ㄨㄞ)', type: '複合元音' },
  { char: 'ㅚ', name: 'oe', romaji: 'oe (ㄨㄟ)', type: '複合元音' },
  { char: 'ㅝ', name: 'wo', romaji: 'wo (ㄨㄛ)', type: '複合元音' },
  { char: 'ㅞ', name: 'we', romaji: 'we (ㄨㄟ)', type: '複合元音' },
  { char: 'ㅟ', name: 'wi', romaji: 'wi (ㄨㄧ)', type: '複合元音' },
  { char: 'ㅢ', name: 'ui', romaji: 'ui (ㄜㄧ)', type: '複合元音' }
];

const KOREAN_CONSONANTS: HangulItem[] = [
  { char: 'ㄱ', name: 'giyeok', romaji: 'g/k', type: '單子音' },
  { char: 'ㄴ', name: 'nieun', romaji: 'n', type: '單子音' },
  { char: 'ㄷ', name: 'digeut', romaji: 'd/t', type: '單子音' },
  { char: 'ㄹ', name: 'rieul', romaji: 'r/l', type: '單子音' },
  { char: 'ㅁ', name: 'mieum', romaji: 'm', type: '單子音' },
  { char: 'ㅂ', name: 'bieup', romaji: 'b/p', type: '單子音' },
  { char: 'ㅅ', name: 'siot', romaji: 's', type: '單子音' },
  { char: 'ㅇ', name: 'ieung', romaji: 'ng/無聲', type: '單子音' },
  { char: 'ㅈ', name: 'jieut', romaji: 'j', type: '單子音' },
  { char: 'ㅊ', name: 'chieut', romaji: 'ch', type: '單子音' },
  { char: 'ㅋ', name: 'kieuk', romaji: 'k', type: '單子音' },
  { char: 'ㅌ', name: 'tieut', romaji: 't', type: '單子音' },
  { char: 'ㅍ', name: 'pieup', romaji: 'p', type: '單子音' },
  { char: 'ㅎ', name: 'hieut', romaji: 'h', type: '單子音' },
  { char: 'ㄲ', name: 'ssang-giyeok', romaji: 'kk', type: '雙子音' },
  { char: 'ㄸ', name: 'ssang-digeut', romaji: 'tt', type: '雙子音' },
  { char: 'ㅃ', name: 'ssang-bieup', romaji: 'pp', type: '雙子音' },
  { char: 'ㅆ', name: 'ssang-siot', romaji: 'ss', type: '雙子音' },
  { char: 'ㅉ', name: 'ssang-jieut', romaji: 'jj', type: '雙子音' }
];

const LanguageHub: React.FC<Props> = ({ lang }) => {
  const [targetLanguage, setTargetLanguage] = useState<'ja' | 'ko'>('ja');
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  // Japanese Sub-tab: kana representation toggle
  const [kanaType, setKanaType] = useState<'both' | 'hiragana' | 'katakana'>('both');

  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/\([\s\S]*?\)/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = targetLanguage === 'ja' ? 'ja-JP' : 'ko-KR';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis errored', e);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto px-1 sm:px-4 text-slate-800 dark:text-slate-100">
      {/* Dynamic Header Panel */}
      <div className="bg-gradient-to-br from-indigo-50/50 via-white to-emerald-50/20 dark:from-slate-900 dark:to-slate-950 p-6 sm:p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-emerald-600 to-indigo-600 text-white p-2 rounded-xl shadow-md">
              <Globe size={20} />
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Languages Course Suite
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-800 dark:text-white font-sans">
            日韓拼音學習
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            二外發音啟蒙練習利器：互動點讀日語五十音與韓語四十音發音系統。
          </p>
        </div>

        {/* Dual Language Switcher Option */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-gray-100 dark:border-slate-700/50 self-start md:self-auto shrink-0 shadow-inner">
          <button
            onClick={() => { setTargetLanguage('ja'); }}
            id="lang-selector-button-ja"
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              targetLanguage === 'ja'
                ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-md scale-102 border border-slate-200/50 dark:border-slate-800'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
            }`}
          >
            🇯🇵 日本語 (日文)
          </button>
          <button
            onClick={() => { setTargetLanguage('ko'); }}
            id="lang-selector-button-ko"
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 ${
              targetLanguage === 'ko'
                ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 shadow-md scale-102 border border-slate-200/50 dark:border-slate-800'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100'
            }`}
          >
            🇰🇷 한국어 (韓文)
          </button>
        </div>
      </div>

      {/* Voice Toggle Option Panel */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 py-3 rounded-2xl flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Volume2 size={14} className="animate-pulse" />
          </span>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-extrabold tracking-widest uppercase mb-0">
            語音朗讀輔助系統 (TTS Guide)
          </p>
        </div>
        <button
          onClick={() => setVoiceEnabled(!voiceEnabled)}
          className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${
            voiceEnabled 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/30' 
              : 'bg-slate-100 text-slate-400 border-slate-200 dark:bg-slate-800'
          }`}
        >
          語音：{voiceEnabled ? '開啟 (點按字母發音)' : '關閉'}
        </button>
      </div>

      {/* RENDER TARGET: Japanese 50音 System (五十音) */}
      {targetLanguage === 'ja' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
              💡 提示：點選任何假名卡片可即時播放日語母語朗讀。
            </p>
            <div className="flex gap-1.5 bg-slate-50 dark:bg-slate-800/80 p-1 rounded-xl">
              <button
                onClick={() => setKanaType('both')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                  kanaType === 'both' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                同時顯示
              </button>
              <button
                onClick={() => setKanaType('hiragana')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                  kanaType === 'hiragana' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                平假名 (Hiragana)
              </button>
              <button
                onClick={() => setKanaType('katakana')}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                  kanaType === 'katakana' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                片假名 (Katakana)
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm overflow-x-auto no-scrollbar">
            <div className="min-w-[640px] space-y-3">
              {/* Header Columns */}
              <div className="grid grid-cols-[100px,repeat(5,1fr)] items-center border-b border-gray-50 dark:border-slate-800 pb-3 font-semibold text-center text-[10px] uppercase text-slate-400 tracking-widest">
                <div className="text-left pl-3 text-slate-500 dark:text-slate-300">行別 Column</div>
                <div>あ (a)</div>
                <div>い (i)</div>
                <div>う (u)</div>
                <div>え (e)</div>
                <div>お (o)</div>
              </div>

              {/* Rows */}
              {JAPANESE_KANA.map((rowObj, index) => (
                <div key={index} className="grid grid-cols-[100px,repeat(5,1fr)] items-center gap-2 group/row hover:bg-slate-50/50 dark:hover:bg-slate-800/30 p-1.5 rounded-2xl transition-colors">
                  <div className="text-[11px] font-black text-slate-400 dark:text-slate-500 pl-3">
                    {rowObj.row}
                  </div>
                  {rowObj.items.map((item, iIndex) => {
                    if (item === null) {
                      return <div key={iIndex} className="bg-slate-50/20 dark:bg-slate-800/5 h-[80px] rounded-2xl border border-dashed border-slate-100/30" />;
                    }
                    const textToRead = item.hiragana;
                    return (
                      <button
                        key={iIndex}
                        onClick={() => speakText(textToRead)}
                        className="bg-white dark:bg-slate-950 p-2 h-[85px] hover:h-[87px] border border-slate-100 dark:border-slate-800/80 rounded-2xl flex flex-col items-center justify-between text-center shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 group hover:-translate-y-0.5 transition-all outline-none"
                      >
                        {/* Upper: Kana selection */}
                        <div className="flex flex-col items-center justify-center flex-1 py-1">
                          {kanaType === 'both' && (
                            <div className="flex items-baseline gap-1">
                              <span className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100">
                                {item.hiragana}
                              </span>
                              <span className="text-xs text-slate-400 font-bold">
                                {item.katakana}
                              </span>
                            </div>
                          )}
                          {kanaType === 'hiragana' && (
                            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                              {item.hiragana}
                            </span>
                          )}
                          {kanaType === 'katakana' && (
                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
                              {item.katakana}
                            </span>
                          )}
                        </div>

                        {/* Lower: Romaji indicator */}
                        <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg py-0.5 mt-1">
                          <span className="text-[10px] font-mono font-extrabold tracking-tight text-slate-500 dark:text-slate-400 uppercase">
                            {item.romaji}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* RENDER TARGET: Korean 40音 Alphabet (한국어 한글) */}
      {targetLanguage === 'ko' && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-gray-100 dark:border-slate-800 text-xs font-bold text-slate-500 dark:text-slate-400 text-center sm:text-left shadow-sm">
            💡 提示：韓語由子音與母音共同拼寫成字，點擊任何基礎字母可立即學習發音與聲標。
          </div>

          {/* Vowels Grid (母音 21) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                母音 Vowels (21個)
              </h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
              {KOREAN_VOWELS.map((item) => (
                <button
                  key={item.char}
                  onClick={() => speakText(item.char)}
                  className="bg-white dark:bg-slate-900 hover:bg-indigo-50/10 p-4 border border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-indigo-300 dark:hover:border-indigo-800 transition-all gap-1.5 group outline-none"
                >
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                    {item.char}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black tracking-tight text-slate-800 dark:text-slate-200">
                      /{item.name}/
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">
                      {item.type}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Consonants Grid (子音 19) */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                子音 Consonants (19個)
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3">
              {KOREAN_CONSONANTS.map((item) => (
                <button
                  key={item.char}
                  onClick={() => speakText(item.char)}
                  className="bg-white dark:bg-slate-900 hover:bg-emerald-50/10 p-4 border border-slate-100 dark:border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all gap-1.5 group outline-none"
                >
                  <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                    {item.char}
                  </span>
                  <div className="space-y-0.5">
                    <p className="text-[10px] font-black tracking-tight text-slate-800 dark:text-slate-200">
                      {item.romaji}
                    </p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase">
                      {item.type}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageHub;
