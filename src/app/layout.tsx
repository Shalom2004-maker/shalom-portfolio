import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

// ─── Fonts ───────────────────────────────────────────────────────────────────

/** Body text — readable at all sizes */
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

/** Display headings — editorial weight and character */
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

/** Technical metadata, code blocks, system labels */
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// ─── Metadata ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: {
    default: "Shalom Ndahiriwe — Full-Stack Developer",
    template: "%s — Shalom Ndahiriwe",
  },
  description:
    "B.Tech (IT) student and full-stack developer who builds thoughtful, functional web applications with modern technologies, clean interfaces, and attention to the details that make software feel complete.",
  keywords: ["full-stack developer", "web developer", "React", "Next.js", "TypeScript", "Supabase", "Flutter"],
  authors: [{ name: "Shalom Ndahiriwe" }],
  creator: "Shalom Ndahiriwe",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Shalom Ndahiriwe",
    title: "Shalom Ndahiriwe — Full-Stack Developer",
    description:
      "B.Tech (IT) student and full-stack developer building thoughtful, functional web applications.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shalom Ndahiriwe — Full-Stack Developer",
    description: "B.Tech (IT) student and full-stack developer building thoughtful, functional web applications.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ─── Root layout ──────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-bg)] text-[var(--color-text-primary)]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
