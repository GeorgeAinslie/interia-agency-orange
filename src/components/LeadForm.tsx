"use client";

import { useState } from "react";
import { CONTACT_FORM_NAME } from "@/lib/contact-form";

export function LeadForm({
  variant = "paper",
}: {
  variant?: "paper" | "ink";
}) {
  const [toast, setToast] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const ink = variant === "ink";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const need = String(data.get("need") || "").trim();

    if (!name || !email || !need) {
      setToast("Add your name, email, and what you need from the call.");
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

      if (!response.ok) {
        throw new Error("Netlify form submission failed");
      }

      setToast("Got it. We will reply within one business day.");
      form.reset();
    } catch {
      setToast("Something went wrong. Try again or email us directly.");
    } finally {
      setSubmitting(false);
      window.setTimeout(() => setToast(null), 6000);
    }
  }

  return (
    <form
      className={`lead-form${ink ? " lead-form--ink" : ""}`}
      name={CONTACT_FORM_NAME}
      method="POST"
      onSubmit={onSubmit}
      noValidate
    >
      <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />

      <p hidden>
        <label>
          Don&apos;t fill this out: <input name="bot-field" />
        </label>
      </p>

      <label className="field">
        <span className="field__label">Name</span>
        <input
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Your name"
          required
        />
      </label>

      <label className="field">
        <span className="field__label">Work email</span>
        <input
          type="email"
          name="email"
          autoComplete="email"
          placeholder="you@company.com"
          required
        />
      </label>

      <label className="field">
        <span className="field__label">What do you need</span>
        <select name="need" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option value="start">Start running ads</option>
          <option value="improve">Fix what I already run</option>
          <option value="website">Website and SEO</option>
          <option value="alongside">Run alongside my current setup</option>
          <option value="call">Just the call</option>
        </select>
      </label>

      <label className="field">
        <span className="field__label">Context</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Business, how you get leads now, rough monthly ad spend."
        />
      </label>

      <button
        type="submit"
        className={`btn ${ink ? "btn--light" : "btn--primary"} btn--block`}
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Book the call"}
      </button>

      <p className="lead-form__fineprint">
        We will only use this to reply. Nothing gets sold on.
      </p>

      {toast ? (
        <p className="lead-form__toast" role="status" aria-live="polite">
          {toast}
        </p>
      ) : null}
    </form>
  );
}
