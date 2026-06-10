import type { ComponentType } from "react";
import { motion } from "framer-motion";
import ServiceCard from "./ServiceCard";

interface Service {
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

interface ServicesTeamBlockProps {
  id: string;
  number: string;
  label: string;
  title: string;
  subtitle: string;
  intro: string;
  image: string;
  imageAlt: string;
  services: Service[];
  indexOffset?: number;
  reversed?: boolean;
}

export default function ServicesTeamBlock({
  id,
  number,
  label,
  title,
  subtitle,
  intro,
  image,
  imageAlt,
  services,
  indexOffset = 0,
  reversed = false,
}: ServicesTeamBlockProps) {
  return (
    <section id={id} className="scroll-mt-28 py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-3xl font-bold text-blue-500/25">{number}</span>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400/70">{label}</p>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-2">{title}</h2>
          <p className="text-blue-300/60 text-sm font-medium mb-4">{subtitle}</p>
          <p className="text-slate-400 max-w-2xl leading-relaxed">{intro}</p>
        </motion.div>

        <div
          className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-start mb-14 ${
            reversed ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: reversed ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute -inset-3 rounded-2xl border border-blue-400/10 pointer-events-none group-hover:border-blue-400/25 transition-colors" />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-5 left-6 glass-card px-4 py-2.5 rounded-lg border border-blue-400/15"
            >
              <span className="font-mono text-xs text-slate-400">
                {services.length} specialized services
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: reversed ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {services.slice(0, 4).map((service, i) => (
              <ServiceCard
                key={service.title}
                index={indexOffset + i}
                {...service}
              />
            ))}
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.slice(4).map((service, i) => (
            <ServiceCard
              key={service.title}
              index={indexOffset + 4 + i}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
