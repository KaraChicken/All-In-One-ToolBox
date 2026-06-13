
import React, { useState } from 'react';
import { Image as ImageIcon, Loader2, Download, RefreshCw, Send } from 'lucide-react';
import { generateImage } from '../services/geminiService';

const AIImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    const url = await generateImage(prompt);
    setImageUrl(url);
    setLoading(false);
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `smarttool-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
          AI Image Lab
        </h2>
        <p className="text-gray-500 mt-2">Turn your imagination into visuals with Gemini AI.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-700">Enter Prompt</h3>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A futuristic city with flying cars at sunset, 8k, digital art..."
              className="w-full h-32 p-4 bg-gray-50 border-2 border-gray-100 focus:border-pink-400 rounded-2xl outline-none transition-all resize-none"
            />
            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-bold hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-200"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              {loading ? 'Creating...' : 'Generate Image'}
            </button>
          </div>

          <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
            <h4 className="text-sm font-bold text-indigo-900 mb-2">Tips for better images:</h4>
            <ul className="text-xs text-indigo-700 space-y-1 list-disc pl-4">
              <li>Be specific about colors and lighting</li>
              <li>Mention a style like "oil painting" or "3D render"</li>
              <li>Use descriptive adjectives (e.g., "ethereal", "hyper-detailed")</li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-100 rounded-3xl overflow-hidden relative group aspect-square flex items-center justify-center border-4 border-white shadow-xl">
          {imageUrl ? (
            <>
              <img src={imageUrl} alt="AI Generated" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                <button onClick={downloadImage} className="p-3 bg-white rounded-full hover:scale-110 transition-transform">
                  <Download size={24} className="text-gray-900" />
                </button>
                <button onClick={handleGenerate} className="p-3 bg-white rounded-full hover:scale-110 transition-transform">
                  <RefreshCw size={24} className="text-gray-900" />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center px-6">
              <div className="bg-white/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <ImageIcon size={40} className="text-gray-400" />
              </div>
              <p className="text-gray-500 font-medium">Your generated masterpiece will appear here</p>
            </div>
          )}
          
          {loading && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center animate-pulse">
              <Loader2 className="animate-spin text-purple-600 mb-2" size={48} />
              <span className="text-purple-700 font-bold">Dreaming up your image...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIImageGenerator;
