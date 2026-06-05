import { ContactFormNetlify } from "@/components/ContactFormNetlify";
import { Reveal } from "@/components/Reveal";
import { LeadForm } from "@/components/LeadForm";

export function BookSection() {
  return (
    <section id="book" className="section section--book">
      <ContactFormNetlify />
      <div className="container book-grid">
        <Reveal className="book-grid__copy">
          <p className="eyebrow section__eyebrow">Contact</p>
          <h2 className="section__title">
            Tell us what you are scaling. We will map the first sprint.
          </h2>
          <p className="section__subtitle">
            For teams that already spend on acquisition and need execution to keep
            pace. Bring a live URL, spend range, and target CPA.
          </p>
          <p className="book-grid__note">
            <strong>Unlimited requests</strong>, one active task.{" "}
            <strong>No long-term contract</strong>. Pause when quiet.
          </p>
        </Reveal>

        <Reveal className="book-grid__form" delay={0.08}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
