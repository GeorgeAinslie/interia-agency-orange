export function PageHero({
  eyebrow,
  title,
  lead,
  plain = false,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  plain?: boolean;
}) {
  return (
    <section className={`page-hero${plain ? " page-hero--plain" : ""}`}>
      {plain ? null : (
        <video
          className="page-hero__media"
          src="/assets/interia-ads.mp4"
          poster="/assets/interia-ads-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
      )}
      <div className="page-hero__shade" />
      <div className="container page-hero__copy">
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1 className="page-hero__title">{title}</h1>
        <p className="page-hero__lead">{lead}</p>
      </div>
    </section>
  );
}
