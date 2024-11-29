/*
  Warnings:

  - You are about to drop the column `site` on the `Article` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[article_id,source]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Article_article_id_site_key` ON `Article`;

-- AlterTable
ALTER TABLE `Article` DROP COLUMN `site`,
    ADD COLUMN `source` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Article_article_id_source_key` ON `Article`(`article_id`, `source`);
