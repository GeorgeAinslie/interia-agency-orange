import { LeadForm } from "@/components/LeadForm";

export function CtaBand({
  title = "Twenty minutes. First thing we would change.",
  text = "Bring a URL and a rough spend. No pitch deck. No contract to cancel.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-band" id="book">
      <div className="container cta-band__inner">
        <div>
          <h2 className="cta-band__title">{title}</h2>
          <p className="cta-band__text">{text}</p>
        </div>
        <LeadForm variant="ink" />
      </div>
    </section>
  );
}
