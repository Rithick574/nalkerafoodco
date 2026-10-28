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

Official images from the design team live in `public/images/brand/`, trimmed from the original
2160×2700 canvases. The untouched originals are kept in `design/originals/` (not deployed).

| File | Source original |
| --- | --- |
| `nalkera-logo.png` | `logo.png` |
| `nalkera-coconut-oil-bottles.png` | `bottle 2.png` |
| `nalkera-coconut-oil-1l.png` | `1 ltr bottle.png` |
| `nalkera-coconut-oil-with-coconut.png` | `bottle with coco.png` |
| `coconut.png` | `coco.png` |
| `nalla-keralathinte-ruchi.png` | `nalla keralathinte ruchi.png` |

`og-image.jpg` and the app icons in `src/app/` are generated from these. `pattern.webp` is a
generated background texture inspired by the poster.

`500 ml bottle.png` is not used yet: its label artwork reads "Net Wt 1 Ltr", so the 500 ml size
needs confirming with the design team before it goes on the site. Also not on the site because
they are unverified: social media profiles, and any claims about processing, sourcing or certification.

## Malayalam font

`src/app/fonts/baloo-chettan-2-ml.woff2` is a Malayalam + basic Latin subset of Baloo Chettan 2 (OFL).
The font's `MAL` language system leaves out conjunct ligatures, so text marked `lang="ml"` rendered
in reformed style. That record is removed from this subset so conjuncts render in traditional style.


# 🥥 Nalkera Foodco — Official Website

**Pure Goodness. Rooted in Kerala. 🌴**

A modern, elegant, and fully responsive landing page for **Nalkera Foodco**, a Kerala-based food brand featuring coconut oil products.

Inspired by Kerala's natural beauty and coconut heritage, this website combines premium product presentation, smooth animations, and a clean, nature-inspired design to create an engaging digital brand experience.

## 🌿 About the Project

The Nalkera Foodco website is designed to establish a strong digital presence for the brand while showcasing its coconut oil products.

The website's visual identity is inspired by Nalkera's official inauguration poster, featuring rich green tones, warm cream backgrounds, organic design elements, and elegant typography.

### ✨ Features

- 🎨 **Premium UI/UX** — Modern, nature-inspired design reflecting Nalkera's brand identity.
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile devices.
- 🎬 **Smooth Animations** — Elegant scroll animations, transitions, and micro-interactions.
- 🥥 **Product Showcase** — Beautiful presentation of Nalkera coconut oil products.
- 🌴 **Kerala-Inspired Design** — Tropical visuals, coconut leaves, and organic patterns.
- ⚡ **Performance Optimized** — Fast loading and optimized assets.
- 🔍 **SEO Friendly** — Semantic HTML and search engine metadata.
- 💬 **WhatsApp Integration** — Direct customer inquiries through WhatsApp.
- ♿ **Accessible Design** — Keyboard-friendly navigation and reduced-motion support.

## 🛠️ Tech Stack

The planned technology stack includes:

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Responsive styling |
| Motion / Framer Motion | Animations and transitions |
| Lucide React | Icons |

*The final stack may vary based on the implemented project.*

## 🚀 Getting Started

### Prerequisites

Ensure you have installed:

- Node.js (current LTS version)
- npm, yarn, or pnpm
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/YOUR_USERNAME/nalkera-website.git
```

**2. Navigate to the project**

```bash
cd nalkera-website
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the application**

Visit:

```text
http://localhost:3000
```

*These commands assume a standard Next.js setup.*

## 📁 Project Structure

Suggested project organization:

```text
nalkera-website/
├── public/
│   ├── images/
│   ├── products/
│   └── logo/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProductShowcase.tsx
│   │   ├── HeritageSection.tsx
│   │   ├── ContactSection.tsx
│   │   └── Footer.tsx
│   └── lib/
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Brand Colors

The website uses a nature-inspired color palette based on the official Nalkera branding.

| Color | Hex Code |
|---|---|
| Primary Green | `#078843` |
| Deep Green | `#065D35` |
| Leaf Green | `#9BCB28` |
| Warm Ivory | `#FAF8E8` |
| Soft Cream | `#F3EFD9` |
| Gold Accent | `#D4AF55` |

## 📄 Website Sections

1. **Home** — Immersive hero section with brand messaging and product visuals.
2. **About Us** — Introduction to Nalkera Foodco.
3. **Our Products** — Premium coconut oil product showcase.
4. **Our Heritage** — Kerala-inspired brand storytelling.
5. **Why Nalkera** — Brand values and product philosophy.
6. **Contact** — Customer inquiries and contact information.

## 🌐 Deployment

The website can be deployed using platforms such as Vercel.

For a standard Next.js project:

```bash
npm run build
npm run start
```

Production deployment configuration will depend on the selected hosting platform.

## 📞 Contact

**Nalkera Foodco**

📍 Poochol, Kerala, India

📱 +91 73560 45804

🌐 [www.nalkera.com](https://www.nalkera.com)

💬 [Contact on WhatsApp](https://wa.me/917356045804)

## 📜 License

All Nalkera branding, logos, product imagery, and related brand assets belong to their respective owners.

Source-code licensing has not yet been specified.

---

**Made with 💚 for Nalkera Foodco**

*നല്ല കേരളത്തിന്റെ രുചി* 🌴

## License

Proprietary — © Nalkera Foodco. All rights reserved. See [LICENSE](LICENSE), which also lists the
third-party fonts and packages that keep their own licenses.
