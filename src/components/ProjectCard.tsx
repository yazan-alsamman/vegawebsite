import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { assetUrl } from "../api/client";
import type { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const imageSrc = assetUrl(project.image);
  const logoSrc = project.logo ? assetUrl(project.logo) : undefined;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl overflow-hidden glass-card shimmer-border photo-glow-hover h-full"
    >
      <div className="relative h-52 overflow-hidden bg-navy-900">
        {project.logo ? (
          <motion.img
            src={logoSrc}
            alt={`${project.name} logo`}
            className={`absolute inset-0 w-full h-full ${
              project.logoFit === "contain" ? "object-contain p-3" : "object-cover"
            }`}
            loading="lazy"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <>
            <motion.img
              src={imageSrc}
              alt={project.name}
              className="w-full h-full object-cover object-top"
              loading="lazy"
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-blue-500/10" />
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="font-display font-bold text-lg text-white drop-shadow-lg">{project.name}</h3>
            </div>
          </>
        )}
        {project.featured && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 bg-blue-600/90 backdrop-blur-sm rounded-full text-xs font-semibold text-white z-20"
          >
            <Star size={12} fill="currentColor" />
            Featured
          </motion.div>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display font-bold text-lg text-white mb-2">{project.name}</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-xs font-medium bg-blue-600/15 text-blue-300 rounded-full border border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
        {project.url && (
          <div className="mt-4 flex items-center gap-1.5 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors">
            <ExternalLink size={14} />
            Visit Project
          </div>
        )}
      </div>
    </motion.div>
  );

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return content;
}
