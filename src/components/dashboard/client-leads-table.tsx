import { getClientLeads } from "@/lib/db";
import { cn, formatCurrency } from "@/lib/utils";

function scoreColor(score: number) {
  if (score >= 85) return "text-emerald-300";
  if (score >= 65) return "text-amber-300";
  return "text-foreground/50";
}

export function ClientLeadsTable() {
  const leads = getClientLeads();
  return (
    <div className="p-6">
      <h2 className="text-sm font-semibold">Client CRM Monitor</h2>
      <p className="mt-1 text-xs text-foreground/50">
        Real-time luxury transaction scores & lead status
      </p>
      
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-foreground/50">
              <th className="pb-3 pr-4 font-medium">Client</th>
              <th className="pb-3 pr-4 font-medium">Interest</th>
              <th className="pb-3 pr-4 font-medium">Budget</th>
              <th className="pb-3 pr-4 font-medium">Score</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr
                key={lead.id}
                className="border-b border-white/5 transition hover:bg-white/[0.03]"
              >
                <td className="py-3 pr-4">
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-xs text-foreground/50">{lead.email}</p>
                </td>
                <td className="max-w-[180px] truncate py-3 pr-4 text-foreground/60">
                  {lead.interest}
                </td>
                <td className="py-3 pr-4 font-medium text-primary">
                  {formatCurrency(lead.budget)}
                </td>
                <td className={cn("py-3 pr-4 font-bold tabular-nums", scoreColor(lead.transactionScore))}>
                  {lead.transactionScore}
                </td>
                <td className="py-3">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide",
                      lead.status === "hot" && "bg-rose-500/20 text-rose-300",
                      lead.status === "warm" && "bg-amber-500/20 text-amber-300",
                      lead.status === "cold" && "bg-white/10 text-foreground/50",
                      lead.status === "closed" && "bg-emerald-500/20 text-emerald-300"
                    )}
                  >
                    {lead.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}