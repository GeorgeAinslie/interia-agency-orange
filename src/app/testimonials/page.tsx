import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { WorkFeature, WorkGrid } from "@/components/WorkGrid";
import { featuredWork, trustpilotReviews, websiteClients, workGrid } from "@/lib/clients";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Work we can stand behind. Have a look.",
  alternates: { canonical: "/testimonials" },
};

const chapters = [
  {
    label: "The problem",
    title: "Good work. No pipeline.",
    body: "Louis was running Bespoke Building Group on referrals. No dedicated ads. No page built to take a conversation. The work was never the issue. Being found was.",
  },
  {
    label: "What we ran",
    title: "Meta, Google, one page.",
    body: "We built a page around the actual job, then pointed paid traffic at it. Clear offer. One ask. Ads in his account, not ours.",
  },
  {
    label: "What changed",
    title: "Enquiries worth ringing back.",
    body: "Not a scoreboard. Homeowners ready to talk scope and timeline. Ads, page, follow-up pointing the same way.",
  },
] as const;

export default function TestimonialsPage() {
  return (
    <main id="main">
      <PageHero
        plain
        eyebrow="Testimonials"
        title="See the results."
        lead="Don&apos;t just take our word for it. Check out our happy customers."
      />

      <section className="logo-board" id="clients">
        <div className="container">
          <p className="logo-board__label">Some of our trusted clients</p>
          <ul className="logo-rail" aria-label="Companies we have worked with">
            {websiteClients.map((client) => (
              <li
                key={client.name}
                className={
                  client.name === "Georgia"
                    ? "logo-rail__item--compact"
                    : client.name === "Sprayaway"
                      ? "logo-rail__item--sprayaway"
                      : client.name === "Bespoke Building Group"
                        ? "logo-rail__item--large"
                        : undefined
                }
              >
                <img src={`${client.logo}?v=2`} alt={client.name} />
              </li>
            ))}
          </ul>

          <ul className="trust-cards" aria-label="Trustpilot reviews">
            {trustpilotReviews.map((review) => (
              <li key={review.name} className="trust-card">
                <div className="trust-card__top">
                  <div className="trust-card__person">
                    <span
                      className={`trust-card__avatar trust-card__avatar--${review.tone}`}
                      aria-hidden
                    >
                      {review.initials}
                    </span>
                    <div>
                      <p className="trust-card__name">{review.name}</p>
                      <p className="trust-card__meta">{review.location}</p>
                    </div>
                  </div>
                  <img
                    className="trust-card__brand"
                    src="/assets/trustpilot/logo.svg"
                    alt=""
                    width={92}
                    height={22}
                  />
                </div>
                <img
                  className="trust-card__stars"
                  src="/assets/trustpilot/stars-5.svg"
                  alt="Rated 5 out of 5 on Trustpilot"
                  width={110}
                  height={21}
                />
                <h3 className="trust-card__title">{review.title}</h3>
                <p className="trust-card__body">{review.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--paper" id="sites">
        <div className="container">
          <div className="section__intro">
            <p className="eyebrow">The work</p>
            <h2 className="section__title">See our work.</h2>
            <p className="section__subtitle">
              Hover a site. It comes into colour and plays.
            </p>
          </div>

          <div className="work-stack">
            <WorkGrid items={workGrid} />
            <WorkFeature item={featuredWork} />
          </div>
        </div>
      </section>

      <section className="section section--paper section--flush-top" id="case-studies">
        <div className="container">
          <p className="eyebrow">Case study</p>
          <h2 className="section__title">Bespoke Building Group</h2>

          <div className="case-study">
            <div className="case-study__story">
              {chapters.map((chapter) => (
                <article key={chapter.label} className="case-study__chapter">
                  <p className="case-study__chapter-label">{chapter.label}</p>
                  <h3 className="case-study__chapter-title">{chapter.title}</h3>
                  <p className="case-study__chapter-body">{chapter.body}</p>
                </article>
              ))}

              <blockquote className="case-study__quote">
                <p>
                  “We were brilliant on site but invisible online. Now we have a
                  proper landing page, ads that send people to the right place,
                  and enquiries that are actually worth a call back.”
                </p>
                <footer>
                  <cite>Louis Brackenbury</cite>
                  <span className="case-study__quote-role">
                    Bespoke Building Group
                  </span>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="If this is the job you need done, book the twenty minutes."
        text="Tell us what you need. A site you have, or one you still need. Nothing to commit to first."
      />
    </main>
  );
}
