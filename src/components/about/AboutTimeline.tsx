import { motion } from "framer-motion";
import AnimatedSection from "../AnimatedSection";

const steps = [
  {
    year: "Origins",
    title: "Founded in Damascus",
    text: "VegaCore began as a focused coding studio with one goal — give every business access to world-class digital work.",
  },
  {
    year: "Growth",
    title: "Two Teams, One Company",
    text: "We united elite developers and creative marketers under one roof to deliver complete business development solutions.",
  },
  {
    year: "Scale",
    title: "Global Clientele",
    text: "Partners across the Middle East, Europe, and beyond — proving that excellence travels beyond borders.",
  },
  {
    year: "Today",
    title: "60+ Projects Delivered",
    text: "E-commerce, healthcare, real estate, hospitality, AI, and enterprise — built with precision and long-term vision.",
  },
];

export default function AboutTimeline() {
  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-[19px] sm:left-6 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/50 via-blue-400/20 to-transparent" />

      <div className="space-y-10">
        {steps.map((step, i) => (
          <AnimatedSection key={step.title} delay={i * 0.1}>
            <div className="relative flex gap-6 sm:gap-8 pl-0">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 200 }}
                className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-navy-900 border-2 border-blue-500/40 flex items-center justify-center shrink-0"
              >
                <span className="font-display text-xs sm:text-sm font-bold text-blue-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </motion.div>

              <motion.div
                whileHover={{ x: 4 }}
                className="flex-1 pb-2 border-b border-blue-400/10 last:border-0"
              >
                <p className="text-blue-400/70 text-xs font-semibold uppercase tracking-widest mb-1">
                  {step.year}
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.text}</p>
              </motion.div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
