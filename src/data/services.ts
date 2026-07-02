/**
 * Services content: four pillars, each grouping three capabilities.
 * All copy lives here (not in JSX) so content edits never touch components.
 * Structured so a CMS can replace this file later without component changes.
 */

export interface Capability {
  /** What we build. */
  name: string;
  /** Stack tags rendered in the mono readout style. */
  tags: string[];
}

export interface ServicePillar {
  /** URL slug for /services/[slug]. */
  slug: string;
  /** Two digit index used in the mono eyebrow, e.g. "01". */
  index: string;
  /** Short key used in the mono eyebrow, e.g. "engineering". */
  key: string;
  /** Pillar name (H3). */
  title: string;
  /** One sentence business outcome statement. */
  value: string;
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
    capabilities: [
      { name: "Web Development", tags: ["next.js", "react", "node", "php"] },
      { name: "App Development", tags: ["react native", "flutter", "swift"] },
      { name: "Blockchain and Web3", tags: ["solidity", "ethers", "hardhat"] },
    ],
  },
  {
    slug: "ai-automation",
    index: "02",
    key: "ai + automation",
    title: "AI and Automation",
    value:
      "Automation that removes manual work from your operations, not chatbot gimmicks.",
    capabilities: [
      { name: "AI Solutions", tags: ["openai", "langchain", "rag"] },
      {
        name: "Business Process Automation",
        tags: ["n8n", "zapier", "webhooks"],
      },
      { name: "Data and Analytics", tags: ["python", "sql", "dashboards"] },
    ],
  },
  {
    slug: "cloud-devops",
    index: "03",
    key: "cloud + devops",
    title: "Cloud and DevOps",
    value:
      "Infrastructure that deploys fast, scales on demand, and does not page you at 3 AM.",
    capabilities: [
      { name: "Cloud Solutions", tags: ["aws", "gcp", "azure"] },
      {
        name: "DevOps and CI/CD",
        tags: ["docker", "github actions", "terraform"],
      },
      {
        name: "Infrastructure Management",
        tags: ["kubernetes", "nginx", "monitoring"],
      },
    ],
  },
  {
    slug: "design-growth",
    index: "04",
    key: "design + growth",
    title: "Design and Growth",
    value:
      "Interfaces and campaigns measured by conversion, not decoration.",
    capabilities: [
      { name: "UI/UX Design", tags: ["figma", "design systems", "prototyping"] },
      {
        name: "Graphic Design and Video",
        tags: ["after effects", "premiere", "illustrator"],
      },
      {
        name: "SEO and Digital Marketing",
        tags: ["seo", "analytics", "ads"],
      },
    ],
  },
];
