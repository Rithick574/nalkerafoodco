import { useId } from "react";

/*
 * Procedural coconut-palm illustrations. Paths are computed once at module load
 * (deterministic, so server and client markup match) and rendered as inline SVG —
 * no image requests, crisp at any size.
 */

type FrondOptions = { count: number; length: number; arch: number; droop: number; maxLeaf: number; seed: number };

function buildFrond({ count, length, arch, droop, maxLeaf, seed }: FrondOptions) {
  const c = [length * 0.45, -arch];
  const p2 = [length, droop];
  const at = (t: number) => [2 * (1 - t) * t * c[0] + t * t * p2[0], 2 * (1 - t) * t * c[1] + t * t * p2[1]];
  const tangent = (t: number) => {
    const dx = 2 * (1 - t) * c[0] + 2 * t * (p2[0] - c[0]);
    const dy = 2 * (1 - t) * c[1] + 2 * t * (p2[1] - c[1]);
    const l = Math.hypot(dx, dy);
    return [dx / l, dy / l];
  };
  let s = seed;
  const rand = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  const f = (n: number) => n.toFixed(1);

  let leaves = "";
  for (let i = 0; i < count; i++) {
    const t = 0.06 + (i / (count - 1)) * 0.92;
    const [px, py] = at(t);
    const [tx, ty] = tangent(t);
    for (const side of [1, -1]) {
      const a = side * (0.6 + 0.3 * t) + (rand() - 0.5) * 0.14;
      let dx = tx * Math.cos(a) - ty * Math.sin(a);
      let dy = tx * Math.sin(a) + ty * Math.cos(a) + 0.42;
      const l = Math.hypot(dx, dy);
      dx /= l;
      dy /= l;
      const len = (maxLeaf * Math.pow(Math.sin(Math.PI * Math.min(t * 1.12, 1)), 0.7) + 24) * (0.88 + rand() * 0.24);
      const w = len * 0.075;
      const ex = px + dx * len;
      const ey = py + dy * len + len * 0.14;
      const mx = px + dx * len * 0.45;
      const my = py + dy * len * 0.45;
      leaves += `M${f(px)} ${f(py)}Q${f(mx - dy * w)} ${f(my + dx * w)} ${f(ex)} ${f(ey)}Q${f(mx + dy * w)} ${f(my - dx * w)} ${f(px)} ${f(py)}Z`;
    }
  }
  return { leaves, rib: `M0 0Q${f(c[0])} ${f(c[1])} ${f(p2[0])} ${f(p2[1])}` };
}

const FROND = buildFrond({ count: 38, length: 1000, arch: 170, droop: 150, maxLeaf: 290, seed: 7 });
const SMALL_FROND = buildFrond({ count: 20, length: 1000, arch: 120, droop: 260, maxLeaf: 260, seed: 3 });

/** A single arching coconut-palm frond, drawn left (stem) to right (tip). */
export function PalmFrond({ className, tone = "leaf" }: { className?: string; tone?: "leaf" | "light" }) {
  const id = useId();
  const [from, to] = tone === "leaf" ? ["#065d35", "#9bcb28"] : ["#faf8e8", "#d9eb9a"];
  return (
    <svg viewBox="-30 -380 1340 900" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={id} x1="0" x2="1" y1="0" y2="0.3">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={FROND.leaves} fill={`url(#${id})`} />
      <path d={FROND.rib} fill="none" stroke={from} strokeWidth="9" strokeLinecap="round" />
    </svg>
  );
}

function trunkPath(x: number, base: number, height: number, lean: number, wb: number, wt: number) {
  const left: string[] = [];
  const right: string[] = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const cx = 2 * (1 - t) * t * (x + lean * 0.15) + (1 - t) * (1 - t) * x + t * t * (x + lean);
    const cy = base - height * t;
    const w = (wb + (wt - wb) * t) / 2;
    left.push(`${(cx - w).toFixed(1)} ${cy.toFixed(1)}`);
    right.unshift(`${(cx + w).toFixed(1)} ${cy.toFixed(1)}`);
  }
  return `M${left.join("L")}L${right.join("L")}Z`;
}

const CROWN_ANGLES = [-62, -34, -8, 16, 38];

/** A full palm silhouette: tapered, leaning trunk with a crown of drooping fronds. */
function PalmTree({ x, base, height, lean }: { x: number; base: number; height: number; lean: number }) {
  const top = [x + lean, base - height];
  const s = height / 1500;
  return (
    <g>
      <path d={trunkPath(x, base, height, lean, height * 0.05, height * 0.028)} />
      {CROWN_ANGLES.flatMap((a, i) => [
        <path key={`r${i}`} d={SMALL_FROND.leaves} transform={`translate(${top[0]} ${top[1]}) rotate(${a}) scale(${s})`} />,
        <path key={`l${i}`} d={SMALL_FROND.leaves} transform={`translate(${top[0]} ${top[1]}) scale(-1 1) rotate(${a + 6}) scale(${s})`} />,
      ])}
      <circle cx={top[0] - 4} cy={top[1] + 8} r={height * 0.018} />
      <circle cx={top[0] + 7} cy={top[1] + 10} r={height * 0.017} />
    </g>
  );
}

const BACK = [
  { x: 150, base: 330, height: 200, lean: 30 },
  { x: 300, base: 335, height: 150, lean: -18 },
  { x: 640, base: 336, height: 170, lean: 22 },
  { x: 1170, base: 332, height: 220, lean: -26 },
  { x: 1290, base: 335, height: 165, lean: 18 },
];
const FRONT = [
  { x: 60, base: 360, height: 300, lean: 55 },
  { x: 860, base: 360, height: 245, lean: -38 },
  { x: 990, base: 360, height: 300, lean: 40 },
  { x: 1385, base: 360, height: 320, lean: -60 },
];

/** Back row of palms + distant shoreline. */
export function PalmLayerBack({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden focusable="false">
      <path d="M0 318C180 300 330 312 520 306S900 290 1080 304s260 10 360 2V360H0Z" />
      {BACK.map((p, i) => (
        <PalmTree key={i} {...p} />
      ))}
    </svg>
  );
}

/** Front row of palms over still backwater with reflection strokes. */
export function PalmLayerFront({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 360" preserveAspectRatio="xMidYMax slice" className={className} aria-hidden focusable="false">
      {FRONT.map((p, i) => (
        <PalmTree key={i} {...p} />
      ))}
      <rect x="0" y="352" width="1440" height="8" />
    </svg>
  );
}
