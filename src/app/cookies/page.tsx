import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata(
  "Cookies",
  "What this site uses to run.",
  "/cookies",
);

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies." description="What this site uses to run.">
      <p>
        This site uses what it needs to load and to send the form. That is the
        lot.
      </p>
      <p>
        We do not run a visitor scoreboard on these pages. If that changes, this
        page will say so.
      </p>
    </LegalPage>
  );
}
