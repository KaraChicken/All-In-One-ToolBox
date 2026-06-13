
import React, { useState } from 'react';
import { Sparkles, Loader2, Copy, Trash2, Check } from 'lucide-react';
import { summarizeText } from '../services/geminiService';

const AISummarizer: React.FC = () => {
  const [input, setInput] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const result = await summarizeText(input);
    setSummary(result);
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-4">
          <Sparkles size={14} /> Powered by Gemini AI
        </div>
        <h2 className="text-3xl font-bold">Smart AI Summarizer</h2>
        <p className="text-gray-500 mt-2">Paste long articles or reports to get a concise summary in seconds.</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-700">Source Text</h3>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your long text here..."
            className="w-full h-48 p-4 bg-gray-50 border-2 border-gray-100 focus:border-purple-400 rounded-2xl outline-none transition-all resize-none"
          />
          <button
            onClick={handleSummarize}
            disabled={loading || !input.trim()}
            className="w-full py-3 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {loading ? 'Analyzing Content...' : 'Generate AI Summary'}
          </button>
        </div>

        {summary && (
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-3xl border border-purple-100 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-purple-900 flex items-center gap-2">
                <Sparkles size={18} /> AI Summary
              </h3>
              <div className="flex gap-2">
                <button onClick={copyToClipboard} className="p-2 hover:bg-white/50 rounded-lg transition-colors text-purple-600">
                  {copied ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <button onClick={() => setSummary('')} className="p-2 hover:bg-white/50 rounded-lg transition-colors text-purple-600">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="prose prose-purple max-w-none text-purple-900/80 leading-relaxed">
              {summary}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AISummarizer;
