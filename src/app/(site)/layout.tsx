import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE, OFFICES } from "@/data/site";
import { buildOrganizationJsonLd } from "@/lib/schema";

const organizationJsonLd = buildOrganizationJsonLd({
  socials: SITE.socials.map((s) => s.href),
  offices: OFFICES.map((o) => ({ addressLines: o.addressLines })),
  email: SITE.email,
  phone: SITE.phones[0].display,
});

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />
      {children}
      <Footer />
    </>
  );
}
