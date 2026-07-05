import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";
import { SERVICE_PILLARS } from "@/data/services";
import { SocialIcon } from "@/components/ui/SocialIcon";

const YEAR = 2026;

const COMPANY_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
];

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
