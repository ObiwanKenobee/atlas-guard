import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag } from "@/components/Panel";

export const Route = createFileRoute("/audit")({
  head: () => ({
    meta: [
      { title: "Algorithm Audit Logs — Atlas Sanctum" },
      { name: "description", content: "Immutable, forensic-grade audit trail for AI and governance actions." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

const events = [
  { t: "14:02:11", k: "AI", ev: "decision.emit", id: "#A91-022", hash: "0x9f3a…b21", note: "Kibera Zone B funding · model v3.2", tone: "primary" },
  { t: "13:48:55", k: "GOV", ev: "proposal.anchor", id: "P-218", hash: "0x771c…ee0", note: "Quorum reached", tone: "success" },
  { t: "13:31:02", k: "AUD", ev: "trace.replay", id: "#A91-021", hash: "0x5ad1…9c2", note: "Dataset lineage reconstructed", tone: "info" },
  { t: "13:11:09", k: "POL", ev: "policy.violation", id: "P-002", hash: "0x40f8…1b1", note: "Power concentration anomaly", tone: "danger" },
  { t: "12:55:18", k: "AI", ev: "model.deploy", id: "audit-anom v0.9", hash: "0x2218…aa0", note: "Anomaly detector activated", tone: "warning" },
  { t: "12:09:40", k: "CON", ev: "consent.renew", id: "Mathare", hash: "0x9d12…77a", note: "Sensor network · 3y", tone: "success" },
  { t: "11:55:18", k: "TRE", ev: "outflow.approve", id: "TX-44182", hash: "0x6c70…002", note: "240,000 ASN · contractors", tone: "primary" },
];

function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader eyebrow="MODULE · BLACK-BOX RECORDER" title="Algorithm Audit Logs" description="Append-only, blockchain-anchored, forensically reconstructable history of every governance and AI action." />

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 lg:col-span-3" title="Filters">
          <div className="space-y-3 text-xs">
            {["AI","GOV","POL","AUD","CON","TRE"].map((k) => (
              <label key={k} className="flex items-center gap-2"><input defaultChecked type="checkbox" className="accent-primary" /> <span className="mono">{k}</span></label>
            ))}
            <div className="pt-2 border-t border-border">
              <div className="text-[10px] mono text-muted-foreground tracking-widest mb-2">RANGE</div>
              <select className="w-full bg-background border border-input rounded p-1.5 text-xs">
                <option>Last 24 hours</option><option>Last 7 days</option><option>Last 30 days</option>
              </select>
            </div>
          </div>
        </Panel>

        <Panel className="col-span-12 lg:col-span-9" title="Event Timeline" subtitle="append-only · blockchain anchored">
          <ol className="relative border-l border-border pl-5 space-y-3">
            {events.map((e, i) => (
              <li key={i}>
                <span className={`absolute -left-[5px] mt-1.5 size-2.5 rounded-full ${e.tone==="danger"?"bg-destructive":e.tone==="success"?"bg-success":e.tone==="warning"?"bg-warning":e.tone==="info"?"bg-info":"bg-primary"}`} />
                <div className="flex items-center gap-2 text-[11px] mono text-muted-foreground">
                  <span>{e.t}</span><Tag>{e.k}</Tag><span>{e.ev}</span><span className="text-foreground/70">·</span><span>{e.id}</span>
                </div>
                <div className="text-sm mt-0.5">{e.note}</div>
                <div className="text-[10px] mono text-primary/80">anchor {e.hash}</div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  );
}
