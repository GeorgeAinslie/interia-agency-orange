import { MediaPlaceholder } from "@/components/MediaPlaceholder";
import { Reveal } from "@/components/Reveal";

/**
 * Temporary: false uses single-column hero layout (hero--no-media) until the
 * showreel is ready. Set to true and add the MP4 (or swap MediaPlaceholder for
 * a <video>) to restore the original two-column hero with media on the right.
 */
const SHOW_HERO_REEL = false;

export function HeroSection() {
  return (
    <section
      id="top"
      className={`hero${SHOW_HERO_REEL ? "" : " hero--no-media"}`}
    >
      <div className="container hero__grid">
        <Reveal className="hero__copy">
          <p className="eyebrow eyebrow--flow">
            <span>Acquisition</span>
            <span className="eyebrow__arrow" aria-hidden>
              <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 6h6.5M6.5 3.5L9.5 6 6.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>conversion</span>
            <span className="eyebrow__arrow" aria-hidden>
              <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.5 6h6.5M6.5 3.5L9.5 6 6.5 8.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span>growth</span>
          </p>
          <h1 className="hero__title">
            Lead generation for businesses that need growth, not{" "}
            <em className="hero__emphasis">chaos</em>.
          </h1>
          <p className="hero__lead">
            Stay ahead of the curve with AI-automated operations, acquisition
            systems that deliver, and landing pages people actually buy into, so
            your spend turns into qualified conversations.
          </p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#book">
              Book a strategy call
            </a>
            <a className="btn btn--ghost" href="#case-study">
              Read the case study
            </a>
          </div>

          <ul className="hero__stats" aria-label="Service standards">
            <li>
              <strong>Results guaranteed</strong> Or your money back
            </li>
            <li>
              <strong>Bi-weekly reporting</strong> Detailed performance insights
            </li>
            <li>
              <strong>Growth focused</strong> Focused on long term scale
            </li>
          </ul>
        </Reveal>

        {SHOW_HERO_REEL ? (
          <Reveal className="hero__media" delay={0.08}>
            <MediaPlaceholder kind="video" aspect="hero" label="Hero reel or showreel" />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
