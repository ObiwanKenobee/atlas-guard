import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag } from "@/components/Panel";
import { Lock, Megaphone } from "lucide-react";

export const Route = createFileRoute("/rights")({
  head: () => ({
    meta: [
      { title: "Human Rights Monitor — Atlas Sanctum" },
      { name: "description", content: "Detect surveillance abuse, discrimination, displacement, and AI ethics violations." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

const incidents = [
  { id: "HR-204", what: "Surveillance signal anomaly — undeclared sensor cluster", region: "EU-West · R7", level: "CRITICAL", tone: "danger", time: "2h ago" },
  { id: "HR-203", what: "Pattern of exclusion in funding allocations", region: "South Asia", level: "HIGH", tone: "danger", time: "9h ago" },
  { id: "HR-202", what: "Coercive incentive design flagged in onboarding flow", region: "Global", level: "HIGH", tone: "warning", time: "1d ago" },
  { id: "HR-201", what: "Labor exploitation report — verified contractor", region: "East Africa", level: "WATCH", tone: "warning", time: "2d ago" },
  { id: "HR-200", what: "Displacement risk near restoration corridor", region: "Latin America", level: "WATCH", tone: "warning", time: "3d ago" },
];

const heatmap = Array.from({ length: 8 * 14 }, (_, i) => {
  const v = Math.abs(Math.sin(i * 1.3) + Math.cos(i * 0.7)) / 2;
  return v;
});

function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader eyebrow="MODULE · LEGITIMACY GUARDRAIL" title="Human Rights Monitor" description="Independent detection of harm, discrimination, surveillance abuse, and AI ethics violations." />

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 lg:col-span-7" title="Incident Heatmap" subtitle="14d × 8 regions">
          <div className="grid grid-cols-14 gap-1" style={{ gridTemplateColumns: "repeat(14, minmax(0,1fr))" }}>
            {heatmap.map((v, i) => (
              <div key={i} className="aspect-square rounded-sm" style={{ background: `color-mix(in oklab, var(--destructive) ${Math.round(v*90)}%, var(--surface-elevated))` }} />
            ))}
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] mono text-muted-foreground">
            <span>LOW</span>
            <div className="flex-1 h-1.5 rounded" style={{ background: "linear-gradient(90deg, var(--surface-elevated), var(--destructive))" }} />
            <span>HIGH</span>
          </div>
        </Panel>

        <div className="col-span-12 lg:col-span-5 space-y-4">
          <Panel title="Whistleblower Portal" action={<Lock className="size-3 text-primary" />}>
            <p className="text-sm text-muted-foreground">End-to-end encrypted. Identity sealed by zero-knowledge proof. Routed to independent ethics board.</p>
            <textarea rows={3} placeholder="Describe the incident…" className="mt-3 w-full rounded-md bg-background border border-input p-2 text-sm" />
            <div className="mt-2 flex justify-between items-center">
              <Tag tone="success">ANONYMOUS</Tag>
              <button className="px-3 py-1.5 text-xs mono uppercase rounded bg-primary text-primary-foreground flex items-center gap-1.5"><Megaphone className="size-3" />Submit</button>
            </div>
          </Panel>
          <Panel title="Protected Evidence Vault">
            <div className="text-sm">142 sealed records · 38 under active review</div>
            <div className="mt-2 text-[11px] mono text-muted-foreground">Anchored to chain · accessible only via court-authorized multisig.</div>
          </Panel>
        </div>

        <Panel className="col-span-12" title="Open Incidents" action={<Tag tone="danger">2 critical</Tag>}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] mono text-muted-foreground tracking-widest border-b border-border">
                <th className="text-left py-2 pr-4">ID</th><th className="text-left py-2 pr-4">Incident</th>
                <th className="text-left py-2 pr-4">Region</th><th className="text-left py-2 pr-4">Reported</th><th className="text-left py-2">Level</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((i) => (
                <tr key={i.id} className="border-b border-border/50 hover:bg-surface-elevated">
                  <td className="py-3 pr-4 mono text-xs text-muted-foreground">{i.id}</td>
                  <td className="py-3 pr-4">{i.what}</td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground">{i.region}</td>
                  <td className="py-3 pr-4 text-xs text-muted-foreground mono">{i.time}</td>
                  <td className="py-3"><Tag tone={i.tone as any}>{i.level}</Tag></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  );
}
