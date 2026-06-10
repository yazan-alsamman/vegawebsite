import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface GlowImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  delay?: number;
  float?: boolean;
  aspect?: "video" | "square" | "portrait" | "auto";
  style?: CSSProperties;
}

const aspectMap = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  auto: "",
};

export default function GlowImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  delay = 0,
  float = false,
  aspect = "video",
  style,
}: GlowImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`relative rounded-2xl overflow-hidden shimmer-border photo-glow photo-glow-hover ${aspectMap[aspect]} ${float ? "float-slow" : ""} ${className}`}
      style={style}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${imgClassName}`}
        loading="lazy"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.6 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-blue-500/5 pointer-events-none" />
      <motion.div
        className="absolute inset-0 bg-blue-500/0 pointer-events-none"
        whileHover={{ backgroundColor: "rgba(59,130,246,0.06)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
