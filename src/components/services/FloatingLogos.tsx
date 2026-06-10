import { motion } from "framer-motion";
import { assetUrl } from "../../api/client";
import { useProjects } from "../../hooks/useProjects";
import logoWhite from "../../assets/logo-white-clear.png";

const positions = [
  { top: "8%", left: "-6%", delay: 0 },
  { top: "20%", right: "-8%", delay: 0.4 },
  { bottom: "25%", left: "-10%", delay: 0.8 },
  { bottom: "10%", right: "-6%", delay: 1.2 },
  { top: "45%", left: "-12%", delay: 1.6 },
  { top: "55%", right: "-10%", delay: 2 },
];

export default function FloatingLogos() {
  const { featuredProjects } = useProjects();
  const logos = [
    ...featuredProjects
      .filter((p) => p.logo)
      .map((p) => ({ src: assetUrl(p.logo!), name: p.name })),
    { src: logoWhite, name: "VegaCore" },
  ].slice(0, 6);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible hidden lg:block">
      {logos.map((logo, i) => {
        const pos = positions[i % positions.length];
        return (
          <motion.div
            key={logo.name}
            className="absolute w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-navy-900/90 border border-blue-400/20 backdrop-blur-md flex items-center justify-center p-2 shadow-lg shadow-blue-900/30"
            style={{ top: pos.top, left: pos.left, right: pos.right, bottom: pos.bottom }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0.6, 1],
              scale: [0.8, 1, 1.05, 1, 1],
              y: [0, -12, 0, 10, 0],
              x: [0, 8, -6, 4, 0],
              rotate: [0, 5, -5, 3, 0],
            }}
            transition={{
              duration: 6 + i * 0.5,
              delay: pos.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <img src={logo.src} alt={logo.name} className="max-w-full max-h-full object-contain" />
          </motion.div>
        );
      })}
    </div>
  );
}
