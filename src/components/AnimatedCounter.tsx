import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  label: string;
  delay?: number;
}

function parseValue(value: string) {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseInt(match[1], 10), suffix: match[2] };
}

export default function AnimatedCounter({ value, label, delay = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const { num, suffix } = parseValue(value);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now() + delay * 1000;

    const tick = (now: number) => {
      if (now < startTime) {
        requestAnimationFrame(tick);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * num);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, num, delay]);

  return (
    <div ref={ref} className="text-center glass-card rounded-2xl p-6">
      <div className="font-display text-3xl sm:text-4xl font-bold gradient-text">
        {suffix === "%" || value.includes("+") ? `${count}${suffix}` : `${count}${suffix}`}
      </div>
      <div className="text-slate-400 text-sm mt-1">{label}</div>
    </div>
  );
}
