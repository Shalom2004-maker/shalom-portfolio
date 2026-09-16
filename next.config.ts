import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ─── Images ─────────────────────────────────────────────────────────────────
  images: {
    // Add external hostnames as project images are confirmed, e.g.:
    // remotePatterns: [{ protocol: "https", hostname: "example.com" }],
    formats: ["image/avif", "image/webp"],
  },

  // ─── Headers ────────────────────────────────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent MIME type sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Prevent clickjacking
          { key: "X-Frame-Options", value: "DENY" },
          // Basic XSS protection header
          { key: "X-XSS-Protection", value: "1; mode=block" },
          // Control referrer information
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
