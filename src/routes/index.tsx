import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag, Bar } from "@/components/Panel";
import { TrendingUp, AlertTriangle, ShieldCheck, Vote, Activity } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Governance Overview — Atlas Sanctum" },
      { name: "description", content: "Constitutional health, AI explainability, and live transparency for the Atlas Sanctum ecosystem." },
    ],
  }),
  component: () => (
    <AppShell>
      <Overview />
    </AppShell>
  ),
});

function Overview() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="COMMAND CENTER · OVERVIEW"
        title="Constitutional Health"
        description="Real-time legitimacy, accountability, and ethical compliance across the Atlas Sanctum planetary network."
        actions={
          <div className="flex gap-2">
            <button className="px-3 py-2 text-xs mono tracking-wider uppercase rounded-md border border-border hover:bg-surface-elevated">Export Report</button>
            <button className="px-3 py-2 text-xs mono tracking-wider uppercase rounded-md bg-primary text-primary-foreground hover:opacity-90">Convene Session</button>
          </div>
        }
      />

      <div className="grid grid-cols-12 gap-4">
        {/* KPI strip */}
        <div className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Kpi icon={Activity} label="Legitimacy Index" value="82.4" delta="+1.2" tone="success" hint="trust · transparency · participation" />
          <Kpi icon={Vote} label="Active Quorum" value="67.3%" delta="14 proposals" tone="primary" />
          <Kpi icon={ShieldCheck} label="Ethics Compliance" value="94.1%" delta="+0.4" tone="success" />
          <Kpi icon={AlertTriangle} label="Risk Escalations" value="7" delta="2 critical" tone="danger" />
        </div>

        {/* Governance Pulse */}
        <Panel
          className="col-span-12 lg:col-span-8"
          title="Governance Pulse"
          subtitle="regional consensus · stakeholder alignment"
          action={<Tag tone="primary">live</Tag>}
        >
          <PulseMap />
        </Panel>

        <Panel className="col-span-12 lg:col-span-4" title="Active Proposals" action={<Tag>14</Tag>}>
          <ul className="divide-y divide-border -mx-4">
            {proposals.map((p) => (
              <li key={p.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] mono text-muted-foreground">{p.id}</span>
                  <Tag tone={p.tone}>{p.status}</Tag>
                </div>
                <div className="text-sm">{p.title}</div>
                <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground mono">
                  <span>FOR {p.forPct}%</span>
                  <Bar value={p.forPct} tone={p.forPct > 60 ? "success" : "warning"} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        {/* Explainability */}
        <Panel
          className="col-span-12 lg:col-span-7"
          title="AI Explainability — Latest Decision"
          subtitle="model v3.2 · trace #A91-022"
          action={<button className="text-[10px] mono tracking-wider text-primary hover:underline">TRACE DECISION →</button>}
        >
          <ExplainabilityCard />
        </Panel>

        <Panel className="col-span-12 lg:col-span-5" title="Citizen Sentiment" subtitle="rolling 7d · 14 regions">
          <SentimentBars />
        </Panel>

        {/* Risk + transparency feed */}
        <Panel className="col-span-12 lg:col-span-6" title="Risk Escalations" action={<Tag tone="danger">2 critical</Tag>}>
          <ul className="space-y-3">
            {risks.map((r) => (
              <li key={r.title} className="flex items-start gap-3">
                <span className={`mt-1.5 size-2 rounded-full ${r.tone === "danger" ? "bg-destructive" : r.tone === "warning" ? "bg-warning" : "bg-info"}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm">{r.title}</div>
                  <div className="text-[11px] text-muted-foreground mono">{r.region} · {r.time}</div>
                </div>
                <Tag tone={r.tone as any}>{r.level}</Tag>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel className="col-span-12 lg:col-span-6" title="Transparency Feed" subtitle="public disclosures">
          <ul className="space-y-3 mono text-xs">
            {feed.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-muted-foreground/70 shrink-0">{f.t}</span>
                <span className="text-muted-foreground">›</span>
                <span className="text-foreground">{f.msg}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, delta, tone, hint }: any) {
  const toneMap: any = { success: "text-success", primary: "text-primary", danger: "text-destructive", warning: "text-warning" };
  return (
    <div className="panel p-4">
      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.18em] text-muted-foreground">{label}</span>
        <Icon className={`size-4 ${toneMap[tone]}`} />
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="stat-num text-3xl">{value}</span>
        <span className={`text-xs mono ${toneMap[tone]}`}>{delta}</span>
      </div>
      {hint && <div className="mt-1 text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}

function PulseMap() {
  const regions = [
    { name: "East Africa", x: 60, y: 55, support: 88, weight: 18 },
    { name: "West Africa", x: 48, y: 50, support: 71, weight: 14 },
    { name: "Southern Africa", x: 56, y: 70, support: 64, weight: 10 },
    { name: "EU-West", x: 52, y: 30, support: 79, weight: 22 },
    { name: "South Asia", x: 72, y: 48, support: 58, weight: 16 },
    { name: "Latin America", x: 28, y: 60, support: 74, weight: 12 },
    { name: "North America", x: 22, y: 32, support: 53, weight: 20 },
    { name: "Pacific", x: 88, y: 65, support: 67, weight: 8 },
  ];
  return (
    <div className="relative h-72 rounded-md border border-border bg-background/40 overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute inset-x-0 top-1/2 scan-line" />
      {regions.map((r) => {
        const size = 8 + r.weight;
        const color =
          r.support > 75 ? "var(--success)" : r.support > 60 ? "var(--primary)" : r.support > 50 ? "var(--warning)" : "var(--destructive)";
        return (
          <div
            key={r.name}
            className="absolute -translate-x-1/2 -translate-y-1/2 group"
            style={{ left: `${r.x}%`, top: `${r.y}%` }}
          >
            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: color, opacity: 0.25, width: size, height: size }} />
            <span className="block rounded-full" style={{ background: color, width: size, height: size, boxShadow: `0 0 16px ${color}` }} />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] mono opacity-0 group-hover:opacity-100 transition bg-popover border border-border px-2 py-1 rounded">
              {r.name} · {r.support}% support
            </div>
          </div>
        );
      })}
      <div className="absolute bottom-3 left-3 flex items-center gap-3 text-[10px] mono text-muted-foreground">
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-success" /> &gt;75%</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-primary" /> 60–75%</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-warning" /> 50–60%</span>
        <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-destructive" /> &lt;50%</span>
      </div>
    </div>
  );
}

function ExplainabilityCard() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <div className="text-[10px] mono text-muted-foreground tracking-widest mb-1">AI DECISION</div>
        <p className="text-base leading-snug">
          “Allocate water restoration funding to <span className="text-primary">Kibera Zone B</span>.”
        </p>
        <div className="mt-4 text-[10px] mono text-muted-foreground tracking-widest mb-2">REASONING</div>
        <ul className="space-y-1.5 text-sm">
          <li className="flex justify-between"><span>Water contamination risk</span><span className="text-destructive mono">↑ 32%</span></li>
          <li className="flex justify-between"><span>Child disease incidence</span><span className="text-warning mono">↑ 18%</span></li>
          <li className="flex justify-between"><span>Ecosystem degradation score</span><span className="text-destructive mono">CRITICAL</span></li>
          <li className="flex justify-between"><span>Local stewardship readiness</span><span className="text-success mono">HIGH</span></li>
        </ul>
      </div>
      <div>
        <div className="rounded-md border border-border p-3 bg-background/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] mono text-muted-foreground tracking-widest">CONFIDENCE</span>
            <span className="stat-num text-xl">87%</span>
          </div>
          <Bar value={87} tone="success" />
        </div>
        <div className="mt-3 rounded-md border border-border p-3 bg-background/40">
          <div className="text-[10px] mono text-muted-foreground tracking-widest mb-2">POTENTIAL RISKS</div>
          <ul className="space-y-1.5 text-xs">
            <li className="flex items-center gap-2"><AlertTriangle className="size-3 text-warning" /> Funding concentration imbalance</li>
            <li className="flex items-center gap-2"><AlertTriangle className="size-3 text-warning" /> Data freshness warning (sensor #142)</li>
            <li className="flex items-center gap-2"><TrendingUp className="size-3 text-info" /> 2 alternative outcomes available</li>
          </ul>
        </div>
        <div className="mt-3 flex items-center justify-between text-[10px] mono text-muted-foreground">
          <span>DATA PROVENANCE: 14 sources · 3 verified</span>
          <span>BIAS: 0.08 (low)</span>
        </div>
      </div>
    </div>
  );
}

function SentimentBars() {
  const data = [
    { region: "East Africa", trust: 78, dissent: 12 },
    { region: "EU-West", trust: 71, dissent: 18 },
    { region: "South Asia", trust: 56, dissent: 28 },
    { region: "Latin America", trust: 68, dissent: 19 },
    { region: "North America", trust: 49, dissent: 36 },
    { region: "Pacific", trust: 64, dissent: 14 },
  ];
  return (
    <div className="space-y-3">
      {data.map((d) => (
        <div key={d.region}>
          <div className="flex justify-between text-[11px] mono text-muted-foreground mb-1">
            <span>{d.region}</span>
            <span>{d.trust}% trust · {d.dissent}% dissent</span>
          </div>
          <div className="flex h-2 rounded overflow-hidden bg-muted">
            <div className="bg-success" style={{ width: `${d.trust}%` }} />
            <div className="bg-destructive/70" style={{ width: `${d.dissent}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const proposals = [
  { id: "P-218", title: "Nairobi Water Restoration — Phase II funding", status: "VOTING", tone: "primary" as const, forPct: 71 },
  { id: "P-217", title: "Constitutional amendment: AI moratorium clause", status: "DEBATE", tone: "warning" as const, forPct: 52 },
  { id: "P-216", title: "Sanction validator V-099 for policy P-014 breach", status: "VOTING", tone: "primary" as const, forPct: 84 },
  { id: "P-215", title: "Open biodiversity dataset to public researchers", status: "QUEUED", tone: "info" as const, forPct: 63 },
];

const risks = [
  { title: "Power concentration anomaly — top 3 delegates control 41% vote weight", region: "Global", time: "12m ago", tone: "danger", level: "CRITICAL" },
  { title: "AI model drift detected — recommendation bias rising", region: "Model v3.2", time: "47m ago", tone: "danger", level: "HIGH" },
  { title: "Treasury flow irregularity — Kenya Regen Fund", region: "Treasury", time: "2h ago", tone: "warning", level: "WATCH" },
  { title: "Quorum participation declining in EU-West", region: "EU-West", time: "5h ago", tone: "warning", level: "WATCH" },
  { title: "New jurisdiction onboarded — Pacific Council", region: "Pacific", time: "1d ago", tone: "info", level: "INFO" },
];

const feed = [
  { t: "14:02:11", msg: "Disclosure published — Q3 ecological impact report (12.4 MB)" },
  { t: "13:48:55", msg: "Proposal P-218 anchored to chain · merkle 0x9f3a…b21" },
  { t: "13:31:02", msg: "Audit reconstruction completed for AI trace #A91-021" },
  { t: "12:09:40", msg: "Consent renewed — Mathare community sensor network" },
  { t: "11:55:18", msg: "Treasury outflow approved — 240,000 ASN to verified contractors" },
];
