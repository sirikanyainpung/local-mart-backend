/*
  Warnings:

  - You are about to drop the `Passenger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Passenger";

-- CreateTable
CREATE TABLE "BrandMaster" (
    "brand_id" SERIAL NOT NULL,
    "brand_code" VARCHAR(250) NOT NULL,
    "brand_name" VARCHAR(250) NOT NULL,
    "brand_model" JSONB,
    "status" VARCHAR(50),

    CONSTRAINT "BrandMaster_pkey" PRIMARY KEY ("brand_id")
);
