import Image from "next/image";
import { navLinks, site, whatsappLink } from "@/lib/site";
import { CurrentYear } from "./ui/CurrentYear";

export function Footer() {
  return (
    <footer className="bg-forest text-ivory">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 md:px-8">
        <div className="grid gap-14 md:grid-cols-[1.5fr_1fr_1fr] md:gap-10">
          <div className="max-w-sm">
            <Image src="/images/nalkera-logo.png" alt="Nalkera Foodco" width={768} height={320} sizes="150px" className="h-auto w-[150px]" />
            <p className="mt-6 leading-relaxed text-ivory/70">{site.description}</p>
            <p lang="ml" className="mt-5 font-ml text-lg text-lime">
              {site.taglineMl}
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-ivory/45">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-ivory/80 transition-colors hover:text-lime">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-[0.68rem] font-bold uppercase tracking-[0.26em] text-ivory/45">Contact</h2>
            <ul className="mt-5 space-y-3 text-ivory/80">
              <li>
                <a href={site.phoneHref} className="transition-colors hover:text-lime">
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-lime">
                  WhatsApp
                </a>
              </li>
              <li>{site.location}</li>
              <li>
                <a href={site.url} className="transition-colors hover:text-lime">
                  {site.website}
                </a>
              </li>
            </ul>
            {/* Social links: add here once official Nalkera profiles are confirmed. */}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-8 text-sm text-ivory/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {site.company}. All rights reserved.
          </p>
          <p>Made with care in Kerala.</p>
        </div>
      </div>
    </footer>
  );
}
