import { Reveal } from "@/components/Reveal";

const services = [
  {
    title: "A.I automated operations",
    body: "From email retention and nurture flows to call handling and customer service. We set up automation that responds fast, stays on-brand, and keeps leads warm until they are ready to buy.",
  },
  {
    title: "Funnels that make a difference",
    body: "Not just landing pages. Full acquisition funnels mapped, built, and refined. Offer, page, and follow-up work as one system so traffic turns into qualified enquiries, not dead clicks.",
  },
  {
    title: "Meta and Google ads, done properly",
    body: "Creative, structure, and landing alignment with real attention, not set-and-forget. We care for your campaigns so testing, messaging, and spend stay focused on what moves pipeline.",
  },
] as const;

export function ServicesSection() {
  return (
    <section id="services" className="section section--soft">
      <div className="container">
        <Reveal className="section__intro">
          <p className="eyebrow section__eyebrow">Services</p>
          <h2 className="section__title">
            Automation, funnels, and paid media under one roof.
          </h2>
          <p className="section__subtitle">
            Three pillars that connect: capture leads, convert them, and keep your
            ad spend working harder.
          </p>
        </Reveal>

        <ul className="service-list">
          {services.map((service, i) => (
            <li key={service.title}>
              <Reveal delay={i * 0.06}>
                <h3 className="service-list__title">{service.title}</h3>
                <p className="service-list__body">{service.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <div className="cta-row">
            <p className="cta-row__text">
              Tell us where you are stuck, automation, funnel, or ads, and we
              will show you what we would fix first.
            </p>
            <a className="btn btn--primary" href="#book">
              Book a strategy call
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
