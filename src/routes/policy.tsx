import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag, Bar } from "@/components/Panel";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/policy")({
  head: () => ({
    meta: [
      { title: "Policy Enforcement Engine — Atlas Sanctum" },
      { name: "description", content: "Constitutional constraints, automated compliance, and jurisdictional governance." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

const policies = [
  { id: "P-001", name: "Constitutional bill of rights", scope: "Global", health: 99, status: "ENFORCED", tone: "success" },
  { id: "P-002", name: "Anti-power-concentration", scope: "Global", health: 78, status: "WATCH", tone: "warning" },
  { id: "P-014", name: "Validator integrity & sanctions", scope: "Global", health: 91, status: "ENFORCED", tone: "success" },
  { id: "P-022", name: "Ecological do-no-harm", scope: "Regional", health: 88, status: "ENFORCED", tone: "success" },
  { id: "P-031", name: "Community consent supremacy", scope: "Local", health: 94, status: "ENFORCED", tone: "success" },
  { id: "P-044", name: "AI moratorium — biometrics", scope: "EU-West", health: 67, status: "DEBATED", tone: "info" },
  { id: "P-051", name: "Treasury transparency floor", scope: "Global", health: 96, status: "ENFORCED", tone: "success" },
  { id: "P-062", name: "Anti-surveillance baseline", scope: "Global", health: 71, status: "WATCH", tone: "warning" },
];

const violations = [
  { p: "P-002", what: "Top 3 delegates exceed 40% combined weight", where: "Global · vote registry", when: "12m ago", level: "CRITICAL", tone: "danger" },
  { p: "P-014", what: "Validator V-099 — 3 missed attestations", where: "ASN-mainnet", when: "1h ago", level: "HIGH", tone: "danger" },
  { p: "P-062", what: "Sensor type C deployed without notice in Region 7", where: "EU-West", when: "4h ago", level: "WATCH", tone: "warning" },
];

function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader eyebrow="MODULE · CONSTITUTIONAL CONSTRAINTS" title="Policy Enforcement Engine" description="Active rules, jurisdictional scope, and live enforcement across the ecosystem." />

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 lg:col-span-8" title="Policy Status Matrix">
          <div className="overflow-x-auto -mx-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] mono text-muted-foreground tracking-widest border-b border-border">
                  <th className="text-left px-4 py-2">ID</th>
                  <th className="text-left px-4 py-2">Policy</th>
                  <th className="text-left px-4 py-2">Scope</th>
                  <th className="text-left px-4 py-2 w-48">Health</th>
                  <th className="text-left px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {policies.map((p) => (
                  <tr key={p.id} className="border-b border-border/50 hover:bg-surface-elevated">
                    <td className="px-4 py-3 mono text-xs text-muted-foreground">{p.id}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><Shield className="size-3 text-primary" />{p.name}</div></td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{p.scope}</td>
                    <td className="px-4 py-3"><div className="flex items-center gap-2"><Bar value={p.health} tone={p.health > 85 ? "success" : p.health > 70 ? "warning" : "danger"} /><span className="mono text-xs w-8 text-right">{p.health}</span></div></td>
                    <td className="px-4 py-3"><Tag tone={p.tone as any}>{p.status}</Tag></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Panel title="Jurisdiction" subtitle="select scope">
            <div className="grid grid-cols-2 gap-2 text-xs">
              {["Global","EU-West","East Africa","South Asia","Latin America","Pacific","North America","Southern Africa"].map((j, i) => (
                <button key={j} className={`px-3 py-2 rounded-md border text-left ${i===0?"border-primary text-primary bg-primary/5":"border-border text-muted-foreground hover:bg-surface-elevated"}`}>{j}</button>
              ))}
            </div>
          </Panel>

          <Panel title="Live Violations" action={<Tag tone="danger">3</Tag>}>
            <ul className="space-y-3">
              {violations.map((v, i) => (
                <li key={i} className="rounded-md border border-border p-3 bg-background/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] mono text-muted-foreground">{v.p} · {v.when}</span>
                    <Tag tone={v.tone as any}>{v.level}</Tag>
                  </div>
                  <div className="text-sm">{v.what}</div>
                  <div className="text-[11px] text-muted-foreground mono">{v.where}</div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
