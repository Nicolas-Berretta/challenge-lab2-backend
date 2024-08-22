/*
  Warnings:

  - You are about to drop the column `senderId` on the `Email` table. All the data in the column will be lost.
  - Added the required column `senderEmail` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_senderId_fkey";

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "senderId",
ADD COLUMN     "senderEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_senderEmail_fkey" FOREIGN KEY ("senderEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
