# ⚡ 3D AI ENGINEERING PORTFOLIO | DILLIBABU G

A premium, modern, full-stack 3D interactive portfolio website for **DILLIBABU G** — Aspiring AI Engineer & BCA Student specializing in **Python, Machine Learning, Deep Learning, and Natural Language Processing (NLP)**.

---

## 🚀 Key Features

* **3D Neural Scene:** Interactive Three.js 3D neural sphere with cursor tracking, glowing nodes, and particle rings.
* **Interactive AI LAB Terminal:** Server-side Gemini 3.6 Flash assistant allowing recruiters to ask questions about DILLIBABU's profile, skills, projects, and degree in real time.
* **Interactive Skill Dashboard:** Categorized skills (Programming, ML, Deep Learning, NLP) with proficiency metrics and hover visualizers.
* **3D Project Showcase:** Filterable project cards with 3D tilt perspective, detailed modal breakdown (Problem, Solution, AI approach, Tech stack, Results), GitHub & Live links.
* **REST API & Swagger Docs:** Production Express REST API architecture with live interactive OpenAPI testing at `/api/docs`.
* **Admin Dashboard:** Secure authentication panel allowing CRUD operations on profile details, skills, projects, and contact messages.
* **Contact System:** Real-time contact form connected to backend storage with validation and rate limiting.
* **Resume Engine:** Downloadable formatted resume generation via `/api/resume`.

---

## 🛠️ Technology Stack

### Frontend
* **Framework:** React 19 + TypeScript + Vite
* **Styling:** Tailwind CSS
* **3D Graphics:** Three.js / WebGL Canvas
* **Icons:** Lucide React

### Backend
* **Server Runtime:** Node.js + Express + TypeScript
* **AI API Integration:** `@google/genai` (Gemini 3.6 Flash server-side)
* **REST Architecture:** Controllers, Services, Models, Validation & Error Handlers
* **Database / ORM:** PostgreSQL + Prisma Schema (`/prisma/schema.prisma`)

---

## 📁 Monorepo Structure

```
portfolio/
├── frontend/ (React 19 + Vite + Tailwind + Three.js)
│   ├── src/
│   │   ├── components/ (Navbar, Hero, About, Skills, Projects, AI LAB, Admin, Resume, API Docs)
│   │   ├── 3d/         (HeroBrainSphere, NeuralBackground, Project3DCard)
│   │   ├── db/         (initialData)
│   │   ├── services/   (PortfolioStore)
│   │   └── types.ts
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   └── server.ts
├── .env.example
├── README.md
└── package.json
```

---

## ⚡ Quick Start & Installation

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your secrets:
```env
GEMINI_API_KEY="your_gemini_api_key"
JWT_SECRET="dillibabu_secret_jwt_key_2026"
ADMIN_PASSWORD="admin_dillibabu_2026"
DATABASE_URL="postgresql://user:pass@localhost:5432/dillibabu_portfolio"
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

---

## 🌐 Production Build & Deployment

### Build Command
```bash
npm run build
```
This compiles the Vite frontend and bundles `server.ts` into `dist/server.cjs` via esbuild.

### Start Command
```bash
npm run start
```

### Deployment Targets
* **Cloud Run / Render / Railway:** Deploy container or Node server with `npm run start`.
* **Vercel / Netlify:** Configured for single-repo or full-stack Node adapter deployment.

---

## 🛡️ Admin Dashboard Login
Access the Admin Dashboard via the shield icon in the navigation bar.
* **Default Password:** `admin_dillibabu_2026`

---

## 📞 Contact Information
* **Name:** DILLIBABU G
* **Role:** Aspiring AI Engineer
* **Email:** [dillibabu2618@gmail.com](mailto:dillibabu2618@gmail.com)
* **Phone:** +91 7539949771
* **LinkedIn:** [dillibabu-g-395a90291](https://www.linkedin.com/in/dillibabu-g-395a90291/)
* **GitHub:** [dilli-cmyk](https://github.com/dilli-cmyk)
