import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Pixoraft",
    short_name: "Pixoraft",
    description:
      "Pixoraft designs, builds, and scales web platforms, mobile apps, and AI automation.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0b0d",
    theme_color: "#0a0b0d",
    icons: [
      {
        src: "/pixoraft_favicon.png",
        sizes: "324x324",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
