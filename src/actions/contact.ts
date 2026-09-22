"use server";

import { contactSchema } from "@/lib/validation";

export type ContactActionState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | null;

export async function submitContactMessage(
  _prevState: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors };
  }

  // Demo environment: there's no email provider wired up yet, so we just
  // log the submission. Swap this for a real provider (Resend, Postmark,
  // etc.) before going to production.
  console.log("[contact] new message", parsed.data);

  return { ok: true };
}
