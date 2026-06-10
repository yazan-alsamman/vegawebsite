import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PhotoCycleProps {
  images: { src: string; label: string }[];
  interval?: number;
  className?: string;
  aspectClass?: string;
}

export default function PhotoCycle({
  images,
  interval = 3200,
  className = "",
  aspectClass = "aspect-[4/3]",
}: PhotoCycleProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  const current = images[index];

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-blue-400/20 ${aspectClass} ${className}`}>
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current.src}
          custom={direction}
          initial={{ opacity: 0, scale: 1.12, x: direction * 60, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, x: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, x: direction * -60, filter: "blur(6px)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <img src={current.src} alt={current.label} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <motion.div
        key={current.label}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 left-4 right-4 flex items-end justify-between"
      >
        <span className="font-mono text-xs text-blue-300/90 uppercase tracking-wider">
          {current.label}
        </span>
        <div className="flex gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-blue-400" : "w-1.5 bg-blue-400/30"
              }`}
              aria-label={`Show image ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(105deg, transparent 40%, rgba(59,130,246,0.08) 50%, transparent 60%)",
            "linear-gradient(105deg, transparent 60%, rgba(59,130,246,0.12) 70%, transparent 80%)",
            "linear-gradient(105deg, transparent 40%, rgba(59,130,246,0.08) 50%, transparent 60%)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </div>
  );
}
