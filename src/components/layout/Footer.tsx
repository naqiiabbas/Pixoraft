import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { SITE, type SocialLink } from "@/data/site";
import { SERVICE_PILLARS } from "@/data/services";

const YEAR = 2026;

const COMPANY_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
];

const ICON_CLASS = "h-4 w-4";

// Brand marks (lucide removed trademarked logos), drawn as inline SVGs.
function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLASS} fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.43.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.48-1.38-.9-.42-.42-.68-.82-.9-1.38-.16-.43-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.43-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.3-1.46.72-2.13 1.38C1.35 2.68.93 3.35.63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13.67.66 1.34 1.08 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.3 1.46-.72 2.13-1.38.66-.67 1.08-1.34 1.38-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.3-.79-.72-1.46-1.38-2.13C21.32 1.35 20.65.93 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.41-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
  );
}

function LinkedinGlyph() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLASS} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function FiverrGlyph() {
  return (
    <svg viewBox="0 0 24 24" className={ICON_CLASS} fill="currentColor" aria-hidden="true">
      <path d="M14 8.2h-1.4c-.77 0-1.4.63-1.4 1.4v.4h3v2h-3v6h-2v-6H7.6v-2H9.2v-.4A3.4 3.4 0 0 1 12.6 6.2H14v2z" />
      <circle cx="15.4" cy="7.1" r="1.3" />
    </svg>
  );
}

function SocialIcon({ platform }: { platform: SocialLink["platform"] }) {
  if (platform === "instagram") return <InstagramGlyph />;
  if (platform === "linkedin") return <LinkedinGlyph />;
  return <FiverrGlyph />;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      {/* Subtle blue glow at the top edge */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="section-glow-c absolute -top-40 left-1/2 h-[380px] w-[560px] -translate-x-1/2 opacity-30" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" aria-label="Pixoraft home" className="inline-flex">
              <Image
                src="/pixoraft_logo_header.png"
                alt="Pixoraft"
                width={62}
                height={36}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted">
              {SITE.description}
            </p>
            <p className="mt-4 font-mono text-xs text-faint">
              [ regions: PK / UK / US ]
            </p>

            {/* Socials */}
            <ul className="mt-6 flex flex-wrap gap-3">
              {SITE.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-muted backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/15 hover:text-foreground"
                  >
                    <SocialIcon platform={social.platform} />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="text-sm font-semibold text-foreground">Services</h2>
            <ul className="mt-4 space-y-3">
              {SERVICE_PILLARS.map((pillar) => (
                <li key={pillar.slug}>
                  <Link
                    href={`/services/${pillar.slug}`}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {pillar.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-foreground">Company</h2>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-foreground">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
                >
                  <Mail className="h-4 w-4 shrink-0 text-faint" />
                  {SITE.email}
                </a>
              </li>
              {SITE.phones.map((phone) => (
                <li key={phone.tel} className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-faint">
                    {phone.label}
                  </span>
                  <div className="flex items-center gap-3">
                    <a
                      href={`tel:${phone.tel}`}
                      className="inline-flex items-center gap-2 text-muted transition-colors hover:text-foreground"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-faint" />
                      {phone.display}
                    </a>
                    {phone.whatsapp ? (
                      <a
                        href={`https://wa.me/${phone.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${phone.display}`}
                        className="text-muted transition-colors hover:text-foreground"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-faint">
            © {YEAR} {SITE.name}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-faint">[ built by pixoraft ]</p>
        </div>
      </div>
    </footer>
  );
}
