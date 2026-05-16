# Edward Han — Personal Portfolio

A dark, minimal portfolio built with **React**, **Vite**, **Tailwind CSS v4**, and **Framer Motion**. Chapters are large blocks on the home page; each opens a dedicated page with its entries. Content lives in `src/data/portfolioData.js`.

The look is inspired by streaming-style catalogs (without third-party trademarks or copyrighted assets).

## Prerequisites

- Node.js 20+ recommended
- npm

## Setup

```bash
npm install
```

## Local development

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/`).

## Production build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## GitHub Pages — base path

Project sites are served from `https://<user>.github.io/<repository>/`, so asset URLs must include that prefix. This project reads **`VITE_BASE_PATH`** at build time (see `vite.config.js`).

1. Copy `.env.example` to `.env.production`.
2. Set the variable to your repository path with **leading and trailing slashes**, for example:

```bash
VITE_BASE_PATH=/Personal-Website/
```

For a **user or organization site** (`username.github.io` with a repo named `username.github.io`), use the root:

```bash
VITE_BASE_PATH=/
```

3. Update the `homepage` field in `package.json` to your real GitHub Pages URL (optional metadata for tooling).

4. In GitHub: **Settings → Pages → Build and deployment → Branch `gh-pages` / root** after the first deploy.

## Deploy with `gh-pages`

The `deploy` script builds the site and pushes the `dist` folder to the `gh-pages` branch.

```bash
npm run deploy
```

On first use, authenticate with GitHub (HTTPS credential manager or SSH as you prefer).

**Important:** ensure `.env.production` contains the correct `VITE_BASE_PATH` for your repository **before** running `deploy`.

## Deploy with GitHub Actions (optional)

The workflow `.github/workflows/deploy-github-pages.yml` builds with `VITE_BASE_PATH=/<repository>/` and publishes via **GitHub Actions**.

1. In the repository: **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
2. Push to `main` to trigger a deploy, or run the workflow manually under **Actions**.

If the repository is a **user site** (`<username>.github.io`), edit the workflow and set `VITE_BASE_PATH` to `/` instead of `/${{ github.event.repository.name }}/`.

## Editing content

| What to change | Where |
| --- | --- |
| Hero name, role, tagline | `heroContent` in `src/data/portfolioData.js` |
| Chapter titles & which items appear | `contentRows` (`title`, `itemIds`, …) |
| Chapter playing-card backs | `cardBackVariant` + optional `cardBackImage` on each `contentRows` entry |
| Card + modal text, tech tags, links | `portfolioItems` |
| About copy | `aboutContent` |
| Experience blurbs | `experienceEntries` |
| Email, LinkedIn, GitHub, resume path | `contactContent` |
| Navigation labels | `siteNav` |
| Card / modal images | add files under `public/` and set each item’s `image` field (e.g. `/posters/uav.jpg`) |

Place your résumé at **`public/resume.pdf`** (or change `resumeUrl` in `contactContent`).

After `vite build`, **`dist/404.html`** is copied from `index.html` so direct visits and refreshes on client routes (for example `/chapter/featured`) work on **GitHub Pages**.

## Tech stack

- React 19, Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Framer Motion
- React Router (`/` and `/chapter/:rowId`; `basename` matches `import.meta.env.BASE_URL` for GitHub Pages)
- Lucide React (neutral icons used for GitHub/LinkedIn tiles where brand glyphs are not shipped in this npm build)

## Scripts summary

| Script | Description |
| --- | --- |
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `dist/` and copy SPA `404.html` |
| `npm run preview` | Serve `dist/` locally |
| `npm run deploy` | `npm run build` then publish `dist/` to branch `gh-pages` |

## License

Private personal site — adjust as you like.
