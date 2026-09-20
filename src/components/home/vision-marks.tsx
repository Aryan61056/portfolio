"use client";

import { motion, useReducedMotion } from "framer-motion";

import { useCursorRepel } from "@/hooks/use-cursor-repel";

type DetectionShape = "gear" | "camera";
type MarkColor = "primary" | "secondary" | "tertiary";
type Breakpoint = "xs" | "sm" | "lg" | "xl";

type DetectionMark = {
  kind: "detection";
  shape: DetectionShape;
  label: string;
  top: string;
  left: string;
  rotate: number;
  duration: number;
  color: MarkColor;
  minBreak: Breakpoint;
};

type NeuralMark = {
  kind: "neural";
  top: string;
  left: string;
  duration: number;
  minBreak: Breakpoint;
};

type SparklineMark = {
  kind: "sparkline";
  top: string;
  left: string;
  rotate: number;
  duration: number;
  minBreak: Breakpoint;
};

type CodeMark = {
  kind: "code";
  top: string;
  left: string;
  rotate: number;
  duration: number;
  minBreak: Breakpoint;
};

type HeatmapMark = {
  kind: "heatmap";
  top: string;
  left: string;
  rotate: number;
  duration: number;
  minBreak: Breakpoint;
};

type Mark = DetectionMark | NeuralMark | SparklineMark | CodeMark | HeatmapMark;

// `minBreak` controls how much screen real estate has to be available before
// a mark joins the scene — the "xs" tier (just the neural net, so phones
// still get the required original-artwork graphic) sits in the top band
// clear of the centered text column at any width; "sm" and up fill out
// further, so the wider the hero gets, the less empty it feels.
const MARKS: Mark[] = [
  { kind: "detection", shape: "camera", label: "96%", top: "13%", left: "2%", rotate: -5, duration: 6.5, color: "tertiary", minBreak: "sm" },
  { kind: "neural", top: "3%", left: "58%", duration: 3.4, minBreak: "xs" },
  { kind: "detection", shape: "gear", label: "91%", top: "51%", left: "86%", rotate: 8, duration: 7.4, color: "secondary", minBreak: "lg" },
  { kind: "code", top: "23%", left: "80%", rotate: 3, duration: 6.2, minBreak: "lg" },
  { kind: "sparkline", top: "84%", left: "40%", rotate: -2, duration: 5.8, minBreak: "lg" },
  { kind: "heatmap", top: "34%", left: "14%", rotate: -2, duration: 6.6, minBreak: "xl" },
];

const visibilityClass: Record<Breakpoint, string> = {
  xs: "",
  sm: "hidden sm:block",
  lg: "hidden lg:block",
  xl: "hidden xl:block",
};

function corners(x: number, y: number, w: number, h: number, c: number, r: number) {
  return [
    `M ${x} ${y + c} V ${y + r} A ${r} ${r} 0 0 1 ${x + r} ${y} H ${x + c}`,
    `M ${x + w - c} ${y} H ${x + w - r} A ${r} ${r} 0 0 1 ${x + w} ${y + r} V ${y + c}`,
    `M ${x} ${y + h - c} V ${y + h - r} A ${r} ${r} 0 0 0 ${x + r} ${y + h} H ${x + c}`,
    `M ${x + w - c} ${y + h} H ${x + w - r} A ${r} ${r} 0 0 0 ${x + w} ${y + h - r} V ${y + h - c}`,
  ];
}

const fillClass: Record<MarkColor, string> = {
  primary: "fill-primary/70",
  secondary: "fill-secondary/70",
  tertiary: "fill-tertiary/70",
};

const strokeClass: Record<MarkColor, string> = {
  primary: "stroke-primary",
  secondary: "stroke-secondary",
  tertiary: "stroke-tertiary",
};

const textClass: Record<MarkColor, string> = {
  primary: "text-primary",
  secondary: "text-secondary",
  tertiary: "text-tertiary",
};

function DetectionIcon({ shape, color }: { shape: DetectionShape; color: MarkColor }) {
  const cls = fillClass[color];
  const x = 14;
  const y = 14;
  const w = 36;
  const h = 36;

  if (shape === "gear") {
    const cx = x + w / 2;
    const cy = y + h / 2;
    const rOuter = w * 0.34;
    const toothW = w * 0.13;
    const toothH = h * 0.15;
    const angles = [0, 60, 120, 180, 240, 300];
    return (
      <g>
        {angles.map((deg) => (
          <rect
            key={deg}
            x={cx - toothW / 2}
            y={cy - rOuter - toothH * 0.55}
            width={toothW}
            height={toothH}
            rx={1}
            transform={`rotate(${deg} ${cx} ${cy})`}
            className={cls}
          />
        ))}
        <circle cx={cx} cy={cy} r={rOuter * 0.78} fill="none" className={strokeClass[color]} strokeWidth={4} />
        <circle cx={cx} cy={cy} r={rOuter * 0.22} className={cls} />
      </g>
    );
  }
  // camera
  const bodyH = h * 0.68;
  const lensCy = y + h * 0.32 + bodyH / 2;
  return (
    <g>
      <rect x={x} y={y + h * 0.32} width={w} height={bodyH} rx={5} className={cls} />
      <rect x={x + w * 0.32} y={y} width={w * 0.36} height={h * 0.2} rx={2} className={cls} />
      <circle cx={x + w / 2} cy={lensCy} r={h * 0.2} fill="none" className={strokeClass[color]} strokeWidth={2.5} />
      <circle cx={x + w / 2} cy={lensCy} r={h * 0.08} className={cls} />
    </g>
  );
}

function DetectionMarkView({ mark, index }: { mark: DetectionMark; index: number }) {
  const reduced = useReducedMotion();
  const { ref: repelRef, x: repelX, y: repelY } = useCursorRepel<HTMLDivElement>();

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.8, rotate: mark.rotate }}
      animate={
        reduced
          ? { opacity: 1, scale: 1, rotate: mark.rotate }
          : { opacity: 1, scale: 1, rotate: mark.rotate, y: [0, -10, 0] }
      }
      transition={
        reduced
          ? { duration: 0.4, delay: index * 0.08 }
          : {
              opacity: { duration: 0.4, delay: index * 0.08 },
              scale: { duration: 0.4, delay: index * 0.08 },
              y: { duration: mark.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: index * 0.3 },
            }
      }
      style={{ top: mark.top, left: mark.left }}
      className={`pointer-events-none absolute h-16 w-16 select-none ${visibilityClass[mark.minBreak]}`}
    >
      <motion.div ref={repelRef} style={{ x: repelX, y: repelY }} className="relative h-full w-full">
        <svg viewBox="0 0 64 64" className="h-full w-full">
          <DetectionIcon shape={mark.shape} color={mark.color} />
          <g className={strokeClass[mark.color]} fill="none" strokeWidth={2} strokeLinecap="round">
            {corners(4, 4, 56, 56, 14, 5).map((d, j) => (
              <path key={j} d={d} />
            ))}
          </g>
        </svg>
        <span
          className={`absolute -bottom-1 -right-1 rounded-full bg-surface px-1.5 py-0.5 font-mono text-[9px] font-semibold shadow-ambient ${textClass[mark.color]}`}
        >
          {mark.label}
        </span>
      </motion.div>
    </motion.div>
  );
}

const NODES = [
  { x: 6, y: 8 },
  { x: 6, y: 28 },
  { x: 6, y: 48 },
  { x: 44, y: 16 },
  { x: 44, y: 40 },
  { x: 82, y: 28 },
];

const EDGES: [number, number][] = [
  [0, 3],
  [0, 4],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
];

const PULSES: { path: [number, number, number]; color: string }[] = [
  { path: [0, 3, 5], color: "fill-tertiary" },
  { path: [1, 4, 5], color: "fill-secondary" },
  { path: [2, 3, 5], color: "fill-primary" },
];

function NeuralMarkView({ mark, index }: { mark: NeuralMark; index: number }) {
  const reduced = useReducedMotion();
  const { ref: repelRef, x: repelX, y: repelY } = useCursorRepel<HTMLDivElement>();

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.85 }}
      animate={
        reduced
          ? { opacity: 1, scale: 1 }
          : { opacity: 1, scale: 1, x: [0, 7, -6, 0], rotate: [0, 2.5, -2, 0] }
      }
      transition={
        reduced
          ? { duration: 0.4, delay: index * 0.08 }
          : {
              opacity: { duration: 0.4, delay: index * 0.08 },
              scale: { duration: 0.4, delay: index * 0.08 },
              x: { duration: 11, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 11, repeat: Infinity, ease: "easeInOut" },
            }
      }
      style={{ top: mark.top, left: mark.left }}
      className={`pointer-events-none absolute h-14 w-24 select-none ${visibilityClass[mark.minBreak]}`}
    >
      <motion.div ref={repelRef} style={{ x: repelX, y: repelY }} className="h-full w-full">
        <svg viewBox="0 0 88 56" className="h-full w-full overflow-visible">
          <g className="stroke-border" strokeWidth={1.2} fill="none">
            {EDGES.map(([a, b], j) => (
              <line key={j} x1={NODES[a].x} y1={NODES[a].y} x2={NODES[b].x} y2={NODES[b].y} />
            ))}
          </g>
          {!reduced &&
            PULSES.map((p, j) => (
              <motion.circle
                key={j}
                r={2.5}
                className={p.color}
                initial={{ cx: NODES[p.path[0]].x, cy: NODES[p.path[0]].y }}
                animate={{
                  cx: p.path.map((n) => NODES[n].x),
                  cy: p.path.map((n) => NODES[n].y),
                }}
                transition={{
                  duration: mark.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: j * (mark.duration / PULSES.length),
                }}
              />
            ))}
          {NODES.map((n, j) => (
            <motion.circle
              key={j}
              cx={n.x}
              cy={n.y}
              className={j === NODES.length - 1 ? "fill-primary" : j >= 3 ? "fill-secondary" : "fill-tertiary"}
              initial={{ r: 4 }}
              animate={reduced ? { r: 4 } : { r: [4, 5.4, 4] }}
              transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: j * 0.22 }}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

const LOSS_POINTS = [
  [4, 8],
  [15, 18],
  [26, 14],
  [37, 28],
  [48, 24],
  [59, 36],
  [70, 33],
  [78, 42],
];

function SparklineMarkView({ mark, index }: { mark: SparklineMark; index: number }) {
  const reduced = useReducedMotion();
  const { ref: repelRef, x: repelX, y: repelY } = useCursorRepel<HTMLDivElement>();
  const last = LOSS_POINTS[LOSS_POINTS.length - 1];

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.85, rotate: mark.rotate }}
      animate={
        reduced
          ? { opacity: 1, scale: 1, rotate: mark.rotate }
          : { opacity: 1, scale: 1, rotate: mark.rotate, y: [0, -9, 0] }
      }
      transition={
        reduced
          ? { duration: 0.4, delay: index * 0.08 }
          : {
              opacity: { duration: 0.4, delay: index * 0.08 },
              scale: { duration: 0.4, delay: index * 0.08 },
              y: { duration: mark.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: index * 0.3 },
            }
      }
      style={{ top: mark.top, left: mark.left }}
      className={`pointer-events-none absolute h-14 w-20 select-none rounded-xl border-2 border-tertiary/50 bg-surface p-1.5 shadow-ambient ${visibilityClass[mark.minBreak]}`}
    >
      <motion.div ref={repelRef} style={{ x: repelX, y: repelY }} className="h-full w-full">
        <svg viewBox="0 0 82 48" className="h-full w-full">
          <line x1={2} y1={44} x2={80} y2={44} className="stroke-border" strokeWidth={1} />
          <polyline
            points={LOSS_POINTS.map((p) => p.join(",")).join(" ")}
            fill="none"
            className="stroke-tertiary"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.circle
            cx={last[0]}
            cy={last[1]}
            className="fill-tertiary"
            initial={{ r: 2.5 }}
            animate={reduced ? { r: 2.5 } : { r: [2.5, 4, 2.5] }}
            transition={reduced ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}

function CodeMarkView({ mark, index }: { mark: CodeMark; index: number }) {
  const reduced = useReducedMotion();
  const { ref: repelRef, x: repelX, y: repelY } = useCursorRepel<HTMLDivElement>();

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.85, rotate: mark.rotate }}
      animate={
        reduced
          ? { opacity: 1, scale: 1, rotate: mark.rotate }
          : { opacity: 1, scale: 1, rotate: mark.rotate, y: [0, -9, 0] }
      }
      transition={
        reduced
          ? { duration: 0.4, delay: index * 0.08 }
          : {
              opacity: { duration: 0.4, delay: index * 0.08 },
              scale: { duration: 0.4, delay: index * 0.08 },
              y: { duration: mark.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: index * 0.3 },
            }
      }
      style={{ top: mark.top, left: mark.left }}
      className={`pointer-events-none absolute h-14 w-20 select-none rounded-xl border-2 border-primary/50 bg-surface p-2 shadow-ambient ${visibilityClass[mark.minBreak]}`}
    >
      <motion.div ref={repelRef} style={{ x: repelX, y: repelY }} className="h-full w-full">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-primary/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-secondary/70" />
          <span className="h-1.5 w-1.5 rounded-full bg-tertiary/70" />
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          <span className="h-1.5 w-3/4 rounded-full bg-tertiary/60" />
          <span className="h-1.5 w-1/2 rounded-full bg-secondary/60" />
          <span className="flex items-center gap-0.5">
            <span className="h-1.5 w-2/3 rounded-full bg-primary/60" />
            {!reduced && (
              <motion.span
                className="h-1.5 w-0.5 bg-ink"
                animate={{ opacity: [1, 1, 0, 0] }}
                transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
              />
            )}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

const HEATMAP_CELLS = [0.85, 0.3, 0.55, 0.4, 0.95, 0.25, 0.3, 0.6, 0.75];

function HeatmapMarkView({ mark, index }: { mark: HeatmapMark; index: number }) {
  const reduced = useReducedMotion();
  const { ref: repelRef, x: repelX, y: repelY } = useCursorRepel<HTMLDivElement>();

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.85, rotate: mark.rotate }}
      animate={
        reduced
          ? { opacity: 1, scale: 1, rotate: mark.rotate }
          : { opacity: 1, scale: 1, rotate: mark.rotate, y: [0, -9, 0] }
      }
      transition={
        reduced
          ? { duration: 0.4, delay: index * 0.08 }
          : {
              opacity: { duration: 0.4, delay: index * 0.08 },
              scale: { duration: 0.4, delay: index * 0.08 },
              y: { duration: mark.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: index * 0.3 },
            }
      }
      style={{ top: mark.top, left: mark.left }}
      className={`pointer-events-none absolute h-14 w-20 select-none rounded-xl border-2 border-secondary/50 bg-surface p-2 shadow-ambient ${visibilityClass[mark.minBreak]}`}
    >
      <motion.div ref={repelRef} style={{ x: repelX, y: repelY }} className="grid h-full w-full grid-cols-3 gap-1">
        {HEATMAP_CELLS.map((opacity, j) =>
          j === 4 ? (
            <motion.span
              key={j}
              className="rounded-[3px] bg-secondary"
              initial={{ opacity }}
              animate={reduced ? { opacity } : { opacity: [opacity, 0.5, opacity] }}
              transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : (
            <span key={j} className="rounded-[3px] bg-secondary" style={{ opacity }} />
          ),
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * The site's required "graphic / original artwork" — a small, varied set of
 * ML/CV motifs (an object-detection frame, a robotics gear, a training-loss
 * sparkline, a code-editor sketch, and a tiny neural net with signals firing
 * across it), sized and animated like the ambient floating chips rather than
 * a single large panel. The neural net sways and breathes on its own rhythm
 * instead of the vertical bob every other mark uses, so it reads as
 * "thinking" rather than just floating in place.
 */
export function VisionMarks() {
  return (
    <>
      {MARKS.map((mark, i) => {
        if (mark.kind === "detection") return <DetectionMarkView key={i} mark={mark} index={i} />;
        if (mark.kind === "sparkline") return <SparklineMarkView key={i} mark={mark} index={i} />;
        if (mark.kind === "code") return <CodeMarkView key={i} mark={mark} index={i} />;
        if (mark.kind === "heatmap") return <HeatmapMarkView key={i} mark={mark} index={i} />;
        return <NeuralMarkView key={i} mark={mark} index={i} />;
      })}
    </>
  );
}
