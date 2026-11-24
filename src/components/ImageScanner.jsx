import React, { useState, useRef, useEffect } from 'react';
import { 
  Upload, 
  Camera, 
  Sparkles, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  X, 
  FlipHorizontal,
  ArrowRight
} from 'lucide-react';
import { SAMPLE_LEAVES } from '../data/sampleLeaves';
import { UI_TRANSLATIONS } from '../data/languages';

export default function ImageScanner({ 
  currentLang, 
  onAnalyze, 
  isAnalyzing, 
  selectedImage, 
  setSelectedImage, 
  onReset 
}) {
  const [activeMode, setActiveMode] = useState('upload'); // 'upload' | 'camera'
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('environment');
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraError(null);
  };

  useEffect(() => {
    if (activeMode !== 'camera' && isCameraActive) {
      stopCamera();
    }
  }, [activeMode]);

  useEffect(() => {
    return () => stopCamera();
  }, []);

  const startCamera = async (facing = cameraFacing) => {
    stopCamera();
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facing }, width: { ideal: 1280 } },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      setCameraError('Camera access denied or unavailable. Please use upload mode.');
      setIsCameraActive(false);
    }
  };

  const toggleFacing = () => {
    const next = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(next);
    if (isCameraActive) startCamera(next);
  };

  const captureFrame = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    setSelectedImage(dataUrl);
    stopCamera();
  };

  const handleFile = (file) => {
    setErrorMessage(null);
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setSelectedImage(e.target.result);
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-10 transition-all duration-300">
      
      {/* Minimal Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
          {t.scanCardTitle}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Main Container */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl transition-all">
        
        {/* Mode Switcher */}
        <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between gap-3 bg-dark-900/50">
          <div className="flex items-center gap-1 bg-dark-950 p-1 rounded-lg border border-white/[0.06]">
            <button
              onClick={() => { setActiveMode('upload'); stopCamera(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeMode === 'upload'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t.uploadTab}</span>
            </button>
            <button
              onClick={() => { setActiveMode('camera'); startCamera(); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                activeMode === 'camera'
                  ? 'bg-zinc-800 text-zinc-100'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>{t.cameraTab}</span>
            </button>
          </div>

          {selectedImage && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 border border-transparent hover:border-white/[0.06] transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Scanner Body */}
        <div className="p-4 sm:p-6">
          
          {/* Error */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="flex-1">{errorMessage}</p>
              <button onClick={() => setErrorMessage(null)} className="text-zinc-400 hover:text-zinc-200">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* PREVIEW VIEW */}
          {selectedImage ? (
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-black flex flex-col items-center justify-center animate-fade-in">
              <div className="relative w-full max-h-[420px] flex items-center justify-center overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Scanned Plant Leaf"
                  className="max-h-[420px] w-auto object-contain"
                />

                {/* Minimalist Emerald Laser Line */}
                {isAnalyzing && (
                  <div className="absolute inset-x-0 h-0.5 bg-emerald-400 shadow-[0_0_12px_#34d399] animate-laser-scan pointer-events-none z-20" />
                )}

                {/* Minimalist Backdrop during scan */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-dark-950/70 backdrop-blur-xs flex flex-col items-center justify-center z-10 text-white p-6 text-center animate-fade-in">
                    <div className="w-10 h-10 rounded-full border-2 border-emerald-500/30 border-t-emerald-400 animate-spin mb-3" />
                    <p className="text-sm font-medium tracking-tight text-zinc-100">{t.analyzing}</p>
                    <p className="text-xs text-zinc-400 mt-1 font-mono">Examining cellular structures & symptoms</p>
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="w-full bg-dark-900/90 p-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08]">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Image ready</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={onReset}
                    disabled={isAnalyzing}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-lg border border-white/[0.08] text-zinc-300 hover:bg-zinc-800/80 font-medium text-xs transition-all disabled:opacity-40"
                  >
                    Change
                  </button>

                  <button
                    onClick={onAnalyze}
                    disabled={isAnalyzing}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-semibold text-xs transition-all shadow-[0_0_20px_rgba(16,185,129,0.25)] active:scale-98 disabled:opacity-40"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAnalyzing ? t.analyzing : t.analyzeBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* UPLOAD & CAMERA MODES */
            <div>
              {activeMode === 'upload' && (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={onDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border border-dashed rounded-xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
                    dragActive
                      ? 'border-emerald-400 bg-emerald-500/[0.04]'
                      : 'border-white/[0.12] hover:border-emerald-500/40 bg-dark-900/40 hover:bg-dark-900/80'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) handleFile(e.target.files[0]);
                    }}
                  />

                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-5 h-5" />
                  </div>

                  <p className="text-sm font-medium text-zinc-200 mb-1">
                    {t.dropText}
                  </p>
                  <p className="text-xs text-zinc-500 font-mono">
                    {t.supportedFormats}
                  </p>
                </div>
              )}

              {activeMode === 'camera' && (
                <div className="relative rounded-xl overflow-hidden bg-black border border-white/[0.08] p-4 text-center">
                  {cameraError ? (
                    <div className="p-6 text-zinc-400 text-xs">
                      <p className="text-rose-400 mb-3">{cameraError}</p>
                      <button
                        onClick={() => startCamera()}
                        className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-200 text-xs hover:bg-zinc-700"
                      >
                        Retry
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-w-md aspect-4/3 rounded-lg overflow-hidden bg-zinc-950 mb-3">
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
                        <div className="absolute inset-6 border border-dashed border-white/30 rounded-lg pointer-events-none" />
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={toggleFacing}
                          className="p-2.5 rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300 hover:bg-zinc-800"
                          title={t.switchCamera}
                        >
                          <FlipHorizontal className="w-4 h-4" />
                        </button>

                        <button
                          onClick={captureFrame}
                          className="px-5 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-semibold text-xs flex items-center gap-2"
                        >
                          <Camera className="w-4 h-4" />
                          <span>{t.capturePhoto}</span>
                        </button>

                        <button
                          onClick={stopCamera}
                          className="p-2.5 rounded-lg bg-zinc-900 border border-white/[0.08] text-zinc-300 hover:bg-zinc-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Minimal Demo Leaf Pills */}
              <div className="mt-5 pt-4 border-t border-white/[0.06]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                  {t.demoNote}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {SAMPLE_LEAVES.slice(0, 4).map((sample) => {
                    const sampleLabel = currentLang === 'hi'
                      ? sample.nameHi.split('(')[0]
                      : currentLang === 'hinglish'
                      ? sample.nameHinglish.split('(')[0]
                      : sample.name.split('(')[0];
                    return (
                      <button
                        key={sample.id}
                        onClick={() => setSelectedImage(sample.image)}
                        className="px-2.5 py-1.5 rounded-lg bg-dark-900 hover:bg-zinc-800/80 border border-white/[0.08] text-zinc-300 hover:text-white text-xs font-medium transition-all flex items-center gap-1.5"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${sample.status === 'healthy' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        <span>{sampleLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
