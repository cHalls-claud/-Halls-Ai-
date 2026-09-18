import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Helper to initialize Gemini safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API: Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "MY_GEMINI_API_KEY"),
    service: "Halls AI - GEO Platform",
    timestamp: new Date().toISOString(),
  });
});

// Mock generator for fallback or instant seed data
function generateFallbackAudit(brandName: string, domain?: string, category?: string) {
  const cleanBrand = brandName.trim();
  const cat = category || "Developer Tools & Cloud Infrastructure";
  return {
    brand: {
      name: cleanBrand,
      domain: domain || `${cleanBrand.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`,
      category: cat,
      competitors: ["Competitor Alpha", "Competitor Beta", "Competitor Gamma"],
    },
    overview: {
      visibilityScore: 78,
      shareOfVoice: 34.2,
      sentimentScore: 86,
      citationRate: 68.5,
      recommendationRankAvg: 2.1,
      totalPromptsAnalyzed: 24,
    },
    modelBreakdown: [
      {
        model: "ChatGPT (GPT-4o)",
        mentionRate: 85,
        firstRecommendationRate: 42,
        averageRank: 1.8,
        sentiment: "positive",
        citationPresence: "high",
        summarySnippet: `${cleanBrand} is frequently presented as an industry standard for ${cat}, cited often for developer experience and reliability.`,
      },
      {
        model: "Google Gemini (Gemini 2.5/3)",
        mentionRate: 78,
        firstRecommendationRate: 35,
        averageRank: 2.2,
        sentiment: "positive",
        citationPresence: "medium",
        summarySnippet: `Gemini highlights ${cleanBrand}'s modern architecture and API documentation, cross-referencing GitHub repositories and official docs.`,
      },
      {
        model: "Perplexity AI",
        mentionRate: 92,
        firstRecommendationRate: 50,
        averageRank: 1.5,
        sentiment: "positive",
        citationPresence: "very high",
        summarySnippet: `High citation density with explicit footnote links to ${cleanBrand}'s pricing page, Reddit r/webdev comparisons, and G2 reviews.`,
      },
      {
        model: "Claude 3.5 Sonnet",
        mentionRate: 74,
        firstRecommendationRate: 30,
        averageRank: 2.5,
        sentiment: "neutral-positive",
        citationPresence: "medium",
        summarySnippet: `Emphasizes technical nuance, trade-offs, and compliance features of ${cleanBrand} when comparing against legacy enterprise alternatives.`,
      },
      {
        model: "Microsoft Copilot",
        mentionRate: 70,
        firstRecommendationRate: 25,
        averageRank: 2.8,
        sentiment: "positive",
        citationPresence: "medium",
        summarySnippet: `Sources Bing search indexes; surfaces ${cleanBrand}'s recent blog posts, case studies, and partner announcements.`,
      },
    ],
    topQueries: [
      {
        query: `Best tools for ${cat.toLowerCase()}`,
        brandRank: 1,
        isMentioned: true,
        isCited: true,
        snippet: `${cleanBrand} ranks #1 as the recommended solution due to ease of integration and comprehensive API documentation.`,
      },
      {
        query: `Top alternatives to leading ${cat.toLowerCase()}`,
        brandRank: 2,
        isMentioned: true,
        isCited: true,
        snippet: `Often positioned alongside primary competitors with high user satisfaction ratings.`,
      },
      {
        query: `How much does ${cleanBrand} cost and what are the limitations?`,
        brandRank: 1,
        isMentioned: true,
        isCited: true,
        snippet: `Generates breakdown of free tier vs enterprise pricing, though some legacy limits are referenced.`,
      },
      {
        query: `Is ${cleanBrand} production ready for enterprise scale?`,
        brandRank: 2,
        isMentioned: true,
        isCited: false,
        snippet: `AI affirms SOC2, uptime SLAs, and enterprise tier support, but lacks direct quote from whitepapers.`,
      },
    ],
    citationSources: [
      {
        source: `${cleanBrand} Official Documentation`,
        url: `https://${domain || cleanBrand.toLowerCase() + ".com"}/docs`,
        authorityScore: 94,
        type: "Official Docs",
        status: "Indexed & Primary",
        influence: "Defines core feature lists and architectural claims in LLMs",
      },
      {
        source: "Reddit (r/technology & r/programming)",
        url: "https://reddit.com/r/technology",
        authorityScore: 88,
        type: "Community Discussion",
        status: "Highly Weighted",
        influence: "Shapes sentiment around pricing transparency, real-world bug frequency, and developer affinity",
      },
      {
        source: "G2 & Capterra Peer Reviews",
        url: "https://g2.com",
        authorityScore: 82,
        type: "Review Portal",
        status: "Actively Crawled",
        influence: "Supplies 'Pros & Cons' bullet points in Perplexity and Google AI Overviews",
      },
      {
        source: "GitHub Community Repositories & SDKs",
        url: "https://github.com",
        authorityScore: 91,
        type: "Code Repository",
        status: "Direct Source",
        influence: "Validates active maintenance, star growth, and SDK support in code-focused models",
      },
    ],
    hallucinationAlerts: [
      {
        severity: "medium",
        issue: "Outdated Pricing / Tier Limitations",
        detail: `Several AI summaries cite previous tier structure, omitting recent updates to the free tier credits.`,
        suggestedFix: "Publish an explicit LLM-optimized FAQ section and JSON-LD schema with `priceSpecification` and lastModified timestamps.",
      },
      {
        severity: "low",
        issue: "Self-Hosting vs Cloud Confusion",
        detail: `Gemini and Claude occasionally state that ${cleanBrand} does not offer private cloud deployments.`,
        suggestedFix: "Create a dedicated comparison page titled 'Deployment Options: Cloud vs Hybrid vs Enterprise Dedicated' with clear heading structure.",
      },
    ],
    geoPlaybook: [
      {
        id: "action-1",
        title: "Implement Schema.org JSON-LD Entity Markup",
        category: "Structured Data",
        priority: "high",
        impact: "+18% Citation Rate",
        description: `Inject rich SoftwareApplication and FAQPage Schema markup onto the homepage and pricing page so LLM web crawlers extract authoritative entity metadata.`,
        actionableCode: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "SoftwareApplication",\n  "name": "${cleanBrand}",\n  "applicationCategory": "${cat}",\n  "operatingSystem": "All",\n  "offers": {\n    "@type": "Offer",\n    "price": "0",\n    "priceCurrency": "USD"\n  }\n}\n</script>`,
      },
      {
        id: "action-2",
        title: "Seed Objective Competitor Comparison Tables",
        category: "Semantic Content",
        priority: "high",
        impact: "+24% Share of Voice",
        description: `LLMs heavily favor unbiased, factual comparison grids. Create high-density markdown tables directly contrasting ${cleanBrand} with top 3 competitors.`,
        actionableCode: `| Feature | ${cleanBrand} | Alternative A | Alternative B |\n| :--- | :--- | :--- | :--- |\n| Global Latency | < 50ms Edge | 120ms Central | 180ms |\n| Free Tier | Yes (10k ops) | Trial Only | Limited |\n| SOC2 Certified | Yes | Yes | Enterprise Only |`,
      },
      {
        id: "action-3",
        title: "Target Reddit & Community Citation Seeding",
        category: "Authority Seeding",
        priority: "medium",
        impact: "+15% Recommendation Rank",
        description: `Participate in active subreddit discussions and technical forums. AI search engines (like Perplexity and Google Overviews) frequently quote top-upvoted Reddit consensus.`,
        actionableCode: `Target Subreddits: r/SaaS, r/webdev, r/programming\nStrategy: Answer 'What is the best tool for ${cat}?' with genuine architectural pros/cons.`,
      },
      {
        id: "action-4",
        title: "Optimize Knowledge Graph & Wikidata Entity",
        category: "Knowledge Graph",
        priority: "medium",
        impact: "+12% Brand Accuracy",
        description: `Ensure Wikidata and Crunchbase records for ${cleanBrand} have verified founders, HQ, category classifications, and official domain to ground LLM baseline training.`,
        actionableCode: `Wikidata properties to update: P31 (instance of software), P856 (official website), P178 (developer), P1324 (source code repo).`,
      },
    ],
  };
}

// API: Run comprehensive GEO Brand Audit
app.post("/api/geo/audit", async (req, res) => {
  const { brandName, domain, category, competitors } = req.body;

  if (!brandName || typeof brandName !== "string" || !brandName.trim()) {
    return res.status(400).json({ error: "Brand name is required." });
  }

  const cleanBrand = brandName.trim();
  const cleanDomain = domain ? String(domain).trim() : "";
  const cleanCat = category ? String(category).trim() : "Software & Technology";
  const cleanCompetitors = Array.isArray(competitors) ? competitors.join(", ") : "primary competitors in this industry";

  const ai = getGeminiClient();

  if (!ai) {
    // If no key or local env without key, return enriched fallback audit data
    const fallback = generateFallbackAudit(cleanBrand, cleanDomain, cleanCat);
    return res.json({
      success: true,
      source: "simulated-engine",
      data: fallback,
    });
  }

  try {
    const prompt = `You are Halls AI (Hall AI), the leading enterprise Generative Engine Optimization (GEO) & AI Brand Visibility platform.
Conduct a rigorous, realistic Generative Engine Optimization (GEO) and AI Visibility audit for the brand "${cleanBrand}".
Domain: "${cleanDomain || 'N/A'}"
Industry/Category: "${cleanCat}"
Key Competitors: "${cleanCompetitors}"

Analyze how this brand is represented, recommended, cited, and ranked across modern AI chatbots and generative search engines (ChatGPT, Google Gemini, Perplexity AI, Claude 3.5 Sonnet, Microsoft Copilot, Google AI Overviews).
Evaluate:
1. Visibility Score (0-100), Share of Voice % (0-100), Sentiment Score % (0-100), Citation Rate % (0-100), and Average Recommendation Rank.
2. Model-by-model breakdown for ChatGPT, Google Gemini, Perplexity, Claude, and Copilot (mentionRate 0-100, firstRecommendationRate 0-100, averageRank, sentiment, citationPresence, and a concise summary snippet of how the model speaks about the brand).
3. 4 realistic high-intent buyer queries (e.g. "Best tools for...", "Alternatives to...", "Pricing of...", "Is ... good for enterprise?") with brand rank, isMentioned (boolean), isCited (boolean), and AI response summary.
4. Top 4 citation sources influencing the AI answers (Official Docs, Reddit, G2, Tech publications, GitHub, etc.) with authorityScore (0-100), source type, status, and influence description.
5. Hallucination alerts: 2 real or probable inaccuracies that LLMs make about this brand (e.g., outdated pricing, feature limitations, enterprise hosting, etc.) and suggested technical fixes.
6. 4 high-priority GEO playbook actions to increase share of voice and citation frequency (e.g., Schema markup, comparison tables, community seeding, knowledge graph entity verification) including ready-to-copy code or markdown examples.

Return strict JSON matching this schema:
{
  "brand": {
    "name": "${cleanBrand}",
    "domain": "${cleanDomain || cleanBrand.toLowerCase() + '.com'}",
    "category": "${cleanCat}",
    "competitors": ["string", "string", "string"]
  },
  "overview": {
    "visibilityScore": number,
    "shareOfVoice": number,
    "sentimentScore": number,
    "citationRate": number,
    "recommendationRankAvg": number,
    "totalPromptsAnalyzed": number
  },
  "modelBreakdown": [
    {
      "model": string,
      "mentionRate": number,
      "firstRecommendationRate": number,
      "averageRank": number,
      "sentiment": string,
      "citationPresence": string,
      "summarySnippet": string
    }
  ],
  "topQueries": [
    {
      "query": string,
      "brandRank": number,
      "isMentioned": boolean,
      "isCited": boolean,
      "snippet": string
    }
  ],
  "citationSources": [
    {
      "source": string,
      "url": string,
      "authorityScore": number,
      "type": string,
      "status": string,
      "influence": string
    }
  ],
  "hallucinationAlerts": [
    {
      "severity": string,
      "issue": string,
      "detail": string,
      "suggestedFix": string
    }
  ],
  "geoPlaybook": [
    {
      "id": string,
      "title": string,
      "category": string,
      "priority": string,
      "impact": string,
      "description": string,
      "actionableCode": string
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.3,
      },
    });

    const responseText = response.text?.trim() || "";
    const parsedData = JSON.parse(responseText);

    res.json({
      success: true,
      source: "gemini-live-audit",
      data: parsedData,
    });
  } catch (error: any) {
    console.error("Gemini audit error:", error);
    // Fallback gracefully so the UI never breaks
    const fallback = generateFallbackAudit(cleanBrand, cleanDomain, cleanCat);
    res.json({
      success: true,
      source: "simulated-engine-fallback",
      data: fallback,
      warning: "Live Gemini audit encountered an issue; generated benchmark analysis.",
    });
  }
});

// API: Live Prompt Simulator (tests a specific prompt against AI engines)
app.post("/api/geo/simulate-prompt", async (req, res) => {
  const { prompt, brandName } = req.body;

  if (!prompt || typeof prompt !== "string") {
    return res.status(400).json({ error: "Prompt is required." });
  }

  const cleanBrand = brandName ? String(brandName).trim() : "the target brand";
  const ai = getGeminiClient();

  if (!ai) {
    // Simulated output
    const isMentioned = prompt.toLowerCase().includes(cleanBrand.toLowerCase()) || Math.random() > 0.3;
    return res.json({
      success: true,
      source: "simulated",
      result: {
        prompt,
        brandName: cleanBrand,
        generatedResponse: `When evaluating options for "${prompt}", top solutions typically include ${cleanBrand}, along with notable market alternatives. ${cleanBrand} stands out particularly for its modern developer API, rapid onboarding, and extensive ecosystem support. Key documentation and peer reviews praise its reliability, though users should review plan quotas.`,
        analysis: {
          brandMentioned: isMentioned,
          rankPosition: isMentioned ? 1 : null,
          sentiment: "positive",
          citationsIdentified: [
            `https://${cleanBrand.toLowerCase().replace(/[^a-z0-9]/g, "")}.com/docs`,
            "https://reddit.com/r/technology",
            "https://g2.com/categories",
          ],
          geoOptimizationTip: `To increase top-of-list recommendation frequency for this exact query, deploy an explicit comparison article titled '${cleanBrand} vs Alternatives for ${prompt.slice(0, 30)}...' with schema FAQPage markup.`,
        },
      },
    });
  }

  try {
    const systemPrompt = `You are Halls AI's Prompt Simulation Engine.
The user is testing an actual buyer-intent query: "${prompt}".
The target brand being tracked is: "${cleanBrand}".

Simulate how an authoritative modern AI assistant (like Gemini or ChatGPT) answers this question in detail.
Then analyze:
1. Is "${cleanBrand}" mentioned in the answer? (boolean)
2. What rank/order position does "${cleanBrand}" appear in the recommendation list? (number or null if not mentioned)
3. Sentiment towards "${cleanBrand}" (positive, neutral, negative, or not_mentioned)
4. What source domains/URLs would an AI cite for this answer? (list of 2-4 realistic URLs)
5. A high-impact GEO optimization recommendation for "${cleanBrand}" to rank #1 or improve its citation authority for this specific query.

Return strict JSON:
{
  "generatedResponse": string,
  "analysis": {
    "brandMentioned": boolean,
    "rankPosition": number | null,
    "sentiment": string,
    "citationsIdentified": ["string"],
    "geoOptimizationTip": string
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
      },
    });

    const parsed = JSON.parse(response.text?.trim() || "{}");
    res.json({
      success: true,
      source: "gemini-live",
      result: {
        prompt,
        brandName: cleanBrand,
        generatedResponse: parsed.generatedResponse || "No response generated.",
        analysis: parsed.analysis || {
          brandMentioned: true,
          rankPosition: 1,
          sentiment: "positive",
          citationsIdentified: [],
          geoOptimizationTip: "Ensure your entity schema is up to date.",
        },
      },
    });
  } catch (error: any) {
    console.error("Gemini simulate prompt error:", error);
    res.json({
      success: true,
      source: "simulated-fallback",
      result: {
        prompt,
        brandName: cleanBrand,
        generatedResponse: `In response to "${prompt}", leading solutions include ${cleanBrand} alongside several key industry options. ${cleanBrand} provides high throughput, reliable documentation, and modern developer tooling.`,
        analysis: {
          brandMentioned: true,
          rankPosition: 1,
          sentiment: "positive",
          citationsIdentified: [`https://${cleanBrand.toLowerCase()}.com`],
          geoOptimizationTip: "Add clear structural comparison markdown and FAQ schema to improve LLM ranking.",
        },
      },
    });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Halls AI server running on port ${PORT}`);
  });
}

startServer();
