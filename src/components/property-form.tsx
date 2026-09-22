"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import { X, UploadCloud } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import type { PropertyActionState } from "@/actions/properties";

const selectClass =
  "h-10 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

type ExistingImage = { id: string; url: string; alt: string };

type PropertyFormValues = {
  title: string;
  description: string;
  price: number;
  listingType: string;
  propertyType: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  yearBuilt: number | null;
  address: string;
  city: string;
  state: string;
  zip: string;
  featured: boolean;
  amenities: string;
};

const emptyValues: PropertyFormValues = {
  title: "",
  description: "",
  price: 0,
  listingType: "SALE",
  propertyType: "HOUSE",
  status: "ACTIVE",
  bedrooms: 3,
  bathrooms: 2,
  areaSqft: 1500,
  yearBuilt: null,
  address: "",
  city: "",
  state: "",
  zip: "",
  featured: false,
  amenities: "",
};

type FormAction = (state: PropertyActionState, formData: FormData) => Promise<PropertyActionState>;

export function PropertyForm({
  mode,
  action,
  initialValues,
  existingImages = [],
  submitLabel,
}: {
  mode: "create" | "edit";
  action: FormAction;
  initialValues?: Partial<PropertyFormValues>;
  existingImages?: ExistingImage[];
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState<PropertyActionState, FormData>(action, null);
  const values = { ...emptyValues, ...initialValues };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [removedIds, setRemovedIds] = useState<string[]>([]);

  function syncInputFiles(files: File[]) {
    if (!fileInputRef.current) return;
    const dt = new DataTransfer();
    files.forEach((file) => dt.items.add(file));
    fileInputRef.current.files = dt.files;
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const picked = Array.from(event.target.files ?? []);
    const merged = [...newFiles, ...picked];
    setNewFiles(merged);
    syncInputFiles(merged);
  }

  function removeNewFile(index: number) {
    const merged = newFiles.filter((_, i) => i !== index);
    setNewFiles(merged);
    syncInputFiles(merged);
  }

  function toggleRemoveExisting(id: string, checked: boolean) {
    setRemovedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
  }

  const visibleExisting = existingImages.filter((img) => !removedIds.includes(img.id));

  return (
    <form action={formAction} className="space-y-8">
      {state?.error && (
        <Alert variant="destructive">
          <AlertDescription>{state.error}</AlertDescription>
        </Alert>
      )}

      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Basics</h2>

        <div className="space-y-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            defaultValue={values.title}
            placeholder="e.g. Modern Hillside Retreat"
            required
          />
          {state?.fieldErrors?.title && (
            <p className="text-xs text-destructive">{state.fieldErrors.title[0]}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={values.description}
            rows={5}
            placeholder="Describe the property, its layout, and standout features."
            required
          />
          {state?.fieldErrors?.description && (
            <p className="text-xs text-destructive">{state.fieldErrors.description[0]}</p>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="listingType">Listing type</Label>
            <select id="listingType" name="listingType" defaultValue={values.listingType} className={selectClass}>
              <option value="SALE">For sale</option>
              <option value="RENT">For rent</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="propertyType">Property type</Label>
            <select id="propertyType" name="propertyType" defaultValue={values.propertyType} className={selectClass}>
              <option value="HOUSE">House</option>
              <option value="APARTMENT">Apartment</option>
              <option value="CONDO">Condo</option>
              <option value="TOWNHOUSE">Townhouse</option>
              <option value="LAND">Land</option>
              <option value="COMMERCIAL">Commercial</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="status">Status</Label>
            <select id="status" name="status" defaultValue={values.status} className={selectClass}>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="SOLD">Sold</option>
            </select>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="price">Price (USD, monthly if renting)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min={1}
              defaultValue={values.price || ""}
              placeholder="750000"
              required
            />
            {state?.fieldErrors?.price && (
              <p className="text-xs text-destructive">{state.fieldErrors.price[0]}</p>
            )}
          </div>
          <div className="flex items-center gap-2 self-end pb-2">
            <Checkbox id="featured" name="featured" defaultChecked={values.featured} />
            <Label htmlFor="featured" className="cursor-pointer text-sm font-normal">
              Highlight as a featured listing
            </Label>
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Details</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Input id="bedrooms" name="bedrooms" type="number" min={0} defaultValue={values.bedrooms} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Input id="bathrooms" name="bathrooms" type="number" min={0} defaultValue={values.bathrooms} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="areaSqft">Area (sqft)</Label>
            <Input id="areaSqft" name="areaSqft" type="number" min={1} defaultValue={values.areaSqft} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="yearBuilt">Year built</Label>
            <Input
              id="yearBuilt"
              name="yearBuilt"
              type="number"
              min={1800}
              max={2100}
              defaultValue={values.yearBuilt ?? ""}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="amenities">Amenities (comma-separated)</Label>
          <Input
            id="amenities"
            name="amenities"
            defaultValue={values.amenities}
            placeholder="Covered patio, Attached garage, Pool"
          />
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Location</h2>
        <div className="space-y-1.5">
          <Label htmlFor="address">Street address</Label>
          <Input id="address" name="address" defaultValue={values.address} required />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-1.5">
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" defaultValue={values.city} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" defaultValue={values.state} required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="zip">ZIP code</Label>
            <Input id="zip" name="zip" defaultValue={values.zip} required />
          </div>
        </div>
      </section>

      <section className="space-y-4 rounded-xl border border-border bg-card p-5">
        <h2 className="font-heading text-base font-semibold text-foreground">Photos</h2>

        {visibleExisting.length > 0 && (
          <div>
            <p className="mb-2 text-sm text-muted-foreground">Current photos</p>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {visibleExisting.map((image) => (
                <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image src={image.url} alt={image.alt} fill sizes="120px" className="object-cover" />
                  <label className="absolute inset-0 flex cursor-pointer items-end justify-end bg-black/0 p-1.5 transition-colors hover:bg-black/30">
                    <input
                      type="checkbox"
                      name="removeImageIds"
                      value={image.id}
                      className="peer sr-only"
                      onChange={(e) => toggleRemoveExisting(image.id, e.target.checked)}
                    />
                    <span className="rounded-full bg-white p-1 text-destructive opacity-0 shadow peer-checked:opacity-100 [.group:hover_&]:opacity-100">
                      <X className="size-3.5" />
                    </span>
                  </label>
                </div>
              ))}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Hover a photo and click the X to remove it when you save.
            </p>
          </div>
        )}

        <div>
          <p className="mb-2 text-sm text-muted-foreground">
            {mode === "create" ? "Upload photos" : "Add new photos"}
          </p>
          <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/40 p-6 text-center transition-colors hover:border-primary/50">
            <UploadCloud className="size-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Click to choose photos (JPG, PNG, or WebP)
            </span>
            <input
              ref={fileInputRef}
              type="file"
              name="images"
              accept="image/png,image/jpeg,image/webp,image/avif"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          {newFiles.length > 0 && (
            <div className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
              {newFiles.map((file, index) => (
                <div key={`${file.name}-${index}`} className="group relative aspect-square overflow-hidden rounded-lg bg-muted">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                    unoptimized
                  />
                  <button
                    type="button"
                    onClick={() => removeNewFile(index)}
                    className="absolute right-1.5 top-1.5 rounded-full bg-white p-1 text-destructive opacity-0 shadow transition-opacity group-hover:opacity-100"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
