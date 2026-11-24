import React from 'react';
import { Sprout, Heart, PhoneCall, ShieldCheck, Github } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/languages';

export default function Footer({ currentLang }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  return (
    <footer className="mt-20 border-t border-agri-100 bg-white/70 backdrop-blur-md pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl agri-gradient flex items-center justify-center text-white shadow-xs">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-slate-900 tracking-tight">
                Agrivision<span className="text-agri-600"> AI</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              Empowering farmers, growers, and gardeners with instant computer vision leaf health diagnostics and practical multi-lingual agronomy recommendations in English, Hindi, and Hinglish.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Free & Open Source
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-agri-50 text-agri-800 border border-agri-200">
                3 Languages Supported
              </span>
            </div>
          </div>

          {/* Col 2: Farmer Helpline */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Farmer Helpline & Support
            </h4>
            <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 text-agri-800 font-bold">
                <PhoneCall className="w-4 h-4 text-agri-600" />
                <span>Kisan Call Center: 1800-180-1551</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Toll-free agricultural advice across India (6:00 AM to 10:00 PM).
              </p>
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Repository & Code
            </h4>
            <ul className="text-xs text-slate-600 space-y-2">
              <li>
                <a
                  href="https://github.com/Yuuvi31/Agrivision-Ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-agri-700 transition-colors font-medium"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li>
                <span className="text-slate-500">React 19 + Tailwind + Vite</span>
              </li>
              <li>
                <span className="text-slate-500">English • हिंदी • Hinglish</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Agrivision AI. Dedicated to sustainable agriculture and farmer prosperity.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for farmers worldwide
          </p>
        </div>

      </div>
    </footer>
  );
}
