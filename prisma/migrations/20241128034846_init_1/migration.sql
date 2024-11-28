/*
  Warnings:

  - Added the required column `source` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar_url` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Article` ADD COLUMN `source` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatar_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `follower_count` INTEGER NOT NULL DEFAULT 0,
    MODIFY `password` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;
