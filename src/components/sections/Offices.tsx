"use client";

import { useState } from "react";
import { MapPin, Phone, MessageCircle } from "lucide-react";
import { OFFICES } from "@/data/site";

export function Offices() {
  // USA is the default selected office.
  const [activeId, setActiveId] = useState<(typeof OFFICES)[number]["id"]>(
    "usa",
  );
  const active = OFFICES.find((o) => o.id === activeId) ?? OFFICES[0];

  return (
    <div>
      <div className="mb-8 max-w-xl">
        <p className="font-mono text-sm text-accent">[ our offices ]</p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Three regions, one team.
        </h2>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Offices"
        className="flex w-full flex-col gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-1.5 backdrop-blur-md sm:inline-flex sm:w-auto sm:flex-row sm:gap-2 sm:rounded-full sm:p-1"
      >
        {OFFICES.map((office) => {
          const isActive = office.id === activeId;
          return (
            <button
              key={office.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              onClick={() => setActiveId(office.id)}
              className={`w-full rounded-full px-5 py-2.5 text-center text-sm font-medium transition-colors sm:w-auto sm:py-2 ${
                isActive
                  ? "bg-accent text-accent-contrast"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {office.label}
            </button>
          );
        })}
      </div>

      {/* Active office card */}
      <div className="mt-6 rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl sm:p-8">
        <p className="font-mono text-xs text-faint">[ {active.region} ]</p>
        <div className="mt-4 flex items-start gap-3">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <address className="not-italic text-muted">
            {active.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <a
            href={`tel:${active.tel}`}
            className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"
          >
            <Phone className="h-4 w-4 text-faint" />
            {active.phoneDisplay}
          </a>
          {active.whatsapp ? (
            <a
              href={`https://wa.me/${active.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"
            >
              <MessageCircle className="h-4 w-4 text-faint" />
              WhatsApp
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
