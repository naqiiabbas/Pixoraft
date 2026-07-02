import { ImageResponse } from "next/og";

export const alt = "Pixoraft, digital engineering studio";
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
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(1200px 630px at 80% 0%, #04334f 0%, #0a0b0d 55%)",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#5b8cff",
            letterSpacing: 2,
            fontFamily: "monospace",
          }}
        >
          [ digital engineering studio ]
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          Websites and software that perform, not just impress.
        </div>
        <div
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "center",
            fontSize: 40,
            fontWeight: 700,
          }}
        >
          <span style={{ color: "#f5f7fa" }}>pixo</span>
          <span style={{ color: "#5b8cff" }}>raft</span>
          <span style={{ marginLeft: 24, fontSize: 24, color: "#9aa3b0" }}>
            PK / UK / US
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
