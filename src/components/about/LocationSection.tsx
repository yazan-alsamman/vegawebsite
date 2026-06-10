import { MapPin } from "lucide-react";
import AnimatedSection from "../AnimatedSection";

interface LocationSectionProps {
  image: string;
}

export default function LocationSection({ image }: LocationSectionProps) {
  return (
    <AnimatedSection>
      <div className="grid md:grid-cols-2 gap-0 rounded-2xl overflow-hidden glass-card shimmer-border">
        <div className="relative min-h-[280px] md:min-h-[360px]">
          <img
            src={image}
            alt="Damascus, Syria"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-navy-950/40" />
          <div className="absolute bottom-5 left-5">
            <p className="font-display font-bold text-white text-lg">Damascus, Syria</p>
          </div>
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/80 mb-3">
            Our Location
          </p>
          <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
            Damascus, <span className="gradient-text">Syria</span>
          </h2>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-blue-400 mt-0.5 shrink-0" />
            <p className="text-slate-300 text-sm leading-relaxed">
              VegaCore is headquartered in Damascus, serving clients locally and internationally.
            </p>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
