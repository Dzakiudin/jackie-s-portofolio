import React, { useEffect, useState, useRef, useCallback } from 'react';
import './NeoMinimalist.css';

// ── Data Constants (DRY) ──────────────────────────────────────────────
const NAV_SECTIONS = ['home', 'tentang', 'skill', 'proyek', 'kontak'];

const SKILLS_DATA = [
    {
        title: 'Skill Kognitif', delay: '0s', items: [
            { name: 'Critical Thinking', desc: 'Analisis bukti & logika sebelum percaya.' },
            { name: 'Problem Solving', desc: 'Menemukan solusi sistematis untuk masalah kompleks.' },
            { name: 'Strategic Thinking', desc: 'Keputusan jangka panjang dengan perhitungan.' },
            { name: 'Analytical Thinking', desc: 'Mengurai pola dari bagian kecil.' },
            { name: 'Creativity & Innovation', desc: 'Menghasilkan atau mengembangkan ide unik.' },
            { name: 'Decision Making', desc: 'Memilih opsi terbaik terutama di tekanan.' },
            { name: 'Research & Reasoning', desc: 'Mengumpulkan data valid & menarik kesimpulan.' },
        ]
    },
    {
        title: 'Komunikasi & Sosial', delay: '0.08s', items: [
            { name: 'Persuasion & Negotiation', desc: 'Membujuk tanpa memaksa.' },
            { name: 'Storytelling', desc: 'Menyampaikan info dengan narasi yang mengikat.' },
            { name: 'Active Listening', desc: 'Mendengar untuk memahami, bukan hanya menjawab.' },
            { name: 'Empathy & EQ', desc: 'Membaca & merespon emosi orang lain.' },
            { name: 'Body Language Reading', desc: 'Membaca gesture, ekspresi, nada suara.' },
            { name: 'Social Calibration', desc: 'Menyesuaikan perilaku sesuai konteks sosial.' },
        ]
    },
    {
        title: 'Teknis / Digital', delay: '0.16s', items: [
            { name: 'Programming / Coding', desc: 'Membangun logika & instruksi untuk mesin.' },
            { name: 'Data Analysis', desc: 'Membaca data & membuat keputusan berdasar data.' },
            { name: 'Video Editing & Animation', desc: 'Menyusun cerita visual yang engaging.' },
            { name: 'UI/UX Design', desc: 'Membuat antarmuka yang nyaman & intuitif.' },
            { name: 'Web/App Development', desc: 'Membangun aplikasi & situs dari nol.' },
            { name: 'Blockchain & Crypto', desc: 'Pengetahuan aset digital, staking & trading.' },
            { name: 'Automation / Scripting', desc: 'Membuat proses berjalan otomatis.' },
        ]
    },
    {
        title: 'Fisik / Motorik', delay: '0.24s', items: [
            { name: 'Strength Training / Bodybuilding', desc: 'Latihan kekuatan & hipertrofi.' },
            { name: 'Cooking / Crafting / Gardening', desc: 'Keterampilan manual & kesabaran.' },
            { name: 'Fine Motor Skills', desc: 'Ketelitian tangan (menulis, melukis, instrumen).' },
        ]
    },
    {
        title: 'Kreatif & Artistik', delay: '0.32s', items: [
            { name: 'Design Thinking', desc: 'Menggabungkan logika & seni untuk solusi kreatif.' },
        ]
    },
    {
        title: 'Emosional & Spiritual', delay: '0.40s', items: [
            { name: 'Self-Awareness', desc: 'Mengenal kekuatan, kelemahan, dan motif diri.' },
            { name: 'Self-Discipline', desc: 'Konsistensi melakukan hal benar.' },
            { name: 'Stress Management', desc: 'Mengatur emosi & tekanan.' },
            { name: 'Resilience', desc: 'Bangkit kembali setelah kegagalan.' },
            { name: 'Philosophical Reasoning', desc: 'Nalar tentang makna, etika, & kebenaran.' },
        ]
    },
    {
        title: 'Bisnis & Uang', delay: '0.48s', items: [
            { name: 'Investasi & Trading', desc: 'Membuat aset bekerja untuk Anda.' },
            { name: 'Marketing & Branding', desc: 'Membuat produk/ide dikenal & disukai.' },
            { name: 'Finance Management', desc: 'Mengatur keuangan pribadi/organisasi.' },
            { name: 'Entrepreneurship', desc: 'Mengubah ide menjadi bisnis nyata.' },
        ]
    },
    {
        title: 'Meta (Skill Pengganda)', delay: '0.56s', items: [
            { name: 'Learning How to Learn', desc: 'Cara belajar efektif.' },
            { name: 'Time Management', desc: 'Mengatur waktu tanpa burnout.' },
            { name: 'Habit Building', desc: 'Membangun kebiasaan positif jangka panjang.' },
            { name: 'Systems Thinking', desc: 'Melihat dunia sebagai sistem yang terhubung.' },
            { name: 'Pattern Recognition', desc: 'Melihat pola tersembunyi dari data/kejadian.' },
        ]
    },
    {
        title: 'Langka & Tersembunyi', delay: '0.64s', items: [
            { name: 'Idea Synthesis', desc: 'Menggabungkan hal yang tak berhubungan jadi ide brilian.' },
            { name: 'Subcommunication', desc: 'Menyampaikan pesan lewat tone & gesture.' },
            { name: 'Teaching / Simplifying', desc: 'Menjelaskan yang rumit jadi sederhana.' },
            { name: 'Behavioral Insight', desc: 'Membaca motivasi & pola pikir orang lain.' },
        ]
    },
];

const PROJECTS_DATA = [
    { title: 'YT Dubber', url: 'https://github.com/Dzakiudin/YT-Dubber-Lite-sederhana', desc: 'Ekstensi Chrome sederhana untuk memberikan dubbing (sulih suara) secara real-time pada video YouTube dengan membaca dan menerjemahkan subtitle yang tersedia.', tags: ['Extension', 'SpeechSynthesis'], icon: 'M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75' },
    { title: 'Indikator TradingView', url: 'https://github.com/Dzakiudin/Indikator-dan-strategi-TradingView', desc: 'Indikator TradingView profesional untuk analisis teknikal dengan sinyal akurat dan real-time.', tags: ['Pine Script', 'Trading', 'TradingView'], icon: 'M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28a11.95 11.95 0 0 0-5.814 5.518l-4.306-4.306L2.25 18Z' },
    { title: 'Manifest & Lua Generator', url: 'https://github.com/Dzakiudin/GenLua-V2-Manifest-Lua-Generator-for-SteamTools-Injector', desc: 'Alat sederhana dan efisien yang secara otomatis menghasilkan file manifest.json dan skrip .lua.', tags: ['Lua', 'Manifest'], icon: 'm3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z' },
];

// ── Reusable Components ──
const ExternalLinkIcon = () => (
    <svg className="w-6 h-6 project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
);

// ── Main Component ─────────────────────────────────────────────────
const NeoMinimalist = () => {
    const [isLightMode, setIsLightMode] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openSkills, setOpenSkills] = useState({});
    const scrollRAF = useRef(null);

    // ── Theme class management ──
    useEffect(() => {
        if (isLightMode) document.body.classList.add('light-mode');
        else document.body.classList.remove('light-mode');
        return () => document.body.classList.remove('light-mode');
    }, [isLightMode]);

    // ── Throttled scroll handler (rAF) + IntersectionObserver ──
    useEffect(() => {
        const handleScroll = () => {
            if (scrollRAF.current) return;
            scrollRAF.current = requestAnimationFrame(() => {
                const sections = document.querySelectorAll('main section');
                let current = 'home';
                sections.forEach(section => {
                    if (window.pageYOffset >= section.offsetTop - 100) {
                        current = section.getAttribute('id');
                    }
                });
                setActiveSection(current);
                scrollRAF.current = null;
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        // IntersectionObserver for fade-in
        const fadeSections = document.querySelectorAll('.fade-in-section');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        fadeSections.forEach(section => observer.observe(section));

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollRAF.current) cancelAnimationFrame(scrollRAF.current);
            observer.disconnect();
        };
    }, []);

    const toggleTheme = useCallback(() => setIsLightMode(prev => !prev), []);
    const handleSmoothScroll = useCallback((e, targetId) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
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
        <div className="neo-minimalist antialiased bg-[var(--bg-dark)] text-[var(--text-light)] font-['Space_Grotesk',sans-serif] min-h-screen">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div className="absolute inset-0 backdrop-blur-sm bg-[var(--header-bg)]" />
                <div className="relative px-6 py-4 flex justify-between items-center border-b border-[var(--border-color)]">
                    <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-2xl font-bold text-[var(--text-light)] cursor-pointer" aria-label="Home">
                        Jaki<span className="text-[var(--accent-green)]">.</span>
                    </a>
                    <nav className="hidden md:flex space-x-8 items-center text-sm text-[var(--text-muted)]" role="navigation" aria-label="Main navigation">
                        {NAV_SECTIONS.map((section) => (
                            <a key={section} href={`#${section}`} onClick={(e) => handleSmoothScroll(e, section)}
                                className={`transition-colors duration-300 hover:text-[var(--text-light)] capitalize cursor-pointer ${activeSection === section ? 'text-[var(--text-light)]' : ''}`}
                            >{section}</a>
                        ))}
                    </nav>
                    <div className="flex items-center gap-2">
                        <button onClick={toggleTheme} className="p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] transition-transform duration-300 hover:rotate-90 cursor-pointer" aria-label={isLightMode ? 'Switch to dark mode' : 'Switch to light mode'}>
                            <svg className="w-6 h-6 text-[var(--accent-green)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                                <path d="M12 2.5L13.75 6.5L18 7.6L14.88 11.2L15.87 15.5L12 13.5L8.13 15.5L9.12 11.2L6 7.6L10.25 6.5L12 2.5Z" strokeLinejoin="round" />
                            </svg>
                        </button>
                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] cursor-pointer"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileMenuOpen}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                {mobileMenuOpen
                                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                }
                            </svg>
                        </button>
                    </div>
                </div>
                {/* Mobile Dropdown */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-[var(--bg-dark)]/95 backdrop-blur-lg border-t border-[var(--border-color)] px-6 py-4 space-y-3">
                        {NAV_SECTIONS.map((section) => (
                            <a key={section} href={`#${section}`} onClick={(e) => handleSmoothScroll(e, section)}
                                className="block text-sm capitalize cursor-pointer py-2 hover:text-[var(--accent-green)] transition-colors"
                            >{section}</a>
                        ))}
                    </div>
                )}
            </header>

            <main className="px-6 pt-24">
                {/* Hero */}
                <section id="home" className="min-h-[100dvh] flex flex-col justify-center items-center text-center relative overflow-hidden fade-in-section is-visible px-4">
                    <div id="hero-section" className="absolute inset-0" />
                    <div className="floating-shape top-1/4 left-[10%] md:left-[15%] opacity-50" />
                    <div className="floating-shape bottom-1/4 right-[10%] md:right-[15%] opacity-50" style={{ animationDelay: '-4s' }} />
                    <div className="relative z-10 w-full">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-['Space_Grotesk']">
                            Hi, I'm <span className="text-glow">Ahmad Dzakiudin</span>
                        </h1>
                        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-6 md:mb-8 text-[var(--text-light)]">building logic into reality.</p>
                        <p className="text-sm md:text-lg max-w-xl mx-auto text-[var(--text-muted)] px-2">Programmer | Strategist | Tech Thinker</p>
                        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-8 md:mt-10 px-4">
                            <a href="#proyek" onClick={(e) => handleSmoothScroll(e, 'proyek')} className="px-5 sm:px-6 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center gap-2 bg-[var(--accent-green)] text-[var(--bg-dark)] shadow-[0_0_20px_var(--glow-color)] hover:bg-[#00cc88] cursor-pointer text-sm md:text-base w-full sm:w-auto">
                                Lihat Proyek
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M5 12h13" /></svg>
                            </a>
                            <a href="#kontak" onClick={(e) => handleSmoothScroll(e, 'kontak')} className="px-5 sm:px-6 py-3 rounded-lg transition-all duration-300 font-semibold border border-[var(--border-color)] text-[var(--text-light)] backdrop-blur-sm hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] cursor-pointer text-sm md:text-base w-full sm:w-auto text-center">
                                Hubungi Saya
                            </a>
                        </div>
                    </div>
                </section>

                {/* Tentang */}
                <section id="tentang" className="container mx-auto px-4 md:px-6 py-12 md:py-32 fade-in-section">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 font-['Space_Grotesk']"><span className="title-underline">Tentang <span className="text-glow">Saya</span></span></h2>
                            <div className="text-base md:text-lg leading-relaxed space-y-3 md:space-y-4 text-[var(--text-muted)]">
                                <p>Saya memiliki ketertarikan yang kuat terhadap <span className="text-[var(--text-light)]">TEKNOLOGI</span>, sistem yang efisien, serta inovasi futuristik yang dapat mengubah cara manusia berpikir dan bekerja.</p>
                                <p>Dengan pendekatan yang analitis dan strategis, saya berfokus pada pengembangan tools dan sistem yang mengoptimalkan proses, mengotomatisasi alur kerja, serta menciptakan nilai dari kompleksitas.</p>
                                <p>Tujuan saya adalah menghadirkan solusi yang tidak hanya fungsional, tetapi juga berkelanjutan dan berdampak nyata.</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative w-64 h-64 md:w-72 md:h-72">
                                <div className="absolute inset-0 animated-visual-glow" />
                                <div className="relative z-10 w-full h-full object-cover rounded-3xl border-2 border-[var(--border-color)] transition-transform duration-300 hover:scale-105 bg-gray-800 flex justify-center items-center overflow-hidden">
                                    <img src="/1.jpg" alt="Foto Ahmad Dzakiudin" className="w-full h-full object-cover" loading="lazy" width="288" height="288" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/1a1a1a/00ffaa?text=JAKI'; }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills — DRY rendered */}
                <section id="skill" className="py-12 md:py-32 px-4 md:px-6 fade-in-section">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12 gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk']"><span className="title-underline">Keahlian <span className="text-glow">Saya</span></span></h2>
                        <button onClick={expandAllSkills} className="text-xs uppercase tracking-widest px-4 py-2 rounded-full border border-[var(--accent-green)] text-[var(--accent-green)] hover:bg-[var(--accent-green)] hover:text-[var(--bg-dark)] transition-all cursor-pointer" aria-label="Toggle all skills">
                            {SKILLS_DATA.every(s => openSkills[s.title]) ? 'Tutup Semua' : 'Buka Semua'}
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {SKILLS_DATA.map((skill) => (
                            <article key={skill.title} className="p-4 md:p-6 rounded-2xl text-left card-glow stagger-item cursor-pointer" style={{ animationDelay: skill.delay }} onClick={() => toggleSkill(skill.title)} role="button" tabIndex={0} aria-expanded={!!openSkills[skill.title]} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleSkill(skill.title); } }}>
                                <div className="flex justify-between items-center">
                                    <h3 className="text-base md:text-lg font-semibold">{skill.title}</h3>
                                    <svg className={`w-5 h-5 text-[var(--accent-green)] transition-transform duration-300 ${openSkills[skill.title] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                                {openSkills[skill.title] && (
                                    <ul className="text-xs md:text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)] mt-3 animate-[fadeIn_0.2s_ease-out]">
                                        {skill.items.map((item) => (
                                            <li key={item.name}><strong>{item.name}</strong> — {item.desc}</li>
                                        ))}
                                    </ul>
                                )}
                            </article>
                        ))}
                    </div>
                </section>

                {/* Projects — DRY rendered */}
                <section id="proyek" className="py-12 md:py-32 px-4 md:px-6 fade-in-section">
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-center font-['Space_Grotesk']"><span className="title-underline">Featured <span className="text-glow">Projects</span></span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
                        {PROJECTS_DATA.map((project, i) => (
                            <article key={project.title} className="group p-4 md:p-6 rounded-2xl card-glow flex flex-col stagger-item" style={{ animationDelay: `${i * 0.2}s` }}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 border rounded-lg border-[var(--border-color)]">
                                        <svg className="w-6 h-6 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={project.icon} />
                                        </svg>
                                    </div>
                                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" aria-label={`View ${project.title} on GitHub`}>
                                        <ExternalLinkIcon />
                                    </a>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                                <p className="text-sm flex-grow mb-4 text-[var(--text-muted)]">{project.desc}</p>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">{tag}</span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <a href="https://github.com/Dzakiudin?tab=repositories" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-lg transition-all duration-300 font-semibold border border-[var(--border-color)] text-[var(--text-light)] backdrop-blur-sm hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] cursor-pointer">
                            Lihat Selengkapnya
                        </a>
                    </div>
                </section>

                {/* Contact */}
                <section id="kontak" className="py-12 md:py-32 text-center px-4 md:px-6 fade-in-section">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2 font-['Space_Grotesk']"><span className="title-underline">Let's <span className="text-glow">Connect</span></span></h2>
                    <p className="mb-8 text-[var(--text-muted)]">and build the future together.</p>
                    <div className="flex justify-center space-x-4 mt-8 mb-10">
                        <a href="https://github.com/Dzakiudin" aria-label="GitHub Profile" className="p-3 rounded-lg card-glow text-currentColor cursor-pointer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85v2.74c0 .27.18.57.69.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/ahmad-dzakiudin-30404b344/" aria-label="LinkedIn Profile" className="p-3 rounded-lg card-glow text-currentColor cursor-pointer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-11 5v9h3V11H8m-1.5-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M17 8v2h-1.5c-1.38 0-2.5 1.12-2.5 2.5V17h-3v-9h3v1.5c.53-1.09 1.93-1.5 3-1.5H17Z" /></svg>
                        </a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dzakiudin07@gmail.com&su=Kolaborasi%20Proyek" aria-label="Send Email" className="p-3 rounded-lg card-glow text-currentColor cursor-pointer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" /></svg>
                        </a>
                        <a href="https://x.com/Dzakiudin07" aria-label="X (Twitter) Profile" className="p-3 rounded-lg card-glow text-currentColor cursor-pointer">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                    </div>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dzakiudin07@gmail.com&su=Kolaborasi%20Proyek" className="inline-block px-6 py-2 text-sm rounded-full border transition-colors border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)] cursor-pointer">
                        Available for collaboration
                    </a>
                </section>
            </main>

            <footer className="text-center py-8 border-t border-[var(--border-color)] mt-20">
                <p className="text-sm text-[var(--text-muted)]">Precision. Logic. Simplicity.</p>
                <p className="text-xs mt-2 text-[var(--text-muted)] opacity-50">&copy; 2025 Jaki. Built with focus and efficiency.</p>
            </footer>
        </div>
    );
};

export default NeoMinimalist;
