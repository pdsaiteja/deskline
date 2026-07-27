# Deskline — RAG Support Chatbot

Deskline is a local React application that simulates a retrieval-augmented support chatbot. Users can ingest FAQ documents, ask customer-style questions, and review admin metrics such as deflection rate, handoffs, and CSAT.

This project was migrated from a single-file Claude Artifact into a professional multi-file React codebase for local development.

## Features

- FAQ document ingestion with validation
- TF-IDF cosine similarity matching (client-side RAG simulation)
- Chat interface with matched answers, confidence scores, and citations
- Fallback responses with human handoff
- Simulated admin dashboard with metrics and fallback log
- Local persistence via `localStorage` (FAQs, stats, fallback log)

## Tech Stack

- React 19
- Vite 6
- Plain CSS (no UI framework)

## Project Structure

```
deskline/
├── public/
├── src/
│   ├── components/
│   │   ├── AdminPanel.jsx
│   │   ├── Brand.jsx
│   │   ├── ChatPanel.jsx
│   │   ├── ChatThread.jsx
│   │   ├── FaqIngestion.jsx
│   │   └── FaqList.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── styles/
│   │   └── App.css
│   ├── utils/
│   │   └── ragMatcher.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
npm run preview
```

## Usage

1. Add FAQs in the left panel.
2. Ask a question in the center chat panel.
3. Toggle admin login on the right to view metrics.
4. Refresh the page — FAQs and stats persist in the browser.

## Assignment Notes

- **Path taken:** Path A — migrated from Claude Artifact
- **IDE:** Cursor with AI agent assistance
- **Original artifact:** Deskline RAG Support Chatbot (Workshop 1.4)

## License

Educational project for IWU coursework.
