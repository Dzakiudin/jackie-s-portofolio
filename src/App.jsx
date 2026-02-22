import React, { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import ThemeSwitcher from './components/ThemeSwitcher';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy load theme components for better initial bundle size
const CyberStrategist = lazy(() => import('./components/CyberStrategist'));
const NeoMinimalist = lazy(() => import('./components/NeoMinimalist'));

// Loading skeleton shown while lazy component loads
const ThemeLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-sm text-gray-500 font-mono tracking-widest uppercase">Loading theme...</p>
    </div>
  </div>
);

function App() {
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'cyber';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', activeTheme);
    // Clean global classes to prevent CSS leaks between themes
    document.documentElement.className = '';
    document.body.className = '';
  }, [activeTheme]);

  const handleThemeChange = useCallback((theme) => {
    // Scroll to top on theme switch for clean transition
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveTheme(theme);
  }, []);

  return (
    <div className="app-container relative">
      <Suspense fallback={<ThemeLoader />}>
        <AnimatePresence mode="wait">
          {activeTheme === 'cyber' ? (
            <motion.div
              key="cyber"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <CyberStrategist />
            </motion.div>
          ) : (
            <motion.div
              key="neo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="w-full"
            >
              <NeoMinimalist />
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>

      <ThemeSwitcher
        currentTheme={activeTheme}
        onThemeChange={handleThemeChange}
      />
    </div>
  );
}

export default App;
