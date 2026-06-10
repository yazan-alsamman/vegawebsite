import { motion } from "framer-motion";
import { Code2, Megaphone, Layers } from "lucide-react";
import { pageImages } from "../../data/images";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ServicesHero() {
  return (
    <section className="relative pt-32 pb-16 min-h-[85vh] flex items-center overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-2 mb-8"
        >
          <Layers size={16} className="text-blue-400" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400/70">
            What We Deliver
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.08, ease }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6"
            >
              Built for Brands
              <br />
              That <span className="gradient-text">Scale</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease }}
              className="text-slate-400 leading-relaxed max-w-lg mb-10"
            >
              Two expert teams — engineering and creative — delivering end-to-end solutions
              from code and cloud to content and growth strategy.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, ease }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.a
                href="#coding"
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 px-5 py-4 rounded-xl glass-card border border-blue-400/15 hover:border-blue-400/35 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <Code2 size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-display font-semibold text-white text-sm">Coding Team</p>
                  <p className="text-slate-500 text-xs">Engineering & product</p>
                </div>
              </motion.a>

              <motion.a
                href="#marketing"
                whileHover={{ scale: 1.02, x: 3 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 px-5 py-4 rounded-xl glass-card border border-blue-400/15 hover:border-blue-400/35 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                  <Megaphone size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-display font-semibold text-white text-sm">Marketing Team</p>
                  <p className="text-slate-500 text-xs">Creative & growth</p>
                </div>
              </motion.a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.9, ease }}
            className="relative"
          >
            <motion.div
              className="absolute -inset-4 rounded-2xl border border-blue-400/15"
              animate={{ opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] sm:aspect-[5/6] photo-glow-hover">
              <img
                src={pageImages.services.hero}
                alt="VegaCore services"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, ease }}
              className="absolute -bottom-5 -left-4 sm:left-6 glass-card px-5 py-3 rounded-xl border border-blue-400/15 shadow-xl"
            >
              <p className="font-display font-bold text-white text-lg">12</p>
              <p className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                Services · 2 Teams
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, ease }}
              className="absolute -top-4 -right-4 sm:right-6 glass-card-light px-4 py-2 rounded-full"
            >
              <span className="font-mono text-[10px] text-blue-300 uppercase tracking-widest">
                End-to-end delivery
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
