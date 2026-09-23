"use client";

import { useRef, useState, type TransitionEvent } from "react";

const steps = [
  {
    label: "Connect",
    title: "Connect the account",
    body: "Ads live in your Meta and Google accounts. Your name. Your data.",
  },
  {
    label: "Campaign",
    title: "The system builds the campaign",
    body: "Offer, structure, tracking. Copy written to the actual job. Unlimited campaigns until we find the jackpot. Built to run, not to sit in a deck.",
  },
  {
    label: "Funnels",
    title: "Build the funnels",
    body: "The page they land on is built so contact is easy. One ask. No maze. Someone who wants the job can actually reach you.",
  },
  {
    label: "Approve",
    title: "You approve. We approve.",
    body: "Nothing goes live until you have seen it. We check it too. Then it can run.",
  },
  {
    label: "Launch",
    title: "It launches and learns",
    body: "Live, then iterate on the numbers. Keep what works. Cut what does not.",
  },
] as const;

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        d="M5 12h12m0 0-5-5m5 5-5 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HowItWorks() {
  const [current, setCurrent] = useState(0);
  const [extending, setExtending] = useState(false);
  const [arrowWidth, setArrowWidth] = useState(40);
  const pointerRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<number | null>(null);
  const step = steps[current];
  const nextIndex = current + 1;
  const hasNext = nextIndex < steps.length;
  const count = steps.length;
  const column = 100 / count;

  const widthFor = (index: number) => {
    const rail = pointerRef.current?.getBoundingClientRect().width ?? 0;
    const col = rail / count;
    const start = col / 2 - 20;
    if (index <= 0) return 40;
    if (index >= count - 1) return Math.max(rail - start, 40);
    return index * col + 20;
  };

  const prefersReduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goNext = () => {
    if (!hasNext || extending) return;
    const target = nextIndex;
    if (prefersReduced()) {
      setCurrent(target);
      setArrowWidth(widthFor(target));
      return;
    }
    pendingRef.current = target;
    setExtending(true);
    requestAnimationFrame(() => {
      setArrowWidth(widthFor(target));
    });
  };

  const finishExtend = (event: TransitionEvent<HTMLButtonElement>) => {
    if (event.propertyName !== "width" || pendingRef.current === null) return;
    setCurrent(pendingRef.current);
    pendingRef.current = null;
    setExtending(false);
  };

  const restart = () => {
    pendingRef.current = null;
    setExtending(false);
    setCurrent(0);
    setArrowWidth(40);
  };

  return (
    <div className="works">
      <ol className="works__rail" aria-label="How it works steps">
        {steps.map((item, i) => {
          const done = i < current;
          const active = i === current;
          const upcoming = i === nextIndex;
          return (
            <li key={item.label}>
              <button
                type="button"
                className={
                  "works__node" +
                  (active ? " is-active" : "") +
                  (done ? " is-done" : "") +
                  (upcoming ? " is-next" : "")
                }
                onClick={() => {
                  if (i === nextIndex) goNext();
                }}
                disabled={i > nextIndex}
                aria-current={active ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${item.title}`}
              >
                <span aria-hidden>{String(i + 1).padStart(2, "0")}</span>
                <b className="works__node-label">{item.label}</b>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="works__pointer" ref={pointerRef}>
        <button
          type="button"
          className={
            "works__arrow" +
            (extending ? " is-extending" : "") +
            (current === 0 && !extending ? " is-prompt" : "")
          }
          style={{
            left: `calc(${0.5 * column}% - 20px)`,
            width: arrowWidth,
          }}
          onClick={hasNext ? goNext : undefined}
          onTransitionEnd={finishExtend}
          disabled={!hasNext || extending}
          aria-label={
            hasNext ? `Next: ${steps[nextIndex].title}` : "All steps shown"
          }
        >
          <span className="works__arrow-shaft" />
          <span className="works__arrow-head" />
        </button>
      </div>

      <article className="works__card" aria-live="polite">
        <p className="works__card-index" aria-hidden>
          {String(current + 1).padStart(2, "0")}
        </p>
        <h3 className="works__card-title">{step.title}</h3>
        <p className="works__card-body">{step.body}</p>
        {hasNext ? (
          <button
            type="button"
            className="works__card-next"
            onClick={goNext}
            disabled={extending}
          >
            Next
            <ArrowIcon />
          </button>
        ) : (
          <button
            type="button"
            className="works__card-next"
            onClick={restart}
          >
            Watch it again
          </button>
        )}
      </article>
    </div>
  );
}
