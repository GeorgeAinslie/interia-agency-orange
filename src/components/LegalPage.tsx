import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CtaBand } from "@/components/CtaBand";
import { PageHero } from "@/components/PageHero";

export function LegalPage({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <main id="main">
      <PageHero plain eyebrow="Legal" title={title} lead={description} />
      <section className="section section--paper">
        <div className="container prose">{children}</div>
      </section>
      <CtaBand />
    </main>
  );
}

export function legalMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
  };
}
