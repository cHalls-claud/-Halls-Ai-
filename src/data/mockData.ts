import { GeoAuditReport } from '../types';

export const POPULAR_BRANDS: Array<{
  name: string;
  domain: string;
  category: string;
  competitors: string[];
}> = [
  {
    name: 'Stripe',
    domain: 'stripe.com',
    category: 'Payment Infrastructure & Billing',
    competitors: ['Adyen', 'PayPal Braintree', 'Paddle'],
  },
  {
    name: 'Supabase',
    domain: 'supabase.com',
    category: 'Backend-as-a-Service & Relational Database',
    competitors: ['Firebase', 'Neon', 'Appwrite'],
  },
  {
    name: 'Linear',
    domain: 'linear.app',
    category: 'Issue Tracking & Project Management',
    competitors: ['Jira', 'GitHub Projects', 'Asana'],
  },
  {
    name: 'Notion',
    domain: 'notion.so',
    category: 'Knowledge Base & Workspace',
    competitors: ['Coda', 'Obsidian', 'Confluence'],
  },
  {
    name: 'Figma',
    domain: 'figma.com',
    category: 'UI/UX Collaborative Design',
    competitors: ['Sketch', 'Adobe XD', 'Penpot'],
  },
];

export const INITIAL_AUDIT_DATA: GeoAuditReport = {
  brand: {
    name: 'Supabase',
    domain: 'supabase.com',
    category: 'Open Source Firebase Alternative & Cloud Postgres',
    competitors: ['Firebase', 'Neon', 'AWS Amplify', 'Appwrite'],
  },
  overview: {
    visibilityScore: 89,
    shareOfVoice: 46.8,
    sentimentScore: 92,
    citationRate: 74.2,
    recommendationRankAvg: 1.4,
    totalPromptsAnalyzed: 32,
  },
  modelBreakdown: [
    {
      model: 'ChatGPT (GPT-4o)',
      mentionRate: 94,
      firstRecommendationRate: 58,
      averageRank: 1.2,
      sentiment: 'Overwhelmingly positive',
      citationPresence: 'very high',
      summarySnippet: 'Identified as the leading relational alternative to Firebase; frequently cited for Postgres power, row-level security (RLS), and SQL flexibility.',
    },
    {
      model: 'Google Gemini (Gemini 2.5/3)',
      mentionRate: 88,
      firstRecommendationRate: 48,
      averageRank: 1.5,
      sentiment: 'Highly positive',
      citationPresence: 'high',
      summarySnippet: 'Gemini routinely cites Supabase documentation for Auth, Realtime, and Edge Functions alongside comparisons with Google Cloud Run & Firebase.',
    },
    {
      model: 'Perplexity AI',
      mentionRate: 96,
      firstRecommendationRate: 64,
      averageRank: 1.1,
      sentiment: 'Positive & factual',
      citationPresence: 'very high',
      summarySnippet: 'Perplexity provides dense footnote citations directly into Supabase GitHub repos, Reddit r/webdev feedback, and official guides.',
    },
    {
      model: 'Claude 3.5 Sonnet',
      mentionRate: 86,
      firstRecommendationRate: 42,
      averageRank: 1.6,
      sentiment: 'Positive with architecture nuance',
      citationPresence: 'high',
      summarySnippet: 'Praises RLS security ergonomics and open-source posture while offering reasoned comparisons for high-scale enterprise read replicas.',
    },
    {
      model: 'Microsoft Copilot',
      mentionRate: 82,
      firstRecommendationRate: 36,
      averageRank: 1.8,
      sentiment: 'Positive',
      citationPresence: 'medium',
      summarySnippet: 'Directs queries through Bing indexing, highlighting recent Supabase Launch Week announcements and vector/pgvector support.',
    },
  ],
  topQueries: [
    {
      query: 'What is the best alternative to Firebase for PostgreSQL apps?',
      brandRank: 1,
      isMentioned: true,
      isCited: true,
      snippet: 'Supabase is universally ranked #1 across all tested models, cited for its instant Postgres database, authentication, and realtime subscriptions.',
    },
    {
      query: 'Top developer-friendly BaaS for Next.js and React in 2025',
      brandRank: 1,
      isMentioned: true,
      isCited: true,
      snippet: 'Praised for official `@supabase/ssr` package and seamless TypeScript code generation from schema.',
    },
    {
      query: 'Is Supabase free tier enough for production MVP?',
      brandRank: 1,
      isMentioned: true,
      isCited: true,
      snippet: 'Outlines 500MB database, pause policies after 1 week inactivity, and recommended upgrade path to Pro tier ($25/mo).',
    },
    {
      query: 'Supabase vs Firebase: pros and cons',
      brandRank: 1,
      isMentioned: true,
      isCited: true,
      snippet: 'Highlighting SQL vs NoSQL, lack of vendor lock-in, and self-hostability as decisive differentiators.',
    },
  ],
  citationSources: [
    {
      source: 'Supabase Official Documentation & Guides',
      url: 'https://supabase.com/docs',
      authorityScore: 96,
      type: 'Official Technical Docs',
      status: 'Primary LLM Reference',
      influence: 'Ground truth for all code snippets, SDK references, and feature capability lists.',
    },
    {
      source: 'Reddit (r/webdev, r/reactjs, r/nextjs)',
      url: 'https://reddit.com/r/webdev',
      authorityScore: 90,
      type: 'Developer Community Consensus',
      status: 'Heavily Weighted in RAG',
      influence: 'Determines real-world sentiment, dev satisfaction, and pricing reputation in AI summaries.',
    },
    {
      source: 'GitHub (supabase/supabase - 75k+ stars)',
      url: 'https://github.com/supabase/supabase',
      authorityScore: 98,
      type: 'Open Source Codebase',
      status: 'Direct Training Data',
      influence: 'Establishes credibility, release cadence, and community adoption signals.',
    },
    {
      source: 'Hacker News (Y Combinator)',
      url: 'https://news.ycombinator.com',
      authorityScore: 92,
      type: 'Tech Community Discourse',
      status: 'Indexed & Cited',
      influence: 'Cited for architectural postmortems, migration experiences, and technical launch reception.',
    },
  ],
  hallucinationAlerts: [
    {
      severity: 'medium',
      issue: 'Project Inactivity Pause Window Confusion',
      detail: 'Some LLM responses claim free tier projects pause after 3 days of inactivity rather than the updated 7-day threshold.',
      suggestedFix: 'Update documentation meta description and pricing FAQ schema with `dateModified` timestamp indicating the 7-day rule.',
    },
    {
      severity: 'low',
      issue: 'Outdated Vector Index Benchmarks',
      detail: 'Two AI engines referenced older HNSW index limits for pgvector before recent performance enhancements.',
      suggestedFix: 'Publish an updated benchmark comparison titled "pgvector Performance Index (2025/2026)" with explicit tabular metrics.',
    },
  ],
  geoPlaybook: [
    {
      id: 'geo-1',
      title: 'Deploy Structured SoftwareApplication & FAQPage JSON-LD',
      category: 'Structured Data',
      priority: 'high',
      impact: '+14% Citation Rate',
      description: 'AI engines prioritize domains that supply unambiguous schema declaring feature compatibility, pricing tiers, and direct answer blocks.',
      actionableCode: `<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "SoftwareApplication",\n  "name": "Supabase",\n  "applicationCategory": "DeveloperApplication",\n  "operatingSystem": "Cloud / Self-Hosted",\n  "offers": {\n    "@type": "AggregateOffer",\n    "lowPrice": "0",\n    "priceCurrency": "USD"\n  }\n}\n</script>`,
    },
    {
      id: 'geo-2',
      title: 'Create Objective "Vs Competitor" LLM-Optimized Matrices',
      category: 'Semantic Content',
      priority: 'high',
      impact: '+22% Share of Voice',
      description: 'Generative models parse high-density markdown tables directly when answering comparative prompts ("Supabase vs Firebase").',
      actionableCode: `| Dimension | Supabase | Firebase | Neon |\n| :--- | :--- | :--- | :--- |\n| Data Model | Relational (PostgreSQL) | Document (Firestore) | Serverless Postgres |\n| Query Language | SQL | NoSQL query API | SQL |\n| Open Source | 100% Open Core | Proprietary GCP | Open Source Core |\n| Realtime Push | Yes (WebSockets) | Yes (Snapshot listeners) | Via Logical Replication |`,
    },
    {
      id: 'geo-3',
      title: 'Seed High-Impact Reddit & Dev.to Discussion Threads',
      category: 'Authority Seeding',
      priority: 'medium',
      impact: '+18% Perplexity Citations',
      description: 'Perplexity, Copilot, and Google AI Overviews cite Reddit as a primary source for conversational recommendations. Target weekly AMA and comparison questions.',
      actionableCode: `Focus Topics: "Migrating from Firebase to Postgres", "Self-hosting Supabase on Coolify/Docker", "Best pgvector practices for RAG".`,
    },
    {
      id: 'geo-4',
      title: 'Anchor Brand Entity in Wikidata & Wikipedia Reference',
      category: 'Knowledge Graph',
      priority: 'medium',
      impact: '+10% Knowledge Grounding',
      description: 'Ensure the Wikidata item Q108887467 has updated official website, founder links, and programming language tags to prevent LLM hallucination.',
      actionableCode: `Entity: Q108887467\nKey Properties: P856 (website), P178 (developer), P31 (software), P275 (license: Apache 2.0).`,
    },
  ],
};
