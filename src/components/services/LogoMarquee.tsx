import { assetUrl } from "../../api/client";
import { useProjects } from "../../hooks/useProjects";
import logoWhite from "../../assets/logo-white-clear.png";

function MarqueeRow({
  items,
  direction = "left",
  speed = 28,
}: {
  items: { src: string; name: string }[];
  direction?: "left" | "right";
  speed?: number;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden py-3">
      <div
        className="flex gap-10 w-max items-center"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
        }}
      >
        {doubled.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center justify-center h-12 w-28 sm:w-32 shrink-0 opacity-50 hover:opacity-100 transition-opacity"
          >
            <img
              src={item.src}
              alt={item.name}
              className="max-h-10 max-w-[100px] object-contain grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LogoMarquee() {
  const { featuredProjects } = useProjects();
  const clientLogos = featuredProjects
    .filter((p) => p.logo)
    .map((p) => ({ src: assetUrl(p.logo!), name: p.name }));

  const row1 = [...clientLogos, { src: logoWhite, name: "VegaCore" }];
  const row2 = [...clientLogos].reverse();

  if (row1.length === 0) return null;

  return (
    <section className="py-6 border-y border-blue-400/10 bg-navy-950/60 overflow-hidden">
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.35em] text-slate-600 mb-2">
        Brands we build for
      </p>
      <MarqueeRow items={row1} direction="left" speed={32} />
      <MarqueeRow items={row2.length ? row2 : row1} direction="right" speed={38} />
    </section>
  );
}
