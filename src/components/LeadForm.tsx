"use client";

import { useState } from "react";
import { CONTACT_FORM_NAME } from "@/lib/contact-form";

export function LeadForm() {
  const [toast, setToast] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const need = String(data.get("need") || "").trim();

    if (!name || !email || !need) {
      setToast(
        "Please add your name, email, and primary focus so we can respond properly.",
      );
      return;
    }

    setSubmitting(true);

    try {
      const body = new URLSearchParams();
      for (const [key, value] of data.entries()) {
        body.append(key, String(value));
      }

      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error("Netlify form submission failed");
      }

      setToast("Thank you, we will reply within one business day.");
      form.reset();
    } catch {
      setToast(
        "Something went wrong. Please try again or email us directly.",
      );
    } finally {
      setSubmitting(false);
      window.setTimeout(() => setToast(null), 6000);
    }
  }

  return (
    <form
      className="lead-form"
      name={CONTACT_FORM_NAME}
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
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
        <span className="field__label">Primary focus</span>
        <select name="need" required defaultValue="">
          <option value="" disabled>
            Select one
          </option>
          <option value="funnel">Landing page / funnel build</option>
          <option value="automation">Automated services</option>
          <option value="web">Site redesign or new build</option>
          <option value="creative">Ongoing performance creative</option>
          <option value="meta">Meta creative & testing structure</option>
          <option value="all">Full-stack partnership</option>
        </select>
      </label>

      <label className="field">
        <span className="field__label">Context</span>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us about your business, how you get leads today, and what you would like to improve."
        />
      </label>

      <button
        type="submit"
        className="btn btn--primary btn--block"
        disabled={submitting}
      >
        {submitting ? "Sending…" : "Submit request"}
      </button>

      <p className="lead-form__fineprint">
        By submitting, you agree to be contacted about Interia services. We never
        resell your details.
      </p>

      {toast ? (
        <p className="lead-form__toast" role="status" aria-live="polite">
          {toast}
        </p>
      ) : null}
    </form>
  );
}
