"use client";

import { useState } from "react";
import { CAMPAIGN_FORM_NAME, spendBands } from "@/lib/funnel";

export function CampaignForm({
  id = "campaign",
  compact = false,
}: {
  id?: string;
  compact?: boolean;
}) {
  const [step, setStep] = useState<"url" | "details">("url");
  const [website, setWebsite] = useState("");
  const [spend, setSpend] = useState("");
  const [toast, setToast] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function onWebsite(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("website") || "").trim();
    if (!value) {
      setToast("Add your website.");
      return;
    }
    setWebsite(value);
    setStep("details");
    setToast(null);
  }

  async function onDetails(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const monthly = String(data.get("spend") || "").trim();
    const qualify = data.get("qualify");

    if (!email || !monthly) {
      setToast("Add your work email and monthly ad spend.");
      return;
    }
    if (monthly === "under-5k" && !qualify) {
      setToast("Tick that you can spend at least £1,500 in the first 30 days.");
      return;
    }

    setSubmitting(true);
    try {
      const body = new URLSearchParams();
      for (const [key, value] of data.entries()) {
        body.append(key, String(value));
      }
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!response.ok) throw new Error("submit failed");
      setToast("Got it. Your campaign lands in your inbox within a day.");
      form.reset();
      setStep("url");
      setWebsite("");
      setSpend("");
    } catch {
      setToast("Something went wrong. Try again or email us directly.");
    } finally {
      setSubmitting(false);
      window.setTimeout(() => setToast(null), 7000);
    }
  }

  if (step === "url") {
    return (
      <form
        id={id}
        className={`funnel-form${compact ? " is-compact" : ""}`}
        onSubmit={onWebsite}
      >
        <div className="funnel-form__url">
          <label className="funnel-form__field">
            <span className="sr-only">Your website</span>
            <input
              type="text"
              name="website"
              placeholder="yourbusiness.com"
              autoComplete="url"
              defaultValue={website}
              required
            />
          </label>
          <div className="funnel-form__cta">
            <span className="funnel-form__badge" aria-hidden>
              <i />
              10 of 10 left this week
            </span>
            <button type="submit" className="btn funnel-btn">
              Get my free campaign
            </button>
          </div>
        </div>
        <p className="funnel-form__note">
          In your inbox within a day. No card, no call.
        </p>
        {toast ? (
          <p className="funnel-form__toast" role="status">
            {toast}
          </p>
        ) : null}
      </form>
    );
  }

  return (
    <form
      id={`${id}-details`}
      className={`funnel-form funnel-form--details${compact ? " is-compact" : ""}`}
      name={CAMPAIGN_FORM_NAME}
      method="POST"
      onSubmit={onDetails}
      noValidate
    >
      <input type="hidden" name="form-name" value={CAMPAIGN_FORM_NAME} />
      <input type="hidden" name="website" value={website} />
      <p hidden>
        <label>
          Fax <input name="bot-field" />
        </label>
      </p>

      <p className="funnel-form__ask">
        Great. Where do we send the campaign for {website}?
      </p>

      <label className="funnel-field">
        <span>Work email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
      </label>

      <label className="funnel-field">
        <span>Monthly ad spend</span>
        <select
          name="spend"
          required
          value={spend}
          onChange={(event) => setSpend(event.target.value)}
        >
          <option value="" disabled>
            Choose one
          </option>
          {spendBands.map((band) => (
            <option key={band.value} value={band.value}>
              {band.label}
            </option>
          ))}
        </select>
      </label>

      {spend === "under-5k" ? (
        <label className="funnel-check">
          <input type="checkbox" name="qualify" value="yes" />
          <span>
            I’m ready to spend at least £1,500 on ads in my first 30 days
          </span>
        </label>
      ) : null}

      <button type="submit" className="btn funnel-btn" disabled={submitting}>
        {submitting ? "Sending…" : "Send me my free campaign"}
      </button>
      <p className="funnel-form__note">
        In your inbox within a day. No card, no call.
      </p>
      {toast ? (
        <p className="funnel-form__toast" role="status">
          {toast}
        </p>
      ) : null}
    </form>
  );
}
