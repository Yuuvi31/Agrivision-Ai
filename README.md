# 🌿 Agrivision AI — Smart Leaf Health Scanner & Plant Doctor

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF.svg)](https://vitejs.dev/)

**Agrivision AI** is an intelligent agricultural web application designed to help farmers, gardeners, and agronomists instantly diagnose plant leaf diseases from a single photo and receive practical, easy-to-follow remedies in **English**, **Hindi (हिंदी)**, and **Hinglish**.

---

## 🌟 Core Features

### 1. 🍃 Leaf Image Scanner
- **Multiple Input Modes**:
  - **Upload Image**: Drag-and-drop or select any leaf photo (JPG, PNG, WEBP).
  - **Live Camera**: Capture real-time photos directly using front or rear device cameras.
  - **Interactive Demo Leaves**: Test the app immediately with pre-loaded realistic healthy & diseased plant foliage (Tomato Early Blight, Healthy Apple, Potato Late Blight, Healthy Rice, Corn Rust).
- **Clear Health Assessment**:
  - High-visibility badges for **Healthy Leaf (स्वस्थ पत्ता)** vs **Needs Care / Disease Detected (रोग पाया गया)**.
  - Confidence percentage score (e.g., 96-99%), botanical crop name, and severity indicators.
  - Interactive image preview with instant scan reset.

### 2. 🌐 Multi-Language Practical Fix Recommendations
Get step-by-step remedies presented in three easily switchable languages:
- **English**: Clear botanical and agricultural instructions.
- **हिंदी (Hindi)**: Authentic Devanagari script for regional Hindi-speaking growers.
- **Hinglish**: Roman script Hindi-English conversational mix (*"Neem oil 5ml spray karein aur infected pattiya cut karein"*), widely read by farmers and mobile users.
- **Categorized Treatment Action Plans**:
  - ✂️ **Immediate Action / Pruning**: Quarantine and foliage cutting advice.
  - 🍃 **Organic & Neem Solutions**: Cold-pressed neem spray, sour buttermilk (*chaas*), and bio-fungicides.
  - 🧪 **Chemical Sprays & Dosage**: Recommended scientific fungicides (Mancozeb, Ridomil, Tilt, etc.) for commercial outbreak control.
  - 💧 **Watering & Soil Care**: Drip irrigation, mulch layers, and soil drainage adjustments.
  - 🛡️ **Future Prevention**: Crop rotation, row spacing, and disease-resistant seeds.
- **🔊 Farmer Audio Read-Aloud**: Built-in speech synthesis (Text-to-Speech) reads diagnosis and solutions aloud in the chosen language.
- **📲 One-Click Share & Copy**: Instant WhatsApp share and clipboard export for field advisory.

### 3. 🎨 Agricultural Green Theme & Smooth Animations
- Fresh natural agricultural green palette (deep forest greens `#14532d`, emerald accents `#16a34a`, soft mint & sage backgrounds `#f6f8f5`).
- High-contrast, easy-to-read typography for outdoor visibility.
- Smooth CSS and Framer Motion fade-in / fade-away transitions between upload, scanning, language toggling, and diagnosis cards.

### 4. 💡 Beginner-Friendly "How It Works"
A 3-step visual guide welcoming first-time users:
1. 📸 **Upload or Snap Leaf**: Take a clear picture of any crop leaf or choose an image.
2. 🧠 **AI Scans Health**: Vision engine inspects chlorophyll, lesions, fungus, and chlorosis.
3. 🌿 **Multi-Language Fixes**: Read and listen to actionable fixes in English, Hindi, or Hinglish.

### 5. ⚡ Dual Vision Diagnostic Engine
- **Intelligent Built-in Pathology Engine**: Runs 100% offline out-of-the-box with zero API key dependencies using computer vision canvas inspection and botanical plant pathology heuristics.
- **Optional Google Gemini Vision API**: Allows users to optionally provide their own Gemini API key (via `.env` or in-app modal) for dynamic cloud vision analysis.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Yuuvi31/Agrivision-Ai.git
cd Agrivision-Ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables (Optional)
Copy the example environment configuration:
```bash
cp .env.example .env
```
*(Optional)* Add your Google Gemini API key if you want cloud AI inference:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
> **Note**: Agrivision AI works completely even without an API key thanks to its built-in offline diagnostic model!

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in the `dist/` directory, ready to deploy to Vercel, Netlify, or GitHub Pages.

---

## 📁 Project Structure

```
Agrivision-Ai/
├── index.html                  # HTML entry point with Plus Jakarta Sans & Noto Sans
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Agricultural theme palette & animations
├── postcss.config.js           # PostCSS Tailwind config
├── .env.example                # Sample environment variables
├── .gitignore                  # Git ignore rules
├── public/
│   └── leaf.svg                # Agrivision brand icon
└── src/
    ├── main.jsx                # React app mounting point
    ├── App.jsx                 # Main application state orchestration
    ├── index.css               # Tailwind directives, animations & custom styles
    ├── data/
    │   ├── languages.js        # Multi-language translations (EN, HI, Hinglish)
    │   └── sampleLeaves.js     # Curated realistic plant pathology leaf samples
    ├── services/
    │   └── analyzer.js         # Vision analysis engine & Gemini API integration
    └── components/
        ├── Navbar.jsx          # Header, language selector & settings trigger
        ├── HeroSection.jsx     # Hero headline, stats & badges
        ├── HowItWorks.jsx      # 3-step beginner-friendly visual guide
        ├── ImageScanner.jsx    # Upload, camera capture & demo gallery
        ├── ScanResults.jsx     # Health assessment card, audio & remedy tabs
        ├── ApiKeyModal.jsx     # Optional Gemini API key configuration modal
        └── Footer.jsx          # Farmer helpline info & footer credits
```

---

## 🛠️ Tech Stack
- **Framework**: [React 19](https://react.dev/)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: CSS Keyframes + [Framer Motion](https://www.framer.com/motion/)
- **Vision Inference**: Built-in Canvas Pathology Heuristics + Optional [Google Gemini Vision API](https://ai.google.dev/)
- **Audio / TTS**: Browser Native Web SpeechSynthesis API

---

## 🤝 Contributing
Contributions are welcome! Feel free to open an issue or submit a pull request with new crop disease datasets, language translations, or agronomic tips.

## 📄 License
This project is open source and available under the [MIT License](LICENSE).
