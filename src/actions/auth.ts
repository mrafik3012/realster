"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, destroySession } from "@/lib/session";
import { loginSchema, registerSchema } from "@/lib/validation";

export type AuthActionState = {
  error?: string;
  fieldErrors?: Record<string, string[]>;
} | null;

export async function registerAgent(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    name: formData.get("name")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    licenseNo: formData.get("licenseNo")?.toString() ?? "",
    title: formData.get("title")?.toString() || undefined,
    bio: formData.get("bio")?.toString() || undefined,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const existing = await prisma.agent.findUnique({
    where: { email: parsed.data.email },
  });
  if (existing) {
    return { error: "An agent account with this email already exists." };
  }

  const passwordHash = await hashPassword(parsed.data.password);

  const agent = await prisma.agent.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      phone: parsed.data.phone,
      licenseNo: parsed.data.licenseNo,
      title: parsed.data.title || "Land Agent",
      bio: parsed.data.bio || "Realster land agent covering Coimbatore and nearby taluks.",
    },
  });

  await createSession({ agentId: agent.id, email: agent.email, name: agent.name });
  redirect("/dashboard");
}

export async function loginAgent(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const raw = {
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return { fieldErrors: parsed.error.flatten().fieldErrors };
  }

  const agent = await prisma.agent.findUnique({
    where: { email: parsed.data.email },
  });

  if (!agent) {
    return { error: "No agent account matches that email and password." };
  }

  const valid = await verifyPassword(parsed.data.password, agent.passwordHash);
  if (!valid) {
    return { error: "No agent account matches that email and password." };
  }

  await createSession({ agentId: agent.id, email: agent.email, name: agent.name });
  redirect("/dashboard");
}

export async function logoutAgent() {
  await destroySession();
  redirect("/login");
}
