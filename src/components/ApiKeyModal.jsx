import React, { useState, useEffect } from 'react';
import { Key, X, Check, ExternalLink, ShieldCheck } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose, onKeySaved }) {
  const [apiKey, setApiKey] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const existing = localStorage.getItem('agrivision_openai_key') || '';
      setApiKey(existing);
      setSavedSuccess(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (apiKey.trim()) {
      localStorage.setItem('agrivision_openai_key', apiKey.trim());
    } else {
      localStorage.removeItem('agrivision_openai_key');
    }
    setSavedSuccess(true);
    onKeySaved();
    setTimeout(() => onClose(), 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-dark-900 rounded-2xl max-w-md w-full p-6 border border-white/[0.1] shadow-2xl relative text-zinc-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-100">
              API Key Configuration
            </h3>
            <p className="text-xs text-zinc-400">
              Botanical Vision Diagnostics
            </p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-dark-950 border border-white/[0.06] text-xs text-zinc-300 mb-4 flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Your custom OpenAI API key is loaded and used directly for multimodal botanical pathology analysis.
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-xs font-mono text-zinc-400 mb-1.5">
            OpenAI API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-proj-..."
            className="w-full px-3.5 py-2.5 rounded-lg bg-dark-950 border border-white/[0.1] focus:border-emerald-500 focus:outline-none text-xs text-zinc-200 font-mono transition-all"
          />
        </div>

        <div className="flex items-center justify-between gap-3 pt-2">
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] text-zinc-400 hover:text-emerald-400 inline-flex items-center gap-1 transition-colors"
          >
            <span>OpenAI Platform</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-semibold text-xs transition-all inline-flex items-center gap-1.5"
            >
              {savedSuccess ? <Check className="w-3.5 h-3.5" /> : null}
              <span>{savedSuccess ? 'Saved' : 'Save Key'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
