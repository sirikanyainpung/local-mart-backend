/*
  Warnings:

  - You are about to drop the column `brand_model` on the `BrandMaster` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BrandMaster" DROP COLUMN "brand_model";

-- CreateTable
CREATE TABLE "BrandModel" (
    "brand_model_id" SERIAL NOT NULL,
    "brand_id" INTEGER NOT NULL,
    "brand_model_code" VARCHAR(250) NOT NULL,
    "brand_model_name" VARCHAR(250) NOT NULL,
    "status" VARCHAR(50),

    CONSTRAINT "BrandModel_pkey" PRIMARY KEY ("brand_model_id")
);

-- AddForeignKey
ALTER TABLE "BrandModel" ADD CONSTRAINT "BrandModel_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "BrandMaster"("brand_id") ON DELETE RESTRICT ON UPDATE CASCADE;
