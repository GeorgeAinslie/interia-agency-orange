import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Websites and SEO",
  description:
    "Most of the SEO is done in the first build. Then we keep it covered. Regular updates, including AI blogs, for as long as we are on the job.",
  alternates: { canonical: "/websites-and-seo" },
};

const seoSteps = [
  {
    n: "01",
    title: "The first build",
    body: "This is where most of the SEO happens. Speed, structure, indexation, on-page. The heavy lift is the launch, not a drip of tiny tweaks later.",
  },
  {
    n: "02",
    title: "A site that converts",
    body: "Fast. One ask. Built so Google can read it from the day it goes live. A visit should turn into an enquiry, not a brochure.",
  },
  {
    n: "03",
    title: "Regular updates",
    body: "Blogs, pages, the cadence that keeps you current. Agents publish and refresh so you are not standing still. AI blogs where the beat needs to hold. A person still calls the work.",
  },
  {
    n: "04",
    title: "Covered while we work",
    live: true,
    body: "Technical watch. Content. Fixes as they come up. Not a quarterly PDF. For the time we are on the account.",
  },
] as const;

const needle = [
  {
    title: "Technical SEO",
    line: "Crawl, index, structure. Done in the first build. Then watched.",
  },
  {
    title: "Page speed",
    line: "If it loads slow they leave. We treat that as a ranking issue.",
  },
  {
    title: "On-page optimisation",
    line: "Titles, headings, internal links. Set at launch. Adjusted when the search changes.",
  },
  {
    title: "Content that keeps going",
    line: "Pages and posts on a regular beat. AI blogs where it helps you stay current. Not filler.",
  },
  {
    title: "Local SEO",
    line: "Google Business, maps, the searches that happen on a phone.",
  },
  {
    title: "Conversion design",
    line: "The page has one job. Make it easy to enquire.",
  },
] as const;

const siteRules = [
  {
    title: "Fast",
    line: "If it takes a second too long, they bounce. Speed is the first impression.",
  },
  {
    title: "Obvious",
    line: "They should know what you do, and what to do next, in two seconds.",
  },
  {
    title: "One ask",
    line: "Call, form, or book. Not five competing buttons and a newsletter.",
  },
  {
    title: "Works on a phone",
    line: "That is where the search happens. The site has to work in a thumb.",
  },
  {
    title: "Built to rank",
    line: "Headings, structure, speed. In the first build, not as a later phase.",
  },
] as const;

export default function WebsitesAndSeoPage() {
  return (
    <main id="main">
      <section className="seo-hero">
        <div className="container seo-hero__grid">
          <div>
            <p className="eyebrow eyebrow--light">Websites and SEO</p>
            <h1 className="seo-hero__title">
              Most of the SEO is the first build.
              <span>Keeping it covered is the job.</span>
            </h1>
            <p className="seo-hero__lead">
              The same agents that run the ads. They put the structure in at
              launch. Then they keep publishing, checking, updating. AI blogs.
              Technical watch. So you are not sitting still while competitors
              move. For as long as we are on the account.
            </p>
            <Link className="btn btn--light" href="#book">
              See what we&apos;d do with your site
            </Link>
          </div>

          <SerpMock />
        </div>
      </section>

      <section className="section section--paper">
        <div className="container seo-problem">
          <div>
            <p className="eyebrow">Why it stalls</p>
            <h2 className="section__title">Launch. Then it goes quiet.</h2>
            <p className="section__subtitle">
              Most of the SEO work happens in the first build. Speed, structure,
              pages. Then it gets left. Rankings move, then stall. The
              difference is covering it after. Regularly. For as long as we are
              on the job.
            </p>
          </div>
          <div className="seo-graphs" aria-hidden>
            <figure className="seo-graph">
              <p className="seo-graph__label">Set and forget</p>
              <FlatlineGraph />
            </figure>
            <figure className="seo-graph seo-graph--live">
              <p className="seo-graph__label">Kept live</p>
              <ClimbGraph />
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="section__intro">
            <p className="eyebrow eyebrow--light">How the agents work</p>
            <h2 className="section__title section__title--light">
              First build. Then cover it.
            </h2>
            <p className="section__subtitle section__subtitle--light">
              The launch does most of the SEO. The expertise is staying on it.
            </p>
          </div>
          <ol className="seo-steps">
            {seoSteps.map((step) => (
              <li
                key={step.n}
                className={`seo-step${"live" in step && step.live ? " seo-step--live" : ""}`}
              >
                <div className="seo-step__top">
                  <span className="seo-step__n">{step.n}</span>
                  {"live" in step && step.live ? (
                    <span className="seo-step__pulse">
                      <i /> Live
                    </span>
                  ) : null}
                </div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container visual-split">
          <div>
            <p className="eyebrow">Websites that convert</p>
            <h2 className="section__title">
              Built in days. Most of the SEO is in that first build.
            </h2>
            <p className="section__subtitle">
              Fast. Mobile. One clear ask. Structured to rank when it goes live.
              Then we keep it covered. That is the job, not the launch party.
            </p>
            <ul className="seo-ticks">
              <li>Days, not months.</li>
              <li>The first build carries the SEO.</li>
              <li>Then it is maintained. On purpose.</li>
            </ul>
          </div>
          <BrowserMock />
        </div>
      </section>

      <section className="section section--paper section--flush-top">
        <div className="container">
          <div className="section__intro section__intro--center">
            <p className="eyebrow">What moves the needle</p>
            <h2 className="section__title">The craft, not the pitch.</h2>
          </div>
          <ul className="seo-needle">
            {needle.map((item, i) => (
              <li key={item.title}>
                <NeedleIcon index={i} />
                <h3>{item.title}</h3>
                <p>{item.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="section__intro section__intro--center">
            <p className="eyebrow eyebrow--light">What makes a good website</p>
            <h2 className="section__title section__title--light">
              Pretty is not the job.
            </h2>
            <p className="section__subtitle section__subtitle--light">
              Five things a site has to do. Miss one and the rest is decoration.
            </p>
          </div>
          <ul className="industry-fan seo-rules">
            {siteRules.map((rule, i) => (
              <li key={rule.title} className="industry-card seo-rule">
                <div className="seo-rule__visual" aria-hidden>
                  <RuleMark index={i} />
                </div>
                <div>
                  <h3>{rule.title}</h3>
                  <p>{rule.line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section__intro">
            <p className="eyebrow">How you see it</p>
            <h2 className="section__title">
              Rankings. Traffic. Enquiries. Visible.
            </h2>
            <p className="section__subtitle">
              No case studies to hide behind yet. The dashboard is the point.
              You see the same numbers we see. Sample layout below. Real figures
              sit here when there is work to show.
            </p>
          </div>
          <DashboardMock />
        </div>
      </section>

      <section className="section section--ink">
        <div className="container seo-proof">
          <div>
            <p className="eyebrow eyebrow--light">See our previous work</p>
            <h2 className="section__title section__title--light">
              Don&apos;t just take our word for it.
            </h2>
            <p className="section__subtitle section__subtitle--light">
              See the results.
            </p>
          </div>
          <Link className="btn btn--light" href="/testimonials">
            See the results
          </Link>
        </div>
      </section>

      <CtaBand
        title="The first build does the heavy lift. Then we keep it covered."
        text="Tell us what you need. A site you have, or one you still need. Nothing to commit to first."
      />
    </main>
  );
}

function SerpMock() {
  return (
    <figure className="seo-serp" aria-label="Illustrated search results">
      <p className="seo-serp__badge">Illustration</p>
      <div className="seo-serp__search">
        <span className="seo-serp__dot" />
        roofer near me
      </div>
      <ol className="seo-serp__list">
        <li className="seo-serp__hit seo-serp__hit--you">
          <div>
            <strong>Your business</strong>
            <span>yoursite.co.uk</span>
            <small>from 8</small>
          </div>
          <em>1</em>
        </li>
        <li className="seo-serp__hit">
          <div>
            <strong>Trade directory</strong>
            <span>directories.example</span>
          </div>
          <em>2</em>
        </li>
        <li className="seo-serp__hit">
          <div>
            <strong>A competitor</strong>
            <span>competitor.example</span>
          </div>
          <em>3</em>
        </li>
      </ol>
      <div className="seo-serp__climb" aria-hidden>
        <span>8</span>
        <i />
        <span>5</span>
        <i />
        <span>3</span>
        <i />
        <b>1</b>
      </div>
    </figure>
  );
}

function FlatlineGraph() {
  return (
    <svg viewBox="0 0 220 88" fill="none" role="img">
      <path
        d="M8 70 L52 42 L96 48 L140 46 L212 46"
        stroke="#141311"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ClimbGraph() {
  return (
    <svg viewBox="0 0 220 88" fill="none" role="img">
      <path
        d="M8 74 L48 62 L88 58 L128 40 L168 28 L212 12"
        stroke="#f34716"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BrowserMock() {
  return (
    <figure className="seo-browser" aria-label="Example converting website layout">
      <div className="seo-browser__chrome">
        <span />
        <span />
        <span />
        <p>yoursite.co.uk</p>
      </div>
      <div className="seo-browser__page">
        <div className="seo-browser__nav">
          <b>Studio</b>
          <em>Call now</em>
        </div>
        <h3>Get the job booked this week.</h3>
        <p>Clear offer. One ask. SEO in the first build. Then kept covered.</p>
        <button type="button" tabIndex={-1}>
          Request a quote
        </button>
        <ul>
          <li>Fast</li>
          <li>Mobile</li>
          <li>One CTA</li>
        </ul>
      </div>
    </figure>
  );
}

function DashboardMock() {
  return (
    <div className="seo-dash">
      <p className="seo-dash__badge">Sample layout · your numbers sit here</p>
      <div className="seo-dash__grid">
        <article>
          <p>Average rank</p>
          <strong>2.6</strong>
          <span>Local queries. First page, last 90 days.</span>
        </article>
        <article>
          <p>Organic visits</p>
          <div className="seo-dash__metric">
            <strong>1,840</strong>
            <svg viewBox="0 0 160 56" fill="none" aria-hidden>
              <path
                d="M4 48 L28 40 L52 42 L76 28 L100 24 L124 14 L156 8"
                stroke="#f34716"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span>Last 90 days</span>
        </article>
        <article>
          <p>Enquiries</p>
          <strong>31</strong>
          <span>From the site, not a report</span>
        </article>
      </div>
    </div>
  );
}

function NeedleIcon({ index }: { index: number }) {
  const icons = [
    <circle key="a" cx="12" cy="12" r="7" />,
    <path key="b" d="M4 16 L12 4 L20 16" />,
    <path key="c" d="M5 7 H19 M5 12 H19 M5 17 H13" />,
    <path key="d" d="M7 18 V6 H17 V18 M10 18 V11 H14 V18" />,
    <circle key="e" cx="12" cy="12" r="4" />,
    <rect key="f" x="5" y="6" width="14" height="12" rx="1.5" />,
  ];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      {icons[index]}
    </svg>
  );
}

function RuleMark({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg viewBox="0 0 80 48" aria-hidden>
        <rect x="6" y="28" width="12" height="14" fill="#0c0b0a" />
        <rect x="24" y="20" width="12" height="22" fill="#0c0b0a" />
        <rect x="42" y="12" width="12" height="30" fill="#0c0b0a" />
        <rect x="60" y="6" width="12" height="36" fill="#f34716" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg viewBox="0 0 80 48" aria-hidden>
        <rect x="8" y="16" width="64" height="16" rx="2" fill="#0c0b0a" />
        <rect x="14" y="20" width="28" height="8" fill="#f3efe8" />
      </svg>
    );
  }
  if (index === 2) {
    return (
      <svg viewBox="0 0 80 48" aria-hidden>
        <rect x="18" y="10" width="44" height="12" rx="2" fill="#f34716" />
        <rect x="18" y="28" width="44" height="10" rx="2" fill="#0c0b0a" />
      </svg>
    );
  }
  if (index === 3) {
    return (
      <svg viewBox="0 0 80 48" aria-hidden>
        <rect x="28" y="4" width="24" height="40" rx="4" fill="#0c0b0a" />
        <rect x="32" y="10" width="16" height="24" fill="#f3efe8" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 80 48" aria-hidden>
      <circle cx="40" cy="24" r="14" fill="none" stroke="#0c0b0a" strokeWidth="4" />
      <circle cx="40" cy="24" r="5" fill="#f34716" />
    </svg>
  );
}
