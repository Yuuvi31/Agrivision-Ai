import React from 'react';
import { Sprout, Key, Github, Sparkles } from 'lucide-react';

export default function Navbar({ currentLang, setLang, onOpenApiKeyModal, isAnalyzing }) {
  return (
    <header className="sticky top-0 z-40 bg-dark-950/80 backdrop-blur-xl border-b border-white/[0.06] transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Sprout className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-semibold text-base tracking-tight text-zinc-100 font-sans">
              Agrivision
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          
          {/* Language selector */}
          <div className="flex items-center bg-dark-850 p-0.5 rounded-lg border border-white/[0.08]">
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                currentLang === 'en'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                currentLang === 'hi'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setLang('hinglish')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                currentLang === 'hinglish'
                  ? 'bg-zinc-800 text-white shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Hinglish
            </button>
          </div>

          {/* Key configuration */}
          <button
            onClick={onOpenApiKeyModal}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-transparent hover:border-white/[0.08] transition-all"
            title="Configure API Key"
          >
            <Key className="w-4 h-4" />
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/Yuuvi31/Agrivision-Ai"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60 border border-transparent hover:border-white/[0.08] transition-all"
            title="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>

        </div>

      </div>
    </header>
  );
}
