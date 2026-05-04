// Static data loader for newsroom — reads from /public/newsroom/*.json.
// Generated locally by `cd newsroom-uzinex && npm run export:static`,
// then committed to repo and deployed via Vercel.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public", "newsroom");

export type Story = {
  id: number;
  slug: string;
  title: string;
  subtitle: string | null;
  bigNumber: string | null;
  bigNumberLabel: string | null;
  tldr: string[];
  body: string;
  methodology: string | null;
  quoteSorin: string | null;
  quoteCosmin: string | null;
  insightIds: number[];
  chartData: Array<{ insightId: number; type: string; title: string; data: unknown }>;
  status: string;
  publishedAt: string | null;
  createdAt: string;
};

export type Insight = {
  id: number;
  type: string;
  title: string;
  summary: string;
  score: number;
  sources: string[];
  data: any;
  createdAt: string;
  usedInStoryId: number | null;
};

export type Source = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  impl: string | null;
  pointsCollected: number;
};

function safeRead<T>(file: string, fallback: T): T {
  try {
    const raw = fs.readFileSync(path.join(ROOT, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function loadStories(): Story[] {
  return safeRead<Story[]>("stories.json", []);
}

export function loadStory(slug: string): Story | null {
  return loadStories().find((s) => s.slug === slug) || null;
}

export function loadInsights(): Insight[] {
  return safeRead<Insight[]>("insights.json", []);
}

export function loadInsight(id: number): Insight | null {
  return loadInsights().find((i) => i.id === id) || null;
}

export function loadSources(): Source[] {
  return safeRead<Source[]>("sources.json", []);
}

export function loadManifest(): { generatedAt: string; counts: { stories: number; insights: number; sources: number } } {
  return safeRead("manifest.json", { generatedAt: new Date().toISOString(), counts: { stories: 0, insights: 0, sources: 0 } });
}
