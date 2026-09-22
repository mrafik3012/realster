export { cn } from "cn";

export function formatPrice(value: number, listingType?: "SALE" | "RENT") {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
  return listingType === "RENT" ? `${formatted}/mo` : formatted;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
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
  HOUSE: "House",
  APARTMENT: "Apartment",
  CONDO: "Condo",
  TOWNHOUSE: "Townhouse",
  LAND: "Land",
  COMMERCIAL: "Commercial",
};

export const LISTING_TYPE_LABELS: Record<string, string> = {
  SALE: "For Sale",
  RENT: "For Rent",
};

export const STATUS_LABELS: Record<string, string> = {
  ACTIVE: "Active",
  PENDING: "Pending",
  SOLD: "Sold",
};

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
