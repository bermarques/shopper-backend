/*
  Warnings:

  - You are about to drop the column `confirmed_value` on the `Measurement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Measurement` DROP COLUMN `confirmed_value`,
    ADD COLUMN `has_confirmed` BOOLEAN NOT NULL DEFAULT false;
