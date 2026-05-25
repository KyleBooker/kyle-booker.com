# kyle-booker.com

Personal portfolio site for **Kyle Booker** — software engineer with a background in applied mathematics, currently focused on data engineering, scientific computing, and self-hosted infrastructure.

**Live:** [kyle-booker.com](https://kyle-booker.com)

The site is a single static page covering experience, skills, a home-lab tour with a live Grafana embed, education, and publications. No build step, no framework — plain HTML/CSS/JS so it stays trivial to deploy and easy to read.

## Highlights

- **Live home-lab metrics** — a public Grafana dashboard embedded directly in the page, streaming from the same K3s cluster that serves the site.
- **Dark / light theme** with `prefers-color-scheme` detection and a manual toggle persisted to `localStorage`.
- **Accessibility** — skip link, ARIA labels on the nav and menu controls, focus-visible styles, `prefers-reduced-motion` respected by the hero video and animations.
- **Resilient hero** — autoplaying vortex-shedding video with a CSS-background poster fallback for browsers that block autoplay (Brave, Safari with low power mode, etc.).
- **Zero external JS dependencies.** Just one Google Fonts request for Montserrat.

## Tech

| Layer | What |
|---|---|
| Markup | Semantic HTML5 |
| Styles | Hand-written CSS using custom properties, `color-mix()`, `clamp()`, and CSS Grid |
| Behaviour | Vanilla JavaScript (theme toggle, mobile menu, hero video lifecycle) |
| Fonts | [Montserrat](https://fonts.google.com/specimen/Montserrat) via Google Fonts |

## Project structure

```
.
├── index.html              # The single page
├── css/styles.css          # All styles
├── js/main.js              # Theme toggle, mobile menu, hero video
├── img/                    # Photos, project illustrations (SVG), hero video
├── Kyle_Booker_Resume.pdf  # Linked from the page (stable URL)
├── robots.txt
├── sitemap.xml
├── LICENSE                 # MIT
└── README.md
```

## Run locally

No build step. Open `index.html` directly, or serve the folder with any static server:

```bash
# Python
python -m http.server 8000

# Node
npx serve .
```

Then visit [http://localhost:8000](http://localhost:8000).

## Deployment

Self-hosted from my home lab:

- **Compute:** K3s cluster on Unraid, served from a small nginx container.
- **Ingress:** Cloudflare Tunnel → Traefik (reverse proxy with automatic Let's Encrypt TLS).
- **Edge protection:** CrowdSec behavioural WAF at the Traefik layer.
- **No exposed ports** on the home network — all public traffic arrives via the Cloudflare Tunnel.

The site is part of the home-lab tour described on the page itself.

## License

[MIT](./LICENSE) — feel free to use the layout or styles as a starting point for your own portfolio.
