import { Reveal } from "@/components/Reveal";

const story: {
  label: string;
  title?: string;
  body: string;
}[] = [
  {
    label: "The conversation",
    title: "Understanding the problem",
    body: "Louis came to me running Bespoke Building Group, quality work, but leads coming almost entirely from referrals. No dedicated page, no clear offer, no way to turn ad spend into enquiries he could follow up on. The work was never the problem. The pipeline was.",
  },
  {
    label: "What we built",
    title: "One landing page, one focused ad funnel",
    body: "We designed and built a conversion-focused landing page around their core service, clear headline, proof, and a single call to action. Then we aligned Meta and Google ads to that page so every click landed somewhere built to turn interest into a qualified conversation.",
  },
  {
    label: "What changed",
    title: "Traffic that turns into real projects",
    body: "Instead of scattered clicks and vague form fills, they started receiving enquiries from homeowners ready to talk scope and timeline. One page, one queue, one system, ad creative, landing experience, and follow-up all working in the same direction.",
  },
];

export function CaseStudySection() {
  return (
    <section id="case-study" className="section">
      <div className="container">
        <Reveal className="section__intro">
          <p className="eyebrow section__eyebrow">
            Case study - Bespoke Building Group
          </p>
          <h2 className="section__title">
            How we helped Louis turn an inconsistent pipeline into predictable,
            qualified leads.
          </h2>
        </Reveal>

        <div className="case-study">
          <Reveal className="case-study__media">
            <video
              className="case-study__video"
              src="/assets/bespoke-building.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Screen recording of the Bespoke Building Group landing page"
            />
          </Reveal>

          <div className="case-study__story">
            {story.map((chapter, i) => (
              <Reveal key={chapter.label} delay={i * 0.06}>
                <article className="case-study__chapter">
                  <p className="case-study__chapter-label">{chapter.label}</p>
                  {chapter.title ? (
                    <h3 className="case-study__chapter-title">{chapter.title}</h3>
                  ) : null}
                  <p className="case-study__chapter-body">{chapter.body}</p>
                </article>
              </Reveal>
            ))}

            <Reveal delay={0.18}>
              <blockquote className="case-study__quote">
                <p>
                  &ldquo;We were brilliant on site but invisible online. Now we have
                  a proper landing page, ads that send people to the right place,
                  and enquiries that are actually worth a call back.&rdquo;
                </p>
                <footer>
                  <cite>Louis Brackenbury</cite>
                  <span className="case-study__quote-role">
                    Bespoke Building Group
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
