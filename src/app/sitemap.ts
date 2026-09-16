import type { MetadataRoute } from "next";

/**
 * Sitemap — spec §22.
 * Generates /sitemap.xml at build time via Next.js file-based routing.
 * Update `baseUrl` once the production domain is confirmed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://[YOUR_DOMAIN]";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
