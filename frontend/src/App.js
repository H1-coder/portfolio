import { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import About from './components/About';
import Background from './components/Background';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Skills from './components/Skills';
import { DEFAULT_PALETTE, PALETTES } from './theme/palettes';

const PALETTE_STORAGE_KEY = 'palette';

function getInitialPalette() {
  try {
    const saved = localStorage.getItem(PALETTE_STORAGE_KEY);
    if (saved && PALETTES[saved]) return saved;
  } catch {
    // Storage unavailable (private mode, blocked cookies): use the default.
  }
  return DEFAULT_PALETTE;
}

function App() {
  const [palette, setPalette] = useState(getInitialPalette);

  useEffect(() => {
    try {
      localStorage.setItem(PALETTE_STORAGE_KEY, palette);
    } catch {
      // Non-critical: the palette simply won't persist.
    }
  }, [palette]);

  return (
    <div
      className={`relative isolate min-h-screen overflow-x-clip bg-ink font-sans text-slate-300 antialiased selection:bg-brand-2/30 selection:text-white ${PALETTES[palette].vars}`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Background />
      <Navbar palette={palette} onPaletteChange={setPalette} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
