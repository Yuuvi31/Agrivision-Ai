import React from 'react';
import { Camera, Cpu, HeartHandshake, ArrowRight } from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/languages';

export default function HowItWorks({ currentLang }) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  const steps = [
    {
      num: '01',
      icon: Camera,
      title: t.step1Title,
      desc: t.step1Desc,
      tag: 'Step 1 / चरण 1'
    },
    {
      num: '02',
      icon: Cpu,
      title: t.step2Title,
      desc: t.step2Desc,
      tag: 'Step 2 / चरण 2'
    },
    {
      num: '03',
      icon: HeartHandshake,
      title: t.step3Title,
      desc: t.step3Desc,
      tag: 'Step 3 / चरण 3'
    }
  ];

  return (
    <section className="mb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t.howItWorksTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-1">
            {t.howItWorksSubtitle}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-agri-100 shadow-sm hover:shadow-md hover:border-agri-300 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-agri-100 group-hover:bg-agri-600 text-agri-800 group-hover:text-white flex items-center justify-center transition-colors shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl font-black text-slate-200 group-hover:text-agri-200 transition-colors">
                    {step.num}
                  </span>
                </div>

                <span className="text-[11px] font-bold uppercase tracking-wider text-agri-700 bg-agri-50 px-2 py-0.5 rounded-md border border-agri-200/60 mb-2 inline-block">
                  {step.tag}
                </span>

                <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-agri-800 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.desc}
                </p>

                {idx < 2 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-agri-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
