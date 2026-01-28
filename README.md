# 🔍 AI Resume Analyzer Lense

[![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?style=flat-square&logo=reactrouter)](https://reactrouter.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Puter.js](https://img.shields.io/badge/Powered%20by-Puter.js-blue?style=flat-square)](https://puter.com/)

An intelligent, high-performance resume analysis platform built for the modern era. **AI Resume Analyzer Lense** leverages cutting-edge AI to provide instant scoring, detailed feedback, and actionable insights to help candidates land their dream jobs.

![Hero Screenshot Placeholder](https://i.ibb.co.com/fVdkx9fL/score-details.png)

**Live link:** [https://ai-resume-analyzer-lense-8llxg.puter.site]https://ai-resume-analyzer-lense-8llxg.puter.site

## ✨ Features

- **� Mandatory Authentication**: Integrated with **Puter Auth**. Users must log in or register to unlock a free, lifetime access to the suite of AI resume analysis tools.
- **� Premium Analysis Report**: A sophisticated reporting engine that provides:
  - **Overall Score (0-100)**: A weighted average of your resume's effectiveness.
  - **Categorized Scoring**: Breakdown into **Tone & Style**, **Content**, **Structure**, and **Skills**.
  - **ATS Compatibility Score**: Dedicated analysis of how well your resume performs in Applicant Tracking Systems.
- **🛠️ Granular Feedback**: Each category includes interactive cards highlighting specific "Strengths" and "Areas for Improvement" with expert explanations.
- **📄 Advanced PDF Processing**: High-fidelity `pdfjs` conversion ensures the AI analyzes the exact visual layout and formatting of your resume.
- **☁️ Cloud Library**: Powered by **Puter FS**, your resumes are securely stored and synced across devices for lifetime management.
- **⚡ Performance First**: Built with **React Router 7** and **Tailwind CSS 4** for a blazing-fast, premium user experience.

## 🛠️ Tech Stack

- **Frontend**: [React Router 7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State**: [Zustand](https://github.com/pmndrs/zustand)
- **Backend & AI**: [Puter.js](https://puter.com/docs/)
  - **Puter AI (GPT-4o)**: Powers the intelligent analysis engine.
  - **Puter Auth**: Seamless registration/login experience.
  - **Puter FS**: Secure cloud storage for documents.
  - **Puter KV**: User preferences and persistent state.
- **PDF Core**: [pdfjs-dist](https://mozilla.github.io/pdf.js/)

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+)
- A [Puter.com](https://puter.com) account

### Installation

1. **Clone & Enter**:
   ```bash
   git clone https://github.com/fl9mdasif/ai-resume-analyzer-with-score.git
   cd ai-resume-analyzer-with-score
   ```

2. **Setup**:
   ```bash
   npm install
   ```

3. **Launch**:
   ```bash
   npm run dev
   ```

## 🏗️ Architecture

1. **Auth Gate**: Puter Auth ensures data persistence and provides the "Lifetime" access experience.
2. **Visual Parser**: `pdfjs` converts PDF layers for the AI to "see" your resume exactly as a human recruiter would.
3. **AI Core**: GPT-4o processes the visual and text data to generate deep technical critiques.
4. **Report Engine**: A modular UI system (Summary, ATS, Details) renders the AI's JSON output into a premium, interactive dashboard.

---

Built with ❤️ using **React Router** and **Puter.js**.
