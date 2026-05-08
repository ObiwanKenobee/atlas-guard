import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag, Bar } from "@/components/Panel";

export const Route = createFileRoute("/reputation")({
  head: () => ({
    meta: [
      { title: "Reputation & Trust — Atlas Sanctum" },
      { name: "description", content: "Contribution, transparency, stewardship — never obedience." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

const contributors = [
  { name: "N. Wanjiku", role: "Steward · East Africa", trust: 94, contrib: "418 actions · 12 audits", badges: ["audit","steward"] },
  { name: "L. Okonkwo", role: "Validator", trust: 88, contrib: "1,204 attestations", badges: ["validator"] },
  { name: "M. Aroyo", role: "Delegate · Pacific", trust: 81, contrib: "62 proposals · 14 mediations", badges: ["delegate"] },
  { name: "S. Aldama", role: "Researcher", trust: 76, contrib: "9 disclosures · 4 datasets", badges: ["transparency"] },
  { name: "Validator V-099", role: "Validator", trust: 31, contrib: "3 missed attestations · sanctioned", badges: ["sanctioned"] },
];

function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader eyebrow="MODULE · TRUST INFRASTRUCTURE" title="Reputation & Trust" description="Reputation measures contribution, reliability, and stewardship — never compliance with authority." />

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12" title="Trust Graph" subtitle="contribution-based · non-coercive">
          <ul className="divide-y divide-border -mx-4">
            {contributors.map((c) => (
              <li key={c.name} className="px-4 py-3 grid grid-cols-12 items-center gap-4">
                <div className="col-span-12 md:col-span-4">
                  <div className="text-sm">{c.name}</div>
                  <div className="text-[11px] text-muted-foreground">{c.role}</div>
                </div>
                <div className="col-span-6 md:col-span-3 text-xs text-muted-foreground mono">{c.contrib}</div>
                <div className="col-span-6 md:col-span-3 flex items-center gap-2">
                  <Bar value={c.trust} tone={c.trust > 80 ? "success" : c.trust > 50 ? "warning" : "danger"} />
                  <span className="mono text-sm w-8 text-right">{c.trust}</span>
                </div>
                <div className="col-span-12 md:col-span-2 flex flex-wrap gap-1">
                  {c.badges.map((b) => (
                    <Tag key={b} tone={b === "sanctioned" ? "danger" : b === "validator" ? "info" : "primary"}>{b}</Tag>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="col-span-12 lg:col-span-6" title="Reputation Composition">
          {[
            { l: "Contribution", v: 88 }, { l: "Transparency", v: 92 }, { l: "Reliability", v: 84 }, { l: "Stewardship", v: 79 },
          ].map((s) => (
            <div key={s.l} className="mb-3 last:mb-0">
              <div className="flex justify-between text-[11px] mono text-muted-foreground mb-1"><span>{s.l}</span><span>{s.v}</span></div>
              <Bar value={s.v} tone="primary" />
            </div>
          ))}
          <p className="text-[11px] text-muted-foreground mt-4">No metric measures obedience to authority. Reputation cannot be inherited, purchased, or revoked without due process.</p>
        </Panel>

        <Panel className="col-span-12 lg:col-span-6" title="Verification Badges">
          <div className="grid grid-cols-2 gap-3 text-xs">
            {["Identity verified","Audit attested","Steward · East Africa","Quadratic voter","Whistleblower receiver","Treasury delegate"].map((b) => (
              <div key={b} className="rounded-md border border-border p-3 bg-background/40 flex items-center gap-2">
                <span className="size-2 rounded-full bg-primary" />{b}
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
