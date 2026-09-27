export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  plain?: boolean;
}) {
  return (
    <section className="page-hero page-hero--plain">
      <div className="container page-hero__copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__lead">{lead}</p>
      </div>
    </section>
  );
}
