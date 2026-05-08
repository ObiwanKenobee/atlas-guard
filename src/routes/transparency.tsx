import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag } from "@/components/Panel";
import { ArrowDown, Download } from "lucide-react";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Transparency Explorer — Atlas Sanctum" },
      { name: "description", content: "Public disclosures, treasury flows, and the anti-corruption money trail." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

const flow = [
  { node: "Global Treasury", amount: "12,400,000 ASN", tone: "primary" },
  { node: "Kenya Regeneration Fund", amount: "1,820,000 ASN", tone: "info" },
  { node: "Kibera Water Initiative", amount: "240,000 ASN", tone: "info" },
  { node: "Verified Community Contractors", amount: "212,400 ASN", tone: "success" },
  { node: "Outcomes verified · 1,200 households served", amount: "OK", tone: "success" },
];

const reports = [
  { name: "Q3 Ecological Impact Report", size: "12.4 MB", date: "2026-05-02", tone: "success" },
  { name: "Treasury Flow Disclosure — Apr 2026", size: "3.1 MB", date: "2026-05-01", tone: "success" },
  { name: "AI Decision Disclosures · v3.2", size: "8.6 MB", date: "2026-04-28", tone: "success" },
  { name: "Community Benefit Report — East Africa", size: "5.2 MB", date: "2026-04-22", tone: "success" },
  { name: "Governance Activity Log Q1", size: "1.8 MB", date: "2026-04-15", tone: "info" },
];

function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader eyebrow="MODULE · PUBLIC ACCOUNTABILITY" title="Transparency Explorer" description="Where did the money go? Who decided what? Open. Auditable. Permanent." />

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 lg:col-span-7" title="Where Did The Money Go?" subtitle="treasury flow · live">
          <ol className="space-y-2">
            {flow.map((f, i) => (
              <li key={i}>
                <div className="rounded-md border border-border p-3 bg-background/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="size-7 rounded-full grid place-items-center bg-primary/10 text-primary mono text-xs">{i+1}</span>
                    <span className="text-sm">{f.node}</span>
                  </div>
                  <Tag tone={f.tone as any}>{f.amount}</Tag>
                </div>
                {i < flow.length - 1 && <div className="flex justify-center"><ArrowDown className="size-4 text-muted-foreground my-1" /></div>}
              </li>
            ))}
          </ol>
          <div className="mt-3 text-[11px] mono text-muted-foreground">All hops cryptographically anchored · merkle 0x9f3a…b21</div>
        </Panel>

        <div className="col-span-12 lg:col-span-5 space-y-4">
          <Panel title="Transparency Scorecards">
            {[
              { l: "Treasury", v: 96 }, { l: "AI decisions", v: 88 }, { l: "Governance activity", v: 92 }, { l: "Environmental impact", v: 81 }, { l: "Community outcomes", v: 77 },
            ].map((s) => (
              <div key={s.l} className="mb-3 last:mb-0">
                <div className="flex justify-between text-[11px] mono text-muted-foreground mb-1"><span>{s.l}</span><span>{s.v}</span></div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${s.v}%` }} />
                </div>
              </div>
            ))}
          </Panel>

          <Panel title="Public Disclosures">
            <ul className="divide-y divide-border -mx-4">
              {reports.map((r) => (
                <li key={r.name} className="px-4 py-2.5 flex items-center justify-between hover:bg-surface-elevated">
                  <div>
                    <div className="text-sm">{r.name}</div>
                    <div className="text-[11px] mono text-muted-foreground">{r.date} · {r.size}</div>
                  </div>
                  <button className="p-1.5 rounded hover:bg-primary/10 text-primary"><Download className="size-4" /></button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
