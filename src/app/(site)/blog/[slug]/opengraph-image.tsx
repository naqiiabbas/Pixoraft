import { ImageResponse } from "next/og";
import { getPublishedPostBySlug } from "@/lib/posts";

export const alt = "Pixoraft blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  const title = post?.title ?? "Pixoraft Blog";
  const category = (post?.category ?? "the blog").toLowerCase();
  const fontSize = title.length > 70 ? 46 : title.length > 45 ? 54 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(1200px 630px at 80% 0%, #04334f 0%, #0a0b0d 55%)",
          color: "#f5f7fa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#5b8cff",
            fontFamily: "monospace",
            letterSpacing: 1,
          }}
        >
          [ {category} ]
        </div>

        <div
          style={{
            display: "flex",
            fontSize,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>
            <span style={{ color: "#f5f7fa" }}>pixo</span>
            <span style={{ color: "#5b8cff" }}>raft</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#9aa3b0",
              fontFamily: "monospace",
            }}
          >
            pixoraft.com
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
