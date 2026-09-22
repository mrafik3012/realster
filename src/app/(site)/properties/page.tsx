import type { Metadata } from "next";
import { PropertyCard } from "@/components/property-card";
import { PropertyFiltersBar } from "@/components/property-filters";
import { PropertyPagination } from "@/components/property-pagination";
import { getProperties, getDistinctCities } from "@/lib/data/properties";

export const metadata: Metadata = {
  title: "Properties for sale and rent",
  description: "Browse verified property listings from Realster agents.",
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;

  const q = first(sp.q) || undefined;
  const city = first(sp.city) || undefined;
  const propertyType = first(sp.propertyType) || undefined;
  const listingType = first(sp.listingType) || undefined;
  const minPrice = first(sp.minPrice) ? Number(first(sp.minPrice)) : undefined;
  const maxPrice = first(sp.maxPrice) ? Number(first(sp.maxPrice)) : undefined;
  const bedrooms = first(sp.bedrooms) ? Number(first(sp.bedrooms)) : undefined;
  const page = first(sp.page) ? Number(first(sp.page)) : 1;

  const filters = { q, city, propertyType, listingType, minPrice, maxPrice, bedrooms, page };

  const [{ items, total, pageCount }, cities] = await Promise.all([
    getProperties(filters),
    getDistinctCities(),
  ]);

  const baseParams: Record<string, string | undefined> = {
    q,
    city,
    propertyType,
    listingType,
    minPrice: minPrice?.toString(),
    maxPrice: maxPrice?.toString(),
    bedrooms: bedrooms?.toString(),
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
          Properties
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {total} {total === 1 ? "listing" : "listings"} match your search.
        </p>
      </div>

      <div className="mb-8">
        <PropertyFiltersBar filters={filters} cities={cities} />
      </div>

      {items.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          <div className="mt-10">
            <PropertyPagination page={page} pageCount={pageCount} baseParams={baseParams} />
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-12 text-center">
          <p className="font-medium text-foreground">No properties match those filters.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try widening your price range or clearing a filter.
          </p>
        </div>
      )}
    </div>
  );
}
