import Image from "next/image";
import { interiaMarkAsset, interiaMarkImageLayout } from "@/lib/interia-mark";

const nav = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#services", label: "Services" },
  { href: "#case-study", label: "Case study" },
] as const;

export function Header() {
  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <a className="brand" href="#top" aria-label="Interia Studios home">
          <Image
            src={interiaMarkAsset.src}
            alt="Interia"
            width={interiaMarkImageLayout.width}
            height={interiaMarkImageLayout.height}
            className="brand__mark"
            sizes="(max-width: 719px) 168px, 300px"
            priority
            unoptimized
          />
        </a>

        <nav className="topbar__spread" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="topbar__link">
              {item.label}
            </a>
          ))}
          <a className="btn btn--topbar btn--topbar-cta" href="#book">
            <span className="topbar-cta__label topbar-cta__label--long">
              Book a strategy call
            </span>
            <span className="topbar-cta__label topbar-cta__label--short">
              Book call
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
