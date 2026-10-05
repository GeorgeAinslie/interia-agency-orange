export const primaryNav = [
  { href: "/how-we-run-ads", label: "How we run ads" },
  { href: "/websites-and-seo", label: "Web & SEO" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
] as const;

/** Header only — pages stay live, just not linked from the top bar. */
export const headerNav = primaryNav.filter(
  (item) =>
    item.href !== "/websites-and-seo" && item.href !== "/testimonials",
);

export const legalNav = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
] as const;
