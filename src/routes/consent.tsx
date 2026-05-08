import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag } from "@/components/Panel";

export const Route = createFileRoute("/consent")({
  head: () => ({
    meta: [
      { title: "Consent Management — Atlas Sanctum" },
      { name: "description", content: "Granular, revocable, community-level data and AI consent." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

const consents = [
  { name: "Environmental sensor telemetry", scope: "Mathare community", expires: "2027-04-12", on: true, level: "Community" },
  { name: "Health study — child wellbeing", scope: "Kibera Zone B", expires: "2026-12-01", on: true, level: "Community" },
  { name: "Biometric identity (voting)", scope: "Self · individual", expires: "—", on: true, level: "Individual" },
  { name: "AI deployment — predictive maintenance", scope: "Pacific Council", expires: "2026-08-30", on: false, level: "Regional" },
  { name: "Dataset sharing — biodiversity to researchers", scope: "Global", expires: "2027-01-01", on: true, level: "Public" },
  { name: "Sensor network — air quality", scope: "EU-West", expires: "2026-10-04", on: true, level: "Regional" },
];

function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader eyebrow="MODULE · DATA SOVEREIGNTY" title="Consent Management Layer" description="Communities own their data. Permission is granular, revocable, and time-bound by default." />

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 lg:col-span-8" title="Active Consents">
          <ul className="divide-y divide-border -mx-4">
            {consents.map((c, i) => (
              <li key={i} className="px-4 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm">{c.name}</span>
                    <Tag>{c.level}</Tag>
                  </div>
                  <div className="text-[11px] mono text-muted-foreground">{c.scope} · expires {c.expires}</div>
                </div>
                <Toggle on={c.on} />
              </li>
            ))}
          </ul>
        </Panel>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Panel title="Data Access Map">
            <div className="text-sm mb-2">14 systems currently hold permission to read your data.</div>
            <ul className="space-y-2 text-xs mono">
              {["regen-policy v3.2","eco-guard v2.1","sensor-mesh-east","gov.transparency.api","minhealth.ke"].map((s) => (
                <li key={s} className="flex justify-between"><span className="truncate text-muted-foreground">{s}</span><span className="text-success">READ</span></li>
              ))}
            </ul>
          </Panel>
          <Panel title="Revoke All" subtitle="emergency control">
            <p className="text-xs text-muted-foreground">Cuts all data flows except those required by constitutional safety policies. Revocation is anchored on-chain.</p>
            <button className="mt-3 w-full px-3 py-2 text-xs mono uppercase rounded bg-destructive text-destructive-foreground">Revoke All Consents</button>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Toggle({ on }: { on: boolean }) {
  return (
    <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${on ? "bg-primary" : "bg-muted"}`}>
      <span className={`inline-block h-4 w-4 rounded-full bg-background transition-transform ${on ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );
}
