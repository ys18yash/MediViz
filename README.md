# MediViz Patient Web

Patient-facing healthcare frontend built with React + Vite + Tailwind.

## Run locally

```bash
npm install
npm run dev
```

## GitHub Pages deployment

This repo is configured for automatic deployment with GitHub Actions using:

- `.github/workflows/deploy-pages.yml`
- Vite `base: "./"` in `vite.config.js` for Pages-safe asset paths

### One-time GitHub setup

1. Open your repo on GitHub.
2. Go to `Settings` -> `Pages`.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to the `main` branch.
5. Wait for the **Deploy to GitHub Pages** workflow to pass.
6. Your site will be available at:
   - `https://<username>.github.io/<repository>/` for project pages
   - `https://<username>.github.io/` for user/org pages
