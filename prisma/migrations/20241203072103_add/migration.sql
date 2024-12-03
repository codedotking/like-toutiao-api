-- DropIndex
DROP INDEX `Image_url_key` ON `Image`;

-- AlterTable
ALTER TABLE `Image` MODIFY `url` TEXT NOT NULL;
