import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "About",
  description:
    "Interia is an ads studio. One offer. Meta and Google, run in your account.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="An ads studio. Not a holding company."
        lead="Interia runs paid acquisition. That is what we sell. Everything else can wait."
      />

      <section className="section section--paper">
        <div className="container prose">
          <p>
            If you need a brand film or someone to post on Instagram, we are the
            wrong call. If you need ads, a site that converts, and SEO that is
            built in the first pass then kept covered, we should talk.
          </p>
          <p>
            The ads sit in your account. Spend goes to Meta and Google. Nothing
            up front. You pay when it works. Stop and you keep the work.
          </p>
          <p>
            We use AI to iterate and analyse the data. We do not sell AI. We do
            not pretend a bot is the agency.
          </p>
          <p>
            Ads first. The site and the search work sit under that. Same agents.
            Same loop. Keep going.
          </p>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
