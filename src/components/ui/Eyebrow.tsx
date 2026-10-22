import { cn } from "@/lib/site";

export function Eyebrow({ children, className, light = false }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.3em]",
        light ? "text-lime" : "text-leaf",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-9", light ? "bg-lime/60" : "bg-leaf/50")} />
      {children}
    </p>
  );
}
