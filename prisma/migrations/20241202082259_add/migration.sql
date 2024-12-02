-- AlterTable
ALTER TABLE `Article` ADD COLUMN `has_image` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `has_m3u8_video` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `has_mp4_video` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `has_video` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `image_type` VARCHAR(191) NULL,
    ADD COLUMN `publish_time` INTEGER NULL;
