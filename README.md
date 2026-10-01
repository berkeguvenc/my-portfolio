# Minimalist Developer Portfolio & Local CMS

A modern, high-performance, and SEO-friendly personal portfolio website built with Next.js (App Router), React 19, and Tailwind CSS. It features a minimalist "Design Engineer" aesthetic and a built-in local CMS (Admin Panel) that saves your data directly to a local JSON file without needing any external database.

## Features

- **Local-First CMS:** Edit your portfolio data via a hidden `/admin` panel. Changes are saved directly to `src/data/portfolio.json`.
- **Zero Database Required:** No SQL/NoSQL setup needed. Just commit your JSON file and push to deploy.
- **Modern Tech Stack:** Next.js (App Router), React 19, TypeScript.
- **Beautiful UI:** Tailwind CSS, Framer Motion for smooth animations, and Lucide React icons.
- **Secure Admin Panel:** The `/admin` route is only accessible in development mode (guarded via environment variables) and returns a 404 in production to protect your data.

## Getting Started

### 1. Installation

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Environment Setup

Check the `.env.local` file in the root directory or create one. Ensure the following variable is present to enable the admin panel during local development:

```env
ENABLE_ADMIN_PANEL=true
```

### 3. Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the live portfolio.

### 4. Admin Panel & Content Management

Navigate to [http://localhost:3000/admin](http://localhost:3000/admin) to access the built-in CMS. 
Here you can manage:
- General Info & Social Links
- Featured Projects (Work)
- Side Projects (Builds)
- Skills & Tools
- Work Experience

Once you save your changes in the admin panel, `src/data/portfolio.json` will be updated automatically.

## Deployment

Since the portfolio uses a local JSON file for data, deploying is as simple as pushing your code to a hosting provider like [Vercel](https://vercel.com/).

1. Ensure your changes to `src/data/portfolio.json` are committed.
2. Push your code to your repository.
3. Import the repository into Vercel and deploy.

*Note: In the production environment, the `/admin` panel is automatically disabled (returns 404) for security purposes.*

## 🔄 Keeping Your Template Updated

If you created your portfolio using this template and want to pull the latest features and bug fixes from the upstream repository, follow these simple steps:

### 1. Add upstream remote (only once)
```bash
git remote add upstream https://github.com/berkeguvenc/my-portfolio.git
```

### 2. Pull the latest updates
```bash
git pull upstream main --allow-unrelated-histories --no-rebase
```

### 3. Keep your personal data (in case of conflict)
If there is a conflict in `src/data/portfolio.json`, run this to keep your own personal information:
```bash
git checkout --ours src/data/portfolio.json
git add .
git commit -m "chore: merge upstream template updates"
```

### 4. Push to your own repository
```bash
git push origin main
```

## Support

If you found this template helpful, consider supporting my work on [Kreosus](https://kreosus.com/berkeguvenc/about)! ❤️

## Roadmap

Interested in upcoming features or want to contribute? Check out our [Roadmap](ROADMAP.md) for planned features and future vision.
