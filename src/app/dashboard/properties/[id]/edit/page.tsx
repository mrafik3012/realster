import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PropertyForm } from "@/components/property-form";
import { updateProperty } from "@/actions/properties";
import { requireAgent } from "@/lib/auth-guard";
import { getPropertyForAgentEdit } from "@/lib/data/properties";

export const metadata: Metadata = { title: "Edit listing" };

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agent = await requireAgent();
  const property = await getPropertyForAgentEdit(id, agent.id);

  if (!property) notFound();

  const updatePropertyWithId = updateProperty.bind(null, property.id);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Edit listing</h1>
        <p className="text-sm text-muted-foreground">{property.title}</p>
      </div>
      <PropertyForm
        mode="edit"
        action={updatePropertyWithId}
        submitLabel="Save changes"
        existingImages={property.images}
        initialValues={{
          title: property.title,
          description: property.description,
          price: property.price,
          listingType: property.listingType,
          propertyType: property.propertyType,
          status: property.status,
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          areaSqft: property.areaSqft,
          yearBuilt: property.yearBuilt,
          address: property.address,
          city: property.city,
          state: property.state,
          zip: property.zip,
          featured: property.featured,
          amenities: property.amenities,
        }}
      />
    </div>
  );
}
