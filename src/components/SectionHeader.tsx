import type { ReactNode } from "react";
import AnimatedSection from "./AnimatedSection";

interface SectionHeaderProps {
  label: string;
  title: ReactNode;
  description?: string;
  className?: string;
  align?: "center" | "left";
}

export default function SectionHeader({
  label,
  title,
  description,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <AnimatedSection className={`mb-14 ${alignClass} ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/80 mb-3">
        {label}
      </p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">{title}</h2>
      {description && (
        <p className={`text-slate-300 max-w-2xl leading-relaxed ${align === "center" ? "mx-auto" : ""}`}>
          {description}
        </p>
      )}
    </AnimatedSection>
  );
}
