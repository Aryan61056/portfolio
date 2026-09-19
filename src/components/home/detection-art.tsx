"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Original artwork for the Home page's required graphic — built from the
 * site's own bounding-box-reticle motif (see CustomCursor) rather than a
 * generic AI-clipart image, since that's a more honest visual for
 * someone who actually writes vision code for a robotics team.
 */

const VIEWBOX_W = 640;
const VIEWBOX_H = 400;

type Box = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: "primary" | "secondary" | "tertiary";
  shape: "rect" | "circle" | "diamond";
  label: string;
};

const BOXES: Box[] = [
  { x: 40, y: 56, w: 190, h: 132, color: "primary", shape: "rect", label: "94% · building" },
  { x: 268, y: 200, w: 150, h: 112, color: "secondary", shape: "circle", label: "88% · learning" },
  { x: 452, y: 44, w: 140, h: 108, color: "tertiary", shape: "diamond", label: "97% · curious" },
];

const fillClass: Record<Box["color"], string> = {
  primary: "fill-primary/12",
  secondary: "fill-secondary/14",
  tertiary: "fill-tertiary/14",
};

const strokeClass: Record<Box["color"], string> = {
  primary: "stroke-primary",
  secondary: "stroke-secondary",
  tertiary: "stroke-tertiary",
};

const chipClass: Record<Box["color"], string> = {
  primary: "bg-primary text-primary-ink",
  secondary: "bg-secondary text-secondary-ink",
  tertiary: "bg-tertiary text-tertiary-ink",
};

/** Four rounded-corner bracket paths framing a box — same geometry as
 * the custom cursor's reticle, scaled to fit each shape here. */
function corners(x: number, y: number, w: number, h: number, c = 20, r = 8) {
  return [
    `M ${x} ${y + c} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} H ${x + c}`,
    `M ${x + w - c} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + c}`,
    `M ${x} ${y + h - c} V ${y + h - r} A ${r} ${r} 0 0 0 ${x + r} ${y + h} H ${x + c}`,
    `M ${x + w - c} ${y + h} H ${x + w - r} A ${r} ${r} 0 0 0 ${x + w} ${y + h - r} V ${y + h - c}`,
  ];
}

function ObjectShape({ box }: { box: Box }) {
  const cx = box.x + box.w / 2;
  const cy = box.y + box.h / 2;
  const cls = fillClass[box.color];

  if (box.shape === "circle") {
    return <circle cx={cx} cy={cy} r={Math.min(box.w, box.h) / 2 - 14} className={cls} />;
  }
  if (box.shape === "diamond") {
    const r = Math.min(box.w, box.h) / 2 - 12;
    return (
      <rect
        x={cx - r}
        y={cy - r}
        width={r * 2}
        height={r * 2}
        rx={16}
        transform={`rotate(45 ${cx} ${cy})`}
        className={cls}
      />
    );
  }
  return (
    <rect x={box.x + 14} y={box.y + 14} width={box.w - 28} height={box.h - 28} rx={20} className={cls} />
  );
}

export function DetectionArt() {
  const reduced = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-[8/5] w-full max-w-2xl">
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        className="h-full w-full"
        role="img"
        aria-label="Abstract illustration of an object-detection scene: three shapes, each framed by a bounding box with a confidence label — coral, amber, and teal."
      >
        {BOXES.map((box, i) => (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${box.x + box.w / 2}px ${box.y + box.h / 2}px` }}
          >
            <ObjectShape box={box} />
            <g className={strokeClass[box.color]} fill="none" strokeWidth={3} strokeLinecap="round">
              {corners(box.x, box.y, box.w, box.h).map((d, j) => (
                <path key={j} d={d} />
              ))}
            </g>
          </motion.g>
        ))}
      </svg>

      {BOXES.map((box, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: reduced ? 0 : 0.35 + i * 0.15 }}
          className={`absolute whitespace-nowrap rounded-full px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wide shadow-ambient ${chipClass[box.color]}`}
          style={{
            left: `${((box.x + box.w) / VIEWBOX_W) * 100}%`,
            top: `${((box.y + box.h) / VIEWBOX_H) * 100}%`,
            transform: "translate(-85%, 6px)",
          }}
        >
          {box.label}
        </motion.span>
      ))}
    </div>
  );
}
