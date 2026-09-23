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
          ? "flex w-full flex-col gap-2 rounded-2xl bg-[var(--color-surface)]/95 p-3 shadow-xl backdrop-blur sm:flex-row sm:items-center"
          : "flex w-full flex-col gap-2 sm:flex-row sm:items-center"
      }
    >
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          name="q"
          placeholder="Pollachi, Sulur, Annur, survey number…"
          className="h-10 border-transparent bg-muted pl-9 text-foreground focus-visible:border-ring"
        />
      </div>

      <select name="propertyType" defaultValue="" className={selectClass} aria-label="Land type">
        <option value="">All land types</option>
        <option value="PLOT">Residential plot</option>
        <option value="AGRICULTURAL">Agricultural land</option>
        <option value="FARM">Farm land</option>
        <option value="INDUSTRIAL">Industrial land</option>
        <option value="COMMERCIAL">Commercial plot</option>
        <option value="HOUSE">House</option>
      </select>

      <select name="listingType" defaultValue="SALE" className={selectClass} aria-label="For sale or lease">
        <option value="SALE">For sale</option>
        <option value="RENT">For lease</option>
        <option value="">Sale or lease</option>
      </select>

      <Button type="submit" size="lg" className="h-10 gap-1.5">
        <Search className="size-4" />
        Search land
      </Button>
    </form>
  );
}
