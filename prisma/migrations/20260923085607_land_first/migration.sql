-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT 'Land Agent',
    "phone" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "licenseNo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Agent" ("bio", "createdAt", "email", "id", "licenseNo", "name", "passwordHash", "phone", "title", "updatedAt") SELECT "bio", "createdAt", "email", "id", "licenseNo", "name", "passwordHash", "phone", "title", "updatedAt" FROM "Agent";
DROP TABLE "Agent";
ALTER TABLE "new_Agent" RENAME TO "Agent";
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");
CREATE TABLE "new_Property" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "listingType" TEXT NOT NULL DEFAULT 'SALE',
    "propertyType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "bedrooms" INTEGER,
    "bathrooms" INTEGER,
    "areaSqft" INTEGER NOT NULL,
    "areaUnit" TEXT NOT NULL DEFAULT 'CENTS',
    "yearBuilt" INTEGER,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "amenities" TEXT NOT NULL DEFAULT '',
    "agentId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Property_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "Agent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Property" ("address", "agentId", "amenities", "areaSqft", "bathrooms", "bedrooms", "city", "createdAt", "description", "featured", "id", "listingType", "price", "propertyType", "slug", "state", "status", "title", "updatedAt", "yearBuilt", "zip") SELECT "address", "agentId", "amenities", "areaSqft", "bathrooms", "bedrooms", "city", "createdAt", "description", "featured", "id", "listingType", "price", "propertyType", "slug", "state", "status", "title", "updatedAt", "yearBuilt", "zip" FROM "Property";
DROP TABLE "Property";
ALTER TABLE "new_Property" RENAME TO "Property";
CREATE UNIQUE INDEX "Property_slug_key" ON "Property"("slug");
CREATE INDEX "Property_agentId_idx" ON "Property"("agentId");
CREATE INDEX "Property_city_idx" ON "Property"("city");
CREATE INDEX "Property_propertyType_idx" ON "Property"("propertyType");
CREATE INDEX "Property_listingType_idx" ON "Property"("listingType");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
