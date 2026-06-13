
import React, { useState, useCallback, useEffect } from 'react';
import { Key, Copy, Check, RefreshCw } from 'lucide-react';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  /**
   * 核心密碼產生邏輯 - 完全原生實作
   * 使用瀏覽器內建的 window.crypto.getRandomValues 提供真正的安全隨機數
   */
  const generate = useCallback(() => {
    const charSets = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let charset = '';
    if (includeUpper) charset += charSets.upper;
    if (includeLower) charset += charSets.lower;
    if (includeNumbers) charset += charSets.numbers;
    if (includeSymbols) charset += charSets.symbols;

    if (!charset) {
      setPassword('請選擇至少一個字元類型');
      return;
    }

    // 使用 Uint32Array 儲存隨機數值，確保比 Math.random() 更強的安全性
    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      // 透過對字元集長度取模，從隨機數中挑選字元
      result += charset.charAt(randomValues[i] % charset.length);
    }
    
    setPassword(result);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  // 監聽狀態變更，即時更新密碼
  useEffect(() => {
    generate();
  }, [generate]);

  const copy = () => {
    if (!password || password.startsWith('請選擇')) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 密碼顯示區域 */}
      <div className="bg-indigo-600 p-6 rounded-2xl text-white relative overflow-hidden shadow-lg shadow-indigo-100">
        <div className="relative z-10">
          <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest mb-2">
            安全產出的隨機密碼 (Crypto API)
          </p>
          <div className="flex items-center justify-between gap-4">
            <p className="text-2xl font-mono font-bold break-all tracking-tight leading-none">
              {password}
            </p>
            <div className="flex gap-2 shrink-0">
              <button 
                onClick={generate} 
                className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-95"
                title="重新產生"
              >
                <RefreshCw size={20} />
              </button>
              <button 
                onClick={copy} 
                className="p-2.5 bg-white text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all shadow-sm active:scale-95"
                title="複製密碼"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
      </div>

      {/* 控制選項區域 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-2 py-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-black text-gray-700 uppercase tracking-tighter">長度設定</span>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-0.5 rounded-full text-sm font-black font-mono">{length}</span>
          </div>
          <input 
            type="range" 
            min="4" 
            max="64" 
            value={length} 
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-all hover:bg-gray-200" 
          />
          <div className="flex justify-between text-[10px] text-gray-400 font-bold px-1">
            <span>4</span>
            <span>32</span>
            <span>64</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: '大寫字母', state: includeUpper, set: setIncludeUpper },
            { label: '小寫字母', state: includeLower, set: setIncludeLower },
            { label: '數字字元', state: includeNumbers, set: setIncludeNumbers },
            { label: '符號字元', state: includeSymbols, set: setIncludeSymbols },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => item.set(!item.state)}
              className={`flex items-center gap-3 p-3 rounded-2xl border-2 text-left transition-all duration-200 ${
                item.state 
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                  : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50'
              }`}
            >
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                item.state ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-200'
              }`}>
                {item.state && <Check size={12} strokeWidth={4} />}
              </div>
              <span className="text-xs font-bold leading-none">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* 安全說明 */}
      <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center gap-3">
        <div className="p-2 bg-white rounded-xl text-indigo-500 shadow-sm">
          <Key size={16} />
        </div>
        <p className="text-[10px] text-gray-500 leading-relaxed font-medium">
          密碼產生邏輯為「純自主實作」，直接調用瀏覽器最底層的 <span className="text-indigo-600 font-bold">Web Crypto API</span> 獲取熵值。這意味著您的密碼擁有極高的隨機強度，且完全不依賴任何外部套件或網路請求。
        </p>
      </div>
    </div>
  );
};

export default PasswordGenerator;
