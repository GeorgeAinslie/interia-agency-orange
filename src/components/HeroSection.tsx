import Link from "next/link";

export function HeroSection() {
  return (
    <section className="hero" id="top">
      <div className="hero__atmosphere" aria-hidden>
        <video
          className="hero__atmosphere-video"
          src="/assets/interia-ads.mp4"
          poster="/assets/interia-ads-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 className="hero__title">
            Grow your business{" "}
            <em className="hero__emphasis">faster</em>.
            <span className="hero__title-break">Keep more of what you make.</span>
          </h1>
          <p className="hero__lead">
            AI agents that deliver like a full marketing team. None of the
            payroll.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--light" href="/how-we-run-ads">
              See how it works
            </Link>
            <Link className="btn btn--ghost-light" href="/testimonials">
              See the results
            </Link>
          </div>
          <ul className="hero__stats" aria-label="How it is paid">
            <li>
              <strong>Proof before you pay</strong>
              We show results first. You decide if they&apos;re worth it.
            </li>
            <li>
              <strong>Nothing up front</strong>
              No setup fee, no deposit, no monthly retainer.
            </li>
            <li>
              <strong>You pay when it works</strong>
              Billing starts once the leads are landing, not before.
            </li>
          </ul>
        </div>

        <div className="hero__media">
          <div className="hero__phone">
            <video
              className="hero__video"
              src="/assets/interia-ads.mp4"
              poster="/assets/interia-ads-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-label="Interia ads reel"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
