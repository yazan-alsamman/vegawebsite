import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Globe,
  Award,
  Users,
  Target,
  Rocket,
  Code2,
  Megaphone,
  ArrowRight,
} from "lucide-react";
import PageShell from "../components/PageShell";
import AnimatedSection from "../components/AnimatedSection";
import AnimatedCounter from "../components/AnimatedCounter";
import PageHero from "../components/PageHero";
import AboutTimeline from "../components/about/AboutTimeline";
import LocationSection from "../components/about/LocationSection";
import { pageImages } from "../data/images";

const stats = [
  { value: "60+", label: "Projects" },
  { value: "15+", label: "Countries" },
  { value: "2", label: "Teams" },
  { value: "100%", label: "Dedication" },
];

const values = [
  {
    num: "01",
    icon: Target,
    title: "Mission-Driven",
    description:
      "Bridging ambitious business ideas with flawless digital execution — that's why we exist.",
  },
  {
    num: "02",
    icon: Users,
    title: "Client-Centric",
    description:
      "Transparent communication, close collaboration, and promises kept on every engagement.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Innovation-Led",
    description:
      "AI, cloud, and modern frameworks keep your business ahead in a fast-moving digital world.",
  },
  {
    num: "04",
    icon: Award,
    title: "Quality Obsessed",
    description:
      "Meticulous craft across code, design, and content — nothing leaves our studio half-finished.",
  },
];

const codingPoints = [
  "Websites & web applications",
  "E-commerce platforms",
  "iOS & Android apps",
  "AI & cloud solutions",
];

const marketingPoints = [
  "Photography & video production",
  "Content creation & strategy",
  "Brand development",
  "Business growth consulting",
];

export default function About() {
  return (
    <PageShell>
      <PageHero
        image={pageImages.about.hero}
        badge={
          <>
            <Globe size={16} /> About VegaCore
          </>
        }
        title={
          <>
            We Build Brands That{" "}
            <span className="gradient-text">Lead Markets</span>
          </>
        }
        subtitle="A Damascus-born business development company pairing engineering excellence with creative marketing — for clients who expect more than a vendor."
      />

      {/* Impact bar */}
      <section className="relative z-10 -mt-8 pb-4">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 sm:p-8 rounded-2xl glass-card border border-blue-400/15 shadow-2xl shadow-navy-950/50"
          >
            {stats.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <AnimatedCounter value={stat.value} label={stat.label} delay={i * 0.1} />
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400/80 mb-8">
              Our Purpose
            </p>
            <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug text-white mb-8">
              "Every business deserves{" "}
              <span className="gradient-text">world-class digital solutions</span>
              — no matter where they're located."
            </blockquote>
            <p className="text-slate-400 leading-relaxed max-w-2xl mx-auto">
              VegaCore was built on that belief. From a small studio in Damascus to a global partner
              for ambitious brands, we've stayed focused on one thing: turning vision into digital
              reality with teams that code, create, and deliver.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Journey */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/80 mb-3">
                Our Journey
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
                From Studio to <span className="gradient-text">Global Partner</span>
              </h2>
              <p className="text-slate-400 leading-relaxed">
                A clear path from local roots to international impact — always grounded in quality,
                always moving forward.
              </p>
            </AnimatedSection>
            <AboutTimeline />
          </div>
        </div>
      </section>

      {/* Dual teams — split panels */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 rounded-2xl overflow-hidden border border-blue-400/10">
            <AnimatedSection>
              <div className="h-full p-8 sm:p-10 bg-gradient-to-br from-navy-900 to-navy-850 border-b md:border-b-0 md:border-r border-blue-400/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Code2 size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">Coding Team</h3>
                    <p className="text-slate-500 text-xs">Engineering & technology</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {codingPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-slate-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                >
                  View coding services <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <div className="h-full p-8 sm:p-10 bg-gradient-to-br from-navy-850 to-navy-800">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-lg bg-blue-600 flex items-center justify-center">
                    <Megaphone size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl">Marketing Team</h3>
                    <p className="text-slate-500 text-xs">Creative & growth</p>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {marketingPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-slate-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors"
                >
                  View marketing services <ArrowRight size={14} />
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values — numbered rows */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400/80 mb-3 text-center">
              Our Values
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-center">
              What Drives <span className="gradient-text">Us</span>
            </h2>
          </AnimatedSection>

          <div className="divide-y divide-blue-400/10 border-y border-blue-400/10">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.06}>
                <motion.div
                  whileHover={{ backgroundColor: "rgba(37, 99, 235, 0.04)" }}
                  className="grid sm:grid-cols-[72px_1fr] gap-4 sm:gap-8 py-8 px-2 sm:px-4 transition-colors"
                >
                  <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
                    <span className="font-display text-2xl font-bold text-blue-500/30">
                      {value.num}
                    </span>
                    <value.icon size={20} className="text-blue-400 sm:mt-1" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-white mb-2">
                      {value.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <LocationSection image={pageImages.about.umayyadSquare} />
        </div>
      </section>
    </PageShell>
  );
}
