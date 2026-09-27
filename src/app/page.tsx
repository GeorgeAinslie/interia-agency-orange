import { CtaBand } from "@/components/CtaBand";
import { HeroSection } from "@/components/HeroSection";
import { HowItWorks } from "@/components/HowItWorks";

const industries = [
  {
    name: "Builders",
    line: "New builds and full projects.",
    image: "/assets/industries/industry-builders.jpg?v=real",
  },
  {
    name: "Roofing",
    line: "Repair, replace, maintain.",
    image: "/assets/industries/industry-roofing.jpg?v=real",
  },
  {
    name: "Home improvement",
    line: "Kitchens, bathrooms, interiors.",
    image: "/assets/industries/industry-home-improvement.jpg?v=real",
  },
  {
    name: "Groundworks",
    line: "Foundations, drives, plots.",
    image: "/assets/industries/industry-groundworks.jpg?v=real",
  },
  {
    name: "Extensions",
    line: "Add space. Get the phone ringing.",
    image: "/assets/industries/industry-extensions.jpg?v=real",
  },
] as const;

const objections = [
  {
    q: "How do you get paid?",
    a: "Proof before you pay. Nothing up front. Billing starts once the leads are landing, not before.",
  },
  {
    q: "Is there a setup fee?",
    a: "No setup fee, no monthly retainer. Nothing up front.",
  },
  {
    q: "We already have someone on ads.",
    a: "Fine. Run us alongside. Nothing to cancel, nothing to switch. Keep whatever wins.",
  },
  {
    q: "What if we stop?",
    a: "You keep the work. The account is yours. The pages are yours. Walk away clean.",
  },
] as const;

export default function Home() {
  return (
    <main id="main">
      <HeroSection />

      <section className="section section--paper">
        <div className="container split">
          <div>
            <p className="eyebrow">Why this exists</p>
            <h2 className="section__title">The work is fine. The pipeline is not.</h2>
          </div>
          <div className="prose">
            <p>
              Most businesses we speak to already know how to do the job. What
              they do not have is a reliable way to put the right people in
              front of them.
            </p>
            <p>
              Ads get switched on. Spend goes out. The phone stays quiet, or
              the wrong people ring. Then it gets turned off again.
            </p>
            <p>
              That is the gap. Not a brand. Not a content calendar. A system
              that turns spend into conversations you can actually take.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--ink" id="how-it-works">
        <div className="container">
          <div className="section__intro">
            <p className="eyebrow eyebrow--light">How it works</p>
            <h2 className="section__title section__title--light">
              Connect. Build. Approve. Learn.
            </h2>
            <p className="section__subtitle section__subtitle--light">
              Press the arrow. One step at a time.
            </p>
          </div>

          <HowItWorks />
        </div>
      </section>

      <section className="section section--paper">
        <div className="container industries">
          <div className="section__intro section__intro--center">
            <p className="eyebrow">Construction</p>
            <h2 className="section__title">
              Built for construction businesses that live and die by the phone
              ringing.
            </h2>
            <p className="section__subtitle">
              One vertical, on purpose. If the job is winning more of the right
              enquiries, this is the world we know.
            </p>
          </div>

          <ul className="industry-fan">
            {industries.map((item) => (
              <li key={item.name} className="industry-card">
                <img src={item.image} alt="" />
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--ink">
        <div className="container">
          <div className="section__intro">
            <p className="eyebrow eyebrow--light">The shift</p>
            <h2 className="section__title section__title--light">
              Real-time growth does not wait.
            </h2>
            <p className="section__subtitle section__subtitle--light">
              Marketing is getting faster. The window moves while a campaign is
              still being built. The next test has to happen in the market, not
              in a meeting next month. That is the job now: live, then iterate
              around the clock. What to keep. What to cut. What to try next.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container visual-split visual-split--flip">
          <div>
            <p className="eyebrow">The future</p>
            <h2 className="section__title">
              AI is the next layer of the digital world.
            </h2>
            <p className="section__subtitle">
              Marketing used to be a department. Then it was a stack of tools.
              Now the work can read the data and move without waiting for a
              weekly meeting. That is not a gimmick. It is how digital gets
              done from here. A person still calls the ads. The iteration does
              not wait.
            </p>
          </div>
          <figure className="visual-frame visual-frame--large">
            <img
              src="/assets/visuals/visual-future.svg"
              alt=""
            />
          </figure>
        </div>
      </section>

      <section className="section section--paper">
        <div className="container">
          <div className="section__intro">
            <p className="eyebrow">Straight answers</p>
            <h2 className="section__title">The questions people actually ask.</h2>
          </div>
          <div className="faq">
            {objections.map((item) => (
              <details key={item.q} className="faq__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="See what we would do with your budget."
        text="Twenty minutes. Nothing up front. Billing starts once the leads are landing."
      />
    </main>
  );
}
