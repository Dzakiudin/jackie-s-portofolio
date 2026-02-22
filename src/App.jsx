import React, { useState, useEffect } from 'react';
import CyberStrategist from './components/CyberStrategist';
import NeoMinimalist from './components/NeoMinimalist';
import ThemeSwitcher from './components/ThemeSwitcher';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'cyber';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', activeTheme);
    // Remove global classes when switching themes
    document.documentElement.className = '';
    document.body.className = 'm-0 p-0';
  }, [activeTheme]);

  return (
    <div className="app-container relative">
      <AnimatePresence mode="wait">
        {activeTheme === 'cyber' ? (
          <motion.div
            key="cyber"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full"
          >
            <CyberStrategist />
          </motion.div>
        ) : (
          <motion.div
            key="neo"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="w-full"
          >
            <NeoMinimalist />
          </motion.div>
        )}
      </AnimatePresence>

      <ThemeSwitcher
        currentTheme={activeTheme}
        onThemeChange={setActiveTheme}
      />
    </div>
  );
}

export default App;
