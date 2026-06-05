"use client";

import { useState } from "react";

export function LeadForm() {
  const [toast, setToast] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const need = String(data.get("need") || "").trim();

    if (!name || !email || !need) {
      setToast("Please add your name, email, and primary focus so we can respond properly.");
      return;
    }

    setToast(
      "Thank you, and we will reply within one business day. (Wire this form to your CRM or add a Server Action when ready.)",
    );
    form.reset();
    window.setTimeout(() => setToast(null), 6000);
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} noValidate>
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

      <button type="submit" className="btn btn--primary btn--block">
        Submit request
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
