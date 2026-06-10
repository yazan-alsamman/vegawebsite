import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import AnimatedCounter from "../components/AnimatedCounter";
import PageShell from "../components/PageShell";
import ServicesHero from "../components/services/ServicesHero";
import ServicesTeamBlock from "../components/services/ServicesTeamBlock";
import ProcessPipeline from "../components/services/ProcessPipeline";
import {
  codingServices,
  marketingServices,
  stats,
  coreCapabilities,
} from "../data/services";
import { pageImages } from "../data/images";

export default function Services() {
  return (
    <PageShell>
        <ServicesHero />

        {/* Stats bar */}
        <section className="relative -mt-4 pb-8">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl glass-card border border-blue-400/15 shadow-2xl shadow-navy-950/40"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="text-center">
                  <AnimatedCounter value={stat.value} label={stat.label} delay={i * 0.1} />
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Sticky nav */}
        <section className="sticky top-[72px] z-30 border-b border-blue-400/10 bg-navy-950/85 backdrop-blur-xl">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center gap-8 py-3">
            {[
              { href: "#coding", label: "Coding" },
              { href: "#marketing", label: "Marketing" },
              { href: "#process", label: "Process" },
            ].map((link) => (
              <motion.a
                key={link.href}
                href={link.href}
                whileHover={{ y: -2 }}
                className="font-mono text-xs uppercase tracking-widest text-slate-500 hover:text-blue-400 transition-colors"
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-14 border-b border-blue-400/8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400/60 text-center mb-6"
            >
              Core Capabilities
            </motion.p>
            <div className="flex flex-wrap justify-center gap-3">
              {coreCapabilities.map((cap, i) => (
                <motion.span
                  key={cap}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="px-4 py-2 rounded-full glass-card-light text-sm text-slate-300 border border-blue-400/10"
                >
                  {cap}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        <ServicesTeamBlock
          id="coding"
          number="01"
          label="Engineering"
          title="Coding Team"
          subtitle="Engineering excellence at every layer"
          intro="We transform complex business requirements into elegant, scalable digital products — from web and mobile to AI and cloud infrastructure."
          image={pageImages.services.coding}
          imageAlt="Coding team at work"
          services={codingServices}
          indexOffset={0}
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-px bg-gradient-to-r from-transparent via-blue-400/20 to-transparent" />
        </div>

        <ServicesTeamBlock
          id="marketing"
          number="02"
          label="Creative"
          title="Marketing Team"
          subtitle="Creative power that amplifies your brand"
          intro="Compelling narratives and stunning visuals that connect your brand with the right audience — photography, video, content, and growth strategy."
          image={pageImages.services.marketing}
          imageAlt="Marketing team creative work"
          services={marketingServices}
          indexOffset={6}
          reversed
        />

        {/* Process */}
        <section id="process" className="scroll-mt-28 py-24 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400/70 mb-3">
                Workflow
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                How We <span className="gradient-text">Deliver</span>
              </h2>
              <p className="text-slate-400 text-sm max-w-lg mx-auto">
                A clear, collaborative path from first conversation to launch and beyond.
              </p>
            </motion.div>

            <div className="rounded-2xl glass-card border border-blue-400/12 p-8 sm:p-12">
              <ProcessPipeline />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 pb-32">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden glass-card shimmer-border"
            >
              <div className="absolute inset-0">
                <img
                  src={pageImages.services.process}
                  alt=""
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/85 to-navy-950/70" />
              </div>

              <div className="relative grid lg:grid-cols-5 gap-8 p-10 sm:p-14 items-center">
                <div className="lg:col-span-3">
                  <p className="font-mono text-xs uppercase tracking-[0.3em] text-blue-400/70 mb-4">
                    Start a Project
                  </p>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                    Ready to scope your next build?
                  </h2>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-md">
                    Tell us what you need — we'll match the right team and map a clear path
                    from idea to launch.
                  </p>
                </div>
                <div className="lg:col-span-2 flex lg:justify-end">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-all"
                  >
                    Get a Quote
                    <ArrowRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
    </PageShell>
  );
}
