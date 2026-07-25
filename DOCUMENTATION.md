# Swagruha Batters - Complete Technical Documentation & Project Guide

Welcome to the official codebase for **Swagruha Batters** — a premium FMCG web application for fresh, naturally fermented 1 KG Idli & Dosa Batters with dynamic Supabase cloud database synchronization and a hidden Admin Management Panel.

---

## 📁 Local Project Location

Your complete project folder is located on your computer at:
`C:\Users\keert\.gemini\antigravity-ide\scratch\swagruha-batters`

### 💻 How to Open in VS Code

#### Method 1: Via VS Code Menu
1. Open **Visual Studio Code**.
2. Click **File** -> **Open Folder...** (or press `Ctrl` + `K`, `Ctrl` + `O`).
3. Paste `C:\Users\keert\.gemini\antigravity-ide\scratch\swagruha-batters` in the folder path.
4. Click **Select Folder**.

#### Method 2: Via Terminal / Command Prompt
Open PowerShell or Command Prompt and type:
```powershell
cd C:\Users\keert\.gemini\antigravity-ide\scratch\swagruha-batters
code .
```

#### Method 3: Clone from GitHub
You can also clone the repository on any computer directly from GitHub:
```bash
git clone https://github.com/keerthikeswar3308/Swagruha-batters.git
```

---

## 🔗 Official Live URLs

- **Live Storefront**: [https://swagruha-batters-bc67.vercel.app](https://swagruha-batters-bc67.vercel.app)
- **Hidden Admin Panel**: [https://swagruha-batters-bc67.vercel.app/admin](https://swagruha-batters-bc67.vercel.app/admin)
- **GitHub Repository**: [https://github.com/keerthikeswar3308/Swagruha-batters](https://github.com/keerthikeswar3308/Swagruha-batters)

---

## 🔑 Admin Credentials

- **Admin Login Route**: `/admin` *(e.g., `http://localhost:3000/admin` or `https://swagruha-batters-bc67.vercel.app/admin`)*
- **Username**: `admin`
- **Password**: `swagruha@2026`

---

## 🏗️ Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Animations**: Framer Motion & Lucide Icons
- **Database & Persistence**: Supabase (Cloud Postgres) with Local JSON fallback
- **Deployment**: Vercel Serverless Platform

---

## 🛠️ Local Development Commands

To run the website locally on your computer:

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build production bundle
npm run build
```

The website will run at `http://localhost:3000`.

---

## 🗄️ Database Setup (Supabase)

All website content (products, prices, store locations, reviews, FAQs, storage tips, and hero text) is stored in the Supabase table `store_content` under `id='main'`.

### SQL Schema (`supabase_schema.sql`)
Run the following SQL snippet in your Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS store_content (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'main',
  data JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE store_content DISABLE ROW LEVEL SECURITY;
GRANT ALL ON TABLE store_content TO anon, authenticated, service_role, postgres;
NOTIFY pgrst, 'reload schema';
```

---

## 🌐 Environment Variables Setup (Vercel)

Add the following environment variables under **Vercel Settings -> Environment Variables**:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

---

## 📂 Project Directory Structure

```
swagruha-batters/
├── public/                  # Static assets & icons
├── src/
│   ├── app/
│   │   ├── admin/page.tsx   # Hidden Admin Dashboard & Login
│   │   ├── api/
│   │   │   ├── auth/        # Login/Verify/Logout endpoints
│   │   │   ├── data/        # GET/POST Database content handler
│   │   │   └── debug/       # Server diagnostic endpoint
│   │   ├── globals.css      # Custom styles & Google Fonts
│   │   ├── layout.tsx       # Main App Layout
│   │   ├── page.tsx         # Customer Storefront Homepage
│   │   ├── robots.ts        # SEO Robots.txt generator
│   │   └── sitemap.ts       # Dynamic XML Sitemap
│   ├── components/          # UI Components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── WhyChooseUs.tsx
│   │   ├── Ingredients.tsx
│   │   ├── Products.tsx
│   │   ├── Process.tsx
│   │   ├── StorageInstructions.tsx
│   │   ├── Gallery.tsx
│   │   ├── Locations.tsx
│   │   ├── Reviews.tsx
│   │   ├── FAQ.tsx
│   │   ├── ContactFooter.tsx
│   │   └── BackToTop.tsx
│   ├── data/
│   │   └── db.json          # Seed & Local fallback JSON database
│   └── lib/
│       ├── db.ts            # Persistent DB Abstraction Layer
│       └── supabase.ts      # Supabase Client Initializer
├── supabase_schema.sql      # Supabase Database SQL Script
├── .env.example             # Template for Environment Variables
├── package.json             # Dependencies & scripts
└── DOCUMENTATION.md         # Full project technical guide
```
