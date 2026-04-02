import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Boldpiq — Web Design & Development",
    short_name: "Boldpiq",
    description: "Strategically crafted websites and graphics designed to support growth.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F1C",
    theme_color: "#0B0F1C",
    icons: [
      {
        src: "https://assets.cdn.filesafe.space/2YVSGppZ3t1nNSl74HPu/media/6970121015885e63271908fa.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  }
}
