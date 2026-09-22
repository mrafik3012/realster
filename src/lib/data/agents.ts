import "server-only";
import { prisma } from "@/lib/prisma";

export async function getAgents() {
  const agents = await prisma.agent.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { properties: true } } },
  });
  return agents;
}

export async function getAgentById(id: string) {
  return prisma.agent.findUnique({
    where: { id },
    include: {
      properties: {
        include: { images: { orderBy: { position: "asc" }, take: 1 } },
        orderBy: { createdAt: "desc" },
      },
    },
  });
}
