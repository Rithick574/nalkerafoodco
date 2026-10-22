# Nalkera Foodco — website

Landing page for Nalkera Foodco (Poochol, Kerala). Next.js 15 (App Router), TypeScript, Tailwind CSS v4, Motion, Lucide.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Structure

- `src/app/` — layout (fonts, SEO/Open Graph), page, robots, sitemap, icons, self-hosted Malayalam font
- `src/components/` — `Header`, `HeroSection`, `AboutSection`, `ProductShowcase`, `HeritageSection`, `BrandValues`, `ContactSection`, `Footer`, `FloatingWhatsAppButton`
- `src/components/ui/` — shared primitives (`SplitText`, `Reveal`, `ButtonLink`, `Palm` illustrations, …)
- `src/lib/site.ts` — contact details, nav links, WhatsApp helper (edit contact info here)
- `src/lib/motion.ts` — shared easing and animation variants
- `src/app/globals.css` — design tokens (colours, fonts, keyframes)

## Brand assets

All product imagery is cut out of the official inauguration poster (1211×1511 px), so it is
low resolution. Replace these files in `public/images/` with official originals when available
(same names, transparent PNG):

| File | Needed original |
| --- | --- |
| `nalkera-logo.png` | Vector logo (SVG) — the poster crop has a soft left edge |
| `nalkera-coconut-oil-bottles.png` | High-res packshot of both bottles, transparent background |
| `nalkera-coconut-oil-1l.png` | High-res packshot of the 1 Ltr bottle |
| `coconut.png` | High-res coconut photograph |
| `nalla-keralathinte-ruchi.png` | Vector of the Malayalam tagline lettering |
| `og-image.jpg` | Regenerate from the high-res assets |

Not yet on the site because they are unverified: the smaller bottle's pack size, social media
profiles, and any claims about processing, sourcing or certification.

## Malayalam font

`src/app/fonts/baloo-chettan-2-ml.woff2` is a Malayalam + basic Latin subset of Baloo Chettan 2 (OFL).
The font's `MAL` language system leaves out conjunct ligatures, so text marked `lang="ml"` rendered
in reformed style. That record is removed from this subset so conjuncts render in traditional style.
