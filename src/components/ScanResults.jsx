import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Share2, 
  Copy, 
  Check, 
  RotateCcw,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function ScanResults({ result, currentLang, onReset }) {
  const [remedyLang, setRemedyLang] = useState(currentLang || 'en');
  const [activeTab, setActiveTab] = useState('action');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setRemedyLang(currentLang);
  }, [currentLang]);

  useEffect(() => {
    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
    };
  }, [result]);

  if (!result) return null;

  // 1. NON-LEAF INVALID IMAGE STATE
  if (result.isLeaf === false) {
    return (
      <div className="w-full max-w-3xl mx-auto animate-fade-in mb-16">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-amber-500/30 bg-dark-900/90 shadow-2xl text-center">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl font-semibold text-zinc-100 mb-2">
            Non-Plant Image Detected
          </h2>

          <p className="text-sm text-zinc-300 max-w-lg mx-auto mb-4 leading-relaxed">
            {result.notLeafReason || 'Gemini Vision detected that this photo does not depict a plant leaf, crop foliage, or agricultural vegetation.'}
          </p>

          <p className="text-xs text-zinc-500 mb-6">
            To diagnose crop diseases, please photograph or upload a clear picture of a plant leaf.
          </p>

          <button
            onClick={onReset}
            className="px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium text-xs transition-all border border-white/[0.08] inline-flex items-center gap-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scan a Plant Leaf</span>
          </button>
        </div>
      </div>
    );
  }

  // 2. VALID PLANT LEAF DIAGNOSIS
  const isHealthy = result.status === 'healthy';
  const recommendations = result.recommendations?.[remedyLang] || result.recommendations?.en || {};

  const displayDisease = remedyLang === 'hi'
    ? (result.diseaseHi || result.disease)
    : remedyLang === 'hinglish'
    ? (result.diseaseHinglish || result.disease)
    : result.disease;

  // Audio Speech Synthesis
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    let text = `${isHealthy ? 'Healthy leaf' : displayDisease}. ${recommendations.diagnosisSummary || ''}. ${recommendations.immediateAction?.[0] || ''}`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.lang = (remedyLang === 'hi' || remedyLang === 'hinglish') ? 'hi-IN' : 'en-US';
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  const handleCopy = () => {
    const text = `🌱 Agrivision Diagnosis:
• Status: ${isHealthy ? 'Healthy' : 'Needs Care'}
• Crop: ${result.crop || 'Foliage'}
• Issue: ${displayDisease}
• Advice: ${recommendations.diagnosisSummary || ''}
- Immediate: ${recommendations.immediateAction?.join('; ') || ''}
- Organic: ${recommendations.organicSolution?.join('; ') || ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const msg = encodeURIComponent(
      `🌿 Agrivision AI Leaf Diagnosis\n\n` +
      `Status: ${isHealthy ? '✅ Healthy' : '⚠️ Disease Detected'}\n` +
      `Issue: ${displayDisease}\n` +
      `Summary: ${recommendations.diagnosisSummary || ''}\n\n` +
      `First Step: ${recommendations.immediateAction?.[0] || 'Maintain care'}`
    );
    window.open(`https://api.whatsapp.com/send?text=${msg}`, '_blank');
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in mb-16 transition-all duration-300">
      
      {/* Primary Result Panel */}
      <div className={`glass-panel rounded-2xl p-6 sm:p-7 border ${
        isHealthy ? 'border-emerald-500/30 bg-emerald-950/10' : 'border-amber-500/30 bg-amber-950/10'
      } shadow-2xl mb-6 relative overflow-hidden`}>
        
        {/* Header row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border ${
              isHealthy
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}>
              {isHealthy ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
              <span>{isHealthy ? 'Healthy Leaf' : 'Needs Care'}</span>
            </span>

            {result.confidence && (
              <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded-md bg-dark-950 border border-white/[0.06]">
                {result.confidence}% Confidence
              </span>
            )}
          </div>

          {result.severity && result.severity !== 'None' && (
            <span className="text-xs font-mono text-amber-300">
              Severity: {result.severity}
            </span>
          )}
        </div>

        {/* Title */}
        <div className="mb-3">
          <span className="text-xs font-mono text-zinc-400 block mb-0.5">
            {result.crop || 'Foliage Crop'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-100 tracking-tight">
            {displayDisease}
          </h2>
        </div>

        {/* Summary text */}
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-5">
          {recommendations.diagnosisSummary}
        </p>

        {result.visualObservations && (
          <p className="text-xs text-zinc-400 font-mono mb-5 border-l-2 border-emerald-500/40 pl-3 py-0.5">
            Observations: {result.visualObservations}
          </p>
        )}

        {/* Actions bar */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/[0.08]">
          <button
            onClick={handleToggleSpeech}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isSpeaking
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse'
                : 'bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-white/[0.08]'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200 border border-white/[0.08] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleShareWhatsApp}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share</span>
          </button>

          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 ml-auto transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scan Another</span>
          </button>
        </div>

      </div>

      {/* Multi-Language Treatment Panels */}
      <div className="glass-panel rounded-2xl p-5 sm:p-6 border border-white/[0.08] shadow-2xl">
        
        {/* Language selector & Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
          <h3 className="text-sm font-semibold text-zinc-200">
            {isHealthy ? 'Care & Maintenance Guide' : 'Treatment & Prevention'}
          </h3>

          <div className="flex items-center bg-dark-950 p-1 rounded-lg border border-white/[0.06]">
            <button
              onClick={() => setRemedyLang('en')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                remedyLang === 'en' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setRemedyLang('hi')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                remedyLang === 'hi' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              हिंदी
            </button>
            <button
              onClick={() => setRemedyLang('hinglish')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                remedyLang === 'hinglish' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Hinglish
            </button>
          </div>
        </div>

        {/* Sub-category pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-white/[0.06] scrollbar-none">
          {[
            { id: 'action', label: 'Immediate Action' },
            { id: 'organic', label: 'Organic & Neem' },
            { id: 'chemical', label: 'Chemical / Spray' },
            { id: 'watering', label: 'Water & Soil' },
            { id: 'prevention', label: 'Prevention' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-zinc-800 text-emerald-400 border border-white/[0.08]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="pt-4 animate-fade-in space-y-2">
          {activeTab === 'action' && recommendations.immediateAction?.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-dark-900/60 border border-white/[0.06] flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-zinc-800 text-zinc-300 text-xs font-mono flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{step}</p>
            </div>
          ))}

          {activeTab === 'organic' && recommendations.organicSolution?.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-dark-900/60 border border-white/[0.06] flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{step}</p>
            </div>
          ))}

          {activeTab === 'chemical' && recommendations.chemicalSolution?.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-dark-900/60 border border-white/[0.06] flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-blue-500/10 text-blue-400 text-xs font-mono flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{step}</p>
            </div>
          ))}

          {activeTab === 'watering' && recommendations.wateringAndSoil?.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-dark-900/60 border border-white/[0.06] flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-cyan-500/10 text-cyan-400 text-xs font-mono flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{step}</p>
            </div>
          ))}

          {activeTab === 'prevention' && recommendations.preventionTips?.map((step, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-dark-900/60 border border-white/[0.06] flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-md bg-purple-500/10 text-purple-400 text-xs font-mono flex items-center justify-center shrink-0">
                {idx + 1}
              </span>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
