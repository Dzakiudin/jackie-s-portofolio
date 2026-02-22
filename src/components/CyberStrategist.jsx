import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './CyberStrategist.css';

// ── Data Constants (DRY) ──────────────────────────────────────────────
const SKILLS_DATA = [
    {
        title: 'Skill Kognitif', color: 'var(--accent-cyan)', items: [
            { name: 'Critical Thinking', desc: 'Menganalisis bukti & argumen sebelum percaya.' },
            { name: 'Problem Solving', desc: 'Menemukan solusi sistematis untuk masalah kompleks.' },
            { name: 'Strategic Thinking', desc: 'Keputusan jangka panjang dengan perhitungan matang.' },
            { name: 'Analytical Thinking', desc: 'Mengurai pola dengan cara terstruktur.' },
            { name: 'Creativity & Innovation', desc: 'Membuat atau mengembangkan ide unik.' },
            { name: 'Decision Making', desc: 'Memilih opsi terbaik, termasuk di bawah tekanan.' },
            { name: 'Research & Reasoning', desc: 'Mengumpulkan data valid dan menarik kesimpulan logis.' },
        ]
    },
    {
        title: 'Komunikasi & Sosial', color: 'var(--accent-purple)', items: [
            { name: 'Persuasion & Negotiation', desc: 'Membujuk tanpa paksaan, menghasilkan kesepakatan.' },
            { name: 'Storytelling', desc: 'Menyampaikan informasi lewat narasi yang mengikat.' },
            { name: 'Active Listening', desc: 'Mendengarkan untuk mengerti, bukan sekadar merespon.' },
            { name: 'Empathy & EQ', desc: 'Memahami emosi orang dan merespons tepat.' },
            { name: 'Body Language Reading', desc: 'Membaca gesture, ekspresi, nada untuk insight tersembunyi.' },
            { name: 'Social Calibration', desc: 'Menyesuaikan perilaku sesuai konteks sosial.' },
        ]
    },
    {
        title: 'Teknis / Digital', color: 'var(--accent-cyan)', items: [
            { name: 'Programming / Coding', desc: 'Menulis logika & instruksi untuk komputer.' },
            { name: 'Data Analysis', desc: 'Membaca data untuk insight & keputusan.' },
            { name: 'Video Editing & Animation', desc: 'Menyusun video jadi cerita visual engaging.' },
            { name: 'UI/UX Design', desc: 'Membuat antarmuka nyaman dan intuitif.' },
            { name: 'Web/App Development', desc: 'Membangun situs atau aplikasi dari nol.' },
            { name: 'Blockchain & Crypto', desc: 'Pemahaman aset digital, staking, trading, DeFi.' },
            { name: 'Automation / Scripting', desc: 'Membuat alur kerja otomatis untuk efisiensi.' },
        ]
    },
    {
        title: 'Fisik / Motorik', color: 'var(--accent-purple)', items: [
            { name: 'Strength Training / Bodybuilding', desc: 'Latihan kekuatan berbasis teknik.' },
            { name: 'Cooking / Crafting / Gardening', desc: 'Keterampilan manual yang melatih ketelitian.' },
            { name: 'Fine Motor Skills', desc: 'Ketelitian tangan (menulis, melukis, instrumen).' },
        ]
    },
    {
        title: 'Kreatif & Artistik', color: 'var(--accent-cyan)', items: [
            { name: 'Design Thinking', desc: 'Menggabungkan logika dan seni untuk solusi kreatif.' },
        ]
    },
    {
        title: 'Emosional & Spiritual', color: 'var(--accent-purple)', items: [
            { name: 'Self-Awareness', desc: 'Memahami kekuatan, kelemahan, motif diri.' },
            { name: 'Self-Discipline', desc: 'Konsistensi melakukan hal benar walau sedang malas.' },
            { name: 'Stress Management', desc: 'Mengelola emosi dan tekanan secara efektif.' },
            { name: 'Resilience', desc: 'Bangkit kembali setelah kegagalan.' },
            { name: 'Philosophical Reasoning', desc: 'Nalar tentang makna hidup, etika, kebenaran.' },
        ]
    },
    {
        title: 'Bisnis & Uang', color: 'var(--accent-cyan)', items: [
            { name: 'Investasi & Trading', desc: 'Membuat uang bekerja untuk Anda.' },
            { name: 'Marketing & Branding', desc: 'Membuat produk/ide dikenal & disukai.' },
            { name: 'Finance Management', desc: 'Mengatur keuangan pribadi/organisasi bijak.' },
            { name: 'Entrepreneurship', desc: 'Mengubah ide menjadi bisnis nyata.' },
        ]
    },
    {
        title: 'Meta (Skill Pengganda)', color: 'var(--accent-purple)', items: [
            { name: 'Learning How to Learn', desc: 'Metode belajar efektif, bukan sekadar rajin.' },
            { name: 'Time Management', desc: 'Mengatur waktu agar produktif tanpa burnout.' },
            { name: 'Habit Building', desc: 'Membangun kebiasaan positif jangka panjang.' },
            { name: 'Systems Thinking', desc: 'Melihat dunia sebagai sistem terhubung.' },
            { name: 'Pattern Recognition', desc: 'Menemukan pola tersembunyi di data/kejadian.' },
        ]
    },
    {
        title: 'Langka & Tersembunyi', color: 'var(--accent-cyan)', items: [
            { name: 'Idea Synthesis', desc: 'Menggabungkan hal tak terkait jadi ide brilian.' },
            { name: 'Subcommunication', desc: 'Menyampaikan pesan lewat tone, gesture, vibe.' },
            { name: 'Teaching / Simplifying', desc: 'Menyederhanakan hal rumit jadi mudah dimengerti.' },
            { name: 'Behavioral Insight', desc: 'Membaca motivasi & pola pikir orang lain.' },
        ]
    },
];

const PROJECTS_DATA = [
    { title: 'YT Dubber', url: 'https://github.com/Dzakiudin/YT-Dubber-Lite-sederhana', desc: 'Ekstensi Chrome sederhana untuk memberikan dubbing (sulih suara) secara real-time pada video YouTube...', tags: ['Extension', 'SpeechSynthesis'] },
    { title: 'Indikator TradingView', url: 'https://github.com/Dzakiudin/Indikator-dan-strategi-TradingView', desc: 'Indikator TradingView profesional untuk analisis teknikal dengan sinyal akurat dan real-time.', tags: ['Pine Script', 'Trading', 'TradingView'] },
    { title: 'Manifest & Lua Generator', url: 'https://github.com/Dzakiudin/GenLua-V2-Manifest-Lua-Generator-for-SteamTools-Injector', desc: 'Alat untuk secara otomatis menghasilkan file manifest.json dan skrip .lua untuk SteamTools Injector.', tags: ['Lua', 'Manifest'] },
    { title: 'Auto Poke Facebook', url: 'https://github.com/Dzakiudin/Poke-Master-3000', desc: 'Ekstensi Chrome yang bikin lu bisa colek semua teman di Facebook secara otomatis.', tags: ['Auto click', 'Extension'] },
];

// ── Reusable Icon Component ──────────────────────────────────────────
const ExternalLinkIcon = ({ className = '' }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

// ── Main Component ───────────────────────────────────────────────────
const CyberStrategist = () => {
    const [isLightMode, setIsLightMode] = useState(false);
    const [engineInit, setEngineInit] = useState(false);
    const [openSkills, setOpenSkills] = useState({});
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navbarRef = useRef(null);
    const scrollRAF = useRef(null);

    // ── tsParticles Engine Init ──
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setEngineInit(true));
    }, []);

    // ── Particles Options (memoized based on theme) ──
    const particlesOptions = useMemo(() => ({
        fullScreen: { enable: false },
        particles: {
            number: { value: 40, density: { enable: true, width: 800, height: 800 } },
            color: { value: isLightMode ? '#7b1aa3' : '#00ffff' },
            shape: { type: 'circle' },
            opacity: { value: { min: 0.2, max: 0.5 } },
            size: { value: { min: 1, max: 3 } },
            links: { enable: true, distance: 150, color: isLightMode ? '#078a8a' : '#a020f0', opacity: 0.25, width: 1 },
            move: { enable: true, speed: 0.8, direction: 'none', outModes: 'out' },
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: 'grab' },
                onClick: { enable: true, mode: 'push' },
            },
            modes: {
                grab: { distance: 140, links: { opacity: 0.6 } },
                push: { quantity: 3 },
            },
        },
        detectRetina: true,
    }), [isLightMode]);

    // ── Theme class management ──
    useEffect(() => {
        const html = document.documentElement;
        if (isLightMode) { html.classList.add('light'); }
        else { html.classList.remove('light'); }
        return () => html.classList.remove('light');
    }, [isLightMode]);

    // ── Throttled Scroll Handler (rAF-based) ──
    useEffect(() => {
        const handleScroll = () => {
            if (scrollRAF.current) return;
            scrollRAF.current = requestAnimationFrame(() => {
                const navbar = navbarRef.current;
                if (navbar) {
                    if (window.scrollY > 50) navbar.classList.add('navbar-scrolled');
                    else navbar.classList.remove('navbar-scrolled');
                }
                scrollRAF.current = null;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current);
        };
    }, []);

    // ── IntersectionObserver for scroll reveal ──
    useEffect(() => {
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // ── Interactive card glow ──
    useEffect(() => {
        const cards = document.querySelectorAll('.project-card-wrapper');
        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        };
        cards.forEach(card => card.addEventListener('mousemove', handleMouseMove));
        return () => cards.forEach(card => card.removeEventListener('mousemove', handleMouseMove));
    }, []);

    const toggleTheme = useCallback(() => setIsLightMode(prev => !prev), []);
    const handleExploreClick = useCallback((e) => {
        e.currentTarget.classList.add('clicked');
        setTimeout(() => e.currentTarget.classList.remove('clicked'), 1000);
        document.getElementById('tentang')?.scrollIntoView({ behavior: 'smooth' });
    }, []);
    const toggleSkill = useCallback((title) => {
        setOpenSkills(prev => ({ ...prev, [title]: !prev[title] }));
    }, []);
    const expandAllSkills = useCallback(() => {
        const allOpen = SKILLS_DATA.every(s => openSkills[s.title]);
        const next = {};
        SKILLS_DATA.forEach(s => { next[s.title] = !allOpen; });
        setOpenSkills(next);
    }, [openSkills]);

    return (
        <div className="cyber-strategist bg-[var(--bg-color)] text-[var(--text-color)] font-['Inter',sans-serif] min-h-screen relative overflow-x-hidden">
            {/* Particle Background — tsParticles */}
            {engineInit && (
                <Particles
                    id="tsparticles"
                    options={particlesOptions}
                    className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
                />
            )}

            {/* Header / Navbar — FULL WIDTH */}
            <header ref={navbarRef} className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                <nav className="w-full px-4 md:px-8 py-4 flex justify-between items-center" role="navigation" aria-label="Main navigation">
                    <a href="#home" className="text-2xl md:text-3xl font-orbitron font-bold relative z-[60]" style={{ textShadow: '0 0 5px var(--accent-cyan)' }} aria-label="Home">J</a>
                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['home', 'tentang', 'skill', 'proyek', 'insight', 'kontak'].map((id) => (
                            <a key={id} href={`#${id}`} className="hover:text-[var(--accent-cyan)] transition-colors capitalize cursor-pointer">{id === 'tentang' ? 'Tentang' : id === 'proyek' ? 'Proyek' : id === 'kontak' ? 'Kontak' : id.charAt(0).toUpperCase() + id.slice(1)}</a>
                        ))}
                    </div>
                    {/* Right side: Theme Toggle + Hamburger */}
                    <div className="flex items-center gap-2 relative z-[60]">
                        {/* Dark Mode Toggle — always visible */}
                        <button onClick={toggleTheme} className="p-2.5 rounded-lg border border-white/10 hover:border-[var(--accent-cyan)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] cursor-pointer transition-all duration-200" aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}>
                            {isLightMode ? (
                                <svg className="w-5 h-5 text-[var(--accent-cyan)]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5 text-[var(--accent-cyan)]" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 5.05A1 1 0 003.636 3.636l-.707.707a1 1 0 101.414 1.414l.707-.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zM6.464 14.95l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414z" fillRule="evenodd" clipRule="evenodd" />
                                </svg>
                            )}
                        </button>
                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden p-2.5 rounded-lg border border-white/10 hover:border-[var(--accent-cyan)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] cursor-pointer transition-all duration-200"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden backdrop-blur-xl border-t border-[var(--accent-cyan)]/20 px-6 py-2 relative z-[55]" style={{ backgroundColor: 'var(--bg-color)', opacity: 0.97 }}>
                        {['home', 'tentang', 'skill', 'proyek', 'insight', 'kontak'].map((id) => (
                            <a
                                key={id}
                                href={`#${id}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMobileMenuOpen(false);
                                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="block text-base font-medium text-[var(--text-color)] hover:text-[var(--accent-cyan)] hover:pl-2 transition-all duration-200 capitalize cursor-pointer py-4 border-b border-[var(--text-color)]/10 last:border-b-0"
                            >
                                {id === 'tentang' ? 'Tentang' : id === 'proyek' ? 'Proyek' : id === 'kontak' ? 'Kontak' : id.charAt(0).toUpperCase() + id.slice(1)}
                            </a>
                        ))}
                    </div>
                )}
            </header>

            <main>
                {/* Hero Section */}
                <section id="home" className="h-[100dvh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
                    <h1 className="font-orbitron text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold neon-text leading-tight px-2">
                        Hi, I'm Jackie<br />building logic into reality.
                    </h1>
                    <p className="mt-4 md:mt-6 text-base md:text-xl max-w-2xl text-[var(--text-color)] px-4">
                        Teknologi, logika, dan strategi dalam satu pola pikir.
                    </p>
                    <button className="hero-button mt-8 md:mt-12 cursor-pointer text-sm md:text-base" onClick={handleExploreClick} aria-label="Explore content below">
                        Explore My World
                    </button>
                    <div className="horizontal-light-line" />
                </section>

                {/* Tentang Saya */}
                <section id="tentang" className="container mx-auto py-12 md:py-20 px-4 md:px-6 reveal">
                    <h2 className="font-orbitron text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 neon-text">
                        About <span className="text-white opacity-90 mix-blend-difference">Me</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="max-w-lg">
                            <p className="text-base md:text-lg leading-relaxed text-[var(--text-color)]">
                                Saya memiliki ketertarikan yang kuat terhadap teknologi, sistem yang efisien, serta inovasi
                                futuristik yang dapat mengubah cara manusia berpikir dan bekerja.
                                <br /><br />
                                Dengan pendekatan yang analitis dan strategis, saya berfokus pada pengembangan tools dan sistem
                                yang mengoptimalkan proses, mengotomatisasi alur kerja, serta menciptakan nilai dari kompleksitas.
                                <br /><br />
                                Tujuan saya adalah menghadirkan solusi yang tidak hanya fungsional, tetapi juga berkelanjutan
                                dan berdampak nyata.
                            </p>
                        </div>
                        <div>
                            <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Digital brain illustration">
                                <defs>
                                    <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur" /><feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                                    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: 'var(--accent-cyan)', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: 'var(--accent-purple)', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <path d="M100,10 C40,10 30,70 30,70 C30,70 20,110 100,110 C180,110 170,70 170,70 C170,70 160,10 100,10 Z" fill="none" stroke="url(#brainGradient)" strokeWidth="2" filter="url(#glow)" />
                                <circle cx="100" cy="60" r="3" fill="var(--accent-cyan)" /><circle cx="80" cy="40" r="2" fill="var(--accent-cyan)" /><circle cx="120" cy="40" r="2" fill="var(--accent-cyan)" /><circle cx="70" cy="80" r="2" fill="var(--accent-purple)" /><circle cx="130" cy="80" r="2" fill="var(--accent-purple)" />
                                <path d="M100 60 Q 85 50 80 40" stroke="var(--accent-cyan)" strokeWidth="0.5" fill="none" opacity="0.7" /><path d="M100 60 Q 115 50 120 40" stroke="var(--accent-cyan)" strokeWidth="0.5" fill="none" opacity="0.7" />
                                <path d="M100 60 Q 80 70 70 80" stroke="var(--accent-purple)" strokeWidth="0.5" fill="none" opacity="0.7" /><path d="M100 60 Q 120 70 130 80" stroke="var(--accent-purple)" strokeWidth="0.5" fill="none" opacity="0.7" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Keahlian — DRY rendered */}
                <section id="skill" className="container mx-auto py-12 md:py-20 px-4 md:px-6 reveal">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
                        <h2 className="font-orbitron text-2xl md:text-4xl font-bold neon-text">
                            Keahlian <span className="text-white opacity-90 mix-blend-difference">Saya</span>
                        </h2>
                        <button onClick={expandAllSkills} className="text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[var(--accent-cyan)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-black transition-all cursor-pointer" aria-label="Toggle all skills">
                            {SKILLS_DATA.every(s => openSkills[s.title]) ? 'Tutup Semua' : 'Buka Semua'}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {SKILLS_DATA.map((skill) => (
                            <article key={skill.title} className="skill-card-animated cursor-pointer" onClick={() => toggleSkill(skill.title)} role="button" tabIndex={0} aria-expanded={!!openSkills[skill.title]} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSkill(skill.title); } }}>
                                <div className="flex justify-between items-center">
                                    <h3 className="font-orbitron text-base md:text-xl font-bold" style={{ color: skill.color }}>{skill.title}</h3>
                                    <svg className={`w-5 h-5 transition-transform duration-300 ${openSkills[skill.title] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true" style={{ color: skill.color }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                {openSkills[skill.title] && (
                                    <ul className="text-xs md:text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)] mt-3 animate-[fadeIn_0.2s_ease-out]">
                                        {skill.items.map((item) => (
                                            <li key={item.name}><strong>{item.name}</strong> — {item.desc}</li>
                                        ))}
                                    </ul>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                {/* Proyek — DRY rendered */}
                <section id="proyek" className="container mx-auto py-12 md:py-20 px-4 md:px-6 reveal">
                    <h2 className="font-orbitron text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 neon-text">Proyek Unggulan</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                        {PROJECTS_DATA.map((project) => (
                            <div key={project.title} className="group">
                                <div className="project-card-wrapper h-full">
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card-content block cursor-pointer">
                                        <div>
                                            <div className="flex justify-between items-start mb-3">
                                                <h3 className="font-orbitron text-lg md:text-2xl font-bold text-white group-hover:text-[var(--accent-cyan)] transition-colors">{project.title}</h3>
                                                <ExternalLinkIcon className="text-gray-400 group-hover:text-[var(--accent-cyan)] transition-colors" />
                                            </div>
                                            <p className="mb-6 text-sm leading-relaxed">{project.desc}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map(tag => <span key={tag} className="project-tag">{tag}</span>)}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Insight */}
                <section id="insight" className="container mx-auto py-12 md:py-20 px-4 md:px-6 reveal">
                    <h2 className="font-orbitron text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 neon-text">
                        Digital <span className="text-white opacity-90 mix-blend-difference">Reflections</span>
                    </h2>
                    <div className="space-y-8 max-w-2xl mx-auto">
                        <blockquote className="border-l-4 border-[var(--accent-cyan)] pl-6 py-2">
                            <p className="text-xl italic">"Strategi terbaik lahir dari keheningan pikiran."</p>
                        </blockquote>
                        <blockquote className="border-l-4 border-[var(--accent-purple)] pl-6 py-2">
                            <p className="text-xl italic">"Teknologi tanpa arah adalah kekacauan yang cantik."</p>
                        </blockquote>
                    </div>
                </section>

                {/* Kontak */}
                <section id="kontak" className="container mx-auto py-12 md:py-20 px-4 md:px-6 text-center reveal">
                    <h2 className="font-orbitron text-xl md:text-3xl font-bold mb-4">Siap berkolaborasi untuk masa depan?</h2>
                    <p className="mb-6 md:mb-8 text-[var(--card-text-color)]">Hubungi saya melalui platform berikut.</p>
                    <div className="flex justify-center space-x-4 md:space-x-6">
                        <a href="https://github.com/Dzakiudin" className="text-gray-400 hover:text-[var(--accent-cyan)] transition-colors cursor-pointer" aria-label="GitHub Profile">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/ahmad-dzakiudin-30404b344/" className="text-gray-400 hover:text-[var(--accent-cyan)] transition-colors cursor-pointer" aria-label="LinkedIn Profile">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                        </a>
                    </div>
                </section>
            </main>

            <footer className="border-t-2 border-[var(--accent-cyan)] mt-20">
                <div className="container mx-auto py-8 px-6 text-center text-[var(--card-text-color)]">
                    <p className="italic">"Simplicity is the ultimate sophistication."</p>
                    <p className="text-sm mt-1">— Leonardo da Vinci</p>
                    <p className="text-xs mt-4">&copy; 2025 Jaki. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default CyberStrategist;
