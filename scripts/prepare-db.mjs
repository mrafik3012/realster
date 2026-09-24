import { execSync } from "node:child_process";
import path from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const databaseUrl = `file:${path.join(process.cwd(), "prisma", "dev.db")}`;
const env = { ...process.env, DATABASE_URL: databaseUrl };

execSync("npx prisma migrate deploy", { stdio: "inherit", env });

const { PrismaClient } = require("../src/generated/prisma");
const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

try {
  const agentCount = await prisma.agent.count();
  if (agentCount === 0) {
    console.log("No listings yet — seeding demo Coimbatore land and homes.");
    execSync("npx tsx prisma/seed.ts", { stdio: "inherit", env });
  }
} finally {
  await prisma.$disconnect();
}
