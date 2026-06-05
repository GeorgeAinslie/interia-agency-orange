# Interia Studios — Next.js site

Premium  marketing one-pager for **lead generation, funnels, and performance creative**. Built with the App Router, **Satoshi** + **Alliance No.1** (same pairing as the legacy `interia-funnel-orange` static funnel), light scroll motion via Framer Motion, and a **near-black page background** so photography and trust blocks sit cleanly (see `globals.css` `:root` for colours).

Fonts live in `src/fonts/` (Satoshi from Fontshare; Alliance is your licensed webfont—replace `alliance-no1/` if your agreement requires a different cut).

## Run locally

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## SEO & production URL

Set your public site URL so metadata, `robots.txt`, and `sitemap.xml` resolve correctly:

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

If unset, it defaults to `https://interia.studio` — update `src/lib/site.ts` or the env for your real domain.

## Deploy

- **Vercel:** connect the repo with root directory `web`, or deploy from this folder.
- **Netlify:** use Next.js runtime; set publish directory / build command per Netlify Next docs.

## Form handling

`LeadForm` currently validates on the client and shows confirmation copy. Wire it to email/CRM with a [Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations), Route Handler, or a provider (Brevo, Resend, HubSpot, etc.).

## Legacy static site

The original flat HTML funnel remains at the repo root (`index.html`, `styles.css`, `script.js`) for reference.
