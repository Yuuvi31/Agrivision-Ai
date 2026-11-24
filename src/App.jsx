import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import ImageScanner from './components/ImageScanner';
import ScanResults from './components/ScanResults';
import ApiKeyModal from './components/ApiKeyModal';
import Footer from './components/Footer';
import { analyzeLeaf } from './services/analyzer';

export default function App() {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('agrivision_lang') || 'en';
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSampleId, setSelectedSampleId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);

  const resultsRef = useRef(null);

  // Check API key on mount
  useEffect(() => {
    checkApiKeyStatus();
  }, []);

  const checkApiKeyStatus = () => {
    const key = localStorage.getItem('agrivision_gemini_key') || import.meta.env.VITE_GEMINI_API_KEY;
    setApiKeyConfigured(!!(key && key.trim().length > 10 && !key.includes('your_gemini')));
  };

  const handleSetLang = (lang) => {
    setCurrentLang(lang);
    localStorage.setItem('agrivision_lang', lang);
  };

  // Perform leaf diagnosis
  const handleAnalyze = async () => {
    if (!selectedImage) return;
    setIsAnalyzing(true);
    setScanResult(null);

    try {
      const result = await analyzeLeaf(selectedImage, selectedSampleId);
      setScanResult(result);

      // Scroll smoothly down to the results section
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err) {
      console.error('Diagnostic error:', err);
      alert('An error occurred while analyzing the leaf image. Please try another image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Reset to initial scanner state
  const handleReset = () => {
    setSelectedImage(null);
    setSelectedSampleId(null);
    setScanResult(null);
    setIsAnalyzing(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen leaf-pattern flex flex-col text-slate-800">
      
      {/* Top Navigation */}
      <Navbar
        currentLang={currentLang}
        setLang={handleSetLang}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        apiKeyConfigured={apiKeyConfigured}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Hero Section */}
        <HeroSection currentLang={currentLang} />

        {/* How It Works (3 Steps) */}
        <HowItWorks currentLang={currentLang} />

        {/* Leaf Image Scanner (Upload / Camera / Samples) */}
        <ImageScanner
          currentLang={currentLang}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          selectedSampleId={selectedSampleId}
          setSelectedSampleId={setSelectedSampleId}
          onReset={handleReset}
        />

        {/* Diagnostic Results (Smooth fade-in) */}
        <div ref={resultsRef}>
          {scanResult && (
            <ScanResults
              result={scanResult}
              currentLang={currentLang}
              onReset={handleReset}
            />
          )}
        </div>

      </main>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        currentLang={currentLang}
        onKeySaved={checkApiKeyStatus}
      />

      {/* Footer */}
      <Footer currentLang={currentLang} />

    </div>
  );
}
