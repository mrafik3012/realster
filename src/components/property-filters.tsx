import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { PropertyFilters as Filters } from "@/lib/data/properties";
import { ListingTypeOptions } from "@/components/listing-type-options";

const selectClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function PropertyFiltersBar({
  filters,
  cities,
}: {
  filters: Filters;
  cities: { city: string; state: string }[];
}) {
  return (
    <form
      action="/properties"
      method="get"
      className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-2 lg:grid-cols-6"
    >
      <div className="relative sm:col-span-2 lg:col-span-2">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="q"
          defaultValue={filters.q ?? ""}
          placeholder="Locality or survey number"
          className="h-10 pl-9"
        />
      </div>

      <select
        name="category"
        defaultValue={filters.category ?? ""}
        className={selectClass}
        aria-label="Land or homes"
      >
        <option value="">Land and homes</option>
        <option value="land">Land only</option>
        <option value="homes">Homes only</option>
      </select>

      <select name="city" defaultValue={filters.city ?? ""} className={selectClass} aria-label="Locality">
        <option value="">All Coimbatore localities</option>
        {cities.map((c) => (
          <option key={c.city} value={c.city}>
            {c.city}
          </option>
        ))}
      </select>

      <select
        name="propertyType"
        defaultValue={filters.propertyType ?? ""}
        className={selectClass}
        aria-label="Listing type"
      >
        <ListingTypeOptions />
      </select>

      <select
        name="listingType"
        defaultValue={filters.listingType ?? ""}
        className={selectClass}
        aria-label="For sale or rent"
      >
        <option value="">Sale or rent</option>
        <option value="SALE">For sale</option>
        <option value="RENT">For rent</option>
      </select>

      <select
        name="bedrooms"
        defaultValue={filters.bedrooms?.toString() ?? ""}
        className={selectClass}
        aria-label="Bedrooms"
      >
        <option value="">Any bedrooms</option>
        <option value="1">1+ bedrooms</option>
        <option value="2">2+ bedrooms</option>
        <option value="3">3+ bedrooms</option>
        <option value="4">4+ bedrooms</option>
      </select>

      <Input
        type="number"
        name="minPrice"
        defaultValue={filters.minPrice ?? ""}
        placeholder="Min ₹"
        className="h-10"
        min={0}
      />
      <Input
        type="number"
        name="maxPrice"
        defaultValue={filters.maxPrice ?? ""}
        placeholder="Max ₹"
        className="h-10"
        min={0}
      />

      <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-2">
        <Button type="submit" className="h-10 flex-1 gap-1.5">
          <Search className="size-4" />
          Apply filters
        </Button>
        <Link
          href="/properties"
          className="inline-flex h-10 items-center justify-center rounded-lg border border-border px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          Reset
        </Link>
      </div>
    </form>
  );
}
