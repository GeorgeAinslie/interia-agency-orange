import { LegalPage, legalMetadata } from "@/components/LegalPage";

export const metadata = legalMetadata(
  "Privacy",
  "What we do with anything you send us.",
  "/privacy",
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy."
      description="What we do with anything you send us."
    >
      <p>
        If you fill in the form, we use that to get back to you about the work.
        Name, contact, the notes you leave. That is it.
      </p>
      <p>
        We do not sell it. We do not pass it around. We keep it long enough to
        do the job, then we do not keep it for the sake of it.
      </p>
      <p>
        Questions: use the book a call form, or the details on this site.
      </p>
    </LegalPage>
  );
}
