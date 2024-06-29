/*
  Warnings:

  - You are about to drop the `Countrys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Countrys";

-- CreateTable
CREATE TABLE "Countries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Countries_id_key" ON "Countries"("id");
