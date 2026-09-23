"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { mkdir, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { prisma } from "@/lib/prisma";
import { requireAgent } from "@/lib/auth-guard";
import { propertySchema } from "@/lib/validation";
import { slugify } from "@/lib/utils";

export type PropertyActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | null;

const MAX_IMAGE_BYTES = 6 * 1024 * 1024; // 6MB
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

async function saveUploadedImages(files: File[], propertySlug: string) {
  const validFiles = files.filter((file) => file && file.size > 0);
  if (validFiles.length === 0) return [];

  const uploadDir = path.join(process.cwd(), "public", "uploads", "properties", propertySlug);
  await mkdir(uploadDir, { recursive: true });

  const savedUrls: string[] = [];
  for (const file of validFiles) {
    if (!ALLOWED_IMAGE_TYPES.has(file.type)) continue;
    if (file.size > MAX_IMAGE_BYTES) continue;

    const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : file.type === "image/avif" ? "avif" : "jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);
    savedUrls.push(`/uploads/properties/${propertySlug}/${filename}`);
  }
  return savedUrls;
}

async function uniqueSlug(title: string) {
  const base = slugify(title) || "listing";
  let slug = base;
  let attempt = 1;
  while (await prisma.property.findUnique({ where: { slug } })) {
    attempt += 1;
    slug = `${base}-${attempt}`;
  }
  return slug;
}

function parsePropertyForm(formData: FormData) {
  return propertySchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    listingType: formData.get("listingType"),
    propertyType: formData.get("propertyType"),
    status: formData.get("status") || "ACTIVE",
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    areaSqft: formData.get("areaSqft"),
    areaUnit: formData.get("areaUnit") || "CENTS",
    yearBuilt: formData.get("yearBuilt") || "",
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    zip: formData.get("zip"),
    featured: formData.get("featured") === "on",
    amenities: formData.get("amenities") || "",
  });
}

export async function createProperty(
  _prevState: PropertyActionState,
  formData: FormData
): Promise<PropertyActionState> {
  const agent = await requireAgent();
  const parsed = parsePropertyForm(formData);

  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const images = formData.getAll("images").filter((v): v is File => v instanceof File);
  const slug = await uniqueSlug(parsed.data.title);
  const savedImageUrls = await saveUploadedImages(images, slug);

  if (savedImageUrls.length === 0) {
    return { error: "Please upload at least one photo of the property." };
  }

  const property = await prisma.property.create({
    data: {
      ...parsed.data,
      slug,
      agentId: agent.id,
      images: {
        create: savedImageUrls.map((url, index) => ({
          url,
          alt: `${parsed.data.title} — photo ${index + 1}`,
          position: index,
        })),
      },
    },
  });

  revalidatePath("/properties");
  revalidatePath("/dashboard/properties");
  redirect(`/properties/${property.slug}`);
}

export async function updateProperty(
  propertyId: string,
  _prevState: PropertyActionState,
  formData: FormData
): Promise<PropertyActionState> {
  const agent = await requireAgent();

  const existing = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!existing || existing.agentId !== agent.id) {
    return { error: "You don't have permission to edit this listing." };
  }

  const parsed = parsePropertyForm(formData);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const images = formData.getAll("images").filter((v): v is File => v instanceof File);
  const newImageUrls = await saveUploadedImages(images, existing.slug);

  const removedImageIds = formData.getAll("removeImageIds").map((v) => v.toString());

  await prisma.$transaction(async (tx) => {
    if (removedImageIds.length > 0) {
      await tx.propertyImage.deleteMany({
        where: { id: { in: removedImageIds }, propertyId },
      });
    }

    if (newImageUrls.length > 0) {
      const currentCount = await tx.propertyImage.count({ where: { propertyId } });
      await tx.propertyImage.createMany({
        data: newImageUrls.map((url, index) => ({
          url,
          alt: `${parsed.data.title} — photo ${currentCount + index + 1}`,
          position: currentCount + index,
          propertyId,
        })),
      });
    }

    await tx.property.update({
      where: { id: propertyId },
      data: parsed.data,
    });
  });

  const remainingImages = await prisma.propertyImage.count({ where: { propertyId } });
  if (remainingImages === 0) {
    return { error: "A listing needs at least one photo. Upload a photo before removing the last one." };
  }

  revalidatePath("/properties");
  revalidatePath(`/properties/${existing.slug}`);
  revalidatePath("/dashboard/properties");
  redirect(`/properties/${existing.slug}`);
}

export async function deletePropertyAction(formData: FormData) {
  const propertyId = formData.get("propertyId")?.toString();
  if (!propertyId) return;
  await deleteProperty(propertyId);
}

export async function deleteProperty(propertyId: string) {
  const agent = await requireAgent();
  const existing = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!existing || existing.agentId !== agent.id) {
    throw new Error("You don't have permission to delete this listing.");
  }

  await prisma.property.delete({ where: { id: propertyId } });

  const uploadDir = path.join(process.cwd(), "public", "uploads", "properties", existing.slug);
  await rm(uploadDir, { recursive: true, force: true });

  revalidatePath("/properties");
  revalidatePath("/dashboard/properties");
}
