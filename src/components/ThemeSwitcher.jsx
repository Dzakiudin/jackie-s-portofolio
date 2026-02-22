import React from 'react';

const ThemeSwitcher = ({ currentTheme, onThemeChange }) => {
    return (
        <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-2">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex shadow-lg">
                <button
                    onClick={() => onThemeChange('cyber')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${currentTheme === 'cyber'
                            ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Cyber
                </button>
                <button
                    onClick={() => onThemeChange('neo')}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${currentTheme === 'neo'
                            ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(0,255,170,0.5)]'
                            : 'text-gray-400 hover:text-white'
                        }`}
                >
                    Neo
                </button>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-gray-400/80 font-mono bg-black/40 px-2 py-0.5 rounded-full">
                Portfolio Theme
            </span>
        </div>
    );
};

export default ThemeSwitcher;
