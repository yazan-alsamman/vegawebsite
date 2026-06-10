import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MessageCircle, Radio, Wifi } from "lucide-react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulse: number;
  pulseSpeed: number;
}

interface Spark {
  x: number;
  y: number;
  speed: number;
  size: number;
  alpha: number;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

interface Stream {
  x: number;
  y: number;
  speed: number;
  len: number;
  alpha: number;
}

const FLOATING_ICONS = [
  { Icon: Phone, left: "8%", top: "18%", delay: 0 },
  { Icon: Mail, left: "88%", top: "22%", delay: 1.2 },
  { Icon: MessageCircle, left: "12%", top: "72%", delay: 2.4 },
  { Icon: Radio, left: "82%", top: "68%", delay: 0.8 },
  { Icon: Wifi, left: "48%", top: "8%", delay: 1.8 },
  { Icon: Phone, left: "72%", top: "88%", delay: 3 },
  { Icon: Mail, left: "28%", top: "42%", delay: 2 },
  { Icon: Wifi, left: "58%", top: "78%", delay: 1.5 },
];

const PING_SPOTS = [
  { left: "15%", top: "30%" },
  { left: "75%", top: "20%" },
  { left: "40%", top: "55%" },
  { left: "85%", top: "50%" },
  { left: "25%", top: "80%" },
  { left: "60%", top: "35%" },
  { left: "50%", top: "65%" },
];

export default function PageBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const streamCanvas = streamRef.current;
    if (!canvas || !streamCanvas) return;

    const ctx = canvas.getContext("2d");
    const streamCtx = streamCanvas.getContext("2d");
    if (!ctx || !streamCtx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let animationId: number;
    let nodes: Node[] = [];
    let sparks: Spark[] = [];
    let comets: Comet[] = [];
    let streams: Stream[] = [];
    let w = 0;
    let h = 0;
    let radarAngle = 0;
    let frame = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      streamCanvas.width = w;
      streamCanvas.height = h;
    };

    const init = () => {
      const count = Math.min(70, Math.floor((w * h) / 16000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.025 + Math.random() * 0.04,
      }));

      sparks = Array.from({ length: Math.min(40, Math.floor(w / 30)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: 0.3 + Math.random() * 0.8,
        size: 1 + Math.random() * 2,
        alpha: 0.15 + Math.random() * 0.35,
      }));

      streams = Array.from({ length: Math.min(28, Math.floor(w / 55)) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        speed: 1.5 + Math.random() * 3,
        len: 20 + Math.random() * 60,
        alpha: 0.08 + Math.random() * 0.18,
      }));
    };

    const spawnComet = () => {
      if (comets.length > 6) return;
      const edge = Math.floor(Math.random() * 4);
      let x = 0;
      let y = 0;
      let vx = 0;
      let vy = 0;

      if (edge === 0) {
        x = -20;
        y = Math.random() * h * 0.6;
        vx = 4 + Math.random() * 3;
        vy = 1 + Math.random() * 2;
      } else if (edge === 1) {
        x = w + 20;
        y = Math.random() * h * 0.6;
        vx = -(4 + Math.random() * 3);
        vy = 1 + Math.random() * 2;
      } else {
        x = Math.random() * w;
        y = -20;
        vx = (Math.random() - 0.5) * 4;
        vy = 3 + Math.random() * 3;
      }

      comets.push({ x, y, vx, vy, life: 0, maxLife: 80 + Math.random() * 60 });
    };

    const drawRadar = () => {
      const cx = w * 0.5;
      const cy = h * 0.45;
      const radius = Math.min(w, h) * 0.55;

      radarAngle += 0.012;

      const gradient = ctx.createConicGradient(radarAngle, cx, cy);
      gradient.addColorStop(0, "rgba(59, 130, 246, 0)");
      gradient.addColorStop(0.08, "rgba(59, 130, 246, 0.1)");
      gradient.addColorStop(0.15, "rgba(59, 130, 246, 0)");
      gradient.addColorStop(1, "rgba(59, 130, 246, 0)");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      for (let r = 80; r < radius; r += 90) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.04 + (r / radius) * 0.04})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    const drawNetwork = () => {
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < 0) n.x = w;
        if (n.x > w) n.x = 0;
        if (n.y < 0) n.y = h;
        if (n.y > h) n.y = 0;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const alpha = 0.18 * (1 - dist / 180);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();

            for (let phase = 0; phase < 3; phase++) {
              const travel = (Math.sin(a.pulse + phase * 2.1) + 1) / 2;
              const px = a.x + (b.x - a.x) * travel;
              const py = a.y + (b.y - a.y) * travel;
              ctx.beginPath();
              ctx.arc(px, py, 1.2 + phase * 0.3, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(147, 197, 253, ${alpha * (2.5 - phase * 0.5)})`;
              ctx.fill();
            }
          }
        }
      }

      nodes.forEach((n) => {
        const glow = 0.35 + Math.sin(n.pulse) * 0.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96, 165, 250, ${glow})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${glow * 0.15})`;
        ctx.fill();
      });
    };

    const drawSparks = () => {
      sparks.forEach((s) => {
        s.y -= s.speed;
        if (s.y < -10) {
          s.y = h + 10;
          s.x = Math.random() * w;
        }

        const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.size * 8);
        grad.addColorStop(0, `rgba(147, 197, 253, ${s.alpha})`);
        grad.addColorStop(1, "rgba(59, 130, 246, 0)");
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x, s.y + s.size * 8);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size;
        ctx.stroke();
      });
    };

    const drawComets = () => {
      if (frame % 90 === 0) spawnComet();

      comets = comets.filter((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.life++;

        const progress = c.life / c.maxLife;
        const tailLen = 40 + progress * 30;
        const alpha = (1 - progress) * 0.7;

        const grad = ctx.createLinearGradient(
          c.x,
          c.y,
          c.x - c.vx * tailLen * 0.15,
          c.y - c.vy * tailLen * 0.15
        );
        grad.addColorStop(0, `rgba(191, 219, 254, ${alpha})`);
        grad.addColorStop(0.4, `rgba(59, 130, 246, ${alpha * 0.5})`);
        grad.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.beginPath();
        ctx.moveTo(c.x, c.y);
        ctx.lineTo(c.x - c.vx * tailLen * 0.15, c.y - c.vy * tailLen * 0.15);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(219, 234, 254, ${alpha})`;
        ctx.fill();

        return c.life < c.maxLife && c.x > -100 && c.x < w + 100 && c.y > -100 && c.y < h + 100;
      });
    };

    const drawStreams = () => {
      streamCtx.clearRect(0, 0, w, h);

      streams.forEach((s) => {
        s.y += s.speed;
        if (s.y > h + s.len) {
          s.y = -s.len;
          s.x = Math.random() * w;
        }

        const grad = streamCtx.createLinearGradient(s.x, s.y, s.x, s.y + s.len);
        grad.addColorStop(0, "rgba(59, 130, 246, 0)");
        grad.addColorStop(0.5, `rgba(96, 165, 250, ${s.alpha})`);
        grad.addColorStop(1, "rgba(59, 130, 246, 0)");

        streamCtx.beginPath();
        streamCtx.moveTo(s.x, s.y);
        streamCtx.lineTo(s.x, s.y + s.len);
        streamCtx.strokeStyle = grad;
        streamCtx.lineWidth = 1;
        streamCtx.stroke();
      });
    };

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);

      drawRadar();
      drawNetwork();
      drawSparks();
      drawComets();
      drawStreams();

      animationId = requestAnimationFrame(draw);
    };

    resize();
    init();
    draw();

    const onResize = () => {
      resize();
      init();
    };

    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1c] via-[#081524] to-[#060e1c]" />

      {/* Aurora bands */}
      <motion.div
        className="absolute -top-1/4 left-1/4 w-[70%] h-[50%] rounded-full bg-blue-600/14 blur-[100px]"
        animate={{ x: [0, 60, -30, 0], y: [0, 40, 20, 0], scale: [1, 1.2, 0.95, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 w-[60%] h-[45%] rounded-full bg-blue-500/10 blur-[90px]"
        animate={{ x: [0, -50, 30, 0], y: [0, -30, 40, 0], scale: [1, 1.15, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[55%] h-[40%] rounded-full bg-blue-700/10 blur-[80px]"
        animate={{ x: [0, 40, -20, 0], opacity: [0.4, 0.7, 0.5, 0.4] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(59,130,246,0.04) 0px, rgba(59,130,246,0.04) 1px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, rgba(59,130,246,0.04) 0px, rgba(59,130,246,0.04) 1px, transparent 1px, transparent 40px)",
        }}
        animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Diagonal scan mesh */}
      <motion.div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(59,130,246,0.05) 0px, rgba(59,130,246,0.05) 1px, transparent 1px, transparent 24px)",
        }}
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <canvas ref={streamRef} className="absolute inset-0 w-full h-full mix-blend-screen opacity-80" />

      {/* Rotating rings */}
      {[220, 340, 480].map((size, i) => (
        <motion.div
          key={size}
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-blue-400/12 pointer-events-none"
          style={{ width: size, height: size }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 40 + i * 15, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* Broadcast pings */}
      {PING_SPOTS.map((spot, i) => (
        <div key={i} className="absolute pointer-events-none" style={{ left: spot.left, top: spot.top }}>
          {[0, 1, 2].map((ring) => (
            <motion.div
              key={ring}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30"
              style={{ width: 12, height: 12 }}
              animate={{ scale: [1, 5 + ring], opacity: [0.5, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.55 + ring * 0.6,
                ease: "easeOut",
              }}
            />
          ))}
          <div className="absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-400/50" />
        </div>
      ))}

      {/* Floating contact icons */}
      {FLOATING_ICONS.map(({ Icon, left, top, delay }, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-400/15 pointer-events-none"
          style={{ left, top }}
          animate={{
            y: [0, -18, 0, 12, 0],
            x: [0, 10, -8, 0],
            rotate: [0, 8, -6, 0],
            opacity: [0.15, 0.35, 0.2, 0.3, 0.15],
          }}
          transition={{ duration: 8 + i, repeat: Infinity, ease: "easeInOut", delay }}
        >
          <Icon size={28 + (i % 3) * 6} strokeWidth={1.2} />
        </motion.div>
      ))}

      {/* Drifting orbs */}
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-blue-600/12 blur-3xl"
        animate={{ x: [0, 100, 40, 0], y: [0, 50, -20, 0], scale: [1, 1.2, 1.05, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] rounded-full bg-blue-600/10 blur-3xl"
        animate={{ x: [0, -80, -30, 0], y: [0, -60, 30, 0], scale: [1, 1.25, 1.1, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-2/3 left-1/4 w-72 h-72 rounded-full bg-blue-500/8 blur-3xl"
        animate={{ opacity: [0.3, 0.65, 0.4], scale: [1, 1.15, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-56 h-56 rounded-full bg-blue-400/10 blur-3xl"
        animate={{ x: [0, -40, 20, 0], y: [0, 30, -40, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Vertical scan line */}
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent shadow-[0_0_20px_rgba(59,130,246,0.3)]"
        animate={{ top: ["-2%", "102%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />

      {/* Horizontal scan line */}
      <motion.div
        className="absolute inset-y-0 w-px bg-gradient-to-b from-transparent via-blue-300/30 to-transparent"
        animate={{ left: ["-2%", "102%"] }}
        transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
      />

      {/* Signal wave lines */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-35"
      >
        <defs>
          <linearGradient id="contactWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        {[12, 22, 32, 42, 52, 62, 72, 82, 92].map((y, i) => (
          <motion.path
            key={y}
            d={`M0 ${y} Q25 ${y + (i % 2 === 0 ? 3 : -3)} 50 ${y} T100 ${y}`}
            fill="none"
            stroke="url(#contactWaveGrad)"
            strokeWidth="0.12"
            vectorEffect="non-scaling-stroke"
            animate={{
              pathLength: [0.3, 1, 0.3],
              opacity: [0.1, 0.55, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.2,
            }}
          />
        ))}
      </svg>

      {/* Twinkling stars */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-blue-200/50"
          style={{
            left: `${(i * 17 + 5) % 95}%`,
            top: `${(i * 23 + 8) % 90}%`,
          }}
          animate={{ opacity: [0.1, 0.8, 0.1], scale: [0.5, 1.2, 0.5] }}
          transition={{
            duration: 2 + (i % 4),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.15,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-[#060e1c]/40 via-transparent to-[#060e1c]/70 pointer-events-none" />
    </div>
  );
}
