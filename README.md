<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 7" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0050?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
</p>

# ⚡ Jackie's Portfolio

A high-performance, dual-theme personal portfolio built with **React 19**, **Vite 7**, and **Tailwind CSS 4**. Features two distinct visual identities that can be switched on-the-fly.

## 🎨 Dual Theme System

| Cyber Strategist | Neo Minimalist |
|:---:|:---:|
| Futuristic neon aesthetic with interactive particle effects | Clean, minimal design with elegant green accents |
| `tsParticles` background · Orbitron font · Pulsating cards | Space Grotesk font · Glassmorphism · Floating shapes |

Switch between themes instantly using the **floating theme switcher** — powered by Framer Motion's spring animations.

## ✨ Key Features

- **🚀 Code Splitting** — Each theme lazy-loaded via `React.lazy` + `Suspense`
- **🎬 Smooth Transitions** — Framer Motion `AnimatePresence` for seamless theme switching
- **📱 Fully Responsive** — Mobile-first design with hamburger menu & stacked layouts
- **🌙 Dark / Light Mode** — Per-theme light mode toggle with CSS custom properties
- **♿ Accessible** — `prefers-reduced-motion` support, `aria-labels`, `focus-visible` rings, keyboard nav
- **📦 Collapsible Skills** — Accordion-style skill categories with "Expand All / Collapse All"
- **🔍 SEO Ready** — Meta tags, Open Graph, Twitter cards, semantic HTML
- **⚡ Optimized** — rAF-throttled scroll handlers, passive event listeners, tree-shaken bundles

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 19 |
| **Build Tool** | Vite 7 |
| **Styling** | Tailwind CSS 4 + Vanilla CSS |
| **Animation** | Framer Motion 12 |
| **Particles** | tsParticles (Slim) |
| **Fonts** | Google Fonts (Inter, Orbitron, Space Grotesk) |

## 📁 Project Structure

```
jackie-s-portofolio/
├── public/
│   └── 1.jpg                         # Profile image
├── src/
│   ├── components/
│   │   ├── CyberStrategist.jsx       # Cyber theme component
│   │   ├── CyberStrategist.css       # Cyber theme styles
│   │   ├── NeoMinimalist.jsx         # Neo theme component
│   │   ├── NeoMinimalist.css         # Neo theme styles
│   │   └── ThemeSwitcher.jsx         # Floating theme toggle
│   ├── App.jsx                       # Main app with lazy loading
│   ├── main.jsx                      # React entry point
│   └── index.css                     # Global styles
├── index.html                        # SEO-optimized HTML entry
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/Dzakiudin/jackie-s-portofolio.git
cd jackie-s-portofolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📊 Bundle Analysis

| Chunk | Size | Gzip |
|-------|------|------|
| Core (React + Framer Motion) | 322 KB | 103 KB |
| Cyber Strategist (lazy) | 168 KB | 49 KB |
| Neo Minimalist (lazy) | 20 KB | 6 KB |
| CSS (total) | 43 KB | 8 KB |

> 💡 Only the active theme is loaded — the other is fetched on demand.

## 📜 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  <b>Built with ⚡ by <a href="https://github.com/Dzakiudin">Jaki</a></b><br/>
  <sub>Precision. Logic. Simplicity.</sub>
</p>
