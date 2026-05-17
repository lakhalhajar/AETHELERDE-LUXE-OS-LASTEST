import { getProperties } from "@/lib/db";
import { cn, formatCurrency } from "@/lib/utils";

export function PropertyTable() {
  const properties = getProperties();
  return (
    <div className="p-6">
      <h2 className="text-sm font-semibold">Property Registry</h2>
      <p className="mt-1 text-xs text-foreground/50">
        Administrative listing — high-end inventory & status
      </p>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-foreground/50">
              <th className="pb-3 pr-4 font-medium">Property</th>
              <th className="pb-3 pr-4 font-medium">Location</th>
              <th className="pb-3 pr-4 font-medium">Price</th>
              <th className="pb-3 pr-4 font-medium">Agent</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr
                key={p.id}
                className="border-b border-white/5 transition hover:bg-white/[0.03]"
              >
                <td className="py-3 pr-4 font-medium">{p.title}</td>
                <td className="py-3 pr-4 text-foreground/60">
                  {p.city}, {p.country}
                </td>
                <td className="py-3 pr-4 font-semibold text-primary">
                  {formatCurrency(p.price)}
                </td>
                <td className="py-3 pr-4 text-foreground/60">{p.agent}</td>
                <td className="py-3">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide",
                      p.status === "active" && "bg-emerald-500/20 text-emerald-300",
                      p.status === "pending" && "bg-amber-500/20 text-amber-300",
                      p.status === "sold" && "bg-white/10 text-foreground/60",
                      p.status === "off-market" && "bg-white/5 text-foreground/40"
                    )}
                  >
                    {p.status}
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