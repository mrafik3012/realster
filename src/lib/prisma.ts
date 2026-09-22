import path from "node:path";
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// The Prisma CLI resolves a relative sqlite `file:` URL against the folder
// containing schema.prisma, while the generated client resolves it against
// process.cwd() at runtime. Pinning an absolute path here keeps `prisma
// migrate`/`prisma db seed` and the running app pointed at the same file
// regardless of which directory a command is launched from.
const databaseUrl = `file:${path.join(process.cwd(), "prisma", "dev.db")}`;

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: { db: { url: databaseUrl } },
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
