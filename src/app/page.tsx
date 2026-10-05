import { CampaignForm } from "@/components/funnel/CampaignForm";
import { ImproveCurve } from "@/components/funnel/ImproveCurve";
import { ProofVideo } from "@/components/funnel/ProofVideo";
import { SpendTape } from "@/components/funnel/SpendTape";
import { dealRows, funnelFaqs, processSteps } from "@/lib/funnel";

export default function Home() {
  return (
    <main id="main" className="funnel">
      <section className="funnel-hero" id="campaign">
        <div className="funnel-wrap funnel-hero__grid">
          <div className="funnel-hero__copy">
            <h1 className="funnel-h1">
              Get more customers.
              <em>Skip the gamble.</em>
            </h1>
            <p className="funnel-lead">
              We build, run and continuously improve your ads, the pages they
              lead to and the follow-up.
            </p>
            <p className="funnel-lead funnel-lead--strong">
              No retainer. No lock-in. No fixed fees.
            </p>
            <CampaignForm id="campaign-hero" />
            <p className="funnel-who">
              For service businesses spending £5k+ a month on ads.
            </p>
          </div>
          <div className="funnel-hero__media" aria-hidden="true">
            <div className="funnel-hero__phone">
              <video
                className="funnel-hero__video"
                src="/assets/interia-ads.mp4"
                poster="/assets/interia-ads-poster.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="funnel-sec funnel-sec--belief">
        <div className="funnel-wrap">
          <h2 className="funnel-h2">
            Ads work in every business. <em>Including yours.</em>
          </h2>
          <ul className="belief-pills">
            <li>Never saw results?</li>
            <li>Had a bad experience?</li>
            <li>Had to switch them off?</li>
          </ul>
          <p className="funnel-prose">
            Someone in your industry is winning with ads right now.
          </p>
          <p className="funnel-prose">
            The difference is how the ads are made, run and fixed.
          </p>
          <p className="funnel-prose funnel-prose--end">
            That’s the part we take on.
          </p>
        </div>
      </section>

      <section className="funnel-sec" id="pricing">
        <SpendTape />
        <div className="funnel-wrap">
          <div className="funnel-moment">
            <p className="funnel-moment__h">Start at £0.</p>
            <a className="btn funnel-btn funnel-btn--big" href="#campaign">
              Get my free campaign
            </a>
            <p className="funnel-moment__sub">
              Built free within a day. See it before you pay or sign.
            </p>
          </div>
        </div>
      </section>

      <section className="funnel-sec" id="deal">
        <div className="funnel-wrap">
          <h2 className="funnel-h2">Our fee starts when your leads do.</h2>
          <div className="deal-table" role="table" aria-label="How Interia compares">
            <div className="deal-table__head" role="row">
              <span role="columnheader">Compared</span>
              <span role="columnheader">Agency, hire or software</span>
              <span role="columnheader">Interia</span>
            </div>
            {dealRows.map((row) => (
              <div className="deal-table__row" role="row" key={row.label}>
                <span className="deal-table__label" role="rowheader">
                  {row.label}
                </span>
                <span role="cell">{row.usual}</span>
                <span className="deal-table__us" role="cell">
                  {row.interia}
                  {row.note ? <small>{row.note}</small> : null}
                </span>
              </div>
            ))}
          </div>
          <div className="funnel-moment">
            <p className="funnel-moment__h">No fee until your first lead.</p>
            <a className="btn funnel-btn funnel-btn--big" href="#campaign">
              Get my free campaign
            </a>
            <p className="funnel-moment__sub">
              Built free within a day. See it before you pay or sign.
            </p>
          </div>
        </div>
      </section>

      <section className="funnel-sec funnel-sec--alt" id="improve">
        <ImproveCurve />
      </section>

      <section className="funnel-sec" id="proof">
        <div className="funnel-wrap">
          <p className="proof-kicker">Proof</p>
          <h2 className="funnel-h2">
            Don’t just take our word for it.
            <em>Here’s proof.</em>
          </h2>
          <ProofVideo />
          <div className="funnel-moment">
            <p className="funnel-moment__h">Want this for your business?</p>
            <a className="btn funnel-btn funnel-btn--big" href="#campaign">
              Get my free campaign
            </a>
            <p className="funnel-moment__sub">
              Built free within a day. See it before you pay or sign.
            </p>
          </div>
        </div>
      </section>

      <section className="funnel-sec funnel-sec--alt" id="how">
        <div className="funnel-wrap">
          <h2 className="funnel-h2">
            You send your website. We build and run the rest.
          </h2>
          <CampaignForm id="campaign-how" compact />
          <ol className="process-list">
            {processSteps.map((step) => (
              <li key={step.n}>
                <span className="process-list__n">{step.n}</span>
                <p className="process-list__when">{step.when}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="funnel-sec" id="questions">
        <div className="funnel-wrap funnel-wrap--narrow">
          <h2 className="funnel-h2">Questions, answered.</h2>
          <div className="funnel-faq">
            {funnelFaqs.map((item) => (
              <details key={item.q} className="funnel-faq__item">
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="funnel-sec funnel-close">
        <div className="funnel-wrap">
          <h2 className="funnel-h2">
            See your campaign first. <em>Then decide.</em>
          </h2>
          <p className="funnel-lede">
            We build your whole campaign free and send it within a day, so you
            see it before you decide to launch.
          </p>
          <CampaignForm id="campaign-close" />
          <p className="funnel-foot-note">
            No card · No call · No fee until your first lead
          </p>
        </div>
      </section>
    </main>
  );
}
