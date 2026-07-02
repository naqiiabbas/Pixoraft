/**
 * Services content: four pillars, each grouping three capabilities.
 * All copy lives here (not in JSX) so content edits never touch components.
 * Structured so a CMS can replace this file later without component changes.
 *
 * Routing:
 *   /services                    index
 *   /services/[pillar]           pillar page   (slug)
 *   /services/[pillar]/[sub]     sub-service    (capability.slug)
 */

export interface CodeSample {
  filename: string;
  /** Plain source string; highlighted at render by lib/highlight. */
  snippet: string;
}

export interface Capability {
  /** URL slug for /services/[pillar]/[slug]. */
  slug: string;
  /** What we build (title). */
  name: string;
  /** One line value statement. */
  tagline: string;
  /** Stack tags rendered in the mono readout style. */
  tags: string[];
  /** Longer copy for the sub-service page (Phase B). */
  description?: string;
  whatWeBuild?: string[];
  outcomes?: string[];
  code?: CodeSample;
}

export interface ServicePillar {
  /** URL slug for /services/[slug]. */
  slug: string;
  /** Two digit index used in the mono eyebrow, e.g. "01". */
  index: string;
  /** Short key used in the mono eyebrow, e.g. "engineering". */
  key: string;
  /** Pillar name (H3 / H1). */
  title: string;
  /** One sentence business outcome statement. */
  value: string;
  /** Signature accent color for this pillar's code window and highlights. */
  accent: string;
  /** Longer intro for the pillar page. */
  overview: string;
  /** Outcome bullets for the pillar page. */
  outcomes: string[];
  /** Graphical code sample for the pillar page. */
  code: CodeSample;
  capabilities: Capability[];
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    slug: "engineering",
    index: "01",
    key: "engineering",
    title: "Engineering",
    value:
      "Production grade platforms built to handle real traffic and real revenue.",
    accent: "#5b8cff",
    overview:
      "We build the core software your business runs on: web platforms, mobile apps, and on-chain systems. Every build is engineered for real traffic, real transactions, and a codebase your team can keep shipping on.",
    outcomes: [
      "Ships in weeks, not quarters",
      "Handles real traffic without falling over",
      "A codebase your team can extend",
      "Measured by performance, not screenshots",
    ],
    code: {
      filename: "platform.ts",
      snippet: `// pixoraft/platform.ts
export async function handle(req: Request) {
  const user = await authenticate(req)
  const orders = await db.orders.forUser(user.id)
  return json({ orders, latency: "12ms" })
}`,
    },
    capabilities: [
      {
        slug: "web-development",
        name: "Web Development",
        tagline: "Fast, scalable web platforms and dashboards.",
        tags: ["next.js", "react", "node", "php"],
        description:
          "We build web platforms that stay fast as they grow: customer portals, dashboards, marketplaces, and the APIs behind them. Server rendered where it helps SEO, cached where it helps speed, and structured so your team can keep adding features.",
        whatWeBuild: [
          "Customer facing web apps and portals",
          "Admin dashboards and internal tools",
          "REST and GraphQL APIs",
          "Headless storefronts and marketplaces",
        ],
        outcomes: [
          "Pages that load in under a second",
          "Search friendly, server rendered content",
          "A codebase your team can extend safely",
        ],
        code: {
          filename: "route.ts",
          snippet: `// app/api/orders/route.ts
export async function GET(req: Request) {
  const user = await authenticate(req)
  const orders = await db.orders.forUser(user.id)
  return Response.json({ orders })
}`,
        },
      },
      {
        slug: "app-development",
        name: "App Development",
        tagline: "Native and cross platform mobile apps.",
        tags: ["react native", "flutter", "swift"],
        description:
          "We ship mobile apps that feel native and stay in sync with your backend. One codebase where it saves time, fully native where performance demands it, published to both stores and wired into your existing systems.",
        whatWeBuild: [
          "iOS and Android apps",
          "Cross platform apps from one codebase",
          "Offline first and real time sync",
          "App store submission and release",
        ],
        outcomes: [
          "One codebase, both platforms",
          "Smooth 60fps interactions",
          "Releases your team can push on their own",
        ],
        code: {
          filename: "sync.tsx",
          snippet: `// app/sync.tsx
export function useOrders(userId: string) {
  const { data } = useQuery(["orders", userId], () =>
    api.orders.list(userId)
  )
  return data ?? []
}`,
        },
      },
      {
        slug: "blockchain-web3",
        name: "Blockchain and Web3",
        tagline: "Smart contracts and on-chain products.",
        tags: ["solidity", "ethers", "hardhat"],
        description:
          "We build on-chain products and the systems around them: smart contracts, wallets, and the backends that keep them in sync. Audited patterns, tested contracts, and interfaces that hide the complexity from your users.",
        whatWeBuild: [
          "Smart contracts and token systems",
          "Wallet integration and on-chain auth",
          "NFT minting and marketplaces",
          "Indexers that track on-chain events",
        ],
        outcomes: [
          "Contracts tested before they ship",
          "Gas costs kept in check",
          "Simple interfaces on web3 rails",
        ],
        code: {
          filename: "Vault.sol",
          snippet: `// contracts/Vault.sol
function deposit() external payable {
    require(msg.value > 0, "no value");
    balances[msg.sender] += msg.value;
    emit Deposit(msg.sender, msg.value);
}`,
        },
      },
    ],
  },
  {
    slug: "ai-automation",
    index: "02",
    key: "ai + automation",
    title: "AI and Automation",
    value:
      "Automation that removes manual work from your operations, not chatbot gimmicks.",
    accent: "#a78bfa",
    overview:
      "We connect your tools, your data, and modern AI into workflows that run without a human in the loop. The goal is fewer manual steps, faster operations, and decisions backed by your own numbers.",
    outcomes: [
      "Manual steps removed from daily operations",
      "Work that runs in the background, 24/7",
      "Answers grounded in your own data",
      "Fewer errors, faster turnaround",
    ],
    code: {
      filename: "automate.py",
      snippet: `# pixoraft/automate.py
@on_event("invoice.created")
def route(invoice):
    data = extract(invoice)
    if data.total > 5000:
        notify(team="finance", payload=data)
    return archive(data)`,
    },
    capabilities: [
      {
        slug: "ai-solutions",
        name: "AI Solutions",
        tagline: "Custom AI features grounded in your data.",
        tags: ["openai", "langchain", "rag"],
        description:
          "We build AI features that answer from your own data, not the open internet. Retrieval over your documents, structured outputs your systems can use, and guardrails so the model stays on topic.",
        whatWeBuild: [
          "Retrieval augmented assistants over your data",
          "Document search and summarization",
          "Structured extraction from text and files",
          "AI features embedded in your product",
        ],
        outcomes: [
          "Answers grounded in your content",
          "Structured output your systems can act on",
          "Guardrails against off topic responses",
        ],
        code: {
          filename: "answer.py",
          snippet: `# pixoraft/answer.py
def answer(question: str):
    docs = retrieve(question, top_k=5)
    context = "\\n".join(d.text for d in docs)
    return llm.complete(prompt(question, context))`,
        },
      },
      {
        slug: "business-process-automation",
        name: "Business Process Automation",
        tagline: "Workflows that run without manual steps.",
        tags: ["n8n", "zapier", "webhooks"],
        description:
          "We connect the tools you already use and remove the manual steps between them. When something happens in one system, the right thing happens everywhere else, without anyone copying data by hand.",
        whatWeBuild: [
          "Event driven workflows across your tools",
          "Automated data sync between systems",
          "Approval and notification flows",
          "Scheduled jobs and background tasks",
        ],
        outcomes: [
          "Manual copy and paste removed",
          "Work that runs 24/7 on its own",
          "Fewer errors from human handoffs",
        ],
        code: {
          filename: "flow.ts",
          snippet: `// pixoraft/flow.ts
on("deal.won", async (deal) => {
  await invoice.create(deal)
  await slack.notify("#finance", deal)
  await crm.update(deal.id, { status: "closed" })
})`,
        },
      },
      {
        slug: "data-analytics",
        name: "Data and Analytics",
        tagline: "Dashboards and pipelines you can act on.",
        tags: ["python", "sql", "dashboards"],
        description:
          "We turn scattered data into dashboards your team actually uses. Pipelines that collect and clean the numbers, models that make sense of them, and views that answer the questions you ask most.",
        whatWeBuild: [
          "Data pipelines and warehouses",
          "Dashboards and reporting",
          "Metric definitions your team agrees on",
          "Alerts on the numbers that matter",
        ],
        outcomes: [
          "One source of truth for your numbers",
          "Reports that refresh on their own",
          "Decisions backed by data, not guesses",
        ],
        code: {
          filename: "revenue.sql",
          snippet: `-- metrics/revenue.sql
select
  date_trunc('week', created_at) as week,
  sum(amount) as revenue
from orders
where status = 'paid'
group by 1`,
        },
      },
    ],
  },
  {
    slug: "cloud-devops",
    index: "03",
    key: "cloud + devops",
    title: "Cloud and DevOps",
    value:
      "Infrastructure that deploys fast, scales on demand, and does not page you at 3 AM.",
    accent: "#22d3ee",
    overview:
      "We set up the pipelines and infrastructure that get your code to production safely and keep it there. Automated deploys, autoscaling, and monitoring, so releases are boring and outages are rare.",
    outcomes: [
      "Deploys measured in minutes",
      "Scales with demand automatically",
      "Monitored and alerted before users notice",
      "Fewer late night incidents",
    ],
    code: {
      filename: "deploy.yml",
      snippet: `# .github/workflows/deploy.yml
on: { push: { branches: [main] } }
jobs:
  ship:
    steps:
      - run: docker build -t app .
      - run: terraform apply -auto-approve
      - run: kubectl rollout status deploy/app`,
    },
    capabilities: [
      {
        slug: "cloud-solutions",
        name: "Cloud Solutions",
        tagline: "Cloud architecture built to scale.",
        tags: ["aws", "gcp", "azure"],
        description:
          "We design cloud architecture that fits your load and your budget. The right services for the job, wired together with security and cost in mind, and documented so it is not a black box.",
        whatWeBuild: [
          "Cloud architecture on AWS, GCP, or Azure",
          "Serverless and container workloads",
          "Networking, storage, and databases",
          "Cost and security reviews",
        ],
        outcomes: [
          "Architecture sized to real load",
          "Costs you can predict and control",
          "Security built in, not bolted on",
        ],
        code: {
          filename: "main.tf",
          snippet: `# infra/main.tf
resource "aws_ecs_service" "app" {
  name            = "pixoraft-app"
  desired_count   = 2
  launch_type     = "FARGATE"
  task_definition = aws_ecs_task_definition.app.arn
}`,
        },
      },
      {
        slug: "devops-cicd",
        name: "DevOps and CI/CD",
        tagline: "Automated pipelines from commit to production.",
        tags: ["docker", "github actions", "terraform"],
        description:
          "We build the pipeline that takes your code from commit to production without drama. Automated tests, safe deploys, and one command rollbacks, so shipping is routine instead of risky.",
        whatWeBuild: [
          "CI pipelines with automated tests",
          "Zero downtime deploy strategies",
          "Containerization and image builds",
          "Rollback and release automation",
        ],
        outcomes: [
          "Deploys in minutes, not hours",
          "Every change tested before it ships",
          "Rollbacks that take one command",
        ],
        code: {
          filename: "ci.yml",
          snippet: `# .github/workflows/ci.yml
jobs:
  test-and-deploy:
    steps:
      - run: npm ci && npm test
      - run: docker build -t app:$SHA .
      - run: ./scripts/deploy.sh $SHA`,
        },
      },
      {
        slug: "infrastructure-management",
        name: "Infrastructure Management",
        tagline: "Monitored, reliable infrastructure.",
        tags: ["kubernetes", "nginx", "monitoring"],
        description:
          "We keep your infrastructure healthy after launch: monitored, patched, and backed up. Alerts that reach a human before your users notice, and runbooks so incidents are handled the same way every time.",
        whatWeBuild: [
          "Monitoring, logging, and alerting",
          "Autoscaling and load balancing",
          "Backups and disaster recovery",
          "Patching and uptime management",
        ],
        outcomes: [
          "Problems caught before users notice",
          "Infrastructure that scales with demand",
          "Recovery plans that are actually tested",
        ],
        code: {
          filename: "alerts.yml",
          snippet: `# monitoring/alerts.yml
- alert: HighErrorRate
  expr: rate(http_errors[5m]) > 0.05
  for: 2m
  labels: { severity: page }`,
        },
      },
    ],
  },
  {
    slug: "design-growth",
    index: "04",
    key: "design + growth",
    title: "Design and Growth",
    value: "Interfaces and campaigns measured by conversion, not decoration.",
    accent: "#f472b6",
    overview:
      "We design interfaces people move through without friction, and run the campaigns that bring the right people to them. Everything ties back to a number: signups, sales, or whatever conversion matters to you.",
    outcomes: [
      "Interfaces measured by conversion",
      "Design systems your team can reuse",
      "Campaigns tied to real results",
      "Growth you can attribute to numbers",
    ],
    code: {
      filename: "track.ts",
      snippet: `// pixoraft/track.ts
export function onConvert(event: Signup) {
  analytics.capture("signup", {
    source: event.source,
    variant: event.variant,
  })
  return { tracked: true }
}`,
    },
    capabilities: [
      {
        slug: "ui-ux-design",
        name: "UI/UX Design",
        tagline: "Interfaces designed to convert.",
        tags: ["figma", "design systems", "prototyping"],
        description:
          "We design interfaces people move through without thinking about them. Research where it counts, a reusable design system, and prototypes you can click before we write a line of code.",
        whatWeBuild: [
          "Product and web interface design",
          "Design systems and component libraries",
          "Clickable prototypes",
          "Usability and conversion audits",
        ],
        outcomes: [
          "Interfaces measured by conversion",
          "A design system your team can reuse",
          "Fewer support tickets from confused users",
        ],
        code: {
          filename: "tokens.ts",
          snippet: `// design/tokens.ts
export const tokens = {
  space: [4, 8, 12, 16, 24, 32],
  radius: { sm: 6, md: 10, lg: 16 },
  focusRing: "2px solid var(--accent)",
}`,
        },
      },
      {
        slug: "graphic-design-video",
        name: "Graphic Design and Video",
        tagline: "Brand visuals and motion that land.",
        tags: ["after effects", "premiere", "illustrator"],
        description:
          "We produce the visuals and motion that carry your brand: social creative, product videos, and the assets your campaigns run on. Consistent with your identity and built to perform on each platform.",
        whatWeBuild: [
          "Brand and social creative",
          "Product and explainer videos",
          "Motion graphics and animation",
          "Ad creative sized per platform",
        ],
        outcomes: [
          "Visuals consistent with your brand",
          "Creative sized for each platform",
          "Assets that lift campaign performance",
        ],
        code: {
          filename: "render.jsx",
          snippet: `// motion/render.jsx
export const Intro = () => (
  <Sequence from={0} durationInFrames={90}>
    <Logo scale={spring({ frame, fps })} />
  </Sequence>
)`,
        },
      },
      {
        slug: "seo-digital-marketing",
        name: "SEO and Digital Marketing",
        tagline: "Traffic and campaigns tied to results.",
        tags: ["seo", "analytics", "ads"],
        description:
          "We bring the right people to your product and prove where they came from. Technical and content SEO, campaigns tied to conversion, and reporting that connects spend to results.",
        whatWeBuild: [
          "Technical and content SEO",
          "Paid search and social campaigns",
          "Landing pages built to convert",
          "Attribution and reporting",
        ],
        outcomes: [
          "Traffic that converts, not just visits",
          "Campaigns tied to real revenue",
          "Reporting that connects spend to results",
        ],
        code: {
          filename: "meta.ts",
          snippet: `// seo/meta.ts
export const metadata = {
  title: "Pixoraft, digital engineering studio",
  alternates: { canonical: "https://pixoraft.com" },
  openGraph: { images: ["/og.png"] },
}`,
        },
      },
    ],
  },
];

/** Lookup helpers used by the routes. */
export function getPillar(slug: string): ServicePillar | undefined {
  return SERVICE_PILLARS.find((p) => p.slug === slug);
}

export function getCapability(
  pillarSlug: string,
  subSlug: string,
): { pillar: ServicePillar; capability: Capability } | undefined {
  const pillar = getPillar(pillarSlug);
  const capability = pillar?.capabilities.find((c) => c.slug === subSlug);
  if (!pillar || !capability) return undefined;
  return { pillar, capability };
}
