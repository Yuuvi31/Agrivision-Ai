import React, { useState, useEffect } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck, Cpu } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/languages';

export default function ApiKeyModal({ isOpen, onClose, currentLang, onKeySaved }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existing = localStorage.getItem('agrivision_gemini_key') || '';
      setApiKey(existing);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('agrivision_gemini_key', apiKey.trim());
    } else {
      localStorage.removeItem('agrivision_gemini_key');
    }
    setSavedSuccess(true);
    onKeySaved();
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleClear = () => {
    localStorage.removeItem('agrivision_gemini_key');
    setApiKey('');
    onKeySaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-agri-100 relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-agri-100 text-agri-700 flex items-center justify-center shrink-0">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {t.apiKeyConfig}
            </h3>
            <p className="text-xs text-slate-500">
              Google Gemini Vision Integration
            </p>
          </div>
        </div>

        {/* Built-in Engine Assurance Note */}
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5 mb-5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>100% Free & Ready:</strong> Agrivision AI works out-of-the-box with its built-in botanical pathology engine even without any API key. An API key is purely optional for live cloud vision model queries.
          </p>
        </div>

        {/* Input Field */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Gemini API Key (Optional)
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-agri-500 focus:ring-2 focus:ring-agri-200 outline-none text-sm transition-all font-mono"
          />
        </div>

        {/* Link to Google AI Studio */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>Need a free Gemini key?</span>
          <a
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-agri-700 hover:text-agri-800 font-semibold"
          >
            <span>Get from Google AI Studio</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
          {apiKey ? (
            <button
              onClick={handleClear}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 px-3 py-2 rounded-xl hover:bg-rose-50 transition-colors"
            >
              Remove Key
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl agri-gradient hover:opacity-95 text-white font-bold text-xs shadow-md shadow-agri-600/30 transition-all"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{t.saved}</span>
                </>
              ) : (
                <span>{t.saveKey}</span>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
