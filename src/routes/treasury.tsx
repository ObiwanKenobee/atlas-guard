import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Panel, PageHeader, Tag } from "@/components/Panel";

export const Route = createFileRoute("/treasury")({
  head: () => ({
    meta: [
      { title: "Treasury Oversight — Atlas Sanctum" },
      { name: "description", content: "Treasury approvals, disbursements, and on-chain reconciliation." },
    ],
  }),
  component: () => <AppShell><Page /></AppShell>,
});

const queue = [
  { id: "TX-44183", to: "Kibera Water Initiative · Phase II", amount: "240,000 ASN", status: "AWAITING APPROVAL", tone: "warning", sigs: "3/5" },
  { id: "TX-44182", to: "Verified contractors · East Africa", amount: "212,400 ASN", status: "EXECUTED", tone: "success", sigs: "5/5" },
  { id: "TX-44181", to: "Pacific biodiversity grant", amount: "85,000 ASN", status: "AWAITING APPROVAL", tone: "warning", sigs: "2/5" },
  { id: "TX-44180", to: "Audit firm · Q2 attestation", amount: "12,500 ASN", status: "EXECUTED", tone: "success", sigs: "5/5" },
  { id: "TX-44179", to: "Validator V-099 · sanction recovery", amount: "−40,000 ASN", status: "QUARANTINED", tone: "danger", sigs: "—" },
];

function Page() {
  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader eyebrow="MODULE · OPERATIONAL GOVERNANCE" title="Treasury Oversight" description="Multi-signature approvals, on-chain reconciliation, and cryptographic disbursement trail." />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 grid md:grid-cols-4 gap-4">
          {[
            { l: "Total Treasury", v: "12.4M ASN" },
            { l: "Outflows 30d", v: "1.82M ASN" },
            { l: "Awaiting approvals", v: "2", tone: "text-warning" },
            { l: "Quarantined", v: "1", tone: "text-destructive" },
          ].map((k) => (
            <div key={k.l} className="panel p-4">
              <div className="text-[10px] tracking-[0.18em] text-muted-foreground">{k.l}</div>
              <div className={`mt-2 stat-num text-2xl ${k.tone ?? ""}`}>{k.v}</div>
            </div>
          ))}
        </div>

        <Panel className="col-span-12" title="Approval Queue">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] mono text-muted-foreground tracking-widest border-b border-border">
                <th className="text-left py-2 pr-4">TX</th>
                <th className="text-left py-2 pr-4">Recipient</th>
                <th className="text-left py-2 pr-4">Amount</th>
                <th className="text-left py-2 pr-4">Signatures</th>
                <th className="text-left py-2 pr-4">Status</th>
                <th className="text-right py-2"></th>
              </tr>
            </thead>
            <tbody>
              {queue.map((q) => (
                <tr key={q.id} className="border-b border-border/50 hover:bg-surface-elevated">
                  <td className="py-3 pr-4 mono text-xs text-muted-foreground">{q.id}</td>
                  <td className="py-3 pr-4">{q.to}</td>
                  <td className="py-3 pr-4 mono">{q.amount}</td>
                  <td className="py-3 pr-4 mono text-xs">{q.sigs}</td>
                  <td className="py-3 pr-4"><Tag tone={q.tone as any}>{q.status}</Tag></td>
                  <td className="py-3 text-right">
                    {q.status === "AWAITING APPROVAL" && (
                      <button className="px-3 py-1.5 text-[11px] mono uppercase rounded bg-primary text-primary-foreground">Sign</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      </div>
    </div>
  );
}
