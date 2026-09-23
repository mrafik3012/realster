import "server-only";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma";

export const PAGE_SIZE = 9;

export type PropertyFilters = {
  q?: string;
  city?: string;
  category?: string;
  propertyType?: string;
  listingType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  page?: number;
};

function buildWhere(filters: PropertyFilters): Prisma.PropertyWhereInput {
  const where: Prisma.PropertyWhereInput = {};

  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q } },
      { city: { contains: filters.q } },
      { address: { contains: filters.q } },
      { state: { contains: filters.q } },
    ];
  }
  if (filters.city) where.city = { equals: filters.city };
  if (filters.propertyType) {
    where.propertyType = filters.propertyType as Prisma.EnumPropertyTypeFilter["equals"];
  } else if (filters.category === "land") {
    where.propertyType = { in: ["PLOT", "AGRICULTURAL", "FARM", "INDUSTRIAL", "COMMERCIAL"] };
  } else if (filters.category === "homes") {
    where.propertyType = { in: ["HOUSE", "APARTMENT"] };
  }
  if (filters.listingType) where.listingType = filters.listingType as Prisma.EnumListingTypeFilter["equals"];
  if (filters.bedrooms) where.bedrooms = { gte: filters.bedrooms };
  if (filters.minPrice || filters.maxPrice) {
    where.price = {
      ...(filters.minPrice ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice ? { lte: filters.maxPrice } : {}),
    };
  }

  return where;
}

export async function getProperties(filters: PropertyFilters = {}) {
  const page = Math.max(1, filters.page ?? 1);
  const where = buildWhere(filters);

  const [items, total] = await Promise.all([
    prisma.property.findMany({
      where,
      include: { images: { orderBy: { position: "asc" }, take: 1 }, agent: true },
      orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.property.count({ where }),
  ]);

  return {
    items,
    total,
    page,
    pageCount: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function getFeaturedProperties(limit = 6, category?: "land" | "homes") {
  const typeFilter =
    category === "land"
      ? { in: ["PLOT", "AGRICULTURAL", "FARM", "INDUSTRIAL", "COMMERCIAL"] as const }
      : category === "homes"
        ? { in: ["HOUSE", "APARTMENT"] as const }
        : undefined;

  return prisma.property.findMany({
    where: {
      featured: true,
      status: "ACTIVE",
      ...(typeFilter ? { propertyType: typeFilter } : {}),
    },
    include: { images: { orderBy: { position: "asc" }, take: 1 }, agent: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getPropertyBySlug(slug: string) {
  return prisma.property.findUnique({
    where: { slug },
    include: { images: { orderBy: { position: "asc" } }, agent: true },
  });
}

export async function getSimilarProperties(propertyId: string, city: string, propertyType: string) {
  return prisma.property.findMany({
    where: {
      id: { not: propertyId },
      OR: [{ city }, { propertyType: propertyType as Prisma.EnumPropertyTypeFilter["equals"] }],
    },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
}

export async function getDistinctCities() {
  const rows = await prisma.property.findMany({
    select: { city: true, state: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });
  return rows;
}

export async function getPropertiesForAgent(agentId: string) {
  return prisma.property.findMany({
    where: { agentId },
    include: { images: { orderBy: { position: "asc" }, take: 1 } },
    orderBy: { createdAt: "desc" },
  });
}

export async function getPropertyForAgentEdit(propertyId: string, agentId: string) {
  return prisma.property.findFirst({
    where: { id: propertyId, agentId },
    include: { images: { orderBy: { position: "asc" } } },
  });
}
