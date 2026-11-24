import React from 'react';
import { Sparkles, ShieldCheck, Languages, Zap } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/languages';

export default function HeroSection({ currentLang }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-12 sm:pb-16 text-center">
      {/* Background soft ambient gradient blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-agri-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Top Feature Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-agri-100/90 text-agri-800 border border-agri-300 shadow-sm mb-6 animate-fade-in">
          <Sparkles className="w-4 h-4 text-agri-600 animate-spin-slow" />
          <span>{t.badge}</span>
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 font-sans">
          Protect Your Crops with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-700 via-agri-600 to-emerald-500">
            Intelligent Vision
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          {t.subtitle}
        </p>

        {/* Value Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-agri-100 shadow-xs hover:border-agri-300 transition-all">
            <div className="w-9 h-9 rounded-xl bg-agri-50 text-agri-700 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Instant AI Diagnosis</p>
              <p className="text-[11px] text-slate-500">Under 2 seconds scan</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-agri-100 shadow-xs hover:border-agri-300 transition-all">
            <div className="w-9 h-9 rounded-xl bg-agri-50 text-agri-700 flex items-center justify-center shrink-0">
              <Languages className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">English, Hindi & Hinglish</p>
              <p className="text-[11px] text-slate-500">With audio read-aloud</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/80 border border-agri-100 shadow-xs hover:border-agri-300 transition-all">
            <div className="w-9 h-9 rounded-xl bg-agri-50 text-agri-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Organic & Safe Remedies</p>
              <p className="text-[11px] text-slate-500">Neem, pruning & soil tips</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
