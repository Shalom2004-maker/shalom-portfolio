import type { MetadataRoute } from "next";

/**
 * robots.txt — spec §22.
 * Generates /robots.txt at build time via Next.js file-based routing.
 * Update `host` and `sitemap` once the production domain is confirmed.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://[YOUR_DOMAIN]";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
