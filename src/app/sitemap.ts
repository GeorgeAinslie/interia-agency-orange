import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const routes = [
  "",
  "/how-we-run-ads",
  "/websites-and-seo",
  "/testimonials",
  "/about",
  "/book",
  "/privacy",
  "/terms",
  "/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path, i) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: i === 0 ? 1 : 0.7,
  }));
}
