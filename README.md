# 📂 AI File Assistant  

[![License](https://img.shields.io/github/license/Safalguptaofficial/ai-file-assistant?color=blue)](LICENSE)  
[![Stars](https://img.shields.io/github/stars/Safalguptaofficial/ai-file-assistant?style=social)](https://github.com/Safalguptaofficial/ai-file-assistant/stargazers)  
[![Issues](https://img.shields.io/github/issues/Safalguptaofficial/ai-file-assistant)](https://github.com/Safalguptaofficial/ai-file-assistant/issues)  
[![Pull Requests](https://img.shields.io/github/issues-pr/Safalguptaofficial/ai-file-assistant)](https://github.com/Safalguptaofficial/ai-file-assistant/pulls)  
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](CONTRIBUTING.md)  
[![Build Status](https://img.shields.io/github/actions/workflow/status/Safalguptaofficial/ai-file-assistant/ci.yml?branch=main)](https://github.com/Safalguptaofficial/ai-file-assistant/actions)  

---

AI File Assistant is an **open-source platform for file compression, conversion, and intelligent AI tools**.  
It combines lightning-fast file utilities with AI-powered features like OCR, summarization, and smart compression recommendations.  

🚀 Think of it as a **smarter alternative to iLovePDF, SmallPDF, or TinyWow** — powered by AI.

---

## ✨ Features

### 🔧 Core File Tools
- 📑 **PDF Tools**: Merge, Split, Compress, Convert (Word ↔️ PDF, PPT ↔️ PDF, Excel ↔️ PDF, JPG ↔️ PDF).  
- 🖼 **Image Tools**: Resize, Compress, Convert (JPG ↔️ PNG ↔️ WebP, etc.).  
- 🎵 **Media Tools**: Video compression, Audio to MP3, Video to GIF.  
- 📦 **Archive Tools**: ZIP/RAR extractor and compressor.  

### 🧠 AI-Powered Features
- 🔍 **OCR Extraction**: Extract text from PDFs or images (multi-language, Tesseract).  
- 📖 **AI Summarization**: Generate concise summaries of large documents.  
- 🧮 **Smart Compression Advisor**: AI recommends best compression settings (image-heavy vs. text-heavy).  
- 💬 **Chat with File (Beta)**: Ask questions about your documents with AI answers.  

---

## 🏗 Tech Stack

**Frontend**  
- Next.js + TailwindCSS (Vercel hosting)  

**Backend (Core Service)**  
- Node.js / Express  
- File tools: Ghostscript, LibreOffice, ImageMagick, FFmpeg  

**Backend (AI Service)**  
- Python FastAPI (deployed on Railway)  
- Hugging Face models for summarization  
- Tesseract OCR for text extraction  
- FAISS for semantic search (chat with files)  

**Database / Storage**  
- Temporary storage (files auto-delete after 10 min)  
- MongoDB Atlas (for user history, optional)  

**Deployment**  
- Frontend → Vercel  
- Backend (Core) → Railway / Render  
- Backend (AI) → Railway / Render  

---

## 🚀 Getting Started

### 1️⃣ Clone Repo
```bash
git clone https://github.com/Safalguptaofficial/ai-file-assistant.git
cd ai-file-assistant
2️⃣ Setup Environment
Create .env files in both /core-service and /ai-service:
core-service/.env

PORT=5000
MAX_FILE_SIZE=10MB
ai-service/.env
PORT=8000
HUGGINGFACE_API_KEY=your_hf_key
3️⃣ Install Dependencies
Core Service
cd core-service
npm install
AI Service
cd ai-service
pip install -r requirements.txt
4️⃣ Run Locally
Core Service
npm run dev
AI Service
uvicorn main:app --reload
Frontend
cd frontend
npm install
npm run dev
Now open 👉 http://localhost:3000
🌍 Deployment
Frontend → Vercel
Core Service → Railway / Render
AI Service → Railway / Render
🛡 Security
🔒 Files auto-deleted after 10 minutes
⚡ Rate limiting to prevent abuse
🌐 HTTPS enforced in production
💰 Monetization Ideas
Freemium model → Free up to 10 files/day
Pro Plan → Unlimited conversions, larger files, priority AI (Stripe integration)
White-label API for businesses
🤝 Contributing
Contributions are welcome!
Fork the repo
Create a feature branch
Commit your changes
Open a Pull Request 🎉
📜 License
MIT License ©️ 2025 Safalguptaofficial
⭐ If you like this project, don’t forget to star the repo!

---

⚡ Pro tip: If you want the **GitHub Actions Build badge** to actually work, you need to add a workflow file like `.github/workflows/ci.yml`.  

👉 Do you want me to also create a **sample `ci.yml` GitHub Actions file** (Node.js + Python) for automated builds/tests so the badge won’t stay broken?
