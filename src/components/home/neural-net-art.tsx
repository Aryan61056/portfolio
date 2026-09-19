"use client";

import { motion, useReducedMotion } from "framer-motion";

const LAYER_SIZES = [4, 6, 6, 3];
const VIEWBOX_W = 480;
const VIEWBOX_H = 200;
const PADDING_X = 36;
const PADDING_Y = 22;

type LayerColor = "primary" | "secondary" | "tertiary";

const LAYER_COLOR: LayerColor[] = ["primary", "secondary", "secondary", "tertiary"];

const fillClass: Record<LayerColor, string> = {
  primary: "fill-primary",
  secondary: "fill-secondary",
  tertiary: "fill-tertiary",
};

function layerX(i: number) {
  const usable = VIEWBOX_W - PADDING_X * 2;
  return PADDING_X + (usable * i) / (LAYER_SIZES.length - 1);
}

function nodeYs(count: number) {
  const usable = VIEWBOX_H - PADDING_Y * 2;
  if (count === 1) return [VIEWBOX_H / 2];
  return Array.from({ length: count }, (_, i) => PADDING_Y + (usable * i) / (count - 1));
}

const LAYERS = LAYER_SIZES.map((count, i) => ({
  x: layerX(i),
  ys: nodeYs(count),
  color: LAYER_COLOR[i],
}));

/**
 * Small animated neural-network diagram for the Home hero — signals light
 * up layer by layer, left to right, like a forward pass. Meant to read as
 * "machine learning" at a glance, unlike an abstract shape composition.
 */
export function NeuralNetArt() {
  const reduced = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-md">
      <svg
        viewBox={`0 0 ${VIEWBOX_W} ${VIEWBOX_H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Animated diagram of a small neural network, with signals lighting up layer by layer from input to output."
      >
        <g className="stroke-border" strokeWidth={1}>
          {LAYERS.slice(0, -1).map((layer, li) =>
            layer.ys.map((y1, yi) =>
              LAYERS[li + 1].ys.map((y2, yi2) => (
                <line
                  key={`${li}-${yi}-${yi2}`}
                  x1={layer.x}
                  y1={y1}
                  x2={LAYERS[li + 1].x}
                  y2={y2}
                />
              ))
            )
          )}
        </g>

        {LAYERS.map((layer, li) =>
          layer.ys.map((y, yi) => (
            <motion.circle
              key={`${li}-${yi}`}
              cx={layer.x}
              cy={y}
              r={6}
              className={fillClass[layer.color]}
              initial={{ opacity: 0.3, scale: 0.85 }}
              animate={
                reduced
                  ? { opacity: 1, scale: 1 }
                  : { opacity: [0.3, 1, 0.3], scale: [0.85, 1.08, 0.85] }
              }
              transition={
                reduced
                  ? { duration: 0.4 }
                  : {
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: li * 0.35 + yi * 0.05,
                    }
              }
            />
          ))
        )}
      </svg>
    </div>
  );
}
