import React, { useEffect, useState } from 'react';
import './NeoMinimalist.css';

const NeoMinimalist = () => {
    const [isLightMode, setIsLightMode] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        // Apply theme class to body
        if (isLightMode) {
            document.body.classList.add('light-mode');
        } else {
            document.body.classList.remove('light-mode');
        }

        return () => {
            document.body.classList.remove('light-mode');
        };
    }, [isLightMode]);

    useEffect(() => {
        const handleScroll = () => {
            // --- Navigasi Aktif saat Scroll ---
            const sections = document.querySelectorAll('main section');
            let current = 'home';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.pageYOffset >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);

        // --- Intersection Observer for Scroll Animations ---
        const fadeSections = document.querySelectorAll('.fade-in-section');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeSections.forEach(section => {
            observer.observe(section);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const toggleTheme = () => {
        setIsLightMode(prev => !prev);
    };

    const handleSmoothScroll = (e, targetId) => {
        e.preventDefault();
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="neo-minimalist antialiased bg-[var(--bg-dark)] text-[var(--text-light)] font-['Space_Grotesk',sans-serif] min-h-screen">
            {/* Header / Navbar */}
            <header id="navbar" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
                <div className="absolute inset-0 backdrop-blur-sm bg-[var(--header-bg)]"></div>
                <div className="relative px-6 py-4 flex justify-between items-center border-b border-[var(--border-color)]">
                    <a href="#home" onClick={(e) => handleSmoothScroll(e, 'home')} className="text-2xl font-bold text-[var(--text-light)]">
                        Jaki<span className="text-[var(--accent-green)]">.</span>
                    </a>
                    <nav className="hidden md:flex space-x-8 items-center text-sm text-[var(--text-muted)]">
                        {['home', 'tentang', 'skill', 'proyek', 'kontak'].map((section) => (
                            <a
                                key={section}
                                href={`#${section}`}
                                onClick={(e) => handleSmoothScroll(e, section)}
                                className={`transition-colors duration-300 hover:text-[var(--text-light)] capitalize ${activeSection === section ? 'text-[var(--text-light)]' : ''}`}
                            >
                                {section}
                            </a>
                        ))}
                    </nav>
                    <button id="theme-toggle" onClick={toggleTheme} className="p-2 rounded-lg focus:outline-none transition-transform duration-300 hover:rotate-90">
                        <svg className="w-6 h-6 text-[var(--accent-green)]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2.5L13.75 6.5L18 7.6L14.88 11.2L15.87 15.5L12 13.5L8.13 15.5L9.12 11.2L6 7.6L10.25 6.5L12 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                            <path d="M12 17.5L11.25 19.5L9.5 20.1L10.87 21.2L10.37 22.8L12 21.8L13.63 22.8L13.13 21.2L14.5 20.1L12.75 19.5L12 17.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </header>

            <main className="px-6 pt-24">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden fade-in-section is-visible">
                    <div id="hero-section" className="absolute inset-0"></div>
                    {/* Floating Shapes */}
                    <div className="floating-shape top-1/4 left-[15%] opacity-50"></div>
                    <div className="floating-shape bottom-1/4 right-[15%] opacity-50" style={{ animationDelay: '-4s' }}></div>

                    <div className="relative z-10 w-full"> {/* Added w-full to ensure bounds */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 font-['Space_Grotesk']">
                            Hi, I’m <span className="text-glow">Ahmad Dzakiudin</span>
                        </h1>
                        <p className="text-2xl md:text-3xl lg:text-4xl font-light mb-8 text-[var(--text-light)]">building logic into reality.</p>
                        <p className="text-md md:text-lg max-w-xl mx-auto text-[var(--text-muted)]">
                            Programmer | Strategist | Tech Thinker
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            <a href="#proyek" onClick={(e) => handleSmoothScroll(e, 'proyek')}
                                className="px-6 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center gap-2 bg-[var(--accent-green)] text-[var(--bg-dark)] shadow-[0_0_20px_var(--glow-color)] hover:bg-[#00cc88]"
                            >
                                Lihat Proyek
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M5 12h13"></path>
                                </svg>
                            </a>
                            <a href="#kontak" onClick={(e) => handleSmoothScroll(e, 'kontak')}
                                className="px-6 py-3 rounded-lg transition-all duration-300 font-semibold border border-[var(--border-color)] text-[var(--text-light)] backdrop-blur-sm hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]"
                            >
                                Hubungi Saya
                            </a>
                        </div>
                    </div>
                </section>

                {/* Tentang Saya */}
                <section id="tentang" className="container mx-auto px-6 py-20 md:py-32 fade-in-section">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 font-['Space_Grotesk']"><span className="title-underline">Tentang <span className="text-glow">Saya</span></span></h2>
                            <div className="text-lg leading-relaxed space-y-4 text-[var(--text-muted)]">
                                <p>Saya memiliki ketertarikan yang kuat terhadap <span className="text-[var(--text-light)]">TEKNOLOGI</span>, sistem yang efisien, serta inovasi futuristik yang dapat mengubah cara manusia berpikir dan bekerja.</p>
                                <p>Dengan pendekatan yang analitis dan strategis, saya berfokus pada pengembangan tools dan sistem yang mengoptimalkan proses, mengotomatisasi alur kerja, serta menciptakan nilai dari kompleksitas.</p>
                                <p>Tujuan saya adalah menghadirkan solusi yang tidak hanya fungsional, tetapi juga berkelanjutan dan berdampak nyata.</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center">
                            <div className="relative w-64 h-64 md:w-72 md:h-72">
                                <div className="absolute inset-0 animated-visual-glow"></div>
                                <div className="relative z-10 w-full h-full object-cover rounded-3xl border-2 border-[var(--border-color)] transition-transform duration-300 hover:scale-105 bg-gray-800 flex justify-center items-center overflow-hidden">
                                    <img src="/1.jpg" alt="Foto Jaki" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x400/1a1a1a/00ffaa?text=JAKI'; }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Keahlian Saya */}
                <section id="skill" className="py-20 md:py-32 fade-in-section">
                    <h2 className="text-3xl font-bold mb-12 text-center font-['Space_Grotesk']"><span className="title-underline">Keahlian <span className="text-glow">Saya</span></span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Kognitif */}
                        <div className="p-6 rounded-2xl text-left card-glow stagger-item">
                            <h3 className="text-lg font-semibold mb-3">Skill Kognitif</h3>
                            <ul className="text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)]">
                                <li><strong>Critical Thinking</strong> — Analisis bukti & logika sebelum percaya.</li>
                                <li><strong>Problem Solving</strong> — Menemukan solusi sistematis untuk masalah kompleks.</li>
                                <li><strong>Strategic Thinking</strong> — Keputusan jangka panjang dengan perhitungan.</li>
                                <li><strong>Analytical Thinking</strong> — Mengurai pola dari bagian kecil.</li>
                                <li><strong>Creativity & Innovation</strong> — Menghasilkan atau mengembangkan ide unik.</li>
                                <li><strong>Decision Making</strong> — Memilih opsi terbaik terutama di tekanan.</li>
                                <li><strong>Research & Reasoning</strong> — Mengumpulkan data valid & menarik kesimpulan.</li>
                            </ul>
                        </div>
                        {/* Komunikasi */}
                        <div className="p-6 rounded-2xl text-left card-glow stagger-item" style={{ animationDelay: '0.08s' }}>
                            <h3 className="text-lg font-semibold mb-3">Komunikasi & Sosial</h3>
                            <ul className="text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)]">
                                <li><strong>Persuasion & Negotiation</strong> — Membujuk tanpa memaksa.</li>
                                <li><strong>Storytelling</strong> — Menyampaikan info dengan narasi yang mengikat.</li>
                                <li><strong>Active Listening</strong> — Mendengar untuk memahami, bukan hanya menjawab.</li>
                                <li><strong>Empathy & EQ</strong> — Membaca & merespon emosi orang lain.</li>
                                <li><strong>Body Language Reading</strong> — Membaca gesture, ekspresi, nada suara.</li>
                                <li><strong>Social Calibration</strong> — Menyesuaikan perilaku sesuai konteks sosial.</li>
                            </ul>
                        </div>
                        {/* Teknis */}
                        <div className="p-6 rounded-2xl text-left card-glow stagger-item" style={{ animationDelay: '0.16s' }}>
                            <h3 className="text-lg font-semibold mb-3">Teknis / Digital</h3>
                            <ul className="text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)]">
                                <li><strong>Programming / Coding</strong> — Membangun logika & instruksi untuk mesin.</li>
                                <li><strong>Data Analysis</strong> — Membaca data & membuat keputusan berdasar data.</li>
                                <li><strong>Video Editing & Animation</strong> — Menyusun cerita visual yang engaging.</li>
                                <li><strong>UI/UX Design</strong> — Membuat antarmuka yang nyaman & intuitif.</li>
                                <li><strong>Web/App Development</strong> — Membangun aplikasi & situs dari nol.</li>
                                <li><strong>Blockchain & Crypto</strong> — Pengetahuan aset digital, staking & trading.</li>
                                <li><strong>Automation / Scripting</strong> — Membuat proses berjalan otomatis.</li>
                            </ul>
                        </div>
                        {/* Fisik */}
                        <div className="p-6 rounded-2xl text-left card-glow stagger-item" style={{ animationDelay: '0.24s' }}>
                            <h3 className="text-lg font-semibold mb-3">Fisik / Motorik</h3>
                            <ul className="text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)]">
                                <li><strong>Strength Training / Bodybuilding</strong> — Latihan kekuatan & hipertrofi.</li>
                                <li><strong>Cooking / Crafting / Gardening</strong> — Keterampilan manual & kesabaran.</li>
                                <li><strong>Fine Motor Skills</strong> — Ketelitian tangan (menulis, melukis, instrumen).</li>
                            </ul>
                        </div>
                        {/* Kreatif */}
                        <div className="p-6 rounded-2xl text-left card-glow stagger-item" style={{ animationDelay: '0.32s' }}>
                            <h3 className="text-lg font-semibold mb-3">Kreatif & Artistik</h3>
                            <ul className="text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)]">
                                <li><strong>Design Thinking</strong> — Menggabungkan logika & seni untuk solusi kreatif.</li>
                            </ul>
                        </div>
                        {/* Emosional */}
                        <div className="p-6 rounded-2xl text-left card-glow stagger-item" style={{ animationDelay: '0.40s' }}>
                            <h3 className="text-lg font-semibold mb-3">Emosional & Spiritual</h3>
                            <ul className="text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)]">
                                <li><strong>Self-Awareness</strong> — Mengenal kekuatan, kelemahan, dan motif diri.</li>
                                <li><strong>Self-Discipline</strong> — Konsistensi melakukan hal benar.</li>
                                <li><strong>Stress Management</strong> — Mengatur emosi & tekanan.</li>
                                <li><strong>Resilience</strong> — Bangkit kembali setelah kegagalan.</li>
                                <li><strong>Philosophical Reasoning</strong> — Nalar tentang makna, etika, & kebenaran.</li>
                            </ul>
                        </div>
                        {/* Bisnis */}
                        <div className="p-6 rounded-2xl text-left card-glow stagger-item" style={{ animationDelay: '0.48s' }}>
                            <h3 className="text-lg font-semibold mb-3">Bisnis & Uang</h3>
                            <ul className="text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)]">
                                <li><strong>Investasi & Trading</strong> — Membuat aset bekerja untuk Anda.</li>
                                <li><strong>Marketing & Branding</strong> — Membuat produk/ide dikenal & disukai.</li>
                                <li><strong>Finance Management</strong> — Mengatur keuangan pribadi/organisasi.</li>
                                <li><strong>Entrepreneurship</strong> — Mengubah ide menjadi bisnis nyata.</li>
                            </ul>
                        </div>
                        {/* Meta */}
                        <div className="p-6 rounded-2xl text-left card-glow stagger-item" style={{ animationDelay: '0.56s' }}>
                            <h3 className="text-lg font-semibold mb-3">Meta (Skill Pengganda)</h3>
                            <ul className="text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)]">
                                <li><strong>Learning How to Learn</strong> — Cara belajar efektif.</li>
                                <li><strong>Time Management</strong> — Mengatur waktu tanpa burnout.</li>
                                <li><strong>Habit Building</strong> — Membangun kebiasaan positif jangka panjang.</li>
                                <li><strong>Systems Thinking</strong> — Melihat dunia sebagai sistem yang terhubung.</li>
                                <li><strong>Pattern Recognition</strong> — Melihat pola tersembunyi dari data/kejadian.</li>
                            </ul>
                        </div>
                        {/* Langka */}
                        <div className="p-6 rounded-2xl text-left card-glow stagger-item" style={{ animationDelay: '0.64s' }}>
                            <h3 className="text-lg font-semibold mb-3">Langka & Tersembunyi</h3>
                            <ul className="text-sm list-disc pl-4 text-[var(--text-muted)] marker:text-[var(--accent-green)]">
                                <li><strong>Idea Synthesis</strong> — Menggabungkan hal yang tak berhubungan jadi ide brilian.</li>
                                <li><strong>Subcommunication</strong> — Menyampaikan pesan lewat tone & gesture.</li>
                                <li><strong>Teaching / Simplifying</strong> — Menjelaskan yang rumit jadi sederhana.</li>
                                <li><strong>Behavioral Insight</strong> — Membaca motivasi & pola pikir orang lain.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Featured Projects */}
                <section id="proyek" className="py-20 md:py-32 fade-in-section">
                    <h2 className="text-3xl font-bold mb-12 text-center font-['Space_Grotesk']"><span className="title-underline">Featured <span className="text-glow">Projects</span></span></h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Project 1 */}
                        <div className="group p-6 rounded-2xl card-glow flex flex-col stagger-item">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 border rounded-lg border-[var(--border-color)]">
                                    <svg className="w-6 h-6 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <a href="https://github.com/Dzakiudin/YT-Dubber-Lite-sederhana" target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6 project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                </a>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">YT Dubber</h3>
                            <p className="text-sm flex-grow mb-4 text-[var(--text-muted)]">Ekstensi Chrome sederhana untuk memberikan dubbing (sulih suara) secara real-time pada video YouTube dengan membaca dan menerjemahkan subtitle yang tersedia. Proyek ini sepenuhnya gratis, open-source, dan menggunakan API bawaan peramban.</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">Extension</span>
                                <span className="px-2 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">SpeechSynthesis</span>
                            </div>
                        </div>

                        {/* Project 2 */}
                        <div className="group p-6 rounded-2xl card-glow flex flex-col stagger-item" style={{ animationDelay: '0.2s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 border rounded-lg border-[var(--border-color)]">
                                    <svg className="w-6 h-6 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.28a11.95 11.95 0 0 0-5.814 5.518l-4.306-4.306L2.25 18Z"></path>
                                    </svg>
                                </div>
                                <a href="https://github.com/Dzakiudin/Indikator-dan-strategi-TradingView" target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6 project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                </a>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Indikator TradingView</h3>
                            <p className="text-sm flex-grow mb-4 text-[var(--text-muted)]">Indikator TradingView profesional untuk analisis teknikal dengan sinyal akurat dan real-time.</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">Pine Script</span>
                                <span className="px-2 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">Trading</span>
                                <span className="px-2 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">TradingView</span>
                            </div>
                        </div>

                        {/* Project 3 */}
                        <div className="group p-6 rounded-2xl card-glow flex flex-col stagger-item" style={{ animationDelay: '0.4s' }}>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 border rounded-lg border-[var(--border-color)]">
                                    <svg className="w-6 h-6 text-[var(--accent-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"></path>
                                    </svg>
                                </div>
                                <a href="https://github.com/Dzakiudin/GenLua-V2-Manifest-Lua-Generator-for-SteamTools-Injector" target="_blank" rel="noopener noreferrer" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg className="w-6 h-6 project-link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                </a>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Manifest & Lua Generator for SteamTools Injector</h3>
                            <p className="text-sm flex-grow mb-4 text-[var(--text-muted)]">Alat sederhana dan efisien yang secara otomatis menghasilkan file manifest.json dan skrip .lua yang diperlukan untuk digunakan dengan SteamTools Injector.</p>
                            <div className="flex flex-wrap gap-2 text-xs">
                                <span className="px-2 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">Lua</span>
                                <span className="px-2 py-1 rounded-full border border-[var(--border-color)] text-[var(--text-muted)]">Manifest</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-12">
                        <a href="https://github.com/Dzakiudin?tab=repositories" target="_blank" rel="noopener noreferrer"
                            className="inline-block px-6 py-3 rounded-lg transition-all duration-300 font-semibold border border-[var(--border-color)] text-[var(--text-light)] backdrop-blur-sm hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]"
                        >
                            Lihat Selengkapnya
                        </a>
                    </div>
                </section>

                {/* Let's Connect */}
                <section id="kontak" className="py-20 md:py-32 text-center fade-in-section">
                    <h2 className="text-3xl font-bold mb-2 font-['Space_Grotesk']"><span className="title-underline">Let's <span className="text-glow">Connect</span></span></h2>
                    <p className="mb-8 text-[var(--text-muted)]">and build the future together.</p>
                    <div className="flex justify-center space-x-4 mt-8 mb-10">
                        <a href="https://github.com/Dzakiudin" aria-label="GitHub" className="p-3 rounded-lg card-glow text-currentColor">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.68.92.68 1.85v2.74c0 .27.18.57.69.48A10 10 0 0 0 22 12 10 10 0 0 0 12 2Z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/ahmad-dzakiudin-30404b344/" aria-label="LinkedIn" className="p-3 rounded-lg card-glow text-currentColor">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-11 5v9h3V11H8m-1.5-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M17 8v2h-1.5c-1.38 0-2.5 1.12-2.5 2.5V17h-3v-9h3v1.5c.53-1.09 1.93-1.5 3-1.5H17Z" />
                            </svg>
                        </a>
                        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dzakiudin07@gmail.com&su=Kolaborasi%20Proyek" aria-label="Email" className="p-3 rounded-lg card-glow text-currentColor">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                            </svg>
                        </a>
                        <a href="https://x.com/Dzakiudin07" aria-label="X" className="p-3 rounded-lg card-glow text-currentColor">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                            </svg>
                        </a>
                    </div>
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dzakiudin07@gmail.com&su=Kolaborasi%20Proyek" className="inline-block px-6 py-2 text-sm rounded-full border transition-colors border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent-green)] hover:text-[var(--accent-green)]">
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
