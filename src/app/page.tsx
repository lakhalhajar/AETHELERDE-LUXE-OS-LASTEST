import { NavMenu } from "@/components/dashboard/nav-menu";
import { GlassCard } from "@/components/dashboard/glass-card";
import { PropertyTable } from "@/components/dashboard/property-table";
import { ClientLeadsTable } from "@/components/dashboard/client-leads-table";
import {
  getDashboardMetrics,
  getFeaturedProperties,
  getMarketSnapshots,
} from "@/lib/db";
import { cn, formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";
import {
  Building2,
  TrendingUp,
  Users,
  Wallet,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

export default function DashboardPage() {
  const metrics = getDashboardMetrics();
  const featured = getFeaturedProperties();
  const snapshots = getMarketSnapshots();
  const maxInquiries = Math.max(...snapshots.map((s) => s.inquiries));

  const statCards = [
    {
      label: "Portfolio Value",
      value: formatCurrency(metrics.totalPortfolioValue),
      sub: `${metrics.activeListings} active listings`,
      icon: Wallet,
    },
    {
      label: "Monthly Inquiries",
      value: String(metrics.monthlyInquiries),
      sub: `+${formatPercent(metrics.yoyGrowth)} YoY`,
      icon: TrendingUp,
    },
    {
      label: "Luxury Leads",
      value: String(metrics.totalLeads),
      sub: `${formatPercent(metrics.conversionRate)} hot conversion`,
      icon: Users,
    },
    {
      label: "Avg Transaction Score",
      value: metrics.avgTransactionScore.toFixed(0),
      sub: "CRM intelligence index",
      icon: Building2,
    },
  ];

  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
        <NavMenu />
        
        <header className="mb-8 mt-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">
            Aethelred Command
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            Elite Estate Nexus
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-foreground/60">
            Global luxury portfolio intelligence, lead orchestration, and market analytics.
          </p>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <GlassCard key={card.label} className="p-5">
              <StatBlock {...card} />
            </GlassCard>
          ))}
        </section>

        <section className="mb-8 grid gap-6 lg:grid-cols-3">
          <GlassCard className="p-6 lg:col-span-2">
            <StatBlock
              label="Market Activity"
              value="Inquiry Velocity"
              sub="Last 5 months — luxury segment"
              icon={TrendingUp}
            />
            
            <div className="mt-6 flex h-48 items-end justify-between gap-3">
              {snapshots.map((snap) => {
                const height = (snap.inquiries / maxInquiries) * 100;
                return (
                  <div key={snap.month} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className="w-full max-w-[3rem] rounded-t-md bg-gradient-to-t from-primary/30 to-primary"
                      style={{ height: `${Math.max(height, 8)}%` }}
                      title={`${snap.inquiries} inquiries · ${formatCompactNumber(snap.volume)} volume`}
                    />
                    <span className="text-xs text-foreground/50">{snap.month}</span>
                    <span className="text-[10px] text-foreground/40">{snap.inquiries}</span>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h2 className="text-sm font-semibold">Featured Assets</h2>
            <p className="mt-1 text-xs text-foreground/50">Curated ultra-luxury inventory</p>
            <ul className="mt-5 space-y-4">
              {featured.map((property) => (
                <li
                  key={property.id}
                  className="rounded-lg border border-white/10 bg-white/5 p-3 transition-colors hover:bg-white/[0.07]"
                >
                  <p className="text-sm font-medium">{property.title}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-foreground/50">
                    <MapPin className="h-3 w-3" />
                    {property.city}, {property.country}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-semibold text-primary">
                      {formatCurrency(property.price)}
                    </span>
                    <StatusBadge status={property.status} />
                  </div>
                </li>
              ))}
            </ul>
          </GlassCard>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.slice(0, 3).map((property) => (
            <GlassCard key={property.id} className="p-5">
              <p className="text-xs uppercase tracking-wider text-foreground/50">
                {property.location}
              </p>
              <h3 className="mt-1 text-sm font-semibold leading-snug">{property.title}</h3>
              <p className="mt-1 text-xs text-foreground/50">
                {property.bedrooms} bed · {property.sqft.toLocaleString()} sqft
              </p>
              <div className="mt-4 flex items-end justify-between">
                <div>
                  <p className="text-lg font-semibold text-primary">
                    {formatCurrency(property.price)}
                  </p>
                  <p className="text-xs text-foreground/50">Agent: {property.agent}</p>
                </div>
                <button
                  type="button"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-foreground/70 transition hover:bg-white/10"
                  aria-label={`View ${property.title}`}
                >
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </GlassCard>
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <GlassCard className="overflow-hidden p-0">
            <PropertyTable />
          </GlassCard>
          <GlassCard className="overflow-hidden p-0">
            <ClientLeadsTable />
          </GlassCard>
        </section>
      </div>
    </main>
  );
}

function StatBlock({
  label,
  value,
  sub,
  icon: Icon,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-foreground/50">
          {label}
        </p>
        <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
        <p className="mt-1 text-xs text-foreground/50">{sub}</p>
      </div>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wide",
        status === "active" && "bg-emerald-500/20 text-emerald-300",
        status === "pending" && "bg-amber-500/20 text-amber-300",
        status === "sold" && "bg-white/10 text-foreground/60"
      )}
    >
      {status}
    </span>
  );
}