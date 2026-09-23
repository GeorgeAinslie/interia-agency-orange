import Image from "next/image";
import Link from "next/link";
import { interiaMarkAsset, interiaMarkImageLayout } from "@/lib/interia-mark";
import { legalNav, primaryNav } from "@/lib/nav";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <Link className="site-footer__brand" href="/" aria-label="Interia Studios home">
          <Image
            src={interiaMarkAsset.src}
            alt="Interia"
            width={interiaMarkImageLayout.width}
            height={interiaMarkImageLayout.height}
            className="site-footer__mark"
            sizes="200px"
            unoptimized
          />
        </Link>

        <nav className="site-footer__nav" aria-label="Footer">
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="#book">Book a call</Link>
        </nav>

        <nav className="site-footer__legal-nav" aria-label="Legal">
          {legalNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="site-footer__legal">
          © {year} Interia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
