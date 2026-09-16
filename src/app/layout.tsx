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
    default: "Shalom Nadhanlirive — Frontend Developer",
    template: "%s — Shalom Nadhanlirive",
  },
  description:
    "Frontend developer building polished digital experiences. Specialising in web applications with an emphasis on engineering quality and interaction design.",
  keywords: ["frontend developer", "web developer", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Shalom Nadhanlirive" }],
  creator: "Shalom Nadhanlirive",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Shalom Nadhanlirive",
    title: "Shalom Nadhanlirive — Frontend Developer",
    description:
      "Frontend developer building polished digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shalom Nadhanlirive — Frontend Developer",
    description: "Frontend developer building polished digital experiences.",
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
