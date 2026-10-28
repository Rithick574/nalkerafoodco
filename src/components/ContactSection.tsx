"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Globe, MapPin, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { ease, fadeUp, stagger } from "@/lib/motion";
import { Eyebrow } from "./ui/Eyebrow";
import { SplitText } from "./ui/SplitText";
import { ButtonLink } from "./ui/ButtonLink";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";
import { PalmFrond } from "./ui/Palm";

const details = [
  { icon: Phone, label: "Call", value: site.phoneDisplay, href: site.phoneHref },
  { icon: MapPin, label: "Visit", value: site.location, href: site.mapsUrl },
  { icon: Globe, label: "Online", value: site.website, href: site.url },
];

export function ContactSection() {
  return (
    <section id="contact" className="bg-ivory px-3 pb-3 pt-6 md:px-5 md:pb-5">
      <div className="grain relative isolate overflow-hidden rounded-[2rem] bg-forest text-ivory md:rounded-[3rem]">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_20%_0%,#0b9e50_0%,transparent_55%),radial-gradient(ellipse_at_100%_100%,#043f25_0%,transparent_60%)]" />
        <Image src="/images/pattern.webp" alt="" fill sizes="100vw" className="pattern-light -z-10 object-cover opacity-[0.05]" />

        <div aria-hidden className="pointer-events-none absolute -left-24 -top-20 -z-10 w-[360px] md:w-[480px]">
          <div className="origin-left animate-sway">
            <PalmFrond tone="light" className="w-full rotate-[28deg] opacity-[0.12]" />
          </div>
        </div>
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-28 -z-10 w-[380px] md:w-[560px] lg:hidden">
          <div className="origin-right -scale-x-100 animate-sway [animation-delay:-3s]">
            <PalmFrond tone="light" className="w-full -rotate-[20deg] opacity-[0.1]" />
          </div>
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-[1.35fr_1fr] lg:px-16">
          <div>
            <Eyebrow light>Get in touch</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-medium leading-[1.02] tracking-[-0.02em]">
              <SplitText lines={["Bring Home the Goodness", "of *Nalkera.*"]} accentClassName="italic text-lime" />
            </h2>

            <motion.div variants={stagger(0.1, 0.3)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <motion.p variants={fadeUp} className="mt-6 max-w-md text-lg leading-relaxed text-ivory/75">
                Interested in our products? We&rsquo;d love to hear from you.
              </motion.p>

              <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={whatsappLink("Hi Nalkera, I'd like to enquire about your products.")} variant="whatsapp" size="lg" icon={<WhatsAppIcon className="size-5" />} className="sm:h-16 sm:px-9 sm:text-base">
                  Enquire on WhatsApp
                </ButtonLink>
                <ButtonLink href={site.phoneHref} variant="ghost-light" size="lg" icon={<Phone className="size-4" />} className="sm:h-16 sm:px-9 sm:text-base">
                  Call Us
                </ButtonLink>
              </motion.div>

              <motion.ul variants={fadeUp} className="mt-12 grid gap-6 border-t border-ivory/15 pt-8 sm:grid-cols-3">
                {details.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ivory/10 text-lime">
                      <Icon aria-hidden className="size-4" />
                    </span>
                    <span>
                      <span className="block text-[0.65rem] font-bold uppercase tracking-[0.24em] text-ivory/50">{label}</span>
                      {href ? (
                        <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="mt-0.5 block font-medium text-ivory underline-offset-4 hover:underline">
                          {value}
                        </a>
                      ) : (
                        <span className="mt-0.5 block font-medium text-ivory">{value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </motion.ul>
            </motion.div>
          </div>

          <div className="relative mx-auto hidden aspect-square w-full max-w-[460px] lg:block">
            <motion.div
              aria-hidden
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, ease }}
              className="absolute inset-x-0 bottom-[4%] aspect-square rounded-full bg-[radial-gradient(circle,rgba(155,203,40,0.35),transparent_68%)]"
            />
            <motion.div
              initial={{ opacity: 0, y: 60, rotate: 4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.4, ease, delay: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Image
                src="/images/brand/nalkera-coconut-oil-with-coconut.png"
                alt="Nalkera Coconut Oil bottles beside a halved coconut"
                width={1587}
                height={1571}
                sizes="460px"
                className="h-auto w-full drop-shadow-[0_40px_40px_rgba(0,0,0,0.35)]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
