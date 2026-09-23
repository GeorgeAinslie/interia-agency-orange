import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Twenty minutes on your business. Where leads come from, where they drop off, the first thing we would change.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <main id="main">
      <CtaBand
        title="See what we would do with your budget."
        text="Twenty minutes. Nothing up front. Billing starts once the leads are landing."
      />
    </main>
  );
}
