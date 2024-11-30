-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `verified_content` VARCHAR(191) NULL,
    `user_verified` BOOLEAN NULL,
    `follower_count` INTEGER NOT NULL DEFAULT 0,
    `avatar_url` TEXT NULL,
    `email` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `registration_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_login` DATETIME(3) NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_name_key`(`name`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Article` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `abstract` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `type` INTEGER NOT NULL,
    `published` BOOLEAN NOT NULL DEFAULT false,
    `authorId` INTEGER NOT NULL,
    `like_count` BIGINT NOT NULL DEFAULT 0,
    `digg_count` BIGINT NOT NULL DEFAULT 0,
    `bury_count` BIGINT NOT NULL DEFAULT 0,
    `comment_count` BIGINT NOT NULL DEFAULT 0,
    `read_count` BIGINT NOT NULL DEFAULT 0,
    `repin_count` BIGINT NOT NULL DEFAULT 0,
    `share_count` BIGINT NOT NULL DEFAULT 0,
    `is_crawled` BOOLEAN NOT NULL DEFAULT false,
    `source` VARCHAR(191) NULL,
    `article_id` VARCHAR(191) NULL,

    UNIQUE INDEX `Article_article_id_key`(`article_id`),
    UNIQUE INDEX `Article_article_id_source_key`(`article_id`, `source`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Article` ADD CONSTRAINT `Article_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
