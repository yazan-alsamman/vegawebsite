import type { ComponentType } from "react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  index: number;
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

export default function ServiceCard({
  index,
  icon: Icon,
  title,
  description,
}: ServiceCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.07 }}
      whileHover={{ y: -4 }}
      className="group relative p-6 sm:p-7 rounded-2xl glass-card shimmer-border h-full flex flex-col"
    >
      <div className="flex items-start justify-between mb-5">
        <motion.div
          whileHover={{ scale: 1.08, rotate: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-400/15 flex items-center justify-center group-hover:bg-blue-600/25 group-hover:border-blue-400/30 transition-colors"
        >
          <Icon size={22} className="text-blue-400" />
        </motion.div>
        <span className="font-mono text-xs text-blue-500/35 group-hover:text-blue-400/60 transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="font-display font-semibold text-lg text-white mb-3 group-hover:text-blue-200 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed flex-1">{description}</p>
    </motion.article>
  );
}
