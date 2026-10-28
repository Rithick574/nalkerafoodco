"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star } from "lucide-react";
import { cn, site, whatsappLink } from "@/lib/site";
import { reviews, type Review } from "@/lib/reviews";
import { ease, fadeUp, stagger } from "@/lib/motion";
import { Eyebrow } from "./ui/Eyebrow";
import { SplitText } from "./ui/SplitText";
import { ButtonLink } from "./ui/ButtonLink";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

const feedbackMessage = "Hi Nalkera, I'd like to share some feedback about Nalkera Coconut Oil: ";

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 48" aria-hidden className={className}>
      <path
        d="M0 48V30C0 13 8 3 24 0l3 6C17 9 13 15 12.5 24H25v24H0Zm37 0V30c0-17 8-27 24-30l3 6c-10 3-14 9-14.5 18H62v24H37Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex gap-1", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} aria-hidden className={cn("size-4", i <= rating ? "fill-gold text-gold" : "text-forest/20")} />
      ))}
    </span>
  );
}

const starIn: Variants = {
  hidden: { opacity: 0, scale: 0.4, rotate: -30 },
  show: (i: number) => ({ opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.7, ease, delay: 0.4 + i * 0.09 } }),
};

/** Shown until real reviews are added to src/lib/reviews.ts. */
function InviteReviews() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.6 }}
        aria-hidden
        className="flex justify-center gap-2"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span key={i} custom={i} variants={starIn}>
            <Star className="size-7 fill-gold text-gold md:size-8" />
          </motion.span>
        ))}
      </motion.div>

      <Eyebrow className="mt-10 justify-center">Reviews</Eyebrow>
      <h2 className="mt-6 font-display text-[clamp(2.3rem,5.4vw,4.1rem)] font-medium leading-[1.04] tracking-[-0.02em] text-forest">
        <SplitText lines={["Tried Nalkera?", "*Tell us how it was.*"]} />
      </h2>

      <motion.div variants={stagger(0.12, 0.3)} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }}>
        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-ink/70">
          Your words help other families discover Nalkera Coconut Oil. Share a few lines on Google — it only takes a
          minute — or send your feedback straight to us.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href={site.mapsUrl} size="lg" icon={<ArrowUpRight className="size-4" />}>
            Review us on Google
          </ButtonLink>
          <ButtonLink href={whatsappLink(feedbackMessage)} size="lg" variant="outline" icon={<WhatsAppIcon className="size-[18px]" />}>
            Send feedback
          </ButtonLink>
        </motion.div>
      </motion.div>
    </div>
  );
}

function ReviewQuote({ review }: { review: Review }) {
  return (
    <figure>
      <Stars rating={review.rating} />
      <blockquote
        lang={review.lang === "ml" ? "ml" : undefined}
        className={cn(
          "mt-6 text-forest",
          review.lang === "ml"
            ? "font-ml text-[clamp(1.35rem,3vw,2rem)] font-medium"
            : "font-display text-[clamp(1.6rem,3.6vw,2.6rem)] italic leading-[1.25] tracking-[-0.01em]",
        )}
      >
        “{review.text}”
      </blockquote>
      <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
        <span className="font-semibold text-ink">{review.name}</span>
        <span aria-hidden className="h-4 w-px bg-ink/15" />
        <span className="text-ink/55">
          via {review.source}
          {review.date && ` · ${review.date}`}
        </span>
      </figcaption>
    </figure>
  );
}

function ReviewCarousel() {
  const [[index, dir], setState] = useState<[number, number]>([0, 1]);
  const go = (d: number) => setState(([i]) => [(i + d + reviews.length) % reviews.length, d]);
  const many = reviews.length > 1;

  return (
    <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
      <div>
        <Eyebrow>Reviews</Eyebrow>
        <h2 className="mt-6 font-display text-[clamp(2.3rem,5vw,3.9rem)] font-medium leading-[1.04] tracking-[-0.02em] text-forest">
          <SplitText lines={["Kind words from", "*our customers.*"]} />
        </h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={site.mapsUrl} variant="outline" icon={<ArrowUpRight className="size-4" />}>
            Read more on Google
          </ButtonLink>
          <ButtonLink href={site.mapsUrl} icon={<Star className="size-4" />}>
            Write a review
          </ButtonLink>
        </div>
      </div>

      <div className="relative">
        <QuoteMark className="w-14 text-lime/50 md:absolute md:-left-2 md:-top-14 md:w-28 md:text-lime/40" />
        <div aria-live="polite" className="relative min-h-[300px] overflow-hidden md:min-h-[280px]">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={index}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.55, ease }}
              className="pt-6"
            >
              <ReviewQuote review={reviews[index]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {many && (
          <div className="mt-10 flex items-center gap-4 border-t border-forest/10 pt-6">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous review"
              className="grid size-12 place-items-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-ivory"
            >
              <ArrowLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next review"
              className="grid size-12 place-items-center rounded-full border border-forest/20 text-forest transition-colors hover:bg-forest hover:text-ivory"
            >
              <ArrowRight className="size-4" />
            </button>
            <p className="ml-auto font-display text-lg text-forest tabular-nums">
              {String(index + 1).padStart(2, "0")}
              <span className="text-ink/35"> / {String(reviews.length).padStart(2, "0")}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative overflow-hidden bg-cream py-24 md:py-32">
      <div aria-hidden className="absolute -left-32 top-10 size-[420px] rounded-full bg-lime/15 blur-3xl" />
      <div aria-hidden className="absolute -right-24 bottom-0 size-[360px] rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">{reviews.length ? <ReviewCarousel /> : <InviteReviews />}</div>
    </section>
  );
}
