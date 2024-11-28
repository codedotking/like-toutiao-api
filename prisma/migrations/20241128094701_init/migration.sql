/*
  Warnings:

  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `User_username_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `username`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_verified` BOOLEAN NULL,
    ADD COLUMN `verified_content` VARCHAR(191) NULL,
    MODIFY `avatar_url` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_name_key` ON `User`(`name`);
