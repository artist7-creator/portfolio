# Pavlet EQ — Website

The official marketing and support website for **Pavlet EQ**, an advanced music player
for iPhone with a precise parametric equalizer and a clean listening experience.

> Spelling note: the app name is always written **"Pavlet EQ"** and the support email is
> **ompatilwork07@gmail.com**. Keep this consistent everywhere.

This is a **100% static site** — hand-written **HTML, CSS, and vanilla JavaScript**.
There is **no build step, no framework, and no server code**. It is designed to be
dropped straight into a GitHub Pages repository and work immediately.

---

## File overview

```
pavlet-website/
├── index.html        Home: hero, features, "Why Pavlet EQ", screenshots, FAQ
├── privacy.html      Privacy Policy (App Store submission–suitable)
├── terms.html        Terms of Use (license, IP, disclaimer, liability)
├── support.html      Help center: getting started, FAQ, troubleshooting, contact
├── contact.html      Simple contact card with mailto link (no backend)
├── 404.html          On-brand "page not found" (served automatically by GitHub Pages)
├── robots.txt        Allows all crawlers; references the sitemap
├── sitemap.xml       Lists the 5 main pages
├── .nojekyll         Empty file so GitHub Pages serves all assets as-is (no Jekyll)
├── README.md         This file
└── assets/                       All styles, scripts, and media live here
    ├── css/
    │   └── style.css             All styles: dark theme tokens, layout, components, responsive
    ├── js/
    │   └── script.js             Mobile nav, scroll-reveal, header, hero/landscape video autoplay
    ├── img/
    │   ├── logo/
    │   │   ├── logo-mark.png     App logo used in nav/footer
    │   │   ├── favicon.png       Browser tab favicon
    │   │   └── apple-touch-icon.png  iOS home-screen icon
    │   ├── icons/
    │   │   ├── icon-eq.svg       Feature icon: Parametric Equalizer
    │   │   ├── icon-playback.svg Feature icon: Audio Playback
    │   │   ├── icon-profiles.svg Feature icon: Custom EQ Profiles
    │   │   └── icon-interface.svg Feature icon: Beautiful Interface
    │   ├── screenshots/
    │   │   ├── app-library.png   Library screen
    │   │   ├── app-eq.png        Equalizer screen
    │   │   ├── app-presets.png   Presets screen
    │   │   ├── app-tools.png     Pro audio tools screen
    │   │   └── pavlet-eq.png     Community-EQ section screenshot
    │   ├── social/
    │   │   └── og-image.svg      Open Graph / Twitter card share image
    │   └── badges/
    │       └── app-store-badge.svg  "Download on the App Store" badge
    └── video/
        ├── pavlet-hero.mp4       Looping hero video (portrait mockup)
        └── pavlet-landscape.mp4  Landscape EQ mode demo
```

---

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `pavlet-website`).
2. Copy the **contents** of this folder into the repository root and push to `main`:
   ```bash
   git init
   git add .
   git commit -m "Add Pavlet EQ website"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source = Deploy from a branch**, then choose
   **Branch = `main`** and **Folder = `/ (root)`**. Save.
5. Wait a minute, then visit the URL GitHub shows you
   (e.g. `https://<you>.github.io/<repo>/`).

The included **`.nojekyll`** file disables Jekyll processing so every asset is served
exactly as-is.

### Custom domain (optional)

The site currently uses `https://pavlet.app/` as a **placeholder** base URL in
canonical tags, Open Graph URLs, `robots.txt`, and `sitemap.xml`.

To use a custom domain:

1. Add a file named **`CNAME`** at the repository root containing only your domain,
   e.g.:
   ```
   pavlet.app
   ```
   (No `CNAME` file is shipped here on purpose — add it only if you own the domain.)
2. Configure the domain's DNS to point at GitHub Pages.
3. Set the custom domain under **Settings → Pages**.

> The **404 page** uses root-relative paths (e.g. `/assets/style.css`), which is correct for a
> root deployment or custom domain. If you instead deploy to a **project subpath**
> (`https://<you>.github.io/<repo>/`), update the `/`-prefixed links in `404.html` to
> match your subpath, or use a custom domain.

---

## What to replace before launch

| Placeholder | Where | How to replace |
|-------------|-------|----------------|
| **App Store link** | `index.html` (`#download` badge, nav "Download") | Replace `href="#"` with your real App Store URL. |
| **Screenshots** | `assets/img/screenshots/app-*.png` | Drop in real iPhone screenshots (PNG/JPG). Update the `<img src>` and `alt`/`width`/`height` in `index.html`. |
| **OG / share image** | `assets/img/social/og-image.svg` | Replace with a 1200×630 image. Update the `og:image` / `twitter:image` URLs if the filename changes. |
| **Favicon** | `assets/img/logo/favicon.png` | Replace with your own PNG/SVG; it's linked from every page's `<head>`. |
| **App Store badge** | `assets/img/badges/app-store-badge.svg` | Optionally swap for Apple's official downloadable badge. |
| **Domain** | `https://pavlet.app/` in `index/privacy/terms/support/contact.html` (canonical + OG), `robots.txt`, `sitemap.xml` | Find-and-replace with your final domain. |
| **Email** | `ompatilwork07@gmail.com` | Change only if your contact address differs. |
| **Last-updated dates** | `privacy.html`, `terms.html` | Update when you revise the legal copy. |

---

## Design notes

- **Dark mode by default** via CSS custom properties (theme tokens at the top of
  `assets/css/style.css`): surfaces, text, accent, glass, radii, spacing.
- **Accent**: brand blue→amber gradient (`#3d7bf0 → #ecaa46`), sampled from the app logo.
- **Fonts**: native system stack (`-apple-system`, "SF Pro", Inter fallback) — no
  external font CDN, for fast loads.
- **Glassmorphism**: translucent nav and cards using `backdrop-filter` with a solid
  `@supports` fallback for unsupported browsers.
- **Animations**: subtle scroll-reveal via `IntersectionObserver`, fully disabled under
  `prefers-reduced-motion`.
- **Accessibility**: semantic landmarks, skip link, visible focus states, `alt` text,
  ARIA on the mobile nav toggle, and keyboard-friendly `<details>` FAQ.

---

## Local preview

No tooling required — just open `index.html` in a browser. To serve over HTTP
(closer to production), you can optionally run any static server, e.g.:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```
