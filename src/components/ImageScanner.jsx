import React, { useState, useRef, useEffect } from 'react';
import { 
  UploadCloud, 
  Camera, 
  Sparkles, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  X, 
  FlipHorizontal, 
  Eye, 
  Image as ImageIcon 
} from 'lucide-react';
import { UI_TRANSLATIONS } from '../data/languages';
import { SAMPLE_LEAVES } from '../data/sampleLeaves';

export default function ImageScanner({ 
  currentLang, 
  onAnalyze, 
  isAnalyzing, 
  selectedImage, 
  setSelectedImage, 
  selectedSampleId, 
  setSelectedSampleId,
  onReset 
}) {
  const t = UI_TRANSLATIONS[currentLang] || UI_TRANSLATIONS.en;
  
  // Scanner modes: 'upload' | 'camera' | 'samples'
  const [activeTab, setActiveTab] = useState('upload');
  const [dragActive, setDragActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  
  // Camera state
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraFacing, setCameraFacing] = useState('environment'); // 'environment' (back) or 'user' (front)
  const [cameraError, setCameraError] = useState(null);
  
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Stop camera when unmounting or switching tabs
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
    setCameraError(null);
  };

  useEffect(() => {
    if (activeTab !== 'camera' && isCameraActive) {
      stopCamera();
    }
  }, [activeTab]);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Start Camera
  const startCamera = async (facingMode = cameraFacing) => {
    stopCamera();
    setCameraError(null);
    try {
      const constraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
    } catch (err) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access device camera. Please check camera permissions or use the upload option.');
      setIsCameraActive(false);
    }
  };

  // Toggle Camera Facing
  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'environment' ? 'user' : 'environment';
    setCameraFacing(nextFacing);
    if (isCameraActive) {
      startCamera(nextFacing);
    }
  };

  // Capture Photo from Camera
  const capturePhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    
    setSelectedImage(dataUrl);
    setSelectedSampleId(null);
    stopCamera();
  };

  // File Upload Handlers
  const handleFileProcess = (file) => {
    setErrorMessage(null);
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please upload a valid image file (JPG, PNG, WEBP).');
      return;
    }

    if (file.size > 12 * 1024 * 1024) {
      setErrorMessage('Image size exceeds 12MB. Please upload a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setSelectedSampleId(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleSelectSample = (sample) => {
    setSelectedImage(sample.image);
    setSelectedSampleId(sample.id);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <div className="bg-white rounded-3xl shadow-xl border border-agri-200/80 overflow-hidden transition-all duration-300">
        
        {/* Top Mode Bar */}
        <div className="bg-sage-50/80 p-3 sm:p-4 border-b border-agri-100 flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-1.5 sm:gap-2 bg-sage-200/70 p-1 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => { setActiveTab('upload'); stopCamera(); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'upload'
                  ? 'bg-white text-agri-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UploadCloud className="w-4 h-4 text-agri-600" />
              <span>{t.uploadTab}</span>
            </button>

            <button
              onClick={() => { setActiveTab('camera'); startCamera(); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'camera'
                  ? 'bg-white text-agri-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Camera className="w-4 h-4 text-agri-600" />
              <span>{t.cameraTab}</span>
            </button>

            <button
              onClick={() => { setActiveTab('samples'); stopCamera(); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'samples'
                  ? 'bg-white text-agri-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-agri-600" />
              <span>{t.samplesTab}</span>
            </button>
          </div>

          {selectedImage && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors ml-auto"
              title="Reset current image"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.resetBtn}</span>
            </button>
          )}

        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-8">
          
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3 animate-fade-in">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="flex-1 font-medium">{errorMessage}</p>
              <button onClick={() => setErrorMessage(null)} className="text-rose-500 hover:text-rose-700">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PREVIEW & ANALYZE VIEW (when image is selected) */}
          {selectedImage ? (
            <div className="relative rounded-2xl overflow-hidden border border-agri-200 bg-slate-950 flex flex-col items-center justify-center animate-fade-in group">
              
              {/* Image Preview */}
              <div className="relative w-full max-h-[440px] flex items-center justify-center overflow-hidden bg-black/40">
                <img
                  src={selectedImage}
                  alt="Scanned Leaf Preview"
                  className="max-h-[440px] w-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />

                {/* Laser Scanning Animation Line */}
                {isAnalyzing && (
                  <div className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-agri-400 to-transparent shadow-[0_0_15px_#22c55e] animate-scan pointer-events-none z-20" />
                )}

                {/* Overlay Scanning Backdrop */}
                {isAnalyzing && (
                  <div className="absolute inset-0 bg-agri-950/40 backdrop-blur-xs flex flex-col items-center justify-center z-10 animate-fade-in text-white p-6 text-center">
                    <div className="w-16 h-16 rounded-2xl agri-gradient flex items-center justify-center mb-4 shadow-lg shadow-agri-500/50 animate-bounce">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-lg font-bold tracking-tight text-agri-100">{t.analyzing}</p>
                    <p className="text-xs text-agri-200/80 mt-1 max-w-sm">Checking leaf pigmentation, fungal spots, chlorosis and disease symptoms...</p>
                  </div>
                )}
              </div>

              {/* Action Toolbar underneath image */}
              <div className="w-full bg-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100">
                
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Leaf Image Ready for Diagnosis</span>
                  {selectedSampleId && (
                    <span className="px-2 py-0.5 rounded-md bg-agri-100 text-agri-800 font-semibold text-[11px]">
                      Verified Pathology Sample
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={onReset}
                    disabled={isAnalyzing}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs transition-colors disabled:opacity-50"
                  >
                    Change Image
                  </button>

                  <button
                    onClick={onAnalyze}
                    disabled={isAnalyzing}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl agri-gradient hover:opacity-95 text-white font-bold text-sm shadow-md shadow-agri-600/30 transition-all transform active:scale-95 disabled:opacity-50"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isAnalyzing ? t.analyzing : t.analyzeBtn}</span>
                  </button>
                </div>

              </div>

            </div>
          ) : (
            /* INPUT SELECTION VIEWS (when no image is yet selected) */
            <div>
              {/* TAB 1: UPLOAD */}
              {activeTab === 'upload' && (
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-3xl p-8 sm:p-14 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
                    dragActive
                      ? 'border-agri-500 bg-agri-50/70 scale-[0.99]'
                      : 'border-agri-200/90 hover:border-agri-400 bg-sage-50/50 hover:bg-sage-50/90'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileProcess(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-agri-100 text-agri-700 flex items-center justify-center mb-4 shadow-xs transform group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-8 h-8 sm:w-10 sm:h-10" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
                    {t.dropText}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-500 max-w-sm mb-4">
                    {t.supportedFormats}
                  </p>

                  <button
                    type="button"
                    className="px-5 py-2.5 rounded-xl bg-agri-700 hover:bg-agri-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    Browse Files from Device
                  </button>
                </div>
              )}

              {/* TAB 2: LIVE CAMERA */}
              {activeTab === 'camera' && (
                <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 p-4 sm:p-6 text-center">
                  {cameraError ? (
                    <div className="p-8 text-center text-slate-200">
                      <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
                      <p className="text-sm font-semibold mb-4 text-rose-200">{cameraError}</p>
                      <button
                        onClick={() => startCamera()}
                        className="px-4 py-2 bg-agri-600 hover:bg-agri-700 text-white rounded-xl text-xs font-bold"
                      >
                        Retry Camera
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="relative w-full max-w-lg aspect-4/3 rounded-2xl overflow-hidden bg-black mb-4 flex items-center justify-center shadow-inner">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Camera guide overlay */}
                        <div className="absolute inset-8 border-2 border-dashed border-white/60 rounded-2xl pointer-events-none flex items-center justify-center">
                          <span className="text-[11px] font-semibold text-white/80 bg-black/50 px-2 py-1 rounded-md backdrop-blur-xs">
                            Position leaf inside frame
                          </span>
                        </div>
                      </div>

                      {/* Camera Controls */}
                      <div className="flex items-center justify-center gap-4">
                        <button
                          onClick={toggleCameraFacing}
                          className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                          title={t.switchCamera}
                        >
                          <FlipHorizontal className="w-5 h-5" />
                        </button>

                        <button
                          onClick={capturePhoto}
                          className="px-6 py-3 rounded-2xl agri-gradient hover:opacity-95 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-agri-600/40 transform active:scale-95 transition-all"
                        >
                          <Camera className="w-5 h-5" />
                          <span>{t.capturePhoto}</span>
                        </button>

                        <button
                          onClick={stopCamera}
                          className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                          title={t.closeCamera}
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: DEMO LEAVES GALLERY */}
              {activeTab === 'samples' && (
                <div className="animate-fade-in">
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mb-4">
                    {t.demoNote}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {SAMPLE_LEAVES.map((sample) => {
                      const isSampleHealthy = sample.status === 'healthy';
                      return (
                        <div
                          key={sample.id}
                          onClick={() => handleSelectSample(sample)}
                          className="group text-left p-3 rounded-2xl border border-agri-100 hover:border-agri-400 bg-white hover:bg-agri-50/40 shadow-xs hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col justify-between"
                        >
                          <div className="relative w-full h-32 rounded-xl overflow-hidden bg-slate-100 mb-2">
                            <img
                              src={sample.image}
                              alt={sample.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <span
                              className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                                isSampleHealthy
                                  ? 'bg-emerald-500/90 text-white'
                                  : 'bg-amber-600/90 text-white'
                              }`}
                            >
                              {isSampleHealthy ? 'Healthy' : 'Diseased'}
                            </span>
                          </div>

                          <div>
                            <h4 className="text-xs font-bold text-slate-900 group-hover:text-agri-800 transition-colors truncate">
                              {currentLang === 'hi' ? sample.nameHi : currentLang === 'hinglish' ? sample.nameHinglish : sample.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5">
                              {currentLang === 'hi' ? sample.diseaseHi : currentLang === 'hinglish' ? sample.diseaseHinglish : sample.disease}
                            </p>
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-agri-700 font-semibold">
                            <span>Test this Leaf</span>
                            <Eye className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
