import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Megaphone,
  Sparkles,
  Globe,
  Zap,
  Quote,
  CheckCircle2,
} from "lucide-react";
import PageShell from "../components/PageShell";
import AnimatedSection from "../components/AnimatedSection";
import AnimatedLogoHero from "../components/AnimatedLogoHero";
import AnimatedCounter from "../components/AnimatedCounter";
import GlowImage from "../components/GlowImage";
import HandshakeVideo from "../components/HandshakeVideo";
import SectionHeader from "../components/SectionHeader";
import ProjectCard from "../components/ProjectCard";
import { assetUrl } from "../api/client";
import { useProjects } from "../hooks/useProjects";
import { stats, processSteps, coreCapabilities } from "../data/services";
import { testimonials } from "../data/testimonials";
import { pageImages } from "../data/images";

const heroEase = [0.22, 1, 0.36, 1] as const;

export default function Home() {
  const { featuredProjects } = useProjects();
  const clientLogos = featuredProjects.filter((p) => p.logo).slice(0, 6);

  return (
    <PageShell>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Text — slides from LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -100, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, ease: heroEase }}
              className="text-center lg:text-left order-2 lg:order-1"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
                }}
              >
                <motion.div
                  variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/20 bg-blue-500/5 text-blue-300 text-sm font-medium mb-8"
                >
                  <motion.span
                    animate={{ rotate: [0, 180, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles size={16} />
                  </motion.span>
                  Business Development & Digital Solutions
                </motion.div>

                <motion.h1
                  variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.8, ease: heroEase }}
                  className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold leading-[1.1] mb-6 tracking-tight"
                >
                  Transform Your Business
                  <br />
                  <span className="gradient-text">Into Digital Reality</span>
                </motion.h1>

                <motion.p
                  variants={{ hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }}
                  className="text-base sm:text-lg text-slate-300/90 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                >
                  VegaCore is a full-spectrum business development company. From cutting-edge
                  code to compelling content — we build the digital future your business deserves.
                </motion.p>

                <motion.div
                  variants={{ hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } }}
                  className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4"
                >
                  <Link
                    to="/contact"
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-600/30 hover:scale-105 flex items-center gap-2"
                  >
                    <motion.span
                      className="absolute inset-0 bg-white/10"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative">Start Your Project</span>
                    <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/portfolio"
                    className="px-8 py-4 border border-blue-400/25 text-slate-200 font-semibold rounded-xl hover:bg-blue-500/10 hover:border-blue-400/40 transition-all"
                  >
                    View Our Work
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Logo animation — slides from RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 120, scale: 0.85, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 0.35, ease: heroEase }}
              className="order-1 lg:order-2"
            >
              <AnimatedLogoHero />
            </motion.div>
          </div>

          {/* Stats — rise up */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.9, ease: heroEase }}
            className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4, scale: 1.03 }}
              >
                <AnimatedCounter value={stat.value} label={stat.label} delay={i * 0.15} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-blue-400/40 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-1.5 h-1.5 bg-blue-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Trusted By */}
      {clientLogos.length > 0 && (
        <section className="relative py-14 border-y border-blue-400/10 bg-navy-900/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 mb-8">
              Trusted by innovative brands worldwide
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {clientLogos.map((client, i) => (
                <AnimatedSection key={client.id} delay={i * 0.05}>
                  <div className="h-10 sm:h-12 px-4 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity">
                    <img
                      src={assetUrl(client.logo!)}
                      alt={client.name}
                      className="max-h-full max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all"
                    />
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Two Teams */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 section-divider top-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Our Expertise"
            title={
              <>
                Two Teams, <span className="gradient-text">One Vision</span>
              </>
            }
            description="Our coding and marketing teams work in perfect harmony to deliver complete digital solutions."
          />

          <div className="grid lg:grid-cols-2 gap-10">
            <AnimatedSection delay={0.1}>
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <div className="md:col-span-2">
                  <GlowImage src={pageImages.home.coding} alt="Coding team" aspect="portrait" />
                </div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="md:col-span-3 p-8 rounded-2xl glass-card shimmer-border h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-6 photo-glow">
                    <Code2 size={28} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">Coding Team</h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Websites, e-commerce platforms, mobile apps for iOS & Android, AI solutions,
                    smart home systems, cloud infrastructure, and enterprise software — built with
                    precision and scalability.
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors"
                  >
                    Explore Coding Services <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="grid md:grid-cols-5 gap-6 items-center">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="md:col-span-3 md:order-1 order-2 p-8 rounded-2xl glass-card shimmer-border h-full"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center mb-6 photo-glow">
                    <Megaphone size={28} className="text-white" />
                  </div>
                  <h3 className="font-display text-2xl font-bold mb-3">Marketing Team</h3>
                  <p className="text-slate-300 leading-relaxed mb-6">
                    Professional photography, content creation, video production & editing,
                    model coordination, content strategy, and business development — crafted to
                    amplify your brand worldwide.
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors"
                  >
                    Explore Marketing Services <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <div className="md:col-span-2 md:order-2 order-1">
                  <GlowImage src={pageImages.home.marketing} alt="Marketing team" aspect="portrait" delay={0.1} />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="How We Work"
            title={
              <>
                A Proven <span className="gradient-text">Process</span>
              </>
            }
            description="Structured, transparent, and results-driven — from first conversation to long-term growth."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((item, i) => (
              <AnimatedSection key={item.step} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="relative p-6 rounded-2xl glass-card shimmer-border h-full"
                >
                  <span className="font-display text-4xl font-bold gradient-text opacity-40">
                    {item.step}
                  </span>
                  <h3 className="font-display font-semibold text-lg mt-2 mb-2">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-blue-400/30" />
                  )}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core Capabilities */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {coreCapabilities.map((cap, i) => (
              <AnimatedSection key={cap} delay={i * 0.04}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/15 bg-navy-800/40 text-slate-300 text-sm">
                  <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                  {cap}
                </span>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why VegaCore */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Why Choose Us"
            title={
              <>
                Why <span className="gradient-text">VegaCore</span>?
              </>
            }
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: "Global Reach, Local Roots",
                desc: "Based in Damascus, Syria — delivering world-class projects to clients across 15+ countries.",
                img: pageImages.about.global,
              },
              {
                icon: Zap,
                title: "End-to-End Solutions",
                desc: "From initial concept and design to development, marketing, and launch — we handle everything.",
                img: pageImages.services.process,
              },
              {
                icon: Sparkles,
                title: "Innovation First",
                desc: "Leveraging AI, cloud technologies, and modern frameworks to keep your business ahead of the curve.",
                img: pageImages.home.showcase[1],
              },
            ].map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="rounded-2xl overflow-hidden glass-card shimmer-border h-full"
                >
                  <GlowImage
                    src={item.img}
                    alt={item.title}
                    aspect="video"
                    className="rounded-none shimmer-border-none"
                  />
                  <div className="p-6">
                    <item.icon className="text-blue-400 mb-3" size={28} />
                    <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
            <SectionHeader
              label="Portfolio"
              title={
                <>
                  Our <span className="gradient-text">Projects</span>
                </>
              }
              description="A glimpse of what we've built for clients around the world."
              align="left"
              className="mb-0"
            />
            <Link
              to="/portfolio"
              className="flex items-center gap-2 text-blue-400 font-medium hover:text-blue-300 transition-colors shrink-0"
            >
              View All Projects <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.slice(0, 6).map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 section-divider top-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Client Feedback"
            title={
              <>
                What Our <span className="gradient-text">Partners</span> Say
              </>
            }
            description="Real results from businesses we've helped grow across industries and regions."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <AnimatedSection key={item.author} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="p-7 rounded-2xl glass-card shimmer-border h-full flex flex-col"
                >
                  <Quote size={28} className="text-blue-400/60 mb-4" />
                  <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                    "{item.quote}"
                  </p>
                  <div className="border-t border-blue-400/10 pt-4">
                    <p className="font-display font-semibold text-white text-sm">{item.author}</p>
                    <p className="text-slate-500 text-xs mt-1">{item.role}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden min-h-[420px] flex items-center">
        <HandshakeVideo />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <AnimatedSection>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Ready to Build Something <span className="gradient-text">Extraordinary</span>?
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Let's discuss your vision and turn it into a digital reality. Our team is ready to bring your ideas to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-blue-600/30 transition-all hover:scale-105"
            >
              Get In Touch <ArrowRight size={18} />
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </PageShell>
  );
}
