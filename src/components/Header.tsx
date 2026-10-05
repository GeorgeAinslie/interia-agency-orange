"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { interiaMarkAsset, interiaMarkImageLayout } from "@/lib/interia-mark";
import { headerNav } from "@/lib/nav";

export function Header() {
  const pathname = usePathname();
  const home = pathname === "/";
  const ctaHref = home ? "#campaign" : "#book";
  const ctaLong = home ? "Get my free campaign" : "Book a call";
  const ctaShort = home ? "Get it free" : "Book";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="topbar">
      <div className="container topbar__inner">
        <Link className="brand" href="/" aria-label="Interia Studios home">
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
        </Link>

        <nav className="topbar__spread" aria-label="Primary">
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`topbar__link${pathname === item.href ? " is-active" : ""}`}
            >
              {item.label}
            </Link>
          ))}
          <Link className="btn btn--topbar btn--topbar-cta" href={ctaHref}>
            <span className="topbar-cta__label topbar-cta__label--long">
              {ctaLong}
            </span>
            <span className="topbar-cta__label topbar-cta__label--short">
              {ctaShort}
            </span>
          </Link>
        </nav>

        <button
          type="button"
          className="topbar__menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`topbar__drawer${open ? " is-open" : ""}`}
      >
        <nav className="container topbar__drawer-nav" aria-label="Mobile">
          {headerNav.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link
            className="btn btn--primary"
            href={ctaHref}
            onClick={() => setOpen(false)}
          >
            {ctaLong}
          </Link>
        </nav>
      </div>
    </header>
  );
}
