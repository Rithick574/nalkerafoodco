import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { HeritageSection } from "@/components/HeritageSection";
import { BrandValues } from "@/components/BrandValues";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.company,
  alternateName: site.brand,
  url: site.url,
  logo: `${site.url}/images/nalkera-logo.png`,
  telephone: "+91-7356045804",
  address: { "@type": "PostalAddress", addressLocality: "Poochol", addressRegion: "Kerala", addressCountry: "IN" },
  contactPoint: { "@type": "ContactPoint", telephone: "+91-7356045804", contactType: "customer service", areaServed: "IN" },
};

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-forest px-5 py-3 text-sm font-semibold text-ivory transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <ProductShowcase />
        <HeritageSection />
        <BrandValues />
        <ContactSection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
