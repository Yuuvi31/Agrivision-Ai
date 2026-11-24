import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Volume2, 
  VolumeX, 
  Share2, 
  Copy, 
  Check, 
  Scissors, 
  Leaf, 
  FlaskConical, 
  Droplet, 
  ShieldAlert, 
  RefreshCw, 
  Sparkles,
  Info
} from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/languages';

export default function ScanResults({ 
  result, 
  currentLang, 
  onReset 
}) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  
  // Selected remedy language tab: 'en' | 'hi' | 'hinglish'
  const [remedyLang, setRemedyLang] = useState(currentLang);
  
  // Active remedy subcategory: 'action' | 'organic' | 'chemical' | 'watering' | 'prevention'
  const [activeRemedyTab, setActiveRemedyTab] = useState('action');
  
  // Audio state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);

  // Sync remedyLang when parent UI lang changes
  useEffect(() => {
    setRemedyLang(currentLang);
  }, [currentLang]);

  // Stop speech synthesis when unmounting or switching result
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [result]);

  if (!result) return null;

  const isHealthy = result.status === 'healthy';
  const recommendations = result.recommendations?.[remedyLang] || result.recommendations?.en || {};

  // Formatted disease name based on language
  const displayDisease = remedyLang === 'hi' 
    ? (result.diseaseHi || result.disease)
    : remedyLang === 'hinglish' 
    ? (result.diseaseHinglish || result.disease)
    : result.disease;

  // SpeechSynthesis read aloud
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();

    // Construct spoken text
    let textToSpeak = '';
    if (isHealthy) {
      if (remedyLang === 'hi') {
        textToSpeak = `पत्ती की स्थिति: यह पत्ती पूरी तरह स्वस्थ है। ${recommendations.diagnosisSummary || ''}`;
      } else if (remedyLang === 'hinglish') {
        textToSpeak = `Patti ki health ekdum mast aur swasth hai. ${recommendations.diagnosisSummary || ''}`;
      } else {
        textToSpeak = `Leaf status: This leaf is completely healthy. ${recommendations.diagnosisSummary || ''}`;
      }
    } else {
      if (remedyLang === 'hi') {
        textToSpeak = `रोग का नाम: ${displayDisease}। ${recommendations.diagnosisSummary || ''}। मुख्य उपाय: ${recommendations.immediateAction?.[0] || ''}। जैविक उपाय: ${recommendations.organicSolution?.[0] || ''}`;
      } else if (remedyLang === 'hinglish') {
        textToSpeak = `Bimari ka naam: ${displayDisease}. ${recommendations.diagnosisSummary || ''}. Pehle yeh karein: ${recommendations.immediateAction?.[0] || ''}. Organic spray: ${recommendations.organicSolution?.[0] || ''}`;
      } else {
        textToSpeak = `Disease detected: ${displayDisease}. ${recommendations.diagnosisSummary || ''}. Immediate action: ${recommendations.immediateAction?.[0] || ''}. Organic treatment: ${recommendations.organicSolution?.[0] || ''}`;
      }
    }

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    
    // Choose appropriate voice language
    if (remedyLang === 'hi' || remedyLang === 'hinglish') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-US';
    }

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Copy advice to clipboard
  const handleCopy = () => {
    const text = `🌱 Agrivision AI Leaf Diagnosis:
• Status: ${isHealthy ? 'Healthy Leaf' : 'Needs Care / Disease Detected'}
• Issue / Disease: ${displayDisease}
• Confidence: ${result.confidence}%
• Advice: ${recommendations.diagnosisSummary || ''}

Remedy Highlights:
- Immediate: ${recommendations.immediateAction?.join('; ') || 'N/A'}
- Organic/Neem: ${recommendations.organicSolution?.join('; ') || 'N/A'}
- Watering/Soil: ${recommendations.wateringAndSoil?.join('; ') || 'N/A'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Share to WhatsApp
  const handleShareWhatsApp = () => {
    const message = encodeURIComponent(
      `🌿 *Agrivision AI Leaf Health Report*\n\n` +
      `*Status:* ${isHealthy ? '✅ Healthy' : '⚠️ Disease Detected'}\n` +
      `*Issue:* ${displayDisease}\n` +
      `*Summary:* ${recommendations.diagnosisSummary || ''}\n\n` +
      `*First Action:* ${recommendations.immediateAction?.[0] || 'Maintain care'}\n` +
      `*Organic Remedy:* ${recommendations.organicSolution?.[0] || 'Keep soil balanced'}\n\n` +
      `Diagnosed via Agrivision AI`
    );
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in transition-all duration-300">
      
      {/* 1. HEALTH STATUS HERO CARD */}
      <div 
        className={`rounded-3xl p-6 sm:p-8 mb-8 border shadow-xl relative overflow-hidden transition-all ${
          isHealthy
            ? 'bg-gradient-to-br from-emerald-900 via-agri-900 to-emerald-950 text-white border-emerald-500/40'
            : 'bg-gradient-to-br from-amber-950 via-slate-900 to-rose-950 text-white border-amber-500/40'
        }`}
      >
        {/* Soft decorative glow */}
        <div 
          className={`absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${
            isHealthy ? 'bg-emerald-400' : 'bg-amber-400'
          }`} 
        />

        <div className="relative z-10">
          
          {/* Top row: Status Badge & Confidence */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            
            <div className="flex items-center gap-2">
              <span 
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wide border shadow-sm ${
                  isHealthy
                    ? 'bg-emerald-500 text-white border-emerald-400'
                    : 'bg-amber-500 text-slate-950 border-amber-400'
                }`}
              >
                {isHealthy ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.healthyState}</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" />
                    <span>{t.unhealthyState}</span>
                  </>
                )}
              </span>

              {result.source && (
                <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium bg-white/10 text-white/90 border border-white/20">
                  {result.source}
                </span>
              )}
            </div>

            {/* Confidence & Severity Indicator */}
            <div className="flex items-center gap-3 text-xs">
              <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                <span className="text-white/60">{t.confidence}:</span>
                <span className="font-bold text-emerald-400">{result.confidence}%</span>
              </div>

              {result.severity && result.severity !== 'None' && (
                <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                  <span className="text-white/60">{t.severity}:</span>
                  <span className="font-bold text-amber-300">{result.severity}</span>
                </div>
              )}
            </div>

          </div>

          {/* Disease / Health Title & Crop info */}
          <div className="mb-4">
            <span className="text-xs uppercase font-bold tracking-wider text-white/60">
              {result.crop || 'Crop Foliage'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white leading-tight">
              {displayDisease}
            </h2>
          </div>

          {/* Summary Paragraph */}
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-3xl mb-6">
            {recommendations.diagnosisSummary}
          </p>

          {/* Action Row: Listen Audio, Copy, Share, Scan Another */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-4 border-t border-white/15">
            
            <button
              onClick={handleToggleSpeech}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                isSpeaking
                  ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/20'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? t.stopAudio : t.listenAudio}</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copied : t.copySummary}</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>{t.shareWhatsApp}</span>
            </button>

            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all ml-auto"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.resetBtn}</span>
            </button>

          </div>

        </div>
      </div>

      {/* 2. MULTI-LANGUAGE REMEDY RECOMMENDATIONS CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-agri-100">
        
        {/* Section Header with 3 Selectable Languages */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-agri-600" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {isHealthy ? 'Plant Care & Vitality Guide' : 'Treatment & Cure Recommendations'}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {isHealthy 
                ? 'Follow these preventive steps to keep your crop thriving and disease-free.' 
                : 'Select your preferred language below for step-by-step practical fixes:'}
            </p>
          </div>

          {/* 3-Language Toggle Tabs */}
          <div className="flex items-center bg-sage-100 p-1 rounded-2xl border border-sage-200 self-start sm:self-auto">
            <button
              onClick={() => setRemedyLang('en')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                remedyLang === 'en'
                  ? 'bg-agri-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-agri-800 hover:bg-white/60'
              }`}
            >
              🇬🇧 English
            </button>

            <button
              onClick={() => setRemedyLang('hi')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                remedyLang === 'hi'
                  ? 'bg-agri-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-agri-800 hover:bg-white/60'
              }`}
            >
              🇮🇳 हिंदी (Hindi)
            </button>

            <button
              onClick={() => setRemedyLang('hinglish')}
              className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                remedyLang === 'hinglish'
                  ? 'bg-agri-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-agri-800 hover:bg-white/60'
              }`}
            >
              🗣️ Hinglish
            </button>
          </div>
        </div>

        {/* 3. SUB-CATEGORY TABS (Immediate, Organic, Chemical, Watering, Prevention) */}
        <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none border-b border-slate-100">
          <button
            onClick={() => setActiveRemedyTab('action')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeRemedyTab === 'action'
                ? 'bg-agri-100 text-agri-900 border border-agri-300 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Scissors className="w-4 h-4 text-agri-600" />
            <span>{t.remedyTabs.action}</span>
          </button>

          <button
            onClick={() => setActiveRemedyTab('organic')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeRemedyTab === 'organic'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>{t.remedyTabs.organic}</span>
          </button>

          <button
            onClick={() => setActiveRemedyTab('chemical')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeRemedyTab === 'chemical'
                ? 'bg-blue-100 text-blue-900 border border-blue-300 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FlaskConical className="w-4 h-4 text-blue-600" />
            <span>{t.remedyTabs.chemical}</span>
          </button>

          <button
            onClick={() => setActiveRemedyTab('watering')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeRemedyTab === 'watering'
                ? 'bg-cyan-100 text-cyan-900 border border-cyan-300 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Droplet className="w-4 h-4 text-cyan-600" />
            <span>{t.remedyTabs.watering}</span>
          </button>

          <button
            onClick={() => setActiveRemedyTab('prevention')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              activeRemedyTab === 'prevention'
                ? 'bg-purple-100 text-purple-900 border border-purple-300 shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-purple-600" />
            <span>{t.remedyTabs.prevention}</span>
          </button>
        </div>

        {/* 4. ACTIVE REMEDY TAB CONTENT (With smooth fade-in) */}
        <div className="pt-6 animate-fade-in">
          
          {/* TAB 1: Immediate Action */}
          {activeRemedyTab === 'action' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-amber-900 font-medium">
                  {remedyLang === 'hi' 
                    ? 'रोग को फैलने से रोकने के लिए इन शुरुआती कदमों को तुरंत उठाएं:'
                    : remedyLang === 'hinglish'
                    ? 'Bimari ko aage failne se rokne ke liye ye zaroori steps turant lein:'
                    : 'Take these immediate quarantine and sanitization actions to arrest disease spread:'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {recommendations.immediateAction?.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200 flex items-start gap-3 hover:border-agri-300 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-lg bg-agri-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Organic & Neem Spray */}
          {activeRemedyTab === 'organic' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-3">
                <Leaf className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-emerald-900 font-medium">
                  {remedyLang === 'hi' 
                    ? 'पर्यावरण व फसल के अनुकूल जैविक व देसी घरेलू समाधान:'
                    : remedyLang === 'hinglish'
                    ? 'Safe, natural aur desi nuskhe jo fasal ko nuksaan nahi pahunchate:'
                    : 'Eco-friendly, chemical-free organic formulas and herbal biocontrol sprays:'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {recommendations.organicSolution?.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200 flex items-start gap-3 hover:border-emerald-300 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Chemical & Fungicide Spray */}
          {activeRemedyTab === 'chemical' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-3">
                <FlaskConical className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-blue-900 font-medium">
                  {remedyLang === 'hi' 
                    ? 'गंभीर प्रकोप की स्थिति में अनुशंसित दवाइयां (हमेशा मास्क पहनकर सुबह या शाम छिड़कें):'
                    : remedyLang === 'hinglish'
                    ? 'Agar bimari zyada fail jaye tabhi in scientific sprays ka recommended dose dalein:'
                    : 'Targeted agricultural chemicals and fungicides for commercial or severe outbreaks:'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {recommendations.chemicalSolution?.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200 flex items-start gap-3 hover:border-blue-300 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Watering & Soil */}
          {activeRemedyTab === 'watering' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200/80 flex items-start gap-3">
                <Droplet className="w-5 h-5 text-cyan-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-cyan-900 font-medium">
                  {remedyLang === 'hi' 
                    ? 'मिट्टी की उर्वरता, जलनिकासी और सही सिंचाई के निर्देश:'
                    : remedyLang === 'hinglish'
                    ? 'Paani dene ka sahi tareeka aur mitti ka balanced drainage guidance:'
                    : 'Soil moisture management and root-zone aeration practices:'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {recommendations.wateringAndSoil?.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200 flex items-start gap-3 hover:border-cyan-300 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-lg bg-cyan-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: Future Prevention */}
          {activeRemedyTab === 'prevention' && (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                <p className="text-xs sm:text-sm text-purple-900 font-medium">
                  {remedyLang === 'hi' 
                    ? 'फसल चक्र, दूरी व भविष्य में इस रोग से बचाव के दीर्घकालिक नियम:'
                    : remedyLang === 'hinglish'
                    ? 'Crop rotation aur spacing ke long-term bachav tips:'
                    : 'Preventive agronomical methods to safeguard forthcoming crop seasons:'}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {recommendations.preventionTips?.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200 flex items-start gap-3 hover:border-purple-300 transition-colors"
                  >
                    <span className="w-6 h-6 rounded-lg bg-purple-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-slate-800 font-medium leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
