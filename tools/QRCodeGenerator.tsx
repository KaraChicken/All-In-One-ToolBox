
import React, { useState } from 'react';
import { Download, QrCode as QrIcon } from 'lucide-react';

const QRCodeGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  
  const qrUrl = input 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(input)}`
    : '';

  const downloadQR = async () => {
    if (!qrUrl) return;
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold">QR Code 產生器</h2>
        <p className="text-gray-500">輸入網址或文字，即時產出 QR Code</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">內容 (網址或文字)</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="請輸入內容..."
              className="w-full h-32 p-4 bg-gray-50 border-2 border-gray-100 focus:border-indigo-400 rounded-2xl outline-none transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-8 bg-white rounded-3xl border-2 border-dashed border-gray-200">
          {input ? (
            <div className="space-y-6 text-center">
              <div className="p-4 bg-white shadow-lg rounded-2xl border border-gray-100">
                <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
              </div>
              <button
                onClick={downloadQR}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
              >
                <Download size={18} /> 下載圖片
              </button>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <QrIcon size={64} className="mx-auto mb-4 opacity-20" />
              <p>在左側輸入內容來產生 QR Code</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
