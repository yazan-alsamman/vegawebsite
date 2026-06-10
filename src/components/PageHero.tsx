import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageHeroProps {
  title: ReactNode;
  subtitle: string;
  badge?: ReactNode;
  image?: string;
}

export default function PageHero({ title, subtitle, badge, image }: PageHeroProps) {
  return (
    <section className="relative pt-28 pb-20 overflow-hidden min-h-[420px] flex items-center">
      {image && (
        <>
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-15"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/50 via-transparent to-transparent" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card-light text-blue-300 text-sm font-medium mb-6"
            >
              {badge}
            </motion.div>
          )}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7 }}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
