import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Delayed entrance animation
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 80, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 25 }}
                    className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-2"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                >
                    {/* Tooltip */}
                    <AnimatePresence>
                        {showTooltip && (
                            <motion.span
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.15 }}
                                className="absolute -top-10 whitespace-nowrap text-[11px] uppercase tracking-wider text-gray-300 font-mono bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10"
                            >
                                Switch Portfolio Theme
                            </motion.span>
                        )}
                    </AnimatePresence>

                    {/* Glassmorphism Pill */}
                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-1 flex shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden">
                        {/* Animated background indicator */}
                        <motion.div
                            className="absolute top-1 bottom-1 rounded-xl"
                            animate={{
                                left: currentTheme === 'cyber' ? '4px' : '50%',
                                width: 'calc(50% - 4px)',
                                background: currentTheme === 'cyber'
                                    ? 'linear-gradient(135deg, rgba(0,255,255,0.15), rgba(160,32,240,0.1))'
                                    : 'linear-gradient(135deg, rgba(0,255,170,0.15), rgba(52,211,153,0.1))',
                            }}
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                            style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                        />

                        <button
                            onClick={() => onThemeChange('cyber')}
                            aria-label="Switch to Cyber Strategist theme"
                            className={`relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${currentTheme === 'cyber'
                                    ? 'text-cyan-300'
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {/* Cyber Icon */}
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            CYBER
                            {currentTheme === 'cyber' && (
                                <motion.div
                                    layoutId="active-dot"
                                    className="w-1.5 h-1.5 rounded-full bg-cyan-400"
                                    style={{ boxShadow: '0 0 6px rgba(0,255,255,0.6)' }}
                                />
                            )}
                        </button>

                        <button
                            onClick={() => onThemeChange('neo')}
                            aria-label="Switch to Neo Minimalist theme"
                            className={`relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${currentTheme === 'neo'
                                    ? 'text-emerald-300'
                                    : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {/* Neo Icon */}
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            NEO
                            {currentTheme === 'neo' && (
                                <motion.div
                                    layoutId="active-dot"
                                    className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                                    style={{ boxShadow: '0 0 6px rgba(0,255,170,0.6)' }}
                                />
                            )}
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ThemeSwitcher;
