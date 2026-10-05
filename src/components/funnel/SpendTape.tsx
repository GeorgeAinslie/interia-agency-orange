"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const frames = [
  {
    id: "25k",
    label: "£25,000 in ads",
    spend: 25000,
    fee: 7500,
    agency: 8800,
    hire: 8900,
  },
  {
    id: "10k",
    label: "£10,000 in ads",
    spend: 10000,
    fee: 3000,
    agency: 4300,
    hire: 6600,
  },
  {
    id: "paused",
    label: "Ads paused",
    spend: 0,
    fee: 0,
    agency: 0,
    hire: 0,
  },
] as const;

const pausedCopy = {
  spend: "Ads paused",
  agency: "the retainer and the contract still run",
  hire: "the salaries still run",
} as const;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
}

function money(value: number) {
  return `£${Math.round(value).toLocaleString("en-GB")}`;
}

/** Hold each finished number, then count to the next. */
function scrub(progress: number) {
  const p = clamp(progress);
  const stops = [0, 0.16, 0.4, 0.56, 0.8, 1];
  if (p <= stops[1]) return { from: 0, to: 0, local: 0, active: 0 };
  if (p <= stops[2]) {
    return {
      from: 0,
      to: 1,
      local: easeInOut((p - stops[1]) / (stops[2] - stops[1])),
      active: 0,
    };
  }
  if (p <= stops[3]) return { from: 1, to: 1, local: 0, active: 1 };
  if (p <= stops[4]) {
    const local = easeInOut((p - stops[3]) / (stops[4] - stops[3]));
    return {
      from: 1,
      to: 2,
      local,
      active: local > 0.55 ? 2 : 1,
    };
  }
  return { from: 2, to: 2, local: 0, active: 2 };
}

function sample(progress: number) {
  const { from: fi, to: ti, local, active: activeIndex } = scrub(progress);
  const from = frames[fi];
  const to = frames[ti];
  const intoPaused = ti === 2 && fi === 1 ? local : ti === 2 && fi === 2 ? 1 : 0;

  const spend = lerp(from.spend, to.spend, local);
  const fee = lerp(from.fee, to.fee, local);
  // Keep last live comparison figures until pause text takes over.
  const liveAgency = fi === 2 ? frames[1].agency : lerp(from.agency, to.agency, local);
  const liveHire = fi === 2 ? frames[1].hire : lerp(from.hire, to.hire, local);
  const maxSpend = frames[0].spend;
  const live = 1 - intoPaused;

  return {
    activeIndex,
    intoPaused,
    spendMoney: money(spend),
    feeLabel: money(fee),
    agencyMoney: `about ${money(liveAgency)}`,
    hireMoney: `about ${money(liveHire)}`,
    spendBar: (spend / maxSpend) * live,
    feeBar: (fee / maxSpend) * live,
    agencyBar: (liveAgency / maxSpend) * live,
    hireBar: (liveHire / maxSpend) * live,
  };
}

/** Fade A out fully, then fade B in — never both visible. */
function SequenceFade({
  primary,
  secondary,
  amount,
}: {
  primary: string;
  secondary: string;
  amount: number;
}) {
  const a = clamp(amount);
  const out = a <= 0.5 ? 1 - a * 2 : 0;
  const inn = a <= 0.5 ? 0 : (a - 0.5) * 2;
  return (
    <span className="spend-fade">
      <span className="spend-fade__item" style={{ opacity: out }}>
        {primary}
      </span>
      <span className="spend-fade__item" style={{ opacity: inn }}>
        {secondary}
      </span>
    </span>
  );
}

type PinMode = "before" | "pinned" | "after";

export function SpendTape() {
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
      const rect = track.getBoundingClientRect();
      const travel = Math.max(1, track.offsetHeight - window.innerHeight);
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

  function goToStep(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const targets = [0.08, 0.48, 0.9];
    const target = targets[index] ?? 0;
    const travel = Math.max(1, track.offsetHeight - window.innerHeight);
    const top = track.getBoundingClientRect().top + window.scrollY + travel * target;
    window.scrollTo({ top, behavior: "smooth" });
  }

  const view = useMemo(() => sample(progress), [progress]);

  return (
    <div className="spend-tape" ref={trackRef}>
      <div className={`spend-tape__pin is-${pinMode}`}>
        <div className="spend-tape__inner">
          <div className="spend-tape__copy">
            <h2 className="funnel-h2">
              <span>Spend £10k on ads.</span>
              <em>Pay us £3k.</em>
            </h2>
            <p className="funnel-lede spend-tape__lede">
              30% of your ad spend, everything included. No ads, no fee.
            </p>
            <ol className="spend-tape__steps">
              {frames.map((item, index) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`spend-tape__step${
                      index === view.activeIndex ? " is-on" : ""
                    }`}
                    aria-current={index === view.activeIndex ? "true" : undefined}
                    onClick={() => goToStep(index)}
                  >
                    <span className="spend-tape__dot" aria-hidden />
                    {item.label}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="spend-card" aria-live="polite">
            <div className="spend-card__block">
              <div className="spend-card__row">
                <span>Your ad spend</span>
                <strong className="spend-card__value">
                  <SequenceFade
                    primary={view.spendMoney}
                    secondary={pausedCopy.spend}
                    amount={view.intoPaused}
                  />
                </strong>
              </div>
              <div className="spend-card__bar">
                <i style={{ transform: `scaleX(${view.spendBar})` }} />
              </div>
            </div>

            <div className="spend-card__block">
              <div className="spend-card__row spend-card__row--fee">
                <span>You pay us</span>
                <strong className="spend-card__value">{view.feeLabel}</strong>
              </div>
              <div className="spend-card__bar spend-card__bar--fee">
                <i style={{ transform: `scaleX(${view.feeBar})` }} />
              </div>
            </div>

            <div className="spend-card__cmp-block">
              <p className="spend-card__cmp">The same work elsewhere, all-in</p>
              <div className="spend-card__row spend-card__row--cmp">
                <span>A typical agency</span>
                <b className="spend-card__value">
                  <SequenceFade
                    primary={view.agencyMoney}
                    secondary={pausedCopy.agency}
                    amount={view.intoPaused}
                  />
                </b>
              </div>
              <div className="spend-card__bar spend-card__bar--cmp">
                <i style={{ transform: `scaleX(${view.agencyBar})` }} />
              </div>
              <div className="spend-card__row spend-card__row--cmp">
                <span>An in-house team</span>
                <b className="spend-card__value">
                  <SequenceFade
                    primary={view.hireMoney}
                    secondary={pausedCopy.hire}
                    amount={view.intoPaused}
                  />
                </b>
              </div>
              <div className="spend-card__bar spend-card__bar--cmp spend-card__bar--last">
                <i style={{ transform: `scaleX(${view.hireBar})` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
