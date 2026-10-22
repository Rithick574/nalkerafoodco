import { cn } from "@/lib/site";

type Variant = "primary" | "outline" | "whatsapp" | "ghost-light";

const variants: Record<Variant, { base: string; fill: string }> = {
  primary: {
    base: "bg-leaf text-ivory shadow-[0_14px_30px_-14px_rgba(7,136,67,0.75)] hover:shadow-[0_18px_36px_-14px_rgba(6,93,53,0.85)]",
    fill: "bg-forest",
  },
  outline: {
    base: "border border-forest/25 text-forest hover:text-ivory hover:border-forest",
    fill: "bg-forest",
  },
  whatsapp: {
    base: "bg-lime text-forest-900 shadow-[0_16px_34px_-14px_rgba(155,203,40,0.8)]",
    fill: "bg-ivory",
  },
  "ghost-light": {
    base: "border border-ivory/30 text-ivory hover:text-forest hover:border-ivory",
    fill: "bg-ivory",
  },
};

type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  icon?: React.ReactNode;
  size?: "md" | "lg";
};

/** Pill link with a fill that rises on hover and an icon that nudges forward. */
export function ButtonLink({ href, variant = "primary", icon, size = "md", className, children, ...rest }: ButtonLinkProps) {
  const v = variants[variant];
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
      className={cn(
        "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full font-semibold tracking-[0.01em] transition-[color,box-shadow,border-color,transform] duration-500 ease-organic active:scale-[0.97]",
        size === "lg" ? "h-12 px-5 text-sm sm:h-14 sm:px-8 sm:text-[0.95rem]" : "h-12 px-6 text-sm",
        v.base,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 translate-y-[101%] rounded-full transition-transform duration-500 ease-organic group-hover:translate-y-0",
          v.fill,
        )}
      />
      <span className="flex items-center gap-2.5">
        {children}
        {icon && (
          <span aria-hidden className="transition-transform duration-500 ease-organic group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>
    </a>
  );
}
