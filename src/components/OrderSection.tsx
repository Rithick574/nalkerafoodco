"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2, House, Minus, Phone, Plus } from "lucide-react";
import { cn, site, whatsappLink } from "@/lib/site";
import { ease, fadeUp, stagger } from "@/lib/motion";
import { sizes, type PackSizeKey } from "@/lib/products";
import { Eyebrow } from "./ui/Eyebrow";
import { SplitText } from "./ui/SplitText";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

type Mode = "home" | "bulk";

const MAX_QTY = 999;
const businessTypes = ["Shop / Supermarket", "Restaurant / Catering", "Distributor / Wholesaler", "Other"];
const bulkQuantities = ["Under 50 bottles", "50–200 bottles", "200–500 bottles", "500+ bottles"];

const modes: { key: Mode; label: string; icon: typeof House }[] = [
  { key: "home", label: "Order for home", icon: House },
  { key: "bulk", label: "Bulk / Business", icon: Building2 },
];

const formatVolume = (ml: number) => (ml >= 1000 ? `${+(ml / 1000).toFixed(2)} L` : `${ml} ml`);

const fieldClass =
  "h-12 w-full rounded-xl border border-forest/15 bg-ivory px-4 text-[0.95rem] text-ink placeholder:text-ink/35 transition-colors focus:border-leaf focus:outline-none focus:ring-2 focus:ring-lime/40";
const labelClass = "mb-2 block text-[0.68rem] font-bold uppercase tracking-[0.22em] text-ink/50";

function Field({ label, children }: { label: string; children: (id: string) => React.ReactNode }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children(id)}
    </div>
  );
}

function ChipGroup({
  legend,
  options,
  selected,
  onToggle,
  multiple = false,
}: {
  legend: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
  multiple?: boolean;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className={labelClass}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const on = selected.includes(o);
          return (
            <label
              key={o}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-medium ring-1 transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold",
                on ? "bg-forest text-ivory ring-forest" : "bg-ivory text-forest/80 ring-forest/15 hover:ring-forest/40",
              )}
            >
              <input type={multiple ? "checkbox" : "radio"} name={name} checked={on} onChange={() => onToggle(o)} className="sr-only" />
              {o}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/** A number that rolls up or down when it changes. */
function RollingNumber({ value, className }: { value: string | number; className?: string }) {
  return (
    <span className={cn("relative inline-flex overflow-hidden", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "70%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-70%", opacity: 0 }}
          transition={{ duration: 0.35, ease }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function SendButton({ href, disabled, children }: { href: string; disabled?: boolean; children: React.ReactNode }) {
  const base =
    "group relative isolate inline-flex h-14 w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-8 font-semibold transition-[box-shadow,transform] duration-500 ease-organic active:scale-[0.98] sm:w-auto";
  if (disabled) {
    return (
      <button type="button" disabled className={cn(base, "cursor-not-allowed bg-forest/10 text-forest/45")}>
        {children}
      </button>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, "bg-leaf text-ivory shadow-[0_14px_30px_-14px_rgba(7,136,67,0.75)]")}
    >
      <span aria-hidden className="absolute inset-0 -z-10 translate-y-[101%] rounded-full bg-forest transition-transform duration-500 ease-organic group-hover:translate-y-0" />
      <WhatsAppIcon className="size-5" />
      {children}
    </a>
  );
}

function HomeOrder() {
  const [qty, setQty] = useState<Record<PackSizeKey, number>>({ "1l": 0, "500ml": 0, "300ml": 0 });
  const [name, setName] = useState("");
  const [place, setPlace] = useState("");

  const change = (key: PackSizeKey, delta: number) =>
    setQty((q) => ({ ...q, [key]: Math.max(0, Math.min(MAX_QTY, q[key] + delta)) }));

  const lines = sizes.filter((s) => qty[s.key] > 0);
  const bottles = lines.reduce((n, s) => n + qty[s.key], 0);
  const volume = lines.reduce((n, s) => n + qty[s.key] * s.ml, 0);

  const message = [
    "Hi Nalkera, I'd like to order Nalkera Coconut Oil:",
    ...lines.map((s) => `• ${s.label} × ${qty[s.key]}`),
    `Total: ${bottles} bottle${bottles === 1 ? "" : "s"} (${formatVolume(volume)})`,
    name.trim() && `Name: ${name.trim()}`,
    place.trim() && `Location: ${place.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div>
      <ul className="divide-y divide-forest/10">
        {sizes.map((s) => (
          <li key={s.key} className="flex items-center gap-4 py-4 first:pt-0">
            <div className="flex h-16 w-9 shrink-0 items-end justify-center">
              <Image
                src={s.image.src}
                alt=""
                width={s.image.width}
                height={s.image.height}
                sizes="40px"
                style={{ height: `${s.scale * 100}%` }}
                className="w-auto"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-display text-xl text-forest">{s.label}</p>
              <p className="truncate text-xs text-ink/55">{s.tagline}</p>
            </div>
            <div className="flex items-center rounded-full bg-ivory ring-1 ring-forest/10">
              <button
                type="button"
                onClick={() => change(s.key, -1)}
                disabled={qty[s.key] === 0}
                aria-label={`Remove one ${s.label} bottle`}
                className="grid size-11 place-items-center rounded-full text-forest transition-colors hover:bg-forest/5 disabled:cursor-not-allowed disabled:opacity-30"
              >
                <Minus className="size-4" />
              </button>
              <output aria-label={`${qty[s.key]} × ${s.label}`} className="w-9 text-center font-semibold tabular-nums text-ink">
                <RollingNumber value={qty[s.key]} />
              </output>
              <button
                type="button"
                onClick={() => change(s.key, 1)}
                disabled={qty[s.key] === MAX_QTY}
                aria-label={`Add one ${s.label} bottle`}
                className="grid size-11 place-items-center rounded-full text-forest transition-colors hover:bg-forest/5 disabled:opacity-30"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div aria-live="polite" className="mt-5 flex items-baseline justify-between rounded-2xl bg-forest px-5 py-4 text-ivory">
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-ivory/60">Your order</span>
        <span className="font-display text-xl">
          <RollingNumber value={bottles} /> bottle{bottles === 1 ? "" : "s"}
          <span className="text-ivory/50"> · </span>
          <RollingNumber value={formatVolume(volume)} className="text-lime" />
        </span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field label="Your name (optional)">
          {(id) => <input id={id} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={fieldClass} placeholder="e.g. Priya" />}
        </Field>
        <Field label="Your location (optional)">
          {(id) => <input id={id} value={place} onChange={(e) => setPlace(e.target.value)} autoComplete="address-level2" className={fieldClass} placeholder="Town or area" />}
        </Field>
      </div>

      <div className="mt-7">
        <SendButton href={whatsappLink(message)} disabled={bottles === 0}>
          {bottles === 0 ? "Add bottles to continue" : "Send order on WhatsApp"}
        </SendButton>
      </div>
    </div>
  );
}

function BulkOrder() {
  const [business, setBusiness] = useState("");
  const [type, setType] = useState<string[]>([]);
  const [packs, setPacks] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<string[]>([]);
  const [place, setPlace] = useState("");
  const [notes, setNotes] = useState("");

  const message = [
    "Hi Nalkera, I have a bulk order enquiry for Nalkera Coconut Oil.",
    (business.trim() || type.length) && `Business: ${[business.trim(), type[0] && `(${type[0]})`].filter(Boolean).join(" ")}`,
    packs.length && `Sizes: ${sizes.filter((s) => packs.includes(s.label)).map((s) => s.label).join(", ")}`,
    quantity.length && `Approx. quantity: ${quantity[0]}`,
    place.trim() && `Location: ${place.trim()}`,
    notes.trim() && `Notes: ${notes.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Business name">
          {(id) => <input id={id} value={business} onChange={(e) => setBusiness(e.target.value)} autoComplete="organization" className={fieldClass} placeholder="Your shop or company" />}
        </Field>
        <Field label="Location">
          {(id) => <input id={id} value={place} onChange={(e) => setPlace(e.target.value)} autoComplete="address-level2" className={fieldClass} placeholder="Town or district" />}
        </Field>
      </div>
      <ChipGroup legend="Business type" options={businessTypes} selected={type} onToggle={(v) => setType([v])} />
      <ChipGroup
        legend="Sizes needed"
        multiple
        options={sizes.map((s) => s.label)}
        selected={packs}
        onToggle={(v) => setPacks((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]))}
      />
      <ChipGroup legend="Approximate quantity" options={bulkQuantities} selected={quantity} onToggle={(v) => setQuantity([v])} />
      <Field label="Anything else? (optional)">
        {(id) => (
          <textarea
            id={id}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className={cn(fieldClass, "h-auto resize-none py-3")}
            placeholder="Delivery schedule, repeat orders, questions…"
          />
        )}
      </Field>
      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-5">
        <SendButton href={whatsappLink(message)}>Send bulk enquiry</SendButton>
        <p className="text-sm text-ink/55">Pricing and availability are shared on request.</p>
      </div>
    </div>
  );
}

export function OrderSection() {
  const [mode, setMode] = useState<Mode>("home");

  return (
    <section id="order" className="relative overflow-hidden bg-ivory py-24 md:py-32">
      <div aria-hidden className="absolute -right-40 top-20 size-[460px] rounded-full bg-lime/15 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Eyebrow>Order</Eyebrow>
          <h2 className="mt-6 font-display text-[clamp(2.3rem,5vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.02em] text-forest">
            <SplitText lines={["Stock up on", "*everyday goodness.*"]} />
          </h2>
          <motion.div variants={stagger(0.1, 0.25)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
            <motion.p variants={fadeUp} className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-ink/70">
              Pick a few bottles for home, or tell us what your shop, restaurant or business needs. Your order comes to us
              on WhatsApp, and we confirm the details with you there.
            </motion.p>
            <motion.p variants={fadeUp} className="mt-4 text-sm text-ink/50">
              Nothing is charged on this website.
            </motion.p>

            <motion.div variants={fadeUp} role="group" aria-label="Order type" className="mt-8 inline-flex rounded-full bg-cream p-1 ring-1 ring-forest/10">
              {modes.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMode(key)}
                  aria-pressed={mode === key}
                  className={cn(
                    "relative flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors duration-300 sm:px-5",
                    mode === key ? "text-ivory" : "text-forest/70 hover:text-forest",
                  )}
                >
                  {mode === key && <motion.span layoutId="order-mode" transition={{ duration: 0.5, ease }} className="absolute inset-0 rounded-full bg-forest" />}
                  <Icon aria-hidden className="relative size-4" />
                  <span className="relative">{label}</span>
                </button>
              ))}
            </motion.div>

            <motion.p variants={fadeUp} className="mt-8 text-sm text-ink/60">
              Prefer to talk?{" "}
              <a href={site.phoneHref} className="inline-flex items-center gap-1.5 font-semibold text-forest underline-offset-4 hover:underline">
                <Phone aria-hidden className="size-3.5" />
                {site.phoneDisplay}
              </a>
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease }}
          className="rounded-[2rem] bg-cream p-6 ring-1 ring-forest/10 sm:p-8 md:p-10"
        >
          {/* Both forms stay mounted so switching tabs keeps what the customer has entered. */}
          {modes.map(({ key }) => (
            <motion.div
              key={key}
              hidden={mode !== key}
              initial={false}
              animate={mode === key ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.45, ease }}
            >
              <h3 className="mb-6 font-display text-2xl text-forest">
                {key === "home" ? "Choose your bottles" : "Tell us about your order"}
              </h3>
              {key === "home" ? <HomeOrder /> : <BulkOrder />}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
