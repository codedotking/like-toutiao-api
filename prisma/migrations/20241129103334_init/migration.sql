/*
  Warnings:

  - A unique constraint covering the columns `[article_id]` on the table `Article` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[article_id,site]` on the table `Article` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Article` ADD COLUMN `article_id` VARCHAR(191) NULL,
    ADD COLUMN `is_crawled` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `site` VARCHAR(191) NULL,
    MODIFY `like_count` BIGINT NOT NULL DEFAULT 0,
    MODIFY `digg_count` BIGINT NOT NULL DEFAULT 0,
    MODIFY `bury_count` BIGINT NOT NULL DEFAULT 0,
    MODIFY `comment_count` BIGINT NOT NULL DEFAULT 0,
    MODIFY `read_count` BIGINT NOT NULL DEFAULT 0,
    MODIFY `repin_count` BIGINT NOT NULL DEFAULT 0,
    MODIFY `share_count` BIGINT NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `Article_article_id_key` ON `Article`(`article_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Article_article_id_site_key` ON `Article`(`article_id`, `site`);
