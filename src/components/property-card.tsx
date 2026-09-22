import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Ruler, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  formatNumber,
  formatPrice,
  LISTING_TYPE_LABELS,
  PROPERTY_TYPE_LABELS,
} from "@/lib/utils";

export type PropertyCardData = {
  slug: string;
  title: string;
  price: number;
  listingType: string;
  propertyType: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  city: string;
  state: string;
  featured: boolean;
  images: { url: string; alt: string }[];
};

export function PropertyCard({ property }: { property: PropertyCardData }) {
  const cover = property.images[0];

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            No photo available
          </div>
        )}
        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge variant="secondary">{LISTING_TYPE_LABELS[property.listingType]}</Badge>
          {property.featured && <Badge>Featured</Badge>}
          {property.status === "SOLD" && (
            <Badge variant="outline" className="bg-background">
              Sold
            </Badge>
          )}
          {property.status === "PENDING" && (
            <Badge variant="outline" className="bg-background">
              Pending
            </Badge>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <p className="font-heading text-lg font-semibold text-foreground">
            {formatPrice(property.price, property.listingType as "SALE" | "RENT")}
          </p>
          <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
            {PROPERTY_TYPE_LABELS[property.propertyType]}
          </span>
        </div>

        <h3 className="line-clamp-1 font-heading text-base font-semibold text-foreground">
          {property.title}
        </h3>

        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          <span className="line-clamp-1">
            {property.city}, {property.state}
          </span>
        </p>

        <div className="mt-auto flex items-center gap-4 border-t border-border pt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Bed className="size-4" /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath className="size-4" /> {property.bathrooms}
          </span>
          <span className="flex items-center gap-1">
            <Ruler className="size-4" /> {formatNumber(property.areaSqft)} sqft
          </span>
        </div>
      </div>
    </Link>
  );
}
