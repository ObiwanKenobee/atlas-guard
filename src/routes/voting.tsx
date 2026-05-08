import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag, Bar } from "@/components/Panel";
import { CheckCircle2, Clock, Users } from "lucide-react";

export const Route = createFileRoute("/voting")({
  head: () => ({
    meta: [
      { title: "Voting Arena — Atlas Sanctum Governance" },
      { name: "description", content: "Quadratic, delegated, and constitutional voting across the Atlas Sanctum ecosystem." },
    ],
  }),
  component: () => <AppShell><Voting /></AppShell>,
});

const proposals = [
  { id: "P-218", title: "Nairobi Water Restoration — Phase II funding", category: "Treasury", forPct: 71, against: 18, abstain: 11, voters: 14802, ends: "1d 04h", quorum: 78, type: "Quadratic" },
  { id: "P-217", title: "Constitutional amendment: AI moratorium clause", category: "Constitutional", forPct: 52, against: 41, abstain: 7, voters: 22014, ends: "3d 11h", quorum: 91, type: "Supermajority" },
  { id: "P-216", title: "Sanction validator V-099 for policy P-014 breach", category: "Enforcement", forPct: 84, against: 9, abstain: 7, voters: 9210, ends: "0d 06h", quorum: 64, type: "Delegated" },
  { id: "P-215", title: "Open biodiversity dataset to public researchers", category: "Transparency", forPct: 63, against: 22, abstain: 15, voters: 5402, ends: "5d 02h", quorum: 41, type: "Quadratic" },
];

function Voting() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        eyebrow="MODULE · DEMOCRATIC COORDINATION"
        title="Voting Arena"
        description="Active proposals, quorum status, and delegated authority across regional and constitutional layers."
        actions={<button className="px-3 py-2 text-xs mono tracking-wider uppercase rounded-md bg-primary text-primary-foreground">+ New Proposal</button>}
      />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 grid md:grid-cols-4 gap-4">
          <MiniStat label="Active proposals" value="14" />
          <MiniStat label="Quorum (avg)" value="67.3%" tone="text-success" />
          <MiniStat label="Voter participation 30d" value="58.1%" />
          <MiniStat label="Delegations" value="2,418" />
        </div>

        <Panel className="col-span-12 lg:col-span-8" title="Active Proposals">
          <ul className="divide-y divide-border -mx-4">
            {proposals.map((p) => (
              <li key={p.id} className="px-4 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] mono text-muted-foreground">{p.id}</span>
                    <Tag tone="primary">{p.type}</Tag>
                    <Tag>{p.category}</Tag>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] mono text-muted-foreground">
                    <span className="flex items-center gap-1"><Users className="size-3" />{p.voters.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock className="size-3" />{p.ends}</span>
                  </div>
                </div>
                <div className="text-sm mb-3">{p.title}</div>
                <div className="flex h-2 rounded overflow-hidden bg-muted mb-2">
                  <div className="bg-success" style={{ width: `${p.forPct}%` }} />
                  <div className="bg-destructive/70" style={{ width: `${p.against}%` }} />
                  <div className="bg-muted-foreground/40" style={{ width: `${p.abstain}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] mono text-muted-foreground">
                  <div className="flex gap-4">
                    <span className="text-success">FOR {p.forPct}%</span>
                    <span className="text-destructive">AGAINST {p.against}%</span>
                    <span>ABSTAIN {p.abstain}%</span>
                  </div>
                  <span>QUORUM {p.quorum}%</span>
                </div>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="col-span-12 lg:col-span-4 space-y-4">
          <Panel title="Voting Eligibility">
            <div className="text-sm">You are eligible to vote in <span className="text-primary stat-num">11</span> active proposals.</div>
            <div className="mt-3 space-y-2 text-xs">
              <Row label="Identity verified" v={<Tag tone="success">VERIFIED</Tag>} />
              <Row label="Region" v="East Africa · Nairobi" />
              <Row label="Voting weight" v={<span className="mono">1.00</span>} />
              <Row label="Delegated to" v={<span className="mono">— self —</span>} />
            </div>
          </Panel>

          <Panel title="Consensus Visualization" subtitle="P-217 · constitutional">
            <ConsensusRing forPct={52} against={41} abstain={7} />
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Row({ label, v }: { label: string; v: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center"><span className="text-muted-foreground">{label}</span>{v}</div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="panel p-4">
      <div className="text-[10px] tracking-[0.18em] text-muted-foreground">{label}</div>
      <div className={`mt-2 stat-num text-2xl ${tone ?? ""}`}>{value}</div>
    </div>
  );
}

function ConsensusRing({ forPct, against, abstain }: { forPct: number; against: number; abstain: number }) {
  const C = 2 * Math.PI * 60;
  const segs = [
    { v: forPct, color: "var(--success)" },
    { v: against, color: "var(--destructive)" },
    { v: abstain, color: "var(--muted-foreground)" },
  ];
  let offset = 0;
  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 160 160" className="w-40 h-40 -rotate-90">
        <circle cx="80" cy="80" r="60" fill="none" stroke="var(--muted)" strokeWidth="14" />
        {segs.map((s, i) => {
          const len = (s.v / 100) * C;
          const el = (
            <circle key={i} cx="80" cy="80" r="60" fill="none" stroke={s.color} strokeWidth="14"
              strokeDasharray={`${len} ${C - len}`} strokeDashoffset={-offset} />
          );
          offset += len;
          return el;
        })}
      </svg>
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-success" />For <span className="ml-auto mono">{forPct}%</span></div>
        <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-destructive" />Against <span className="ml-auto mono">{against}%</span></div>
        <div className="flex items-center gap-2"><span className="size-2 rounded-full bg-muted-foreground" />Abstain <span className="ml-auto mono">{abstain}%</span></div>
        <div className="pt-2 mt-2 border-t border-border text-[11px] text-warning flex items-center gap-1"><CheckCircle2 className="size-3" /> Supermajority not yet reached</div>
      </div>
    </div>
  );
}
