import { Reveal } from "@/components/Reveal";

const steps = [
  {
    title: "Map your funnel",
    body: "We pinpoint where your leads are coming from, where they're dropping off, and what's blocking qualified enquiries.",
  },
  {
    title: "Build the system that converts",
    body: "Landing pages, offers, and ad-ready creative, designed and built to work as one funnel that turns clicks into booked calls.",
  },
  {
    title: "Automate the follow-up",
    body: "We use A.I automation tools to capture and follow-up so no lead slips through. Every enquiry gets a fast, consistent response.",
  },
  {
    title: "Measure and scale",
    body: "Regular reporting on what's working, so we double down on what delivers and cut what doesn't.",
  },
] as const;

export function ProcessSection() {
  return (
    <section id="how-it-works" className="section">
      <div className="container">
        <Reveal className="section__intro">
          <p className="eyebrow section__eyebrow">How it works</p>
          <h2 className="section__title">
            From scattered spend to a system that delivers leads.
          </h2>
          <p className="section__subtitle">
            Built for businesses tired of guessing and ready for a calmer way to
            grow.
          </p>
        </Reveal>

        <ol className="process-list">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="process-list__index" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <Reveal delay={i * 0.05} className="process-list__content">
                <h3 className="process-list__title">{step.title}</h3>
                <p className="process-list__body">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
