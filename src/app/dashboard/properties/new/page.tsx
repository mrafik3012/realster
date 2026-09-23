import type { Metadata } from "next";
import { PropertyForm } from "@/components/property-form";
import { createProperty } from "@/actions/properties";

export const metadata: Metadata = { title: "Add a listing" };

export default function NewPropertyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Add a land listing</h1>
        <p className="text-sm text-muted-foreground">
          Extent, locality, and at least one photo. Houses are optional.
        </p>
      </div>
      <PropertyForm mode="create" action={createProperty} submitLabel="Publish listing" />
    </div>
  );
}
