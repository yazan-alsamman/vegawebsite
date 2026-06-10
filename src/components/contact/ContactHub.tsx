import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const channels = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+963 939 421 195",
    href: "tel:+963939421195",
    animate: "ring" as const,
  },
  {
    icon: Mail,
    label: "Email",
    value: "contact@vegacore.co",
    href: "mailto:contact@vegacore.co",
    animate: "bounce" as const,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat on WhatsApp",
    href: "https://wa.me/963939421195",
    animate: "pulse" as const,
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Damascus, Syria",
    animate: "pin" as const,
  },
];

const iconAnimations = {
  ring: { rotate: [0, -12, 12, -8, 8, 0] },
  bounce: { y: [0, -6, 0] },
  pulse: { scale: [1, 1.12, 1] },
  pin: { y: [0, -4, 0] },
};

const iconTransitions = {
  ring: { duration: 0.6, repeat: Infinity, repeatDelay: 2.5 },
  bounce: { duration: 1.2, repeat: Infinity, ease: "easeInOut" as const },
  pulse: { duration: 1.5, repeat: Infinity, ease: "easeInOut" as const },
  pin: { duration: 2, repeat: Infinity, ease: "easeInOut" as const },
};

export default function ContactHub() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden min-h-[70vh] flex items-center">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20 pointer-events-none"
          style={{ width: 120 + i * 100, height: 120 + i * 100 }}
          animate={{ scale: [0.8, 1.3], opacity: [0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs uppercase tracking-[0.35em] text-blue-400/70 mb-6"
        >
          Open Channel
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
        >
          Let's <span className="gradient-text">Connect</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="text-slate-400 max-w-lg mx-auto mb-14"
        >
          Pick a channel below — call, email, or message us. We're ready when you are.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 120 }}
          className="relative w-24 h-24 mx-auto mb-14"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.div
            animate={iconAnimations.ring}
            transition={iconTransitions.ring}
            className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center border-2 border-blue-400/30 shadow-lg shadow-blue-600/30"
          >
            <Phone size={36} className="text-white" />
          </motion.div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {channels.map((ch, i) => {
            const Wrapper = ch.href ? "a" : "div";
            const props = ch.href
              ? { href: ch.href, target: ch.href.startsWith("http") ? "_blank" : undefined, rel: ch.href.startsWith("http") ? "noopener noreferrer" : undefined }
              : {};

            return (
              <motion.div
                key={ch.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
              >
                <Wrapper
                  {...props}
                  className="block p-5 rounded-xl border border-blue-400/15 bg-navy-900/70 hover:bg-blue-500/10 hover:border-blue-400/35 transition-all group"
                >
                  <motion.div
                    animate={iconAnimations[ch.animate]}
                    transition={iconTransitions[ch.animate]}
                    className={`w-11 h-11 rounded-lg flex items-center justify-center mb-3 mx-auto ${
                      ch.label === "WhatsApp"
                        ? "bg-green-600/20 text-green-400"
                        : "bg-blue-600/20 text-blue-400"
                    }`}
                  >
                    <ch.icon size={22} />
                  </motion.div>
                  <p className="font-display font-semibold text-white text-sm mb-1">{ch.label}</p>
                  <p className="text-slate-500 text-xs group-hover:text-slate-300 transition-colors">
                    {ch.value}
                  </p>
                </Wrapper>
              </motion.div>
            );
          })}
        </div>

        <motion.a
          href="#message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="inline-block mt-10 font-mono text-xs text-blue-400/60 hover:text-blue-400 transition-colors"
        >
          or send a message ↓
        </motion.a>
      </div>
    </section>
  );
}
