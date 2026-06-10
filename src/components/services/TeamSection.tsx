import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Code2, Megaphone } from "lucide-react";
import ServiceRow from "./ServiceRow";
import PhotoCycle from "./PhotoCycle";

interface Service {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

interface TeamSectionProps {
  id: string;
  team: "coding" | "marketing";
  title: string;
  subtitle: string;
  intro: string;
  services: Service[];
  photos: { src: string; label: string }[];
  indexOffset?: number;
}

const teamMeta = {
  coding: { icon: Code2, label: "Engineering", accent: "from-blue-600/20 to-transparent" },
  marketing: { icon: Megaphone, label: "Creative", accent: "from-indigo-600/15 to-transparent" },
};

export default function TeamSection({
  id,
  team,
  title,
  subtitle,
  intro,
  services,
  photos,
  indexOffset = 0,
}: TeamSectionProps) {
  const meta = teamMeta[team];
  const Icon = meta.icon;

  return (
    <section id={id} className="scroll-mt-28 py-20 relative overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-b ${meta.accent} pointer-events-none`} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 mb-3"
            >
              <div className="w-1 h-12 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full" />
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-blue-400/70 mb-1">
                  {meta.label}
                </p>
                <h2 className="font-display text-3xl sm:text-4xl font-bold">{title}</h2>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-slate-500 text-sm mb-2 ml-5 pl-5 border-l border-blue-400/10"
            >
              {subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-slate-400 leading-relaxed mb-8 ml-5 pl-5 border-l border-blue-400/10"
            >
              {intro}
            </motion.p>

            <div className="rounded-xl border border-blue-400/10 bg-navy-900/40 overflow-hidden px-5 sm:px-8">
              <div className="flex items-center gap-3 py-4 border-b border-blue-400/10">
                <Icon size={16} className="text-blue-400" />
                <span className="font-mono text-xs text-slate-500 uppercase tracking-wider">
                  {services.length} Services
                </span>
              </div>
              {services.map((service, i) => (
                <ServiceRow
                  key={service.title}
                  index={indexOffset + i}
                  {...service}
                />
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 60, rotate: 2 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 sticky top-32"
          >
            <PhotoCycle images={photos} interval={3500} aspectClass="aspect-[3/4]" />
            <motion.p
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-center font-mono text-[10px] text-slate-600 mt-3 uppercase tracking-widest"
            >
              Live preview
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
