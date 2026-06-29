import { ImageResponse } from "next/og";

// Browser-tab favicon: a quiet "m" monogram for mooque.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#111110",
          color: "#fafaf8",
          fontSize: 44,
          fontWeight: 700,
        }}
      >
        m
      </div>
    ),
    { ...size }
  );
}
