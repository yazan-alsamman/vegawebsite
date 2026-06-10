import type { ComponentType } from "react";
import { motion } from "framer-motion";

interface ServiceRowProps {
  index: number;
  icon: ComponentType<{ size?: number; className?: string }>;
  title: string;
  description: string;
}

export default function ServiceRow({
  index,
  icon: Icon,
  title,
  description,
}: ServiceRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 48 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/8 group-hover:to-transparent transition-all duration-500 pointer-events-none"
        initial={false}
      />

      <div className="relative flex gap-5 sm:gap-8 py-7 border-b border-blue-400/8 group-hover:border-blue-400/25 transition-colors">
        <motion.span
          className="font-mono text-sm text-blue-500/40 pt-1 w-8 shrink-0 group-hover:text-blue-400/70 transition-colors"
          whileHover={{ scale: 1.2 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>

        <motion.div
          whileHover={{ scale: 1.12, rotate: -6 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-10 h-10 rounded-lg border border-blue-400/20 flex items-center justify-center shrink-0 group-hover:border-blue-400/50 group-hover:shadow-lg group-hover:shadow-blue-600/20 transition-all"
          style={{ backgroundColor: "rgba(37, 99, 235, 0.15)" }}
        >
          <Icon size={18} className="text-blue-400" />
        </motion.div>

        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-blue-300 transition-colors">
            {title}
          </h3>
          <motion.p
            initial={false}
            className="text-slate-400 text-sm leading-relaxed max-w-2xl group-hover:text-slate-300 transition-colors"
          >
            {description}
          </motion.p>
        </div>

        <motion.div
          className="hidden sm:flex items-center"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 0.3, x: 0 }}
          whileHover={{ opacity: 1, x: 4 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-blue-400"
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.15 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
