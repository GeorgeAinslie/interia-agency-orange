"use client";

import { useEffect, useRef, useState } from "react";

type Kind = "lose" | "maybe" | "win";

type Column = {
  kind: Kind;
  x0: number;
  x1: number;
  /** Hello Revenue launch stack. */
  c0: number;
  /** Hello Revenue finish stack. */
  c1: number;
  kill?: boolean;
};

/**
 * Same layout as Hello Revenue:
 * Launch  1–2–3–4–5–5–5–4–3–2–1
 * Finish  leftovers fade, maybes ramp 1→5, winners 5–5–4 on the right
 */
const columns: Column[] = [
  { kind: "lose", x0: 0.3, x1: 0.14, c0: 1, c1: 1, kill: true },
  { kind: "lose", x0: 0.34, x1: 0.18, c0: 2, c1: 1, kill: true },
  { kind: "lose", x0: 0.38, x1: 0.18, c0: 3, c1: 0, kill: true },
  { kind: "maybe", x0: 0.42, x1: 0.38, c0: 4, c1: 1 },
  { kind: "maybe", x0: 0.46, x1: 0.44, c0: 5, c1: 2 },
  { kind: "maybe", x0: 0.5, x1: 0.5, c0: 5, c1: 3 },
  { kind: "maybe", x0: 0.54, x1: 0.56, c0: 5, c1: 4 },
  { kind: "maybe", x0: 0.58, x1: 0.62, c0: 4, c1: 5 },
  { kind: "win", x0: 0.62, x1: 0.72, c0: 3, c1: 5 },
  { kind: "win", x0: 0.66, x1: 0.78, c0: 2, c1: 5 },
  { kind: "win", x0: 0.7, x1: 0.84, c0: 1, c1: 4 },
];

const colors = {
  lose: "#c47a6c",
  maybe: "#9a938a",
  win: "#6b9eff",
} as const;

const LAUNCH_MEAN = 0.5;
const LATER_MEAN = 0.76;
const LAUNCH_SD = 0.155;
const LATER_SD = 0.115;
const LAUNCH_H = 148;
const CURVE_BASE = 262;
/** Stroke → top of circle. Keep generous so dots never kiss the line. */
const CURVE_CLEARANCE = 18;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function gauss(x: number, mean: number, sd: number) {
  return Math.exp(-((x - mean) ** 2) / (2 * sd * sd));
}

function curveYAt(t: number, mean: number, sd: number, height: number) {
  return CURVE_BASE - gauss(t, mean, sd) * height;
}

function pathFor(mean: number, sd: number, height: number) {
  const points: string[] = [];
  for (let i = 0; i <= 96; i += 1) {
    const t = i / 96;
    const x = 60 + t * 880;
    const y = curveYAt(t, mean, sd, height);
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

/** Hard cap against the LIVE curve only — never the taller ghost outline. */
function maxFit(
  t: number,
  mean: number,
  sd: number,
  height: number,
  baseY: number,
  r: number,
  stackGap: number,
) {
  const roof = curveYAt(t, mean, sd, height);
  const topLimit = roof + r + CURVE_CLEARANCE;
  if (topLimit > baseY) return 0;
  return Math.floor((baseY - topLimit) / stackGap) + 1;
}

type PinMode = "before" | "pinned" | "after";

export function ImproveCurve() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [pinMode, setPinMode] = useState<PinMode>("before");

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(0);
      setPinMode("before");
      return;
    }

    let frame = 0;

    function update() {
      frame = 0;
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const travel = Math.max(1, el.offsetHeight - window.innerHeight);
      const next = clamp(-rect.top / travel);

      if (rect.top > 0) {
        setPinMode("before");
        setProgress(0);
      } else if (rect.bottom <= window.innerHeight) {
        setPinMode("after");
        setProgress(1);
      } else {
        setPinMode("pinned");
        setProgress(next);
      }
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const kill = easeInOut(clamp((progress - 0.28) / 0.2));
  const move = easeInOut(clamp((progress - 0.32) / 0.56));
  const laterLabel = clamp((progress - 0.36) / 0.22);
  // Headline focus tracks the curve scrub: launch line → improve line.
  const titleFocus = move;

  const mean = LAUNCH_MEAN + (LATER_MEAN - LAUNCH_MEAN) * move;
  const sd = LAUNCH_SD + (LATER_SD - LAUNCH_SD) * move;
  const curveH = LAUNCH_H + move * 16;
  const nowPath = pathFor(mean, sd, curveH);
  const ghostPath = pathFor(LAUNCH_MEAN, LAUNCH_SD, LAUNCH_H);

  const pointOpacity = [
    clamp((progress - 0.22) / 0.16),
    clamp((progress - 0.44) / 0.18),
    clamp((progress - 0.64) / 0.2),
  ];

  // HR-like scale: fewer, larger dots with open spacing.
  const r = 11;
  const baseY = 286;
  const stackGap = 30;

  return (
    <div className="curve-tape" ref={trackRef}>
      <div className={`curve-tape__pin is-${pinMode}`}>
        <div className="curve-tape__stage">
          <header className="curve-tape__head">
            <h2 className="funnel-h2 curve-tape__title">
              <span
                className="curve-tape__line"
                style={{
                  color: `rgba(220, 231, 255, ${0.28 + (1 - titleFocus) * 0.72})`,
                }}
              >
                Every campaign has winners and losers.
              </span>
              <span
                className="curve-tape__line"
                style={{
                  color: `rgba(220, 231, 255, ${0.28 + titleFocus * 0.72})`,
                }}
              >
                We keep improving so you win faster.
              </span>
            </h2>
          </header>

          <figure className="curve-fig">
            <svg
              viewBox="0 0 1000 340"
              role="img"
              aria-label="Ad results start as a centred bell, then winners pile up toward great as losers fade."
            >
              <circle className="curve-fig__key-dot" cx="58" cy="26" r="5.5" />
              <text className="curve-fig__key" x="74" y="30">
                Each dot is one ad
              </text>

              <path className="curve-fig__ghost" d={ghostPath} />
              <path className="curve-fig__now" d={nowPath} />

              <text
                className="curve-fig__lbl"
                x="500"
                y="88"
                textAnchor="middle"
                style={{ opacity: 1 - laterLabel * 0.55 }}
              >
                At launch
              </text>
              <text
                className="curve-fig__lbl curve-fig__lbl--later"
                x="720"
                y="64"
                textAnchor="start"
                style={{ opacity: laterLabel }}
              >
                Days to weeks later
              </text>

              <line
                className="curve-fig__base"
                x1="48"
                y1="308"
                x2="952"
                y2="308"
              />
              <text className="curve-fig__axis" x="48" y="330">
                Bad
              </text>
              <text
                className="curve-fig__axis"
                x="952"
                y="330"
                textAnchor="end"
              >
                Great
              </text>

              {columns.map((col, colIndex) => {
                const t = col.x0 + (col.x1 - col.x0) * move;
                const x = 60 + t * 880;
                const fill = colors[col.kind];
                const dead = col.kill ? kill : 0;
                if (col.kill && dead >= 0.98) return null;

                const desired = col.c0 + (col.c1 - col.c0) * move;
                const fit = maxFit(t, mean, sd, curveH, baseY, r, stackGap);
                const count = Math.min(desired, fit);
                const stacks = Math.max(0, Math.ceil(count - 1e-6));

                const roof = curveYAt(t, mean, sd, curveH);

                return Array.from({ length: stacks }, (_, stack) => {
                  const visible = clamp(count - stack);
                  if (visible <= 0.001) return null;
                  const cy = baseY - stack * stackGap;
                  // Live curve is law — drop anything that would cross the stroke.
                  if (cy - r < roof + CURVE_CLEARANCE) return null;

                  const opacity = col.kill
                    ? 0.92 * (1 - dead) * visible
                    : 0.92 * visible;
                  if (opacity <= 0.02) return null;

                  return (
                    <circle
                      key={`${colIndex}-${stack}`}
                      className="curve-fig__dot"
                      cx={x}
                      cy={cy}
                      r={r}
                      style={{ fill, opacity }}
                    />
                  );
                });
              })}
            </svg>
          </figure>

          <ul className="curve-points">
            <li
              className="curve-points__item curve-points__item--lose"
              style={{ opacity: 0.22 + pointOpacity[0] * 0.78 }}
            >
              <strong>We kill the losers</strong>
              <span>As soon as the numbers turn</span>
            </li>
            <li
              className="curve-points__item curve-points__item--maybe"
              style={{ opacity: 0.22 + pointOpacity[1] * 0.78 }}
            >
              <strong>We rework the maybes</strong>
              <span>New versions in minutes, not weeks</span>
            </li>
            <li
              className="curve-points__item curve-points__item--win"
              style={{ opacity: 0.22 + pointOpacity[2] * 0.78 }}
            >
              <strong>We back the winners</strong>
              <span>More budget as soon as it pays, within yours</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
