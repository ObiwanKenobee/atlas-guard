import { Link, useRouterState } from "@tanstack/react-router";
import {
  Vote, ScrollText, ShieldCheck, Eye, FileSearch, ScanEye,
  Users2, Wallet, BrainCircuit, Scale, Activity,
} from "lucide-react";

const nav = [
  { to: "/", label: "Overview", icon: Activity },
  { to: "/voting", label: "Voting", icon: Vote },
  { to: "/explainability", label: "AI Explainability", icon: BrainCircuit },
  { to: "/policy", label: "Policy Engine", icon: ScrollText },
  { to: "/transparency", label: "Transparency", icon: Eye },
  { to: "/rights", label: "Human Rights", icon: ShieldCheck },
  { to: "/audit", label: "Audit Logs", icon: FileSearch },
  { to: "/consent", label: "Consent", icon: ScanEye },
  { to: "/reputation", label: "Reputation", icon: Users2 },
  { to: "/treasury", label: "Treasury", icon: Wallet },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen flex flex-col">
      <StatusBar />
      <div className="flex flex-1 min-h-0">
        <aside className="w-60 shrink-0 border-r border-border bg-surface/60 backdrop-blur">
          <div className="px-4 py-5 border-b border-border">
            <div className="flex items-center gap-2">
              <Scale className="size-5 text-primary" />
              <div>
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground">ATLAS SANCTUM</div>
                <div className="text-sm font-display">Governance & Ethics</div>
              </div>
            </div>
          </div>
          <nav className="p-2 space-y-0.5">
            {nav.map((item) => {
              const active = item.to === "/" ? path === "/" : path.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors ${
                    active
                      ? "bg-primary/10 text-primary border-l-2 border-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated border-l-2 border-transparent"
                  }`}
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="p-3 mt-4 mx-2 panel">
            <div className="text-[10px] tracking-[0.18em] text-muted-foreground mb-1">LEGITIMACY INDEX</div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl stat-num text-primary">82.4</span>
              <span className="text-xs text-muted-foreground">/100</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
              <div className="h-full bg-primary" style={{ width: "82%" }} />
            </div>
            <div className="mt-2 text-[10px] text-success">+1.2 vs last cycle</div>
          </div>
        </aside>
        <main className="flex-1 min-w-0 overflow-auto">{children}</main>
      </div>
      <EventTicker />
    </div>
  );
}

function StatusBar() {
  const items = [
    { k: "QUORUM", v: "67.3%", tone: "text-success" },
    { k: "ACTIVE PROPOSALS", v: "14" },
    { k: "OPEN AUDITS", v: "3", tone: "text-warning" },
    { k: "RIGHTS ALERTS", v: "2", tone: "text-destructive" },
    { k: "AI DECISIONS / 24H", v: "8,412" },
    { k: "JURISDICTIONS", v: "47" },
  ];
  return (
    <div className="border-b border-border bg-surface/80 backdrop-blur">
      <div className="flex items-center gap-6 px-4 h-10 text-xs">
        <div className="flex items-center gap-2">
          <span className="pulse-dot" />
          <span className="mono text-muted-foreground tracking-widest">SYSTEM NOMINAL</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-6 overflow-hidden">
          {items.map((i) => (
            <div key={i.k} className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="text-[10px] tracking-[0.18em] text-muted-foreground">{i.k}</span>
              <span className={`stat-num ${i.tone ?? "text-foreground"}`}>{i.v}</span>
            </div>
          ))}
        </div>
        <div className="ml-auto mono text-muted-foreground text-[11px]">
          UTC {new Date().toISOString().slice(11, 19)}
        </div>
      </div>
    </div>
  );
}

function EventTicker() {
  const events = [
    "PROPOSAL #218 quorum reached — Nairobi Water Restoration",
    "AI DECISION traced — model v3.2 confidence 87% — Kibera Zone B",
    "AUDIT anchor 0x9f3a…b21 committed to chain",
    "RIGHTS alert: surveillance signal anomaly — Region EU-West",
    "POLICY P-014 enforced — sanction issued to validator V-099",
    "CONSENT renewed — Mathare community sensor network",
  ];
  const stream = [...events, ...events];
  return (
    <div className="border-t border-border bg-surface/80">
      <div className="flex items-center gap-3 h-9 px-4 overflow-hidden">
        <span className="text-[10px] tracking-[0.18em] text-muted-foreground shrink-0">LIVE EVENT TIMELINE</span>
        <div className="flex-1 overflow-hidden relative">
          <div className="ticker flex gap-10 whitespace-nowrap text-xs mono text-muted-foreground">
            {stream.map((e, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-primary" />
                {e}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
