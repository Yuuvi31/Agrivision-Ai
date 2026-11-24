import React, { useState, useRef } from 'react';
import Navbar from './components/Navbar';
import ImageScanner from './components/ImageScanner';
import ScanResults from './components/ScanResults';
import ApiKeyModal from './components/ApiKeyModal';
import { analyzeLeaf } from './services/analyzer';

export default function App() {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('agrivision_lang') || 'en';
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const resultsRef = useRef(null);

  const handleSetLang = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('agrivision_lang', lang);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setScanResult(null);

    try {
      const result = await analyzeLeaf(selectedImage);
      setScanResult(result);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err) {
      console.error('Diagnosis error:', err);
      alert('Unable to analyze image with Gemini Vision. Please check your internet connection or API key.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setScanResult(null);
    setIsAnalyzing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen dark-grid-pattern flex flex-col text-zinc-100">
      
      {/* Sleek Minimal Navbar */}
      <Navbar
        currentLang={currentLang}
        setLang={handleSetLang}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        isAnalyzing={isAnalyzing}
      />

      {/* Main Focus Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center justify-center">
        
        {/* Leaf Scanner */}
        <ImageScanner
          currentLang={currentLang}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          onReset={handleReset}
        />

        {/* Results Container */}
        <div ref={resultsRef} className="w-full">
          {scanResult && (
            <ScanResults
              result={scanResult}
              currentLang={currentLang}
              onReset={handleReset}
            />
          )}
        </div>

      </main>

      {/* Minimalist Single-Line Footer */}
      <footer className="py-6 border-t border-white/[0.04] text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Agrivision — Gemini Vision Plant Pathology</span>
          <a
            href="https://github.com/Yuuvi31/Agrivision-Ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-300 transition-colors"
          >
            GitHub Repository
          </a>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onKeySaved={() => {}}
      />

    </div>
  );
}
