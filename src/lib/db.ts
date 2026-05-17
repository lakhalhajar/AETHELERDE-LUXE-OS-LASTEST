export type PropertyStatus = "active" | "pending" | "sold" | "off-market";

export interface Property {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  price: number;
  status: PropertyStatus;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  listingDate: string;
  agent: string;
  featured: boolean;
}

export type LeadStatus = "hot" | "warm" | "cold" | "closed";

export interface ClientLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  interest: string;
  budget: number;
  transactionScore: number;
  status: LeadStatus;
  lastContact: string;
  assignedAgent: string;
}

export interface DashboardMetrics {
  totalPortfolioValue: number;
  activeListings: number;
  totalLeads: number;
  avgTransactionScore: number;
  monthlyInquiries: number;
  conversionRate: number;
  yoyGrowth: number;
}

export interface MarketSnapshot {
  month: string;
  inquiries: number;
  closings: number;
  volume: number;
}

const properties: Property[] = [
  {
    id: "prop-001",
    title: "Azure Penthouse — Sovereign Tower",
    location: "Dubai Marina",
    city: "Dubai",
    country: "UAE",
    price: 24800000,
    status: "active",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 12400,
    listingDate: "2026-03-12",
    agent: "Elena Voss",
    featured: true,
  },
  {
    id: "prop-002",
    title: "Obsidian Villa — Cap Ferrat",
    location: "Saint-Jean-Cap-Ferrat",
    city: "Nice",
    country: "France",
    price: 67500000,
    status: "active",
    bedrooms: 8,
    bathrooms: 10,
    sqft: 28600,
    listingDate: "2026-02-28",
    agent: "Marcus Hale",
    featured: true,
  },
  {
    id: "prop-003",
    title: "Noir Residence — Bel Air Crest",
    location: "Bel Air",
    city: "Los Angeles",
    country: "USA",
    price: 38900000,
    status: "pending",
    bedrooms: 7,
    bathrooms: 9,
    sqft: 18200,
    listingDate: "2026-01-19",
    agent: "Sienna Drake",
    featured: false,
  },
  {
    id: "prop-004",
    title: "Meridian Loft — Mayfair",
    location: "Grosvenor Square",
    city: "London",
    country: "UK",
    price: 14200000,
    status: "active",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 6800,
    listingDate: "2026-04-02",
    agent: "Elena Voss",
    featured: false,
  },
  {
    id: "prop-005",
    title: "Celestial Estate — Lake Como",
    location: "Torno",
    city: "Como",
    country: "Italy",
    price: 52100000,
    status: "sold",
    bedrooms: 9,
    bathrooms: 11,
    sqft: 32100,
    listingDate: "2025-11-08",
    agent: "Marcus Hale",
    featured: true,
  },
  {
    id: "prop-006",
    title: "Helix Sky Residence — Hudson Yards",
    location: "Manhattan West",
    city: "New York",
    country: "USA",
    price: 29500000,
    status: "active",
    bedrooms: 6,
    bathrooms: 7,
    sqft: 9800,
    listingDate: "2026-03-30",
    agent: "Sienna Drake",
    featured: false,
  },
];

const clientLeads: ClientLead[] = [
  {
    id: "lead-001",
    name: "Victoria Ashford",
    email: "v.ashford@sterlingholdings.com",
    phone: "+44 7700 900441",
    interest: "Cap Ferrat waterfront estate",
    budget: 80000000,
    transactionScore: 94,
    status: "hot",
    lastContact: "2026-05-16",
    assignedAgent: "Marcus Hale",
  },
  {
    id: "lead-002",
    name: "Kenji Mori",
    email: "k.mori@aethelcapital.jp",
    phone: "+81 90 1234 8890",
    interest: "Dubai Marina ultra-lux penthouse",
    budget: 30000000,
    transactionScore: 88,
    status: "hot",
    lastContact: "2026-05-15",
    assignedAgent: "Elena Voss",
  },
  {
    id: "lead-003",
    name: "Amelia Roth",
    email: "amelia.roth@nexusholdings.io",
    phone: "+1 310 555 0192",
    interest: "Bel Air crest compound",
    budget: 45000000,
    transactionScore: 76,
    status: "warm",
    lastContact: "2026-05-12",
    assignedAgent: "Sienna Drake",
  },
  {
    id: "lead-004",
    name: "Henrik Lund",
    email: "henrik.lund@nordicprime.se",
    phone: "+46 70 555 2211",
    interest: "Mayfair heritage loft",
    budget: 18000000,
    transactionScore: 62,
    status: "warm",
    lastContact: "2026-05-10",
    assignedAgent: "Elena Voss",
  },
  {
    id: "lead-005",
    name: "Isabelle Chen",
    email: "isabelle.chen@meridianvc.com",
    phone: "+1 212 555 8844",
    interest: "Hudson Yards sky residence",
    budget: 32000000,
    transactionScore: 91,
    status: "hot",
    lastContact: "2026-05-17",
    assignedAgent: "Sienna Drake",
  },
  {
    id: "lead-006",
    name: "Oliver Grant",
    email: "oliver.grant@grantfamily.trust",
    phone: "+39 335 882 1100",
    interest: "Lake Como private estate",
    budget: 55000000,
    transactionScore: 41,
    status: "cold",
    lastContact: "2026-04-28",
    assignedAgent: "Marcus Hale",
  },
];

const marketSnapshots: MarketSnapshot[] = [
  { month: "Jan", inquiries: 42, closings: 8, volume: 128000000 },
  { month: "Feb", inquiries: 51, closings: 11, volume: 164000000 },
  { month: "Mar", inquiries: 48, closings: 9, volume: 142000000 },
  { month: "Apr", inquiries: 63, closings: 14, volume: 198000000 },
  { month: "May", inquiries: 71, closings: 12, volume: 176000000 },
];

export function getProperties(): Property[] {
  return [...properties];
}

export function getFeaturedProperties(): Property[] {
  return properties.filter((p) => p.featured);
}

export function getClientLeads(): ClientLead[] {
  return [...clientLeads].sort((a, b) => b.transactionScore - a.transactionScore);
}

export function getMarketSnapshots(): MarketSnapshot[] {
  return [...marketSnapshots];
}

export function getDashboardMetrics(): DashboardMetrics {
  const activeListings = properties.filter((p) => p.status === "active").length;
  const totalPortfolioValue = properties
    .filter((p) => p.status === "active" || p.status === "pending")
    .reduce((sum, p) => sum + p.price, 0);
  const totalLeads = clientLeads.length;
  const avgTransactionScore =
    clientLeads.reduce((sum, l) => sum + l.transactionScore, 0) / totalLeads;
  const hotLeads = clientLeads.filter((l) => l.status === "hot").length;
  const conversionRate = (hotLeads / totalLeads) * 100;
  const monthlyInquiries = marketSnapshots[marketSnapshots.length - 1].inquiries;
  const yoyGrowth = 18.4;

  return {
    totalPortfolioValue,
    activeListings,
    totalLeads,
    avgTransactionScore,
    monthlyInquiries,
    conversionRate,
    yoyGrowth,
  };
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find((p) => p.id === id);
}

export function getLeadById(id: string): ClientLead | undefined {
  return clientLeads.find((l) => l.id === id);
}