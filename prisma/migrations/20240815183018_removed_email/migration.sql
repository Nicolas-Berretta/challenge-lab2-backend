/*
  Warnings:

  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_senderEmail_fkey";

-- DropTable
DROP TABLE "Email";
