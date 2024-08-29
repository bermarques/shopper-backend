-- CreateTable
CREATE TABLE `Measurement` (
    `measure_uuid` VARCHAR(191) NOT NULL,
    `measure_value` INTEGER NOT NULL,
    `measure_type` VARCHAR(191) NOT NULL,
    `customer_code` VARCHAR(191) NOT NULL,
    `measure_datetime` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`measure_uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
