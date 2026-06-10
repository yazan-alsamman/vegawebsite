import { motion } from "framer-motion";
import { processSteps } from "../../data/services";

export default function ProcessPipeline() {
  return (
    <div className="relative">
      <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-blue-400/15" />
      <motion.div
        className="hidden lg:block absolute top-8 left-[12%] h-px bg-gradient-to-r from-blue-500 to-blue-400 origin-left"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
        {processSteps.map((step, i) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative text-center lg:text-left"
          >
            <motion.div
              whileHover={{ scale: 1.15 }}
              className="w-16 h-16 mx-auto lg:mx-0 rounded-full border-2 border-blue-500/30 bg-navy-900 flex items-center justify-center mb-5 relative z-10"
            >
              <span className="font-mono text-sm font-bold text-blue-400">{step.step}</span>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-blue-400"
                initial={{ scale: 1, opacity: 0 }}
                whileInView={{ scale: 1.4, opacity: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.2, repeat: Infinity, repeatDelay: 3 }}
              />
            </motion.div>
            <h3 className="font-display font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
