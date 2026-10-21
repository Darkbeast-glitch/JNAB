# JNAB Innovations

<p align="center">
  <img src="public/logo-stacked.png" alt="JNAB Innovations Logo" width="220" />
</p>

<p align="center">
  <strong>Architecting High-Performance Products · Powered by Next-Gen African Talent</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black&style=flat-square" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white&style=flat-square" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?logo=tailwind-css&logoColor=white&style=flat-square" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white&style=flat-square" alt="Vite" />
  <img src="https://img.shields.io/badge/License-Proprietary-02AA69?style=flat-square" alt="License" />
</p>

---

## 📌 Overview

**JNAB Innovations** is an end-to-end digital product design, software engineering, and technical training company based in Accra, Ghana. We partner with ambitious global startups, scale-ups, and enterprises to build mission-critical digital systems and cultivate world-class software engineering talent.

This repository powers the official **JNAB Innovations Web Platform**, engineered for high conversion, rapid load performance, and seamless responsiveness across desktop, tablet, and mobile devices.

---

## ✨ Key Highlights

- **Editorial, High-Trust Tech Aesthetic**: Built without generic AI gradients or SaaS tropes—grounded in deep obsidian (`#06090e`), crisp typography, and an emerald innovation green (`#02AA69`).
- **Original Nomenclature & Copyright-Safe Copy**: Custom delivery models (*Full-Cycle Product Builds*, *Embedded Senior Talent*, *Autonomous Tech Pods*) and proprietary service blueprints.
- **Interactive Project & Academy Estimator**: An integrated modal allowing prospective clients to estimate budgets, define project timelines, or apply for technical fellowships.
- **Mobile-First Responsiveness**: Tailored mobile navigation drawer, proportional touch buttons, and horizontal swipe-friendly client and case study showcases.
- **Pure Image-Based Brand Identity**: Standardized vector and raster assets in `public/` (`logo.png`, `logo.svg`, `logo-mark.png`, `logo-stacked.png`), completely decoupled from TSX components.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | [React 18](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) with custom typography & palettes |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Typography** | Plus Jakarta Sans & Space Grotesk |

---

## 📁 Project Structure

```text
JNAB/
├── public/                       # Static public assets (served at root)
│   ├── favicon.svg               # Browser tab vector icon
│   ├── logo-mark.png             # Standalone geometric brand mark
│   ├── logo-stacked.png          # Vertical/stacked brand lockup
│   ├── logo-horizontal.png       # Horizontal lockup (Mark + Text)
│   ├── logo.png                  # Primary navbar/header logo
│   ├── logo.svg                  # Scalable vector logo
│   └── logo-original.jpg         # High-resolution original master
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky header with mobile drawer & quote CTA
│   │   ├── Hero.tsx              # Value proposition, trust bar & impact metrics
│   │   ├── WhoWeAre.tsx          # Company foundation & strategic pillars
│   │   ├── HowWeDoIt.tsx         # Delivery models (Builds, Talent, Pods)
│   │   ├── CoreServices.tsx      # Interactive capability showcase with Dexwin-style hover
│   │   ├── AcademySection.tsx    # Technical training tracks (Design, Full-Stack, Upskilling)
│   │   ├── NotableProjects.tsx   # Flagship deliveries slider & metric badges
│   │   ├── Partnerships.tsx      # Strategic alliances & enterprise partners
│   │   ├── JoinUsCareers.tsx     # Open career positions & department filter
│   │   ├── CtaBanner.tsx         # Conversion-focused bottom banner
│   │   ├── Footer.tsx            # Corporate directory, legal links & contact details
│   │   └── QuoteEstimatorModal.tsx # Interactive multi-step consultation & quote modal
│   │
│   ├── App.tsx                   # Main layout container
│   ├── main.tsx                  # Application bootstrap
│   └── index.css                 # Tailwind directives & global utility styling
│
├── index.html                    # HTML entry point with SEO metadata
├── tailwind.config.js            # Tailwind theme extensions & design tokens
├── vite.config.ts                # Vite config (configured with --host for LAN preview)
├── tsconfig.json                 # TypeScript compiler options
└── package.json                  # Dependencies & execution scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18.0.0 or higher) and `npm` installed:

```bash
node -v
npm -v
```

### 1. Clone & Install Dependencies

```bash
cd JNAB
npm install
```

### 2. Start the Development Server

The development server is pre-configured with `--host` so you can test on your local machine and on mobile devices connected to the same Wi-Fi network:

```bash
npm run dev
```

Terminal output will display both the local and network URLs:
```text
  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.1.xxx:5173/
```

### 3. Production Build & Verification

To compile TypeScript and create an optimized production bundle:

```bash
npm run build
```

The production assets will be output to the `dist/` folder.

### 4. Preview the Production Build Locally

```bash
npm run preview
```

---

## 🎨 Brand Identity & Logo Assets

All logo files are stored as standalone image files in [`public/`](public/) for cross-platform portability:

| Asset | Format | Recommended Usage |
| :--- | :--- | :--- |
| `public/logo.png` | PNG (Transparent) | Web navigation headers, mobile menus, and dark footers |
| `public/logo.svg` | SVG (Vector) | High-DPI screens, vector exports, and digital documents |
| `public/logo-stacked.png` | PNG (Transparent) | Presentations, social media profiles, and marketing collateral |
| `public/logo-mark.png` | PNG (Transparent) | App icons, browser favicons, and avatars |

---

## 🚢 Deployment

### Deploy to Vercel
1. Push this repository to GitHub / GitLab / Bitbucket.
2. Import the project into [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`

### Deploy to Netlify
1. Connect repository in [Netlify](https://www.netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`

---

## 📄 License & Ownership

Copyright © 2026 **JNAB Tech Solutions** (operating as **JNAB Innovations**). All rights reserved.  
Accra Innovation Quarter · Ghana & Global Remote.
