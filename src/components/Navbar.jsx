import React from 'react';
import { Sprout, Key, Github, Globe } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/languages';

export default function Navbar({ currentLang, setLang, onOpenApiKeyModal, apiKeyConfigured }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-agri-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl agri-gradient flex items-center justify-center shadow-md shadow-agri-600/20 text-white transform hover:rotate-6 transition-transform">
            <Sprout className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-agri-950 font-sans">
                Agrivision<span className="text-agri-600"> AI</span>
              </span>
              <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-agri-100 text-agri-800 border border-agri-200">
                v1.0
              </span>
            </div>
            <p className="text-xs font-medium text-sage-600 hidden md:block">
              {t.tagline}
            </p>
          </div>
        </div>

        {/* Actions & Language Selector */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Language Switcher */}
          <div className="flex items-center bg-sage-100 p-1 rounded-xl border border-sage-200">
            <Globe className="w-4 h-4 text-sage-600 ml-1.5 mr-1 hidden sm:block" />
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currentLang === 'en'
                  ? 'bg-agri-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-agri-800 hover:bg-white/60'
              }`}
              title="English"
            >
              EN
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currentLang === 'hi'
                  ? 'bg-agri-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-agri-800 hover:bg-white/60'
              }`}
              title="हिंदी (Hindi)"
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang('hinglish')}
              className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                currentLang === 'hinglish'
                  ? 'bg-agri-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-agri-800 hover:bg-white/60'
              }`}
              title="Hinglish (Roman Hindi)"
            >
              Hinglish
            </button>
          </div>

          {/* API Key Modal Button */}
          <button
            onClick={onOpenApiKeyModal}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              apiKeyConfigured
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
            }`}
            title="Configure Gemini API Key"
          >
            <Key className={`w-3.5 h-3.5 ${apiKeyConfigured ? 'text-emerald-600' : 'text-slate-400'}`} />
            <span className="hidden md:inline">
              {apiKeyConfigured ? 'Gemini Key (Active)' : 'AI Settings'}
            </span>
          </button>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/Yuuvi31/Agrivision-Ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-slate-600 hover:text-agri-800 hover:bg-agri-50 border border-transparent hover:border-agri-200 transition-all"
            title="GitHub Repository"
          >
            <Github className="w-5 h-5" />
          </a>

        </div>

      </div>
    </header>
  );
}
