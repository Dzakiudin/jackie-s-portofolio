import React, { useEffect, useState } from 'react';
import './CyberStrategist.css';

const CyberStrategist = () => {
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        // --- Particles.js Initialization ---
        const initParticles = () => {
            if (window.particlesJS) {
                const particleColor = isLightMode ? '#7b1aa3' : '#00ffff';
                const lineColor = isLightMode ? '#078a8a' : '#a020f0';

                window.particlesJS('particles-js', {
                    "particles": {
                        "number": {
                            "value": 50,
                            "density": { "enable": true, "value_area": 800 }
                        },
                        "color": { "value": particleColor },
                        "shape": { "type": "circle" },
                        "opacity": { "value": 0.5, "random": true },
                        "size": { "value": 2, "random": true },
                        "line_linked": {
                            "enable": true,
                            "distance": 150,
                            "color": lineColor,
                            "opacity": 0.3,
                            "width": 1
                        },
                        "move": {
                            "enable": true,
                            "speed": 1,
                            "direction": "none",
                            "random": true,
                            "straight": false,
                            "out_mode": "out"
                        }
                    },
                    "interactivity": {
                        "detect_on": "canvas",
                        "events": {
                            "onhover": { "enable": true, "mode": "grab" },
                            "onclick": { "enable": true, "mode": "push" },
                            "resize": true
                        },
                        "modes": {
                            "grab": { "distance": 140, "line_linked": { "opacity": 0.7 } },
                            "push": { "particles_nb": 4 }
                        }
                    },
                    "retina_detect": true
                });
            }
        };

        // Load particles.js dynamically if not present
        if (!window.particlesJS) {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
            script.onload = initParticles;
            document.body.appendChild(script);
        } else {
            initParticles();
        }

        // Apply theme classes to html element for global variables
        const htmlElement = document.documentElement;
        if (isLightMode) {
            htmlElement.classList.add('light');
        } else {
            htmlElement.classList.remove('light');
        }

        return () => {
            const htmlElement = document.documentElement;
            htmlElement.classList.remove('light');
        }

    }, [isLightMode]);

    useEffect(() => {
        // --- Navbar Scroll Effect ---
        const navbar = document.getElementById('navbar');
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar?.classList.add('navbar-scrolled');
            } else {
                navbar?.classList.remove('navbar-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll);

        // --- Scroll Reveal Animation ---
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(elem => {
            observer.observe(elem);
        });

        // --- Interactive Project Card Glow ---
        const cards = document.querySelectorAll('.project-card-wrapper');
        const handleMouseMove = (e) => {
            const card = e.currentTarget;
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        };
        cards.forEach(card => card.addEventListener('mousemove', handleMouseMove));


        return () => {
            window.removeEventListener('scroll', handleScroll);
            cards.forEach(card => card.removeEventListener('mousemove', handleMouseMove));
        };
    }, []);

    const toggleTheme = () => {
        setIsLightMode(prev => !prev);
    };

    const handleExploreClick = (e) => {
        e.currentTarget.classList.add('clicked');
        setTimeout(() => {
            e.currentTarget.classList.remove('clicked');
        }, 1000);
        document.getElementById('tentang')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="cyber-strategist bg-[var(--bg-color)] text-[var(--text-color)] font-['Inter',sans-serif] min-h-screen relative overflow-x-hidden">

            {/* Particle Background */}
            <div id="particles-js" className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"></div>

            {/* Header / Navbar */}
            <header id="navbar" className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#home" className="text-3xl font-orbitron font-bold" style={{ textShadow: "0 0 5px var(--accent-cyan)" }}>J</a>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#home" className="hover:text-[var(--accent-cyan)] transition-colors">Home</a>
                        <a href="#tentang" className="hover:text-[var(--accent-cyan)] transition-colors">Tentang</a>
                        <a href="#skill" className="hover:text-[var(--accent-cyan)] transition-colors">Skill</a>
                        <a href="#proyek" className="hover:text-[var(--accent-cyan)] transition-colors">Proyek</a>
                        <a href="#insight" className="hover:text-[var(--accent-cyan)] transition-colors">Insight</a>
                        <a href="#kontak" className="hover:text-[var(--accent-cyan)] transition-colors">Kontak</a>
                    </div>
                    {/* Dark Mode Toggle */}
                    <button id="theme-toggle" onClick={toggleTheme} className="p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] z-50">
                        <svg id="theme-toggle-dark-icon" className={`w-5 h-5 ${isLightMode ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                        </svg>
                        <svg id="theme-toggle-light-icon" className={`w-5 h-5 ${!isLightMode ? 'hidden' : ''}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 5.05A1 1 0 003.636 3.636l-.707.707a1 1 0 101.414 1.414l.707-.707zM3 11a1 1 0 100-2H2a1 1 0 100 2h1zM6.464 14.95l-.707.707a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414z" fillRule="evenodd" clipRule="evenodd"></path>
                        </svg>
                    </button>
                </nav>
            </header>

            <main>
                {/* Hero Section */}
                <section id="home" className="h-[100vh] flex flex-col justify-center items-center text-center px-4 relative overflow-hidden">
                    <h1 className="font-orbitron text-4xl md:text-6xl lg:text-7xl font-bold neon-text leading-tight">
                        Hi, I’m Jackie<br /> building logic into reality.
                    </h1>
                    <p className="mt-6 text-lg md:text-xl max-w-2xl text-[var(--text-color)]">
                        Teknologi, logika, dan strategi dalam satu pola pikir.
                    </p>
                    <button id="explore-button" className="hero-button mt-12 cursor-pointer" onClick={handleExploreClick}>
                        Explore My World
                    </button>
                    <div className="horizontal-light-line"></div>
                </section>

                {/* Tentang Saya */}
                <section id="tentang" className="container mx-auto py-20 px-6 reveal">
                    <h2 className="font-orbitron text-4xl font-bold text-center mb-12 neon-text">
                        About <span className="text-white opacity-90 mix-blend-difference">Me</span>
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="max-w-lg">
                            <p className="text-lg leading-relaxed text-[var(--text-color)]">
                                Saya memiliki ketertarikan yang kuat terhadap teknologi, sistem yang efisien, serta inovasi
                                futuristik yang dapat mengubah cara manusia berpikir dan bekerja.
                                <br /><br />
                                Dengan pendekatan yang analitis dan strategis, saya berfokus pada pengembangan tools dan sistem
                                yang mengoptimalkan proses, mengotomatisasi alur kerja, serta menciptakan nilai dari
                                kompleksitas.
                                <br /><br />
                                Tujuan saya adalah menghadirkan solusi yang tidak hanya fungsional, tetapi juga berkelanjutan
                                dan berdampak nyata.
                            </p>
                        </div>
                        <div>
                            {/* Digital Brain/Neuron SVG */}
                            <svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                    <filter id="glow">
                                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: "var(--accent-cyan)", stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: "var(--accent-purple)", stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                                <path d="M100,10 C40,10 30,70 30,70 C30,70 20,110 100,110 C180,110 170,70 170,70 C170,70 160,10 100,10 Z"
                                    fill="none" stroke="url(#brainGradient)" strokeWidth="2" filter="url(#glow)" />
                                <circle cx="100" cy="60" r="3" fill="var(--accent-cyan)" />
                                <circle cx="80" cy="40" r="2" fill="var(--accent-cyan)" />
                                <circle cx="120" cy="40" r="2" fill="var(--accent-cyan)" />
                                <circle cx="70" cy="80" r="2" fill="var(--accent-purple)" />
                                <circle cx="130" cy="80" r="2" fill="var(--accent-purple)" />
                                <path d="M100 60 Q 85 50 80 40" stroke="var(--accent-cyan)" strokeWidth="0.5" fill="none" opacity="0.7" />
                                <path d="M100 60 Q 115 50 120 40" stroke="var(--accent-cyan)" strokeWidth="0.5" fill="none" opacity="0.7" />
                                <path d="M100 60 Q 80 70 70 80" stroke="var(--accent-purple)" strokeWidth="0.5" fill="none" opacity="0.7" />
                                <path d="M100 60 Q 120 70 130 80" stroke="var(--accent-purple)" strokeWidth="0.5" fill="none" opacity="0.7" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Keahlian */}
                <section id="skill" className="container mx-auto py-20 px-6 reveal">
                    <h2 className="font-orbitron text-4xl font-bold text-center mb-12 neon-text">
                        Keahlian <span className="text-white opacity-90 mix-blend-difference">Saya</span>
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Kognitif */}
                        <div className="skill-card-animated">
                            <h3 className="font-orbitron text-xl font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>Skill Kognitif</h3>
                            <ul className="text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)]">
                                <li><strong>Critical Thinking</strong> — Menganalisis bukti & argumen sebelum percaya.</li>
                                <li><strong>Problem Solving</strong> — Menemukan solusi sistematis untuk masalah kompleks.</li>
                                <li><strong>Strategic Thinking</strong> — Keputusan jangka panjang dengan perhitungan matang.</li>
                                <li><strong>Analytical Thinking</strong> — Mengurai pola dengan cara terstruktur.</li>
                                <li><strong>Creativity & Innovation</strong> — Membuat atau mengembangkan ide unik.</li>
                                <li><strong>Decision Making</strong> — Memilih opsi terbaik, termasuk di bawah tekanan.</li>
                                <li><strong>Research & Reasoning</strong> — Mengumpulkan data valid dan menarik kesimpulan logis.</li>
                            </ul>
                        </div>
                        {/* Komunikasi & Sosial */}
                        <div className="skill-card-animated">
                            <h3 className="font-orbitron text-xl font-bold mb-3" style={{ color: "var(--accent-purple)" }}>Komunikasi & Sosial</h3>
                            <ul className="text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)]">
                                <li><strong>Persuasion & Negotiation</strong> — Membujuk tanpa paksaan, menghasilkan kesepakatan.</li>
                                <li><strong>Storytelling</strong> — Menyampaikan informasi lewat narasi yang mengikat.</li>
                                <li><strong>Active Listening</strong> — Mendengarkan untuk mengerti, bukan sekadar merespon.</li>
                                <li><strong>Empathy & EQ</strong> — Memahami emosi orang dan merespons tepat.</li>
                                <li><strong>Body Language Reading</strong> — Membaca gesture, ekspresi, nada untuk insight tersembunyi.</li>
                                <li><strong>Social Calibration</strong> — Menyesuaikan perilaku sesuai konteks sosial.</li>
                            </ul>
                        </div>
                        {/* Teknis / Digital */}
                        <div className="skill-card-animated">
                            <h3 className="font-orbitron text-xl font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>Teknis / Digital</h3>
                            <ul className="text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)]">
                                <li><strong>Programming / Coding</strong> — Menulis logika & instruksi untuk komputer.</li>
                                <li><strong>Data Analysis</strong> — Membaca data untuk insight & keputusan.</li>
                                <li><strong>Video Editing & Animation</strong> — Menyusun video jadi cerita visual engaging.</li>
                                <li><strong>UI/UX Design</strong> — Membuat antarmuka nyaman dan intuitif.</li>
                                <li><strong>Web/App Development</strong> — Membangun situs atau aplikasi dari nol.</li>
                                <li><strong>Blockchain & Crypto</strong> — Pemahaman aset digital, staking, trading, DeFi.</li>
                                <li><strong>Automation / Scripting</strong> — Membuat alur kerja otomatis untuk efisiensi.</li>
                            </ul>
                        </div>
                        {/* Fisik / Motorik */}
                        <div className="skill-card-animated">
                            <h3 className="font-orbitron text-xl font-bold mb-3" style={{ color: "var(--accent-purple)" }}>Fisik / Motorik</h3>
                            <ul className="text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)]">
                                <li><strong>Strength Training / Bodybuilding</strong> — Latihan kekuatan berbasis teknik.</li>
                                <li><strong>Cooking / Crafting / Gardening</strong> — Keterampilan manual yang melatih ketelitian.</li>
                                <li><strong>Fine Motor Skills</strong> — Ketelitian tangan (menulis, melukis, instrumen).</li>
                            </ul>
                        </div>
                        {/* Kreatif & Artistik */}
                        <div className="skill-card-animated">
                            <h3 className="font-orbitron text-xl font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>Kreatif & Artistik</h3>
                            <ul className="text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)]">
                                <li><strong>Design Thinking</strong> — Menggabungkan logika dan seni untuk solusi kreatif.</li>
                            </ul>
                        </div>
                        {/* Emosional & Spiritual */}
                        <div className="skill-card-animated">
                            <h3 className="font-orbitron text-xl font-bold mb-3" style={{ color: "var(--accent-purple)" }}>Emosional & Spiritual</h3>
                            <ul className="text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)]">
                                <li><strong>Self-Awareness</strong> — Memahami kekuatan, kelemahan, motif diri.</li>
                                <li><strong>Self-Discipline</strong> — Konsistensi melakukan hal benar walau sedang malas.</li>
                                <li><strong>Stress Management</strong> — Mengelola emosi dan tekanan secara efektif.</li>
                                <li><strong>Resilience</strong> — Bangkit kembali setelah kegagalan.</li>
                                <li><strong>Philosophical Reasoning</strong> — Nalar tentang makna hidup, etika, kebenaran.</li>
                            </ul>
                        </div>
                        {/* Bisnis & Uang */}
                        <div className="skill-card-animated">
                            <h3 className="font-orbitron text-xl font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>Bisnis & Uang</h3>
                            <ul className="text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)]">
                                <li><strong>Investasi & Trading</strong> — Membuat uang bekerja untuk Anda.</li>
                                <li><strong>Marketing & Branding</strong> — Membuat produk/ide dikenal & disukai.</li>
                                <li><strong>Finance Management</strong> — Mengatur keuangan pribadi/organisasi bijak.</li>
                                <li><strong>Entrepreneurship</strong> — Mengubah ide menjadi bisnis nyata.</li>
                            </ul>
                        </div>
                        {/* Meta */}
                        <div className="skill-card-animated">
                            <h3 className="font-orbitron text-xl font-bold mb-3" style={{ color: "var(--accent-purple)" }}>Meta (Skill Pengganda)</h3>
                            <ul className="text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)]">
                                <li><strong>Learning How to Learn</strong> — Metode belajar efektif, bukan sekadar rajin.</li>
                                <li><strong>Time Management</strong> — Mengatur waktu agar produktif tanpa burnout.</li>
                                <li><strong>Habit Building</strong> — Membangun kebiasaan positif jangka panjang.</li>
                                <li><strong>Systems Thinking</strong> — Melihat dunia sebagai sistem terhubung.</li>
                                <li><strong>Pattern Recognition</strong> — Menemukan pola tersembunyi di data/kejadian.</li>
                            </ul>
                        </div>
                        {/* Langka & Tersembunyi */}
                        <div className="skill-card-animated">
                            <h3 className="font-orbitron text-xl font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>Langka & Tersembunyi</h3>
                            <ul className="text-sm leading-relaxed pl-4 list-disc text-[var(--card-text-color)]">
                                <li><strong>Idea Synthesis</strong> — Menggabungkan hal tak terkait jadi ide brilian.</li>
                                <li><strong>Subcommunication</strong> — Menyampaikan pesan lewat tone, gesture, vibe.</li>
                                <li><strong>Teaching / Simplifying</strong> — Menyederhanakan hal rumit jadi mudah dimengerti.</li>
                                <li><strong>Behavioral Insight</strong> — Membaca motivasi & pola pikir orang lain.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Proyek */}
                <section id="proyek" className="container mx-auto py-20 px-6 reveal">
                    <h2 className="font-orbitron text-4xl font-bold text-center mb-12 neon-text">Proyek Unggulan</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Project Card 1 */}
                        <div className="group">
                            <div className="project-card-wrapper h-full">
                                <a href="https://github.com/Dzakiudin/YT-Dubber-Lite-sederhana" target="_blank" rel="noopener noreferrer" className="project-card-content block">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-orbitron text-2xl font-bold text-white group-hover:text-[var(--accent-cyan)] transition-colors">YT Dubber</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-[var(--accent-cyan)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                        <p className="mb-6 text-sm leading-relaxed">Ekstensi Chrome sederhana untuk memberikan dubbing (sulih suara) secara real-time pada video YouTube...</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="project-tag">Extension</span>
                                        <span className="project-tag">SpeechSynthesis</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* Project Card 2 */}
                        <div className="group">
                            <div className="project-card-wrapper h-full">
                                <a href="https://github.com/Dzakiudin/Indikator-dan-strategi-TradingView" target="_blank" rel="noopener noreferrer" className="project-card-content block">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-orbitron text-2xl font-bold text-white group-hover:text-[var(--accent-cyan)] transition-colors">Indikator TradingView</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-[var(--accent-cyan)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                        <p className="mb-6 text-sm leading-relaxed">Indikator TradingView profesional untuk analisis teknikal dengan sinyal akurat dan real-time.</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="project-tag">Pine Script</span>
                                        <span className="project-tag">Trading</span>
                                        <span className="project-tag">TradingView</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* Project Card 3 */}
                        <div className="group">
                            <div className="project-card-wrapper h-full">
                                <a href="https://github.com/Dzakiudin/GenLua-V2-Manifest-Lua-Generator-for-SteamTools-Injector" target="_blank" rel="noopener noreferrer" className="project-card-content block">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-orbitron text-2xl font-bold text-white group-hover:text-[var(--accent-cyan)] transition-colors">Manifest & Lua Generator</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-[var(--accent-cyan)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                        <p className="mb-6 text-sm leading-relaxed">Alat untuk secara otomatis menghasilkan file manifest.json dan skrip .lua untuk SteamTools Injector.</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="project-tag">Lua</span>
                                        <span className="project-tag">Manifest</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                        {/* Project Card 4 */}
                        <div className="group">
                            <div className="project-card-wrapper h-full">
                                <a href="https://github.com/Dzakiudin/Poke-Master-3000" target="_blank" rel="noopener noreferrer" className="project-card-content block">
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-orbitron text-2xl font-bold text-white group-hover:text-[var(--accent-cyan)] transition-colors">Auto Poke Facebook</h3>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 group-hover:text-[var(--accent-cyan)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>
                                        <p className="mb-6 text-sm leading-relaxed">Ekstensi Chrome yang bikin lu bisa colek semua teman di Facebook secara otomatis.</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="project-tag">Auto click</span>
                                        <span className="project-tag">Extension</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Insight */}
                <section id="insight" className="container mx-auto py-20 px-6 reveal">
                    <h2 className="font-orbitron text-4xl font-bold text-center mb-12 neon-text">
                        Digital <span className="text-white opacity-90 mix-blend-difference">Reflections</span>
                    </h2>
                    <div className="space-y-8 max-w-2xl mx-auto">
                        <div className="border-l-4 border-[var(--accent-cyan)] pl-6 py-2">
                            <p className="text-xl italic">“Strategi terbaik lahir dari keheningan pikiran.”</p>
                        </div>
                        <div className="border-l-4 border-[var(--accent-purple)] pl-6 py-2">
                            <p className="text-xl italic">“Teknologi tanpa arah adalah kekacauan yang cantik.”</p>
                        </div>
                    </div>
                </section>

                {/* Kontak */}
                <section id="kontak" className="container mx-auto py-20 px-6 text-center reveal">
                    <h2 className="font-orbitron text-3xl font-bold mb-4">Siap berkolaborasi untuk masa depan?</h2>
                    <p className="mb-8 text-[var(--card-text-color)]">Hubungi saya melalui platform berikut.</p>
                    <div className="flex justify-center space-x-6">
                        <a href="https://github.com/Dzakiudin" className="text-gray-400 hover:text-[var(--accent-cyan)] transition-colors" aria-label="GitHub">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                        </a>
                        <a href="https://www.linkedin.com/in/ahmad-dzakiudin-30404b344/" className="text-gray-400 hover:text-[var(--accent-cyan)] transition-colors" aria-label="LinkedIn">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" /></svg>
                        </a>
                    </div>
                </section>
            </main>

            <footer className="border-t-2 border-[var(--accent-cyan)] mt-20">
                <div className="container mx-auto py-8 px-6 text-center text-[var(--card-text-color)]">
                    <p className="italic">“Simplicity is the ultimate sophistication.”</p>
                    <p className="text-sm mt-1">— Leonardo da Vinci</p>
                    <p className="text-xs mt-4">&copy; 2025 Jaki. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default CyberStrategist;
