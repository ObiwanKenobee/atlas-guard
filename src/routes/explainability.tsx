import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag, Bar } from "@/components/Panel";
import { GitBranch, Database, Sparkles, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/explainability")({
  head: () => ({
    meta: [
      { title: "AI Explainability Console — Atlas Sanctum" },
      { name: "description", content: "Trace AI reasoning, model pathways, dataset lineage, and bias indicators." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="MODULE · TRUST ENGINE"
        title="AI Explainability Console"
        description="Translate machine reasoning into human-understandable logic. Replay, inspect, contest."
      />

      <div className="grid grid-cols-12 gap-4">
        <Panel className="col-span-12 lg:col-span-4" title="Recent Decisions">
          <ul className="divide-y divide-border -mx-4">
            {decisions.map((d, i) => (
              <li key={d.id} className={`px-4 py-3 cursor-pointer hover:bg-surface-elevated ${i === 0 ? "bg-primary/5 border-l-2 border-primary" : ""}`}>
                <div className="flex justify-between text-[10px] mono text-muted-foreground mb-1">
                  <span>{d.id}</span><span>{d.time}</span>
                </div>
                <div className="text-sm leading-snug">{d.summary}</div>
                <div className="mt-1 flex items-center gap-2">
                  <Tag tone={d.confidence > 80 ? "success" : d.confidence > 60 ? "warning" : "danger"}>{d.confidence}% conf</Tag>
                  <span className="text-[10px] mono text-muted-foreground">{d.model}</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="col-span-12 lg:col-span-8 space-y-4">
          <Panel
            title="Decision Trace · #A91-022"
            subtitle="Allocate water restoration funding · Kibera Zone B"
            action={<button className="text-[10px] mono text-primary tracking-wider">REPLAY REASONING →</button>}
          >
            <div className="grid md:grid-cols-3 gap-3 mb-4">
              <Metric icon={Sparkles} label="Confidence" value="87%" />
              <Metric icon={AlertTriangle} label="Bias score" value="0.08" tone="text-success" hint="low" />
              <Metric icon={Database} label="Data sources" value="14" hint="3 verified · 1 stale" />
            </div>

            <div className="text-[10px] mono text-muted-foreground tracking-widest mb-2">REASONING PATHWAY</div>
            <ol className="relative border-l border-border pl-5 space-y-3">
              {pathway.map((p, i) => (
                <li key={i}>
                  <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-primary" />
                  <div className="text-sm">{p.step}</div>
                  <div className="text-[11px] mono text-muted-foreground">{p.detail}</div>
                </li>
              ))}
            </ol>
          </Panel>

          <div className="grid md:grid-cols-2 gap-4">
            <Panel title="Alternative Outcomes">
              <ul className="space-y-3">
                {alternatives.map((a) => (
                  <li key={a.label}>
                    <div className="flex justify-between text-sm mb-1"><span>{a.label}</span><span className="mono text-muted-foreground">{a.score}%</span></div>
                    <Bar value={a.score} tone={a.score > 80 ? "success" : "warning"} />
                    <div className="text-[11px] text-muted-foreground mt-1">{a.note}</div>
                  </li>
                ))}
              </ul>
            </Panel>
            <Panel title="Data Provenance">
              <ul className="space-y-2 text-xs">
                {provenance.map((d) => (
                  <li key={d.src} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <GitBranch className="size-3 text-muted-foreground shrink-0" />
                      <span className="truncate">{d.src}</span>
                    </div>
                    <Tag tone={d.tone as any}>{d.status}</Tag>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value, tone, hint }: any) {
  return (
    <div className="rounded-md border border-border p-3 bg-background/40">
      <div className="flex items-center justify-between text-[10px] mono text-muted-foreground tracking-widest">
        <span>{label}</span><Icon className="size-3" />
      </div>
      <div className={`mt-1 stat-num text-xl ${tone ?? ""}`}>{value}</div>
      {hint && <div className="text-[10px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

const decisions = [
  { id: "#A91-022", time: "14:02", summary: "Allocate water restoration funding to Kibera Zone B", confidence: 87, model: "regen-policy v3.2" },
  { id: "#A91-021", time: "13:48", summary: "Defer industrial license — biodiversity risk threshold", confidence: 73, model: "eco-guard v2.1" },
  { id: "#A91-020", time: "13:31", summary: "Recommend mediator for dispute D-441", confidence: 91, model: "consensus v1.4" },
  { id: "#A91-019", time: "12:55", summary: "Flag treasury flow anomaly · Kenya Regen Fund", confidence: 64, model: "audit-anom v0.9" },
  { id: "#A91-018", time: "12:09", summary: "Approve sensor consent renewal · Mathare", confidence: 95, model: "consent v1.0" },
];

const pathway = [
  { step: "Ingest signals", detail: "14 sources · contamination, disease, ecology, stewardship" },
  { step: "Apply constitutional constraints", detail: "P-014 (anti-concentration) · R-002 (community consent)" },
  { step: "Score candidate allocations", detail: "9 candidates · top score 0.87" },
  { step: "Bias check", detail: "demographic + regional fairness 0.08 (low)" },
  { step: "Emit recommendation", detail: "Kibera Zone B · 240,000 ASN · phase II" },
];

const alternatives = [
  { label: "Kibera Zone A", score: 81, note: "Lower disease burden, higher contractor capacity" },
  { label: "Mathare North", score: 76, note: "Stale sensor data — confidence reduced" },
  { label: "Kawangware", score: 69, note: "Pending consent renewal" },
];

const provenance = [
  { src: "sensors.water.ke / hash 0x3f1…aa", status: "VERIFIED", tone: "success" },
  { src: "minhealth.ke / disease registry", status: "VERIFIED", tone: "success" },
  { src: "esa.copernicus / ndvi tiles", status: "VERIFIED", tone: "success" },
  { src: "community.report.kibera-b", status: "ATTESTED", tone: "info" },
  { src: "sensor #142 (turbidity)", status: "STALE 9D", tone: "warning" },
];
