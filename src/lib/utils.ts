export { cn } from "cn";

const LAND_TYPES = new Set(["PLOT", "AGRICULTURAL", "FARM", "INDUSTRIAL", "COMMERCIAL"]);

export function isLandType(type?: string | null) {
  return !!type && LAND_TYPES.has(type);
}

export function formatPrice(value: number, listingType?: "SALE" | "RENT") {
  const formatted = formatInr(value);
  return listingType === "RENT" ? `${formatted}/mo` : formatted;
}

export function formatInr(value: number) {
  if (value >= 10_000_000) {
    const crores = value / 10_000_000;
    const text = Number.isInteger(crores) ? String(crores) : crores.toFixed(2).replace(/\.?0+$/, "");
    return `₹${text} Cr`;
  }
  if (value >= 100_000) {
    const lakhs = value / 100_000;
    const text = Number.isInteger(lakhs) ? String(lakhs) : lakhs.toFixed(2).replace(/\.?0+$/, "");
    return `₹${text} L`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-IN").format(value);
}

export function formatArea(value: number, unit?: string | null) {
  const labels: Record<string, string> = {
    CENTS: value === 1 ? "cent" : "cents",
    ACRES: value === 1 ? "acre" : "acres",
    SQFT: "sq.ft",
  };
  return `${formatNumber(value)} ${labels[unit ?? "CENTS"] ?? "cents"}`;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const PROPERTY_TYPE_LABELS: Record<string, string> = {
  PLOT: "Residential plot",
  AGRICULTURAL: "Agricultural land",
  FARM: "Farm land",
  INDUSTRIAL: "Industrial land",
  COMMERCIAL: "Commercial plot",
  HOUSE: "House",
  APARTMENT: "Apartment",
};

export const HOME_TYPES = ["HOUSE", "APARTMENT"] as const;

export const LISTING_TYPE_LABELS: Record<string, string> = {
  SALE: "For sale",
  RENT: "For rent",
};

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Active",
  PENDING: "Pending",
  SOLD: "Sold",
};

export const AREA_UNIT_LABELS: Record<string, string> = {
  CENTS: "Cents",
  ACRES: "Acres",
  SQFT: "Sq.ft",
};

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
