import { ImageResponse } from "next/og";

// Default social-share card for every page (Open Graph + Twitter summary_large_image).
// Kept typographic and dependency-free so it can never fail a build.
export const alt = "Allen Kang, Product Design Lead";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fafaf8",
          padding: "76px 84px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 10,
            color: "#9a9a90",
          }}
        >
          MOOQUE.XYZ
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, color: "#111110", lineHeight: 1 }}>
            Allen Kang
          </div>
          <div style={{ display: "flex", fontSize: 42, color: "#3f3f3a", marginTop: 26 }}>
            Product Design Lead
          </div>
          <div style={{ display: "flex", fontSize: 27, color: "#9a9a90", marginTop: 14 }}>
            Optimist, systems-builder, experience-maker.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 23, color: "#9a9a90" }}>
          <div style={{ display: "flex", width: 44, height: 2, backgroundColor: "#111110", marginRight: 18 }} />
          Eight years designing mission-driven products.
        </div>
      </div>
    ),
    { ...size }
  );
}
