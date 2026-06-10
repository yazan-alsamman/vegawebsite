import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SlideContentProps {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
  delay?: number;
}

export default function SlideContent({
  children,
  direction = "left",
  className = "",
  delay = 0,
}: SlideContentProps) {
  const x = direction === "left" ? -80 : 80;

  return (
    <motion.div
      initial={{ opacity: 0, x, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
