import type { MetadataRoute } from "next"

const BASE_URL = "https://www.boldpiq.com"

const disallow = ["/thank-you", "/demo", "/api/", "/onboarding"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // ── AI Search & LLM Crawlers ─────────────────────────────────────────────
      // OpenAI (ChatGPT web browsing + GPT search)
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      // Anthropic (Claude)
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "anthropic-ai", allow: "/", disallow },
      // Google (Gemini / AI Overviews / Bard)
      { userAgent: "Googlebot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
      // Perplexity AI
      { userAgent: "PerplexityBot", allow: "/", disallow },
      // Meta AI
      { userAgent: "FacebookBot", allow: "/", disallow },
      // Apple (Siri / Apple Intelligence)
      { userAgent: "Applebot", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      // Cohere
      { userAgent: "cohere-ai", allow: "/", disallow },
      // Diffbot (AI knowledge graph)
      { userAgent: "Diffbot", allow: "/", disallow },
      // Common Crawl (used to train many open-source AI models)
      { userAgent: "CCBot", allow: "/", disallow },
      // ByteDance / TikTok AI
      { userAgent: "Bytespider", allow: "/", disallow },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  }
}
