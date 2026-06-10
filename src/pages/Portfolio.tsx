import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase } from "lucide-react";
import PageShell from "../components/PageShell";
import AnimatedSection from "../components/AnimatedSection";
import PageHero from "../components/PageHero";
import ProjectCard from "../components/ProjectCard";
import { categories, categoryLabels } from "../data/projects";
import { pageImages } from "../data/images";
import { useProjects } from "../hooks/useProjects";
import type { ProjectCategory } from "../types/project";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all" | "featured">(
    "featured"
  );
  const { projects, featuredProjects, loading } = useProjects();

  const filtered =
    activeCategory === "all"
      ? projects
      : activeCategory === "featured"
        ? featuredProjects
        : projects.filter((p) => p.category === activeCategory);

  const tabs: { key: ProjectCategory | "all" | "featured"; label: string }[] = [
    { key: "featured", label: "Featured Projects" },
    ...categories.map((c) => ({ key: c, label: categoryLabels[c] })),
    { key: "all", label: "All Projects" },
  ];

  return (
    <PageShell>
      <PageHero
        image={pageImages.portfolio.hero}
        badge={<><Briefcase size={16} /> Our Work</>}
        title={
          <>
            Our <span className="gradient-text">Portfolio</span>
          </>
        }
        subtitle="Explore our latest work — from e-commerce platforms and enterprise systems to AI solutions, mobile apps, and cloud infrastructure."
      />

      {/* Showcase strip */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { src: "/images/logos/touchee.jpg", alt: "Touché Beauty" },
              { src: "/images/logos/newlook.png", alt: "Newlook Store" },
              { src: "/images/logos/estore.png", alt: "E Store" },
              { src: "/images/logos/elias.png", alt: "Dr. Elias Dahdal Clinic" },
            ].map((img, i) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="aspect-video rounded-2xl overflow-hidden shimmer-border bg-navy-900"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-8 sticky top-20 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 glass-card rounded-2xl p-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveCategory(tab.key)}
                className={`relative px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  activeCategory === tab.key
                    ? "text-white"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {activeCategory === tab.key && (
                  <motion.div
                    layoutId="portfolio-tab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {activeCategory !== "featured" && activeCategory !== "all" && (
                <AnimatedSection className="mb-8">
                  <h2 className="font-display text-2xl font-bold mb-2">
                    {categoryLabels[activeCategory]}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {filtered.length} project{filtered.length !== 1 ? "s" : ""} in this category
                  </p>
                </AnimatedSection>
              )}

              {loading ? (
                <p className="text-slate-400 text-center py-16">Loading projects...</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </PageShell>
  );
}
