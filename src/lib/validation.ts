import { z } from "zod";

export const LAND_PROPERTY_TYPES = ["PLOT", "AGRICULTURAL", "FARM", "INDUSTRIAL", "COMMERCIAL"] as const;

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  phone: z.string().trim().min(7, "Enter a valid phone number").max(24),
  licenseNo: z.string().trim().min(3, "Enter a valid license number").max(40),
  title: z.string().trim().max(60).optional(),
  bio: z.string().trim().max(600).optional(),
});

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const propertySchema = z.object({
  title: z.string().trim().min(6, "Title is too short").max(120),
  description: z.string().trim().min(40, "Add a bit more description (40+ characters)").max(4000),
  price: z.coerce.number().int().min(1, "Enter a valid price in rupees"),
  listingType: z.enum(["SALE", "RENT"]),
  propertyType: z.enum(["PLOT", "AGRICULTURAL", "FARM", "INDUSTRIAL", "COMMERCIAL", "HOUSE", "APARTMENT"]),
  status: z.enum(["ACTIVE", "PENDING", "SOLD"]).default("ACTIVE"),
  bedrooms: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce.number().int().min(0).max(20).optional()
  ),
  bathrooms: z.preprocess(
    (v) => (v === "" || v === null || v === undefined ? undefined : v),
    z.coerce.number().int().min(0).max(20).optional()
  ),
  areaSqft: z.coerce.number().int().min(1).max(200000),
  areaUnit: z.enum(["CENTS", "ACRES", "SQFT"]).default("CENTS"),
  yearBuilt: z.coerce.number().int().min(1800).max(2100).optional().or(z.literal("").transform(() => undefined)),
  address: z.string().trim().min(3).max(160),
  city: z.string().trim().min(2).max(80),
  state: z.string().trim().min(2).max(56),
  zip: z.string().trim().min(3).max(12),
  featured: z.coerce.boolean().optional().default(false),
  amenities: z.string().trim().max(500).optional().default(""),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().toLowerCase().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters)").max(2000),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PropertyInput = z.infer<typeof propertySchema>;
