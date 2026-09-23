import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "How we run ads",
  description:
    "We build and run Meta and Google ads in your account. Nothing up front. You pay when it works.",
  alternates: { canonical: "/how-we-run-ads" },
};

const steps = [
  {
    title: "We build the ads",
    body: "Offers, creative, structure, tracking. No setup fee. No retainer. No minimum term.",
  },
  {
    title: "They live in your account",
    body: "Your name on the ads. Stop whenever you like. You keep the work, pages included.",
  },
  {
    title: "Creative is uncapped",
    body: "We want the winner as badly as you do. Attempts are not billed, not queued, and go live the same day.",
  },
  {
    title: "Spend stays with the platforms",
    body: "The budget goes to Meta and Google. It never passes through us.",
  },
  {
    title: "You pay when it works",
    body: "Nothing up front. Billing starts once the leads are landing, not before.",
  },
] as const;

export default function HowWeRunAdsPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={`${siteName} · The model`}
        title="How we run ads."
        lead="No software. No twelve-person team. Ads built and run under your name. That is the whole offer."
      />

      <section className="section section--paper">
        <div className="container">
          <ol className="process-list">
            {steps.map((step, i) => (
              <li key={step.title}>
                <span className="process-list__index" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="process-list__content">
                  <h2 className="process-list__title">{step.title}</h2>
                  <p className="process-list__body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container measure">
          <p className="eyebrow eyebrow--light">AI</p>
          <h2 className="section__title section__title--light">
            We use it to iterate and read the data.
          </h2>
          <p className="section__subtitle section__subtitle--light">
            What is working, what is not, what we change next. A person still
            runs the ads.
          </p>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
