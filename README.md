# HomeLinx-IA

**Public property discovery PWA — Part of the VTL Evosystem**

Built to VTL LINX BUILD PROTOCOL v1.0.

---

## Stack

- [Astro](https://astro.build) with `output: "server"`
- [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/) adapter
- Cloudflare Pages deployment
- PWA — offline-capable via Service Worker

---

## Routes

| Route | Description |
|-------|-------------|
| `/` | Property grid — combined For Sale + To Rent with live filtering |
| `/property/[id]` | Property detail page |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VTL_API_URL` | Base URL of the VTL API Worker |

Set in Cloudflare Pages → Settings → Environment Variables.

If `VTL_API_URL` is not set, the app falls back to mock data and will not crash at build time.

---

## API Endpoints (consumed)

```
GET /api/properties
GET /api/property/:id
```

All API calls route exclusively through `src/lib/api.ts`.

---

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## Deploy

Push to GitHub. Connect repo to Cloudflare Pages.
Build command: `npm run build`
Output directory: `dist`
Node version: 18+

---

## PWA

- Cache name: `homelinx-v1`
- Offline fallback: `/offline.html`
- Manifest: `/manifest.json`
- Icons: 192×192 and 512×512

---

*VTL LINX BUILD PROTOCOL v1.0 — Production Baseline*
