import { CONTACT_FORM_NAME } from "@/lib/contact-form";

/**
 * Hidden static form so Netlify can detect fields at build time.
 * The interactive form lives in LeadForm.tsx.
 */
export function ContactFormNetlify() {
  return (
    <form
      name={CONTACT_FORM_NAME}
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      hidden
    >
      <input type="hidden" name="form-name" value={CONTACT_FORM_NAME} />
      <input type="text" name="name" />
      <input type="email" name="email" />
      <select name="need">
        <option value="funnel" />
        <option value="automation" />
        <option value="web" />
        <option value="creative" />
        <option value="meta" />
        <option value="all" />
      </select>
      <textarea name="message" />
      <input type="text" name="bot-field" />
    </form>
  );
}
