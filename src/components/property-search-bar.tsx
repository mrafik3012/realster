import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const selectClass =
  "h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function PropertySearchBar({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  return (
    <form
      action="/properties"
      method="get"
      className={
        variant === "hero"
          ? "flex w-full flex-col gap-2 rounded-2xl bg-white/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center"
          : "flex w-full flex-col gap-2 sm:flex-row sm:items-center"
      }
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="q"
          placeholder="City, neighborhood, or address"
          className="h-10 border-transparent bg-muted pl-9 text-foreground focus-visible:border-ring"
        />
      </div>

      <select name="listingType" defaultValue="" className={selectClass} aria-label="For sale or rent">
        <option value="">Buy or rent</option>
        <option value="SALE">For sale</option>
        <option value="RENT">For rent</option>
      </select>

      <select name="propertyType" defaultValue="" className={selectClass} aria-label="Property type">
        <option value="">Property type</option>
        <option value="HOUSE">House</option>
        <option value="APARTMENT">Apartment</option>
        <option value="CONDO">Condo</option>
        <option value="TOWNHOUSE">Townhouse</option>
        <option value="LAND">Land</option>
        <option value="COMMERCIAL">Commercial</option>
      </select>

      <Button type="submit" size="lg" className="h-10 gap-1.5">
        <Search className="size-4" />
        Search
      </Button>
    </form>
  );
}
