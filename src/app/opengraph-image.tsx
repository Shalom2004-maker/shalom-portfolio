import { ImageResponse } from "next/og";

/**
 * Open Graph image — spec §22.
 * Generates /opengraph-image at build time via Next.js file-based routing.
 *
 * ImageResponse rules: every element with >1 child must have explicit
 * display: "flex" | "none" | "contents".
 */
export const runtime = "nodejs";
export const alt = "Shalom Ndahiriwe — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "72px 80px",
          backgroundColor: "#07090D",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* System label — top left */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 72,
            left: 80,
            fontSize: 12,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#4DA3FF",
          }}
        >
          FULL-STACK DEVELOPER · WEB APPLICATIONS
        </div>

        {/* Wordmark — top right */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            top: 72,
            right: 80,
            fontSize: 14,
            letterSpacing: "0.1em",
            color: "#8B949E",
          }}
        >
          SN
        </div>

        {/* Main name + tagline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 0.95,
              color: "#F4F7FA",
              letterSpacing: "-0.03em",
            }}
          >
            <span>SHALOM</span>
            <span>NDAHIRIWE</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#8B949E",
              letterSpacing: "0.05em",
            }}
          >
            I BUILD WEB EXPERIENCES.
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            display: "flex",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "linear-gradient(90deg, #4DA3FF 0%, transparent 60%)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
