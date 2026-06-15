
import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, 
  QrCode as QrIcon, 
  Link as LinkIcon, 
  Wifi, 
  Mail, 
  Phone, 
  MessageSquare, 
  User, 
  Palette, 
  Sliders, 
  History, 
  Check, 
  Copy, 
  Info,
  Trash2,
  Sparkles,
  RefreshCw,
  MoreHorizontal
} from 'lucide-react';

interface HistoryItem {
  id: string;
  type: string;
  label: string;
  content: string;
  timestamp: string;
  url: string;
}

const COLOR_PRESETS = [
  { name: '曜石黑', hex: '#000000', darkHex: '#f8fafc' },
  { name: '極致白', hex: '#ffffff', darkHex: '#0f172a' },
  { name: '經典藍', hex: '#1d4ed8', darkHex: '#60a5fa' },
  { name: '翡翠綠', hex: '#10b981', darkHex: '#34d399' },
  { name: '胭脂紅', hex: '#e11d48', darkHex: '#fb7185' },
  { name: '琥珀橙', hex: '#f59e0b', darkHex: '#fbbf24' },
  { name: '皇家紫', hex: '#7c3aed', darkHex: '#a78bfa' },
  { name: '青石灰', hex: '#475569', darkHex: '#94a3b8' },
];

const BG_PRESETS = [
  { name: '純白背景', hex: '#ffffff' },
  { name: '極簡深邃', hex: '#000000' },
  { name: '輕盈柔灰', hex: '#f8fafc' },
  { name: '暖心麥黃', hex: '#fffbeb' },
  { name: '芬多精綠', hex: '#f0fdf4' },
  { name: '透明背景', hex: 'transparent' },
];

const LOGO_PRESETS = [
  { id: 'none', label: '無圖標', emoji: null },
  { id: 'web', label: '網站', emoji: '🌐' },
  { id: 'wifi', label: 'Wi-Fi', emoji: '📶' },
  { id: 'mail', label: '郵件', emoji: '📧' },
  { id: 'phone', label: '電話', emoji: '📞' },
  { id: 'sms', label: '簡訊', emoji: '💬' },
  { id: 'heart', label: '愛心', emoji: '❤️' },
  { id: 'star', label: '星星', emoji: '⭐' },
  { id: 'smile', label: '微笑', emoji: '😊' },
  { id: 'check', label: '打勾', emoji: '✔️' },
  { id: 'fire', label: '火焰', emoji: '🔥' },
  { id: 'gift', label: '禮物', emoji: '🎁' },
];

const QRCodeGenerator: React.FC = () => {
  // Tabs: text, wifi, email, phone, sms, card
  const [activeTab, setActiveTab] = useState<'text' | 'wifi' | 'email' | 'phone' | 'sms' | 'card'>('text');
  
  // Input fields state
  const [textInput, setTextInput] = useState('https://google.com');
  
  // Wi-Fi Form
  const [wifiSsid, setWifiSsid] = useState('MyHomeWiFi');
  const [wifiPassword, setWifiPassword] = useState('12345678');
  const [wifiEncryption, setWifiEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');
  const [wifiHidden, setWifiHidden] = useState(false);

  // Email Form
  const [emailTo, setEmailTo] = useState('hello@example.com');
  const [emailSubject, setEmailSubject] = useState('聯絡需求');
  const [emailBody, setEmailBody] = useState('您好，我想向您諮詢一些合作細節...');

  // Phone Form
  const [phoneNum, setPhoneNum] = useState('+886912345678');

  // SMS Form
  const [smsNum, setSmsNum] = useState('+886912345678');
  const [smsMessage, setSmsMessage] = useState('您好！這是一則透過 QR Code 產生的自動簡訊。');

  // Business Card Form (vCard)
  const [cardName, setCardName] = useState('王小明');
  const [cardOrg, setCardOrg] = useState('智動科技有限公司');
  const [cardTitle, setCardTitle] = useState('產品經理');
  const [cardPhone, setCardPhone] = useState('+886-912-345-678');
  const [cardEmail, setCardEmail] = useState('xiaoming@example.com');
  const [cardUrl, setCardUrl] = useState('https://example.com');
  const [cardAdr, setCardAdr] = useState('台北市信義區信義路五段7號');

  // Design/Styling options
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [isTransparent, setIsTransparent] = useState(false);
  const [qrSize, setQrSize] = useState<number>(300);
  const [margin, setMargin] = useState<number>(2);
  const [ecc, setEcc] = useState<'L' | 'M' | 'Q' | 'H'>('H'); // Keep High by default to secure space for overlays
  const [selectedEmblem, setSelectedEmblem] = useState<string>('none');
  const [customEmblemText, setCustomEmblemText] = useState('');

  // Status-related states
  const [isCanvasLoading, setIsCanvasLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('smarttool_qr_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [renderedDataUrl, setRenderedDataUrl] = useState<string>('');

  // Compute final format string to encode into the QR code
  const getEncodedPayload = (): string => {
    switch (activeTab) {
      case 'text':
        return textInput || 'https://google.com';
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiEncryption};P:${wifiPassword};H:${wifiHidden ? 'true' : 'false'};;`;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'phone':
        return `tel:${phoneNum}`;
      case 'sms':
        return `SMSTO:${smsNum}:${smsMessage}`;
      case 'card':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${cardName};;;\nFN:${cardName}\nORG:${cardOrg}\nTITLE:${cardTitle}\nTEL;TYPE=CELL:${cardPhone}\nEMAIL;TYPE=INTERNET:${cardEmail}\nURL:${cardUrl}\nADR;TYPE=WORK:;;${cardAdr};;;\nEND:VCARD`;
      default:
        return '';
    }
  };

  const currentPayload = getEncodedPayload();

  // Helper utility to safely convert HEX to RGB format accepted by QR server api or canvas
  const hexToRgbString = (hex: string): string => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex[0] + cleanHex[0] + cleanHex[1] + cleanHex[1] + cleanHex[2] + cleanHex[2];
    }
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `${r}-${g}-${b}`;
  };

  // Convert transparent background to white for the core fetch input
  const effectiveBgColor = isTransparent ? '#ffffff' : bgColor;
  const fgRgb = hexToRgbString(fgColor);
  const bgRgb = hexToRgbString(effectiveBgColor);

  // Raw source URL from QRServer
  const rawQrUrl = currentPayload
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(currentPayload)}&color=${fgRgb}&bgcolor=${bgRgb}&margin=${margin}&ecc=${ecc}`
    : '';

  // Trigger reactive compiling of custom image overlay to canvas in real time
  useEffect(() => {
    if (!rawQrUrl) {
      setRenderedDataUrl('');
      return;
    }

    let isSubscribed = true;
    setIsCanvasLoading(true);

    const compileQRCode = async () => {
      try {
        const response = await fetch(rawQrUrl);
        const blob = await response.blob();
        
        // Convert to intermediate safe object url
        const objectUrl = URL.createObjectURL(blob);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.src = objectUrl;

        img.onload = () => {
          if (!isSubscribed) return;

          const canvas = canvasRef.current || document.createElement('canvas');
          canvas.width = qrSize;
          canvas.height = qrSize;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // 1. Fill background (or handle transparency)
          ctx.clearRect(0, 0, qrSize, qrSize);
          if (isTransparent) {
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.fillRect(0, 0, qrSize, qrSize);
          } else {
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, qrSize, qrSize);
          }

          // 2. Draw base QR code
          ctx.drawImage(img, 0, 0, qrSize, qrSize);

          // 3. Draw middle Overlay Logo if selected
          const emblem = LOGO_PRESETS.find(p => p.id === selectedEmblem);
          const hasCustomText = selectedEmblem === 'custom' && customEmblemText.trim() !== '';

          if ((emblem && emblem.emoji) || hasCustomText) {
            const logoText = hasCustomText ? customEmblemText : emblem?.emoji || '';
            
            // Scale emblem dynamically depending on the selected size (usually ~18% - 22% is safe maximum)
            const paddingRatio = 0.22;
            const logoBoxSize = qrSize * paddingRatio;
            const logoX = (qrSize - logoBoxSize) / 2;
            const logoY = (qrSize - logoBoxSize) / 2;
            const centerRadius = logoBoxSize * 0.25;

            // Render highly-polished circular protective shield under logo
            ctx.save();
            ctx.beginPath();
            ctx.arc(qrSize / 2, qrSize / 2, logoBoxSize / 2, 0, Math.PI * 2);
            ctx.fillStyle = isTransparent ? '#ffffff' : bgColor; // Protect logo against dark/light noise patterns
            ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 3;
            ctx.fill();
            
            // Draw neat border circle
            ctx.lineWidth = 2;
            ctx.strokeStyle = fgColor; 
            ctx.stroke();
            ctx.restore();

            // Render emblem glyph inside
            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // If text is short or is an emoji, scale font-size accordingly
            const textLen = logoText.length;
            let fontSize = logoBoxSize * 0.45;
            if (textLen > 3) {
              fontSize = logoBoxSize * 0.28;
            } else if (textLen > 2) {
              fontSize = logoBoxSize * 0.35;
            }

            ctx.font = `bold ${fontSize}px sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`;
            ctx.fillStyle = fgColor;
            ctx.fillText(logoText, qrSize / 2, qrSize / 2 + (hasCustomText ? 0 : 1)); // Adjust slight offset
            ctx.restore();
          }

          const compiledUrl = canvas.toDataURL('image/png');
          setRenderedDataUrl(compiledUrl);
          setIsCanvasLoading(false);
          URL.revokeObjectURL(objectUrl);
        };

        img.onerror = () => {
          setIsCanvasLoading(false);
        };

      } catch (err) {
        console.error('Failed to pre-compile canvas QR code:', err);
        setIsCanvasLoading(false);
      }
    };

    compileQRCode();

    return () => {
      isSubscribed = false;
    };
  }, [rawQrUrl, fgColor, bgColor, isTransparent, qrSize, margin, ecc, selectedEmblem, customEmblemText]);

  // Handle immediate adding of item to generation tracker log
  const saveToHistory = () => {
    if (!currentPayload) return;

    let displayLabel = currentPayload;
    if (activeTab === 'wifi') {
      displayLabel = `Wi-Fi (SSID: ${wifiSsid})`;
    } else if (activeTab === 'email') {
      displayLabel = `郵件寄送 (${emailTo})`;
    } else if (activeTab === 'phone') {
      displayLabel = `電話撥打 (${phoneNum})`;
    } else if (activeTab === 'sms') {
      displayLabel = `發送簡訊 (${smsNum})`;
    } else if (activeTab === 'card') {
      displayLabel = `電子名片 - ${cardName} (${cardOrg})`;
    } else {
      // clip string for url text
      displayLabel = textInput.length > 32 ? textInput.substring(0, 32) + '...' : textInput;
    }

    const newItem: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      type: activeTab,
      label: displayLabel,
      content: currentPayload,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      url: renderedDataUrl || rawQrUrl
    };

    const updated = [newItem, ...history.filter(item => item.content !== currentPayload).slice(0, 19)];
    setHistory(updated);
    localStorage.setItem('smarttool_qr_history', JSON.stringify(updated));
  };

  const copyUrl = () => {
    try {
      navigator.clipboard.writeText(currentPayload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('smarttool_qr_history');
  };

  const downloadCompiledImage = () => {
    if (!renderedDataUrl) return;
    const link = document.createElement('a');
    link.href = renderedDataUrl;
    link.download = `qrcode_${activeTab}_${Date.now()}.png`;
    link.click();
    saveToHistory();
  };

  const loadFromHistory = (item: HistoryItem) => {
    // Restore exact parameters based on tab
    setActiveTab(item.type as any);
    if (item.type === 'text') {
      setTextInput(item.content);
    } else if (item.type === 'wifi') {
      // Simple parse string WIFI:S:foo;T:bar;P:pwd;H:true;;
      const matchSsid = item.content.match(/S:([^;]+)/);
      const matchPwd = item.content.match(/P:([^;]+)/);
      const matchType = item.content.match(/T:([^;]+)/);
      const matchHidden = item.content.match(/H:([^;]+)/);
      if (matchSsid) setWifiSsid(matchSsid[1]);
      if (matchPwd) setWifiPassword(matchPwd[1]);
      if (matchType) setWifiEncryption(matchType[1] as any);
      if (matchHidden) setWifiHidden(matchHidden[1] === 'true');
    } else if (item.type === 'email') {
      // Decode mailto protocol
      try {
        const decoded = decodeURIComponent(item.content);
        const matchTo = decoded.match(/mailto:([^?]+)/);
        const matchSubj = decoded.match(/[?&]subject=([^&]+)/);
        const matchBody = decoded.match(/[?&]body=([^&]+)/);
        if (matchTo) setEmailTo(matchTo[1]);
        if (matchSubj) setEmailSubject(matchSubj[1]);
        if (matchBody) setEmailBody(matchBody[1]);
      } catch {}
    } else if (item.type === 'phone') {
      const p = item.content.replace('tel:', '');
      setPhoneNum(p);
    } else if (item.type === 'sms') {
      const match = item.content.match(/SMSTO:([^:]+):(.*)/);
      if (match) {
        setSmsNum(match[1]);
        setSmsMessage(match[2]);
      }
    } else if (item.type === 'card') {
      // Parse multi-row vcard elements
      const lines = item.content.split('\n');
      lines.forEach(line => {
        if (line.startsWith('FN:')) setCardName(line.substring(3).trim());
        if (line.startsWith('ORG:')) setCardOrg(line.substring(4).trim());
        if (line.startsWith('TITLE:')) setCardTitle(line.substring(6).trim());
        if (line.startsWith('TEL;TYPE=CELL:')) setCardPhone(line.substring(14).trim());
        if (line.startsWith('EMAIL;TYPE=INTERNET:')) setCardEmail(line.substring(20).trim());
        if (line.startsWith('URL:')) setCardUrl(line.substring(4).trim());
        if (line.startsWith('ADR;TYPE=WORK:;;')) {
          const rawAdr = line.substring(16).split(';')[0];
          setCardAdr(rawAdr?.trim() || '');
        }
      });
    }
  };

  // Pre-define tabs metadata with local labels and Lucide icons
  const tabs = [
    { id: 'text', icon: <LinkIcon size={16} />, label: '網址與文字' },
    { id: 'wifi', icon: <Wifi size={16} />, label: 'Wi-Fi 網路' },
    { id: 'email', icon: <Mail size={16} />, label: '電子郵件' },
    { id: 'phone', icon: <Phone size={16} />, label: '撥打電話' },
    { id: 'sms', icon: <MessageSquare size={16} />, label: '發送簡訊' },
    { id: 'card', icon: <User size={16} />, label: '電子名片' },
  ] as const;

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header section with theme alignment */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-2">
            <QrIcon className="text-indigo-600 dark:text-indigo-400" />
            QR Code 產生器 <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded-full select-none">PRO Edition</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 text-xs mt-0.5">
            提供多種快速輸入範本與豐富造型客製化、Canvas 即時合成技術
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Section: Inputs & Custom Settings (8/12 blocks) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick template selector pills */}
          <div className="overflow-x-auto no-scrollbar py-0.5">
            <div className="flex gap-2 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-black tracking-wide border transition-all ${
                    activeTab === tab.id
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-100 dark:shadow-none'
                      : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Contextual Input Fields card */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1">
                <Sparkles size={12} className="text-indigo-500" />
                填寫內容欄位 / Fields Area
              </span>
            </div>

            {/* TAB CONTENT: Plain Text or Link */}
            {activeTab === 'text' && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">文字或網頁鏈結 (URL)</label>
                <textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="請輸入網址或要轉換為 QR Code 的文字內容..."
                  className="w-full h-32 p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-2xl outline-none font-mono text-xs text-slate-800 dark:text-slate-300 transition-all resize-none leading-relaxed"
                />
              </div>
            )}

            {/* TAB CONTENT: WiFi */}
            {activeTab === 'wifi' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">Wi-Fi 熱點名稱 (SSID)</label>
                    <input
                      type="text"
                      value={wifiSsid}
                      onChange={(e) => setWifiSsid(e.target.value)}
                      placeholder="例如：MyHome_5G"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl outline-none text-xs font-mono text-slate-800 dark:text-slate-300"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">連線保護密碼 (Password)</label>
                    <input
                      type="text"
                      value={wifiPassword}
                      onChange={(e) => setWifiPassword(e.target.value)}
                      placeholder="若為免密碼請留空"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl outline-none text-xs font-mono text-slate-800 dark:text-slate-300"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">安全加密通訊協定</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['WPA', 'WEP', 'nopass'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setWifiEncryption(mode)}
                          className={`py-2 px-1 text-[10px] sm:text-xs font-bold rounded-lg border transition-all ${
                            wifiEncryption === mode
                              ? 'bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-indigo-700 dark:text-indigo-300'
                              : 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-850 text-slate-500 dark:text-slate-400 hover:bg-slate-50'
                          }`}
                        >
                          {mode === 'WPA' ? 'WPA/WPA2' : mode === 'WEP' ? 'WEP' : '無密碼'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 rounded-xl">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold block text-slate-700 dark:text-slate-300">隱藏 SSID</span>
                      <span className="text-[10px] text-slate-450 dark:text-slate-500 block">該無線基地台拒絕廣播廣宣名</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setWifiHidden(!wifiHidden)}
                      className={`w-10 h-5 rounded-full relative transition-colors ${
                        wifiHidden ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                          wifiHidden ? 'left-5.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT: Email */}
            {activeTab === 'email' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">收件人信箱 (Recipient Address)</label>
                    <input
                      type="email"
                      value={emailTo}
                      onChange={(e) => setEmailTo(e.target.value)}
                      placeholder="example@domain.com"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500  rounded-xl outline-none text-xs font-mono text-slate-800 dark:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">信件預設主旨 (Subject)</label>
                    <input
                      type="text"
                      value={emailSubject}
                      onChange={(e) => setEmailSubject(e.target.value)}
                      placeholder="請輸入主旨"
                      className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-300"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">內文主體 (Email Content Body)</label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="可在此預先寫入信件內文，掃描後將直接填入郵件 App"
                    className="w-full h-24 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-300 resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* TAB CONTENT: Phone Call */}
            {activeTab === 'phone' && (
              <div className="space-y-2 animate-in fade-in duration-200">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">受話人電話號碼 (Phone Number)</label>
                <input
                  type="tel"
                  value={phoneNum}
                  onChange={(e) => setPhoneNum(e.target.value)}
                  placeholder="例如：+886912345678"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl outline-none text-xs font-mono text-slate-800 dark:text-slate-300"
                />
                <p className="text-[10px] text-slate-400">
                  掃描此二維碼的使用者，手機將直接帶入撥號鍵盤模式。
                </p>
              </div>
            )}

            {/* TAB CONTENT: SMS */}
            {activeTab === 'sms' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">收信人行動電話 (Target Number)</label>
                  <input
                    type="tel"
                    value={smsNum}
                    onChange={(e) => setSmsNum(e.target.value)}
                    placeholder="例如：+886912345678"
                    className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl outline-none text-xs font-mono text-slate-800 dark:text-slate-300"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-350">簡訊預設內文 (SMS Payload)</label>
                  <textarea
                    value={smsMessage}
                    onChange={(e) => setSmsMessage(e.target.value)}
                    placeholder="請輸入簡訊內容..."
                    className="w-full h-20 p-3 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl outline-none text-xs text-slate-800 dark:text-slate-300 resize-none leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* TAB CONTENT: vCard Electronic Business Card */}
            {activeTab === 'card' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-350">通訊錄姓名</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="王小明"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl text-xs text-slate-800 dark:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-350">所屬公司 (Organization)</label>
                    <input
                      type="text"
                      value={cardOrg}
                      onChange={(e) => setCardOrg(e.target.value)}
                      placeholder="智動科技"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl text-xs text-slate-800 dark:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-350">專屬職稱 (Title)</label>
                    <input
                      type="text"
                      value={cardTitle}
                      onChange={(e) => setCardTitle(e.target.value)}
                      placeholder="資深工程師 或 經理"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl text-xs text-slate-800 dark:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-350">行動電話</label>
                    <input
                      type="tel"
                      value={cardPhone}
                      onChange={(e) => setCardPhone(e.target.value)}
                      placeholder="+886912345678"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-350">電子信箱</label>
                    <input
                      type="email"
                      value={cardEmail}
                      onChange={(e) => setCardEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-350">商業個人網址</label>
                    <input
                      type="url"
                      value={cardUrl}
                      onChange={(e) => setCardUrl(e.target.value)}
                      placeholder="https://mysite.com"
                      className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-300"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-350">聯絡地址 (Office Location)</label>
                  <input
                    type="text"
                    value={cardAdr}
                    onChange={(e) => setCardAdr(e.target.value)}
                    placeholder="請輸入公司或通訊地址"
                    className="w-full p-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-850 focus:border-indigo-500 rounded-xl text-xs text-slate-800 dark:text-slate-300"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Expanded Design customization card */}
          <div className="bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-5">
            <span className="text-xs font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase flex items-center gap-1">
              <Palette size={12} className="text-pink-500" />
              視覺外觀客製化 / Style Branding
            </span>

            {/* Colors customizing section */}
            <div className="space-y-4">
              {/* Foreground Color */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    前景色 (Foreground Color)
                  </label>
                  <div className="flex items-center gap-1.5">
                    <input 
                      type="color" 
                      value={fgColor} 
                      onChange={(e) => setFgColor(e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border border-slate-200 dark:border-slate-700 bg-transparent"
                    />
                    <span className="font-mono text-[10px] text-slate-400 select-all uppercase">{fgColor}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => setFgColor(p.hex)}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 px-2 border ${
                        fgColor.toLowerCase() === p.hex.toLowerCase()
                          ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/20 text-indigo-700 dark:text-indigo-300'
                          : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: p.hex }} />
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Background Color */}
              <div className="space-y-2.5 pt-2 border-t border-slate-50 dark:border-slate-850">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    背景色與底色 (Background Color)
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsTransparent(!isTransparent)}
                      className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all ${
                        isTransparent
                          ? 'bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-950/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {isTransparent ? '透明中 🔴' : '去背(透明)'}
                    </button>
                    {!isTransparent && (
                      <div className="flex items-center gap-1">
                        <input 
                          type="color" 
                          value={bgColor} 
                          onChange={(e) => { setBgColor(e.target.value); setIsTransparent(false); }}
                          className="w-5 h-5 rounded cursor-pointer border border-slate-200 bg-transparent"
                        />
                        <span className="font-mono text-[10px] text-slate-400 select-all uppercase">{bgColor}</span>
                      </div>
                    )}
                  </div>
                </div>
                {!isTransparent && (
                  <div className="flex flex-wrap gap-1.5">
                    {BG_PRESETS.map((p) => {
                      if (p.hex === 'transparent') return null;
                      return (
                        <button
                          key={p.name}
                          onClick={() => { setBgColor(p.hex); setIsTransparent(false); }}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-lg transition-all flex items-center gap-1 border ${
                            bgColor.toLowerCase() === p.hex.toLowerCase() && !isTransparent
                              ? 'border-indigo-500 bg-indigo-50/50 text-indigo-750'
                              : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <span className="w-2.5 h-2.5 rounded-full border border-black/10" style={{ backgroundColor: p.hex }} />
                          <span>{p.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Slider variables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3.5 border-t border-slate-50 dark:border-slate-850">
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300">邊界寬度 ({margin} 模組)</span>
                    <span className="text-[10px] text-slate-400">適中大小防錯</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="1"
                    value={margin}
                    onChange={(e) => setMargin(parseInt(e.target.value))}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      二維碼容錯率: <span className="font-mono text-indigo-600 font-black">{ecc}</span>
                    </span>
                    <span className="text-[9px] text-slate-400 bg-amber-50 dark:bg-amber-950/20 text-amber-700 px-1.5 rounded-md font-bold">
                      {ecc === 'H' ? '適合貼 Logo (+30%)' : '高效能碼'}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2.5 mt-1">
                    {(['L', 'M', 'Q', 'H'] as const).map((level) => {
                      const labels = { L: 'L (7%)', M: 'M (15%)', Q: 'Q (25%)', H: 'H (30%)' };
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => setEcc(level)}
                          className={`py-1 px-1.5 text-[9px] sm:text-[10px] font-black rounded-lg border transition-all ${
                            ecc === level
                              ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm'
                              : 'bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-850 text-slate-500'
                          }`}
                        >
                          {labels[level]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Logo / Emblem overlay section */}
              <div className="space-y-2.5 pt-3.5 border-t border-slate-50 dark:border-slate-850">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span>中心嵌入圖標或文字 (Center Emblem Cover)</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => { setSelectedEmblem('custom'); if(!customEmblemText) setCustomEmblemText('GO'); }}
                      className={`px-2 py-0.5 text-[10px] font-bold rounded-lg border ${
                        selectedEmblem === 'custom' 
                          ? 'bg-purple-50 dark:bg-purple-950/30 border-purple-300 text-purple-700 dark:text-purple-300' 
                          : 'border-slate-200 dark:border-slate-800 text-slate-400'
                      }`}
                    >
                      自訂文字徽章
                    </button>
                    {selectedEmblem === 'custom' && (
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="例如: GO"
                        value={customEmblemText}
                        onChange={(e) => setCustomEmblemText(e.target.value)}
                        className="p-1 px-1.5 w-16 bg-slate-50 text-[10px] font-bold rounded border uppercase text-center focus:ring-1 focus:ring-indigo-400 outline-none text-slate-800"
                      />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 pt-1">
                  {LOGO_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedEmblem(preset.id)}
                      className={`py-1.5 rounded-xl border text-[11px] font-bold flex flex-col items-center justify-center gap-1 md:gap-1.5 transition-all outline-none ${
                        selectedEmblem === preset.id
                          ? 'border-indigo-500 bg-indigo-50/50 text-indigo-700 dark:bg-indigo-950/30 dark:text-indigo-300'
                          : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 hover:bg-slate-100 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {preset.emoji ? (
                        <span className="text-lg leading-none">{preset.emoji}</span>
                      ) : (
                        <span className="text-xs py-0.5 leading-none text-slate-400">❌</span>
                      )}
                      <span className="text-[9px] block whitespace-nowrap">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Right Section: Realtime Visualizer Canvas & History Tracker (5/12 blocks) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-50 dark:bg-slate-950 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-6 md:p-8 flex flex-col items-center justify-center min-h-[380px] relative overflow-hidden text-center">
            
            {/* Background design accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/20 dark:bg-indigo-920/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200/20 dark:bg-purple-920/10 rounded-full blur-2xl" />

            {isCanvasLoading && (
              <div className="absolute inset-0 bg-slate-50/80 dark:bg-slate-950/90 z-10 flex flex-col items-center justify-center space-y-2 animate-in fade-in duration-250">
                <RefreshCw size={24} className="text-indigo-600 animate-spin" />
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                  Compiling High-res Vector...
                </span>
              </div>
            )}

            {renderedDataUrl ? (
              <div className="w-full space-y-6 z-10 animate-in zoom-in-95 duration-200">
                <div className="relative">
                  {/* Subtle decorative border containing the live QR */}
                  <div className="p-3 bg-white dark:bg-slate-900 shadow-xl rounded-[2rem] border border-slate-150 dark:border-slate-800 inline-block transition-transform duration-300 hover:scale-[1.01]">
                    <img 
                      src={renderedDataUrl} 
                      alt="Compiled QR Code" 
                      className="w-48 h-48 sm:w-56 sm:h-56 mx-auto object-contain rounded-xl select-none" 
                    />
                  </div>
                  
                  {/* Overlay bubble highlighting ECC / Style state */}
                  <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white rounded-full p-1.5 shadow-lg select-none">
                    <Sparkles size={14} className="animate-pulse" />
                  </div>
                </div>

                <div className="space-y-3 max-w-sm mx-auto">
                  <div className="flex gap-2">
                    <button
                      onClick={downloadCompiledImage}
                      className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-100 dark:shadow-none"
                    >
                      <Download size={16} />
                      下載圖片 (PNG)
                    </button>
                    <button
                      onClick={copyUrl}
                      className={`px-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-150 dark:border-slate-800 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all hover:bg-slate-50`}
                    >
                      {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                      {copied ? '已複製' : '複製內容'}
                    </button>
                  </div>

                  <p className="text-[9px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                    檔案規格: {qrSize}x{qrSize}px • {isTransparent ? '無透明去背' : 'RGB護套樣式'}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 space-y-4">
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-2xl flex items-center justify-center mx-auto shadow-inner text-slate-300 dark:text-slate-700">
                  <QrIcon size={32} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-600 dark:text-slate-300">產出預覽與匯出</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto">
                    隨著您在左側填入任何變數，客製化的二維碼將透過 HTML Canvas 即時刷新成型。
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Local storage History log block */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-slate-400 dark:text-slate-400 uppercase flex items-center gap-1.5">
                <History size={13} className="text-slate-400" />
                產生歷史紀錄 / Recent History
              </span>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-[10px] text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 transition-colors"
                >
                  <Trash2 size={11} />
                  清除紀錄
                </button>
              )}
            </div>

            <div className="space-y-2.5 max-h-56 overflow-y-auto no-scrollbar">
              {history.length > 0 ? (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="p-3 bg-slate-50 hover:bg-indigo-50/30 dark:bg-slate-950 dark:hover:bg-slate-850 rounded-2xl border border-slate-100 dark:border-slate-850 flex items-center justify-between gap-3 cursor-pointer group transition-all"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-150 dark:border-slate-800 flex items-center justify-center shrink-0">
                        {item.type === 'wifi' ? (
                          <Wifi size={14} className="text-slate-400" />
                        ) : item.type === 'email' ? (
                          <Mail size={14} className="text-slate-400" />
                        ) : item.type === 'phone' ? (
                          <Phone size={14} className="text-slate-400" />
                        ) : item.type === 'sms' ? (
                          <MessageSquare size={14} className="text-slate-400" />
                        ) : item.type === 'card' ? (
                          <User size={14} className="text-slate-400" />
                        ) : (
                          <LinkIcon size={14} className="text-slate-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black leading-tight text-slate-700 dark:text-slate-300 truncate">
                          {item.label}
                        </p>
                        <p className="text-[9px] text-slate-400 font-mono mt-0.5 uppercase tracking-wide">
                          {item.timestamp} • {item.type} payload
                        </p>
                      </div>
                    </div>

                    <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      填入套戴 ➔
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-[11px] text-slate-400 italic">
                  暫無產生歷史，下載成品後將寫入於此。
                </div>
              )}
            </div>
          </div>

          {/* Security alert / explanation badge */}
          <div className="bg-amber-50/50 dark:bg-amber-950/10 p-4 border border-amber-100/60 dark:border-amber-900/40 rounded-3xl flex items-start gap-3 text-left">
            <Info size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-xs font-black text-amber-805 dark:text-amber-300 block">安全提示與防掃描遮蔽</span>
              <p className="text-[10px] text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                若是您嵌入了中央標籤/圖標，請儘量保持二維碼容錯率為高（H, 30%）。若背景與前景採用自訂色彩，應注意對比度，使背景高亮、前景深邃，避開造成掃描鏡頭無法完美對焦。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;

