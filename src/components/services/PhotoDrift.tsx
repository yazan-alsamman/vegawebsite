import { motion } from "framer-motion";

interface PhotoDriftProps {
  images: string[];
}

export default function PhotoDrift({ images }: PhotoDriftProps) {
  const doubled = [...images, ...images];

  return (
    <section className="py-8 overflow-hidden border-y border-blue-400/8 bg-navy-900/40">
      <div
        className="flex gap-5 w-max"
        style={{ animation: "marquee-left 40s linear infinite" }}
      >
        {doubled.map((src, i) => (
          <motion.div
            key={`${src}-${i}`}
            whileHover={{ scale: 1.05, y: -4 }}
            className="relative w-56 h-36 sm:w-64 sm:h-40 rounded-xl overflow-hidden shrink-0 border border-blue-400/15"
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
