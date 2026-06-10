import { motion } from "framer-motion";
import PageShell from "../components/PageShell";
import ContactHub from "../components/contact/ContactHub";
import ContactForm from "../components/contact/ContactForm";
import ContactSignals from "../components/contact/ContactSignals";

export default function Contact() {
  return (
    <PageShell>
        <ContactHub />

        <div className="relative h-24 flex justify-center pointer-events-none overflow-visible" aria-hidden>
          <div className="relative w-px h-full bg-blue-400/10 overflow-visible">
            <motion.div
              className="absolute inset-x-0 h-16 bg-gradient-to-b from-transparent via-blue-400/70 to-transparent"
              animate={{ top: ["-30%", "130%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
          </div>
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-blue-400/50"
              style={{ top: `${20 + i * 28}%` }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.3, 0.8] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </div>

        <section id="message" className="scroll-mt-24 py-20 relative overflow-hidden">
          <motion.div
            className="absolute -left-20 top-1/4 w-64 h-64 rounded-full border border-blue-400/10 pointer-events-none"
            animate={{ rotate: 360, scale: [1, 1.08, 1] }}
            transition={{
              rotate: { duration: 30, repeat: Infinity, ease: "linear" },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            aria-hidden
          />
          <motion.div
            className="absolute -right-16 bottom-1/4 w-48 h-48 rounded-full border border-dashed border-blue-400/15 pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400/70 mb-2">
                Compose
              </p>
              <h2 className="font-display text-3xl font-bold">
                Send a <span className="gradient-text">Message</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-5 gap-10 items-start">
              <div className="lg:col-span-2 lg:sticky lg:top-28">
                <ContactSignals />
              </div>
              <div className="lg:col-span-3">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
    </PageShell>
  );
}
