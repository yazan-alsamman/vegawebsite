import { motion } from "framer-motion";
import { Clock, Headphones, Zap } from "lucide-react";

const signals = [
  { icon: Clock, title: "24h Response", desc: "We reply within one business day" },
  { icon: Headphones, title: "Direct Line", desc: "Talk to our team, not a bot" },
  { icon: Zap, title: "Free Consultation", desc: "No obligation project scoping call" },
];

export default function ContactSignals() {
  return (
    <div className="space-y-4">
      {signals.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12 }}
          whileHover={{ x: 6 }}
          className="flex items-center gap-4 p-4 rounded-xl border border-blue-400/10 bg-navy-900/70"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
            className="w-10 h-10 rounded-lg bg-blue-600/15 flex items-center justify-center shrink-0"
          >
            <item.icon size={18} className="text-blue-400" />
          </motion.div>
          <div>
            <p className="font-display font-semibold text-white text-sm">{item.title}</p>
            <p className="text-slate-500 text-xs">{item.desc}</p>
          </div>
        </motion.div>
      ))}

      <div className="flex items-end justify-center gap-1 h-12 pt-4 opacity-40">
        {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.3, 0.65, 1, 0.55, 0.75].map((h, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-blue-400"
            animate={{ height: ["20%", `${h * 100}%`, "20%"] }}
            transition={{
              duration: 0.8 + (i % 3) * 0.2,
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeInOut",
            }}
            style={{ height: "40%" }}
          />
        ))}
      </div>
    </div>
  );
}
