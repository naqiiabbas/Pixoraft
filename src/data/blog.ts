/**
 * Blog content. Posts are built from typed content blocks so a post can mix
 * prose with the code-window graphic. All copy lives here (a CMS can replace
 * this file later). Placeholder posts: refine or replace before promoting.
 */

export interface BlogAuthor {
  name: string;
  role: string;
}

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; filename: string; snippet: string };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date. */
  date: string;
  author: BlogAuthor;
  category: string;
  readingTime: string;
  /** Signature accent for cover and code windows. */
  accent: string;
  /** Initials for the gradient cover. */
  initials: string;
  body: BlogBlock[];
}

const TEAM: BlogAuthor = { name: "Pixoraft Team", role: "Engineering" };

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "performance-is-a-business-metric",
    title: "Performance is a business metric, not a design detail",
    excerpt:
      "A faster site is not just a nicer site. It is more revenue, better ranking, and fewer users lost before they convert. Here is how we treat speed as a number, not a feeling.",
    date: "2026-05-12",
    author: TEAM,
    category: "Engineering",
    readingTime: "4 min read",
    accent: "#5b8cff",
    initials: "PF",
    body: [
      {
        type: "paragraph",
        text: "Most teams treat performance as polish, something to fix after launch if there is time. We treat it as a core requirement, because slow software costs money in ways you can measure.",
      },
      { type: "heading", text: "Speed is revenue" },
      {
        type: "paragraph",
        text: "Every extra second a page takes to load pushes conversion down. On checkout flows and lead forms, that gap is the difference between a sale and a bounce. When we quote a build, page speed budgets are part of the scope, not an afterthought.",
      },
      { type: "heading", text: "How we keep it fast" },
      {
        type: "list",
        items: [
          "Server render the content that needs to rank",
          "Cache aggressively and invalidate precisely",
          "Ship less JavaScript to the browser",
          "Measure every release against a budget",
        ],
      },
      { type: "heading", text: "Measure, do not guess" },
      {
        type: "paragraph",
        text: "We wire performance monitoring into the pipeline, so a regression shows up before your users do. A build that slows down does not ship.",
      },
      {
        type: "code",
        filename: "budget.ts",
        snippet: `// perf/budget.ts
export const budget = {
  lcp: 2500,   // ms
  cls: 0.1,
  jsKb: 170,
}`,
      },
      {
        type: "paragraph",
        text: "Pretty websites do not win markets. Performing ones do.",
      },
    ],
  },
  {
    slug: "automation-that-removes-work",
    title: "Automation that removes work, not just adds a chatbot",
    excerpt:
      "Most AI projects add a chatbot and call it automation. Real automation removes steps from your operations so your team stops doing work a machine should do.",
    date: "2026-06-03",
    author: TEAM,
    category: "AI and Automation",
    readingTime: "5 min read",
    accent: "#a78bfa",
    initials: "AU",
    body: [
      {
        type: "paragraph",
        text: "There is a difference between adding AI to your product and removing work from your business. The first is a feature. The second is leverage.",
      },
      { type: "heading", text: "Start with the manual steps" },
      {
        type: "paragraph",
        text: "We map the repetitive work your team does every day: copying data between tools, chasing approvals, generating the same reports. Those steps are where automation pays for itself.",
      },
      { type: "heading", text: "Connect, do not replace" },
      {
        type: "list",
        items: [
          "Trigger on events in the tools you already use",
          "Move and transform data automatically",
          "Escalate to a human only when it matters",
          "Log everything so nothing is a black box",
        ],
      },
      {
        type: "code",
        filename: "onboard.ts",
        snippet: `// automate/onboard.ts
on("customer.created", async (c) => {
  await crm.add(c)
  await email.welcome(c)
  await tasks.assign("success", c.id)
})`,
      },
      {
        type: "paragraph",
        text: "The result is not a smarter chatbot. It is a day back in your team's week.",
      },
    ],
  },
  {
    slug: "ship-in-weeks-not-quarters",
    title: "Ship in weeks, not quarters: how we scope a project",
    excerpt:
      "Long timelines usually hide unclear scope. Here is how we turn a vague idea into a fixed roadmap you can plan around, before we write any code.",
    date: "2026-06-24",
    author: TEAM,
    category: "Process",
    readingTime: "4 min read",
    accent: "#22d3ee",
    initials: "SC",
    body: [
      {
        type: "paragraph",
        text: "The reason projects run long is rarely the code. It is unclear scope, changing requirements, and decisions made too late. We front load that work.",
      },
      { type: "heading", text: "Scope before code" },
      {
        type: "paragraph",
        text: "Before development starts, you get a written roadmap: what we build, in what order, and by when. Fixed milestones, not a vague estimate.",
      },
      { type: "heading", text: "Short cycles, visible progress" },
      {
        type: "list",
        items: [
          "Break the build into one to two week cycles",
          "Review working software at the end of each",
          "Adjust priorities with real information",
          "Ship the core first, refine after",
        ],
      },
      { type: "heading", text: "Why weeks, not quarters" },
      {
        type: "paragraph",
        text: "A tight scope and short cycles mean you see value early and can course correct cheaply. You are never waiting a quarter to find out something is wrong.",
      },
      {
        type: "code",
        filename: "roadmap.md",
        snippet: `# Roadmap
- week 1: auth + data model
- week 2: core flow
- week 3: dashboard
- week 4: polish + launch`,
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
