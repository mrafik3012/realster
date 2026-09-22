import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function requireAgent() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  const agent = await prisma.agent.findUnique({ where: { id: session.agentId } });
  if (!agent) {
    redirect("/login");
  }

  return agent;
}
