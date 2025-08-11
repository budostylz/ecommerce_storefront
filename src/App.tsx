import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useApplyDesignTokens } from "src/hooks/useApplyDesignTokens";
import { previewData } from './utils/previewData';
import { Toaster } from "react-hot-toast";

import Home from './pages/Home';
import Contact from './pages/Contact';

function App() {


  return (

    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contact" element={<Contact />} />

        </Routes>
      </Router>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#111",
            color: "#fff",
            fontSize: "14px",
            borderRadius: "8px",
            padding: "12px 16px",
          },
        }}
      />

    </>

  );
}

export default App;

// 🧠 Apply CSS custom properties as design tokens
function applyDesignTokens(tokens: Record<string, string>) {
  const root = document.documentElement;
  for (const [key, value] of Object.entries(tokens)) {
    root.style.setProperty(key, value);
  }
}

// 🔍 Build a CSS path to the clicked element (for debugging / selection)
function getPathFromBody(el: HTMLElement, body: HTMLElement): string {
  const path: string[] = [];
  let current: HTMLElement | null = el;

  while (current && current !== body) {
    const parent: HTMLElement | null = current.parentElement;
    if (!parent) break;

    const index = Array.from(parent.children).indexOf(current) + 1;
    path.unshift(`${current.tagName.toLowerCase()}:nth-child(${index})`);
    current = parent;
  }

  return `body > ${path.join(' > ')}`;
}
