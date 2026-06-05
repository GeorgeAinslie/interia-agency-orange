import Image from "next/image";
import { interiaMarkAsset, interiaMarkImageLayout } from "@/lib/interia-mark";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <Image
            src={interiaMarkAsset.src}
            alt="Interia"
            width={interiaMarkImageLayout.width}
            height={interiaMarkImageLayout.height}
            className="site-footer__mark"
            sizes="(max-width: 720px) 140px, 180px"
            unoptimized
          />
          <div>
            <p className="site-footer__name">Interia Studios</p>
            <p className="site-footer__tag">
              Lead generation, funnels, automated services, and performance
              creative.
            </p>
          </div>
        </div>
        <nav className="site-footer__nav" aria-label="Footer">
          <a href="#how-it-works">How it works</a>
          <a href="#services">Services</a>
          <a href="#case-study">Case study</a>
          <a href="#book">Contact</a>
        </nav>
        <p className="site-footer__legal">© {year} Interia. All rights reserved.</p>
      </div>
    </footer>
  );
}
