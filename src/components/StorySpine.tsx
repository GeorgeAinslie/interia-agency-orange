"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Point = { x: number; y: number };

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

function samePaths(a: string[], b: string[]) {
  return a.length === b.length && a.every((d, i) => d === b[i]);
}

function n(value: number) {
  return value.toFixed(1);
}

function isMobile(width: number) {
  return width < 720;
}

function radius(span: number, width: number) {
  return Math.min(72, Math.max(40, Math.min(span / 6, width * 0.075)));
}

function buildAroundLeft(from: Point, to: Point, width: number) {
  const sy = from.y;
  const ex = to.x;
  const ey = to.y;
  const span = Math.max(ey - sy, 1);
  const r = radius(span, width);
  const left = Math.max(20, width * 0.035);
  const sx = Math.max(from.x, left + 2 * r + 80);
  const down = sy + Math.max(36, span * 0.16);
  const afterFold = down + 2 * r;
  const endR = Math.min(
    r,
    Math.max(8, ex - left),
    Math.max(1, ey - afterFold),
  );

  const d = [
    `M ${n(sx)} ${n(sy)}`,
    `L ${n(sx)} ${n(down)}`,
    `A ${n(r)} ${n(r)} 0 0 1 ${n(sx - r)} ${n(down + r)}`,
    `L ${n(left + r)} ${n(down + r)}`,
    `A ${n(r)} ${n(r)} 0 0 0 ${n(left)} ${n(afterFold)}`,
    `L ${n(left)} ${n(ey - endR)}`,
    `A ${n(endR)} ${n(endR)} 0 0 0 ${n(left + endR)} ${n(ey)}`,
  ];

  if (ex > left + endR + 2) {
    d.push(`L ${n(ex)} ${n(ey)}`);
  }

  return d.join(" ");
}

function buildMobileFirst(from: Point, to: Point, width: number) {
  const pad = 16;
  const left = pad;
  const right = Math.max(left + 120, width - pad);
  const sy = from.y;
  const sx = from.x;
  const ex = to.x;
  const ey = to.y;
  const span = Math.max(ey - sy, 1);
  const r = Math.min(26, (right - left) / 8, span / 9);
  const y1 = sy + Math.max(16, span * 0.08);

  return [
    `M ${n(sx)} ${n(sy)}`,
    `L ${n(sx)} ${n(y1)}`,
    `A ${n(r)} ${n(r)} 0 0 0 ${n(sx + r)} ${n(y1 + r)}`,
    `L ${n(right - r)} ${n(y1 + r)}`,
    `A ${n(r)} ${n(r)} 0 0 1 ${n(right)} ${n(y1 + 2 * r)}`,
    `A ${n(r)} ${n(r)} 0 0 1 ${n(right - r)} ${n(y1 + 3 * r)}`,
    `L ${n(left + r)} ${n(y1 + 3 * r)}`,
    `A ${n(r)} ${n(r)} 0 0 0 ${n(left)} ${n(y1 + 4 * r)}`,
    `L ${n(left)} ${n(ey - r)}`,
    `A ${n(r)} ${n(r)} 0 0 0 ${n(left + r)} ${n(ey)}`,
    `L ${n(Math.max(ex, left + r))} ${n(ey)}`,
  ].join(" ");
}

function buildMobileAccent(from: Point, to: Point, width: number) {
  const pad = 20;
  const sy = from.y;
  const sx = from.x;
  const ex = to.x;
  const ey = to.y;
  const span = Math.max(ey - sy, 1);
  const r = Math.min(34, (width - pad * 2) / 6, span / 6);
  const y1 = sy + Math.max(14, span * 0.12);
  const out = Math.min(width - pad, Math.max(sx + r + 72, width * 0.82));

  return [
    `M ${n(sx)} ${n(sy)}`,
    `L ${n(sx)} ${n(y1)}`,
    `A ${n(r)} ${n(r)} 0 0 0 ${n(sx + r)} ${n(y1 + r)}`,
    `L ${n(out - r)} ${n(y1 + r)}`,
    `A ${n(r)} ${n(r)} 0 0 1 ${n(out)} ${n(y1 + 2 * r)}`,
    `A ${n(r)} ${n(r)} 0 0 1 ${n(out - r)} ${n(y1 + 3 * r)}`,
    `L ${n(ex + r)} ${n(y1 + 3 * r)}`,
    `A ${n(r)} ${n(r)} 0 0 0 ${n(ex)} ${n(y1 + 4 * r)}`,
    `L ${n(ex)} ${n(ey)}`,
  ].join(" ");
}

function buildPath(from: Point, to: Point, width: number, index: number) {
  if (!isMobile(width)) return buildAroundLeft(from, to, width);
  return index === 0
    ? buildMobileFirst(from, to, width)
    : buildMobileAccent(from, to, width);
}

function measureNodes(root: HTMLElement) {
  const nodes = [...root.querySelectorAll<HTMLElement>("[data-spine-node]")];
  const box = root.getBoundingClientRect();
  const mobile = isMobile(root.clientWidth);
  return nodes.map((node) => {
    const r = node.getBoundingClientRect();
    if (mobile) {
      return {
        node,
        from: {
          x: r.left - box.left + r.width * 0.28,
          y: r.bottom - box.top + 24,
        },
        to: {
          x: r.left - box.left + r.width * 0.5,
          y: r.top - box.top - 12,
        },
      };
    }
    return {
      node,
      from: {
        x: r.left - box.left + r.width * 0.5,
        y: r.bottom - box.top + 40,
      },
      to: {
        x: r.left - box.left - 20,
        y: r.top - box.top + r.height * 0.5,
      },
    };
  });
}

function drawAmount(
  _root: HTMLElement,
  el: SVGPathElement | null,
  startNode?: HTMLElement,
  endNode?: HTMLElement,
) {
  const vh = window.innerHeight;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const length = el?.getTotalLength() || 1;
  const empty = { length, drawn: 0, tip: { x: 0, y: 0 }, angle: 0 };
  if (!startNode) return empty;
  const startLine = startNode.getBoundingClientRect().bottom;
  const endLine = endNode
    ? endNode.getBoundingClientRect().top
    : startLine + vh;
  const rangeStart = startLine - vh * 0.58;
  const rangeEnd = endLine - vh * 0.42;
  const progress = reduced
    ? 1
    : clamp((0 - rangeStart) / Math.max(rangeEnd - rangeStart, 1), 0, 1);
  const stub = Math.min(48, length * 0.05);
  const inPlay = reduced || startLine < vh * 0.92;
  if (!inPlay) return empty;
  const drawn = Math.min(length, Math.max(length * progress, stub));
  let tip = { x: 0, y: 0 };
  let angle = 0;
  if (el && drawn > 0) {
    try {
      tip = el.getPointAtLength(drawn);
      const prev = el.getPointAtLength(Math.max(drawn - 12, 0));
      angle = Math.atan2(tip.y - prev.y, tip.x - prev.x);
    } catch {
      tip = { x: 0, y: 0 };
    }
  }
  return { length, drawn, tip, angle };
}

export function StorySpine({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [paths, setPaths] = useState<string[]>([]);
  const [drawn, setDrawn] = useState<
    { length: number; drawn: number; tip: Point; angle: number }[]
  >([]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const layout = () => {
      const measured = measureNodes(root);
      const next = measured.slice(0, -1).map((item, i) =>
        buildPath(item.from, measured[i + 1].to, root.clientWidth, i),
      );
      setPaths((prev) => (samePaths(prev, next) ? prev : next));
      setSize((prev) =>
        prev.w === root.clientWidth && prev.h === root.clientHeight
          ? prev
          : { w: root.clientWidth, h: root.clientHeight },
      );
    };

    const paint = () => {
      const measured = measureNodes(root);
      setDrawn(
        paths.map((_, i) =>
          drawAmount(
            root,
            pathRefs.current[i],
            measured[i]?.node,
            measured[i + 1]?.node,
          ),
        ),
      );
    };

    let frame = 0;
    const update = () => {
      layout();
      frame = requestAnimationFrame(paint);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(paint);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(root);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [paths.length]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || paths.length === 0) return;
    const measured = measureNodes(root);
    setDrawn(
      paths.map((_, i) =>
        drawAmount(root, pathRefs.current[i], measured[i]?.node, measured[i + 1]?.node),
      ),
    );
  }, [paths]);

  return (
    <div className="story-spine" ref={rootRef}>
      <svg
        className="story-spine__svg"
        width={Math.max(size.w, 1)}
        height={Math.max(size.h, 1)}
        viewBox={`0 0 ${Math.max(size.w, 1)} ${Math.max(size.h, 1)}`}
        preserveAspectRatio="xMinYMin meet"
        aria-hidden
      >
        {paths.map((d, i) => {
          const leg = drawn[i];
          const length = leg?.length ?? 1;
          const amount = leg?.drawn ?? 0;
          return (
            <g key={`${i}-${d}`}>
              <path
                ref={(node) => {
                  pathRefs.current[i] = node;
                }}
                className="story-spine__path"
                d={d}
                strokeDasharray={length}
                strokeDashoffset={Math.max(length - amount, 0)}
              />
            </g>
          );
        })}
      </svg>
      {children}
    </div>
  );
}
