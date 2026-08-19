import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { trackMetaPixelEvent } from "@/lib/meta-pixel";

export function CTAButton({
  children,
  className,
  size = "lg",
  href = "#oferta",
  trackAs,
}: {
  children: ReactNode;
  className?: string;
  size?: "md" | "lg";
  href?: string;
  /**
   * Nome do evento do Meta Pixel a disparar ao clicar (ex: "InitiateCheckout").
   * Deixa por definir (undefined) nos botões que apenas fazem scroll
   * dentro da própria página — usa isto só nos botões que levam
   * mesmo até ao checkout externo (Kursinha).
   */
  trackAs?: string;
}) {
  return (
    <a
      href={href}
      onClick={() => {
        if (trackAs) trackMetaPixelEvent(trackAs);
      }}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full font-display font-bold uppercase tracking-wide",
        "bg-[image:var(--gradient-gold)] text-primary-foreground shadow-[var(--shadow-gold)]",
        "animate-gold-pulse transition-transform duration-300 hover:scale-105 active:scale-100",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none",
        size === "lg" ? "px-8 py-4 text-base sm:px-12 sm:text-lg" : "px-6 py-3 text-sm",
        className,
      )}
    >
      {children}
    </a>
  );
}
