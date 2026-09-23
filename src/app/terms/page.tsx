import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata(
  "Terms",
  "How to read this site.",
  "/terms",
);

export default function TermsPage() {
  return (
    <LegalPage title="Terms." description="How to read this site.">
      <p>
        This site explains the work. It is not a contract. Booking a call is a
        conversation. Nothing is agreed until both sides say so.
      </p>
      <p>
        Ads sit in your accounts. Spend goes to Meta and Google. The pages we
        build for you are yours. If we stop, you keep the work.
      </p>
      <p>
        If something on this site is wrong, tell us. We will put it right.
      </p>
    </LegalPage>
  );
}
