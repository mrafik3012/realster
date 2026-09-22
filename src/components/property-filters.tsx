import Link from "next/link";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { PropertyFilters as Filters } from "@/lib/data/properties";

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
          placeholder="City, neighborhood, or address"
          className="h-10 pl-9"
        />
      </div>

      <select name="city" defaultValue={filters.city ?? ""} className={selectClass} aria-label="City">
        <option value="">All cities</option>
        {cities.map((c) => (
          <option key={c.city} value={c.city}>
            {c.city}, {c.state}
          </option>
        ))}
      </select>

      <select
        name="listingType"
        defaultValue={filters.listingType ?? ""}
        className={selectClass}
        aria-label="For sale or rent"
      >
        <option value="">Buy or rent</option>
        <option value="SALE">For sale</option>
        <option value="RENT">For rent</option>
      </select>

      <select
        name="propertyType"
        defaultValue={filters.propertyType ?? ""}
        className={selectClass}
        aria-label="Property type"
      >
        <option value="">Any type</option>
        <option value="HOUSE">House</option>
        <option value="APARTMENT">Apartment</option>
        <option value="CONDO">Condo</option>
        <option value="TOWNHOUSE">Townhouse</option>
        <option value="LAND">Land</option>
        <option value="COMMERCIAL">Commercial</option>
      </select>

      <select
        name="bedrooms"
        defaultValue={filters.bedrooms?.toString() ?? ""}
        className={selectClass}
        aria-label="Minimum bedrooms"
      >
        <option value="">Any beds</option>
        <option value="1">1+ beds</option>
        <option value="2">2+ beds</option>
        <option value="3">3+ beds</option>
        <option value="4">4+ beds</option>
        <option value="5">5+ beds</option>
      </select>

      <Input
        type="number"
        name="minPrice"
        defaultValue={filters.minPrice ?? ""}
        placeholder="Min price"
        className="h-10"
        min={0}
      />
      <Input
        type="number"
        name="maxPrice"
        defaultValue={filters.maxPrice ?? ""}
        placeholder="Max price"
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
