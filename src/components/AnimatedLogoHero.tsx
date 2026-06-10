import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logoWhite from "../assets/logo-white-clear.png";

const CX = 200;
const CY = 200;
const VB = 400;

const LINE_DRAW = 0.35;
const LINE_GAP = 0.18;

const branches = [
  { label: "Websites", end: [200, 38], elbow: [182, 115] },
  { label: "Marketing", end: [318, 62], elbow: [200, 62] },
  { label: "Content", end: [362, 128], elbow: [280, 128] },
  { label: "Mobile Apps", end: [372, 200], elbow: [290, 200] },
  { label: "E-Commerce", end: [348, 278], elbow: [348, 200] },
  { label: "Branding", end: [290, 342], elbow: [290, 268] },
  { label: "AI Solutions", end: [200, 362], elbow: [218, 288] },
  { label: "Video & Photo", end: [110, 342], elbow: [110, 268] },
  { label: "Photography", end: [52, 278], elbow: [52, 200] },
  { label: "Cloud", end: [28, 200], elbow: [110, 200] },
  { label: "Systems", end: [52, 122], elbow: [52, 200] },
  { label: "iOS & Android", end: [110, 58], elbow: [110, 132] },
];

const allLinesDone =
  branches.length * (LINE_DRAW + LINE_GAP) + LINE_DRAW;

const LOGO_APPEAR_DELAY = allLinesDone + 0.15;
const ROTATE_START_DELAY = LOGO_APPEAR_DELAY + 0.7;

function pathD(elbow: number[], end: number[]) {
  return `M ${CX} ${CY} L ${elbow[0]} ${elbow[1]} L ${end[0]} ${end[1]}`;
}

function CircuitAnimation() {
  const [rotating, setRotating] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRotating(true), ROTATE_START_DELAY * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.div
        className="absolute w-56 h-56 rounded-full bg-blue-600/18 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Lines + labels rotate together after all appear */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: rotating ? 360 : 0 }}
        transition={
          rotating
            ? { duration: 50, repeat: Infinity, ease: "linear" }
            : { duration: 0 }
        }
      >
        <svg
          viewBox={`0 0 ${VB} ${VB}`}
          className="absolute inset-0 w-full h-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#818cf8" />
            </linearGradient>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {branches.map((b, i) => {
            const delay = i * (LINE_DRAW + LINE_GAP);
            const d = pathD(b.elbow, b.end);

            return (
              <g key={b.label}>
                <path
                  d={d}
                  fill="none"
                  stroke="rgba(59,130,246,0.1)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />

                <motion.path
                  d={d}
                  fill="none"
                  stroke="url(#circuitGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#lineGlow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: LINE_DRAW, delay, ease: "easeInOut" },
                    opacity: { duration: 0.15, delay },
                  }}
                />

                <motion.circle
                  cx={b.end[0]}
                  cy={b.end[1]}
                  r="3.5"
                  fill="#60a5fa"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.35,
                    delay: delay + LINE_DRAW,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </g>
            );
          })}
        </svg>

        {branches.map((b, i) => {
          const delay = i * (LINE_DRAW + LINE_GAP) + LINE_DRAW;
          const left = `${(b.end[0] / VB) * 100}%`;
          const top = `${(b.end[1] / VB) * 100}%`;

          return (
            <motion.span
              key={b.label}
              className="absolute z-20 px-2 py-0.5 sm:px-2.5 sm:py-1 text-[9px] sm:text-[10px] font-semibold tracking-wide glass-card-light text-blue-200 rounded-full border border-blue-400/25 whitespace-nowrap -translate-x-1/2 -translate-y-1/2"
              style={{ left, top }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.35,
                delay,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {b.label}
            </motion.span>
          );
        })}
      </motion.div>

      {/* Static ring when rotating */}
      <motion.div
        className="absolute inset-4 rounded-full border border-blue-500/20 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: rotating ? 1 : 0 }}
        transition={{ duration: 0.6 }}
      />

      {/* Logo appears after all lines are drawn */}
      <motion.div
        className="relative z-30 flex flex-col items-center pointer-events-none"
        initial={{ opacity: 0, scale: 0.5, filter: "blur(8px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: LOGO_APPEAR_DELAY, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src={logoWhite}
          alt="VegaCore"
          className="w-36 sm:w-44 h-auto"
          animate={{
            filter: [
              "drop-shadow(0 0 16px rgba(59,130,246,0.35))",
              "drop-shadow(0 0 32px rgba(59,130,246,0.6))",
              "drop-shadow(0 0 16px rgba(59,130,246,0.35))",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </>
  );
}

export default function AnimatedLogoHero() {
  const [hasVideo, setHasVideo] = useState(false);

  return (
    <div className="relative w-full max-w-xl mx-auto aspect-square flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`absolute inset-0 w-full h-full object-contain z-40 pointer-events-none transition-opacity duration-700 ${
          hasVideo ? "opacity-100" : "opacity-0"
        }`}
        onCanPlay={() => setHasVideo(true)}
        onError={() => setHasVideo(false)}
      >
        <source src="/animations/logo-animation.mp4" type="video/mp4" />
        <source src="/animations/logo-animation.webm" type="video/webm" />
      </video>

      {!hasVideo && <CircuitAnimation />}
    </div>
  );
}
