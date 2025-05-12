/*
  Warnings:

  - You are about to drop the column `inputWorkElementId` on the `UserWork` table. All the data in the column will be lost.
  - You are about to drop the column `inputWorkInformation` on the `UserWork` table. All the data in the column will be lost.
  - You are about to drop the column `outputWorkElementId` on the `UserWork` table. All the data in the column will be lost.
  - You are about to drop the column `outputWorkInformation` on the `UserWork` table. All the data in the column will be lost.
  - You are about to drop the column `workElementName` on the `WorkElement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `WorkElement` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `WorkElement` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[UserWork] DROP CONSTRAINT [UserWork_inputWorkElementId_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[UserWork] DROP CONSTRAINT [UserWork_outputWorkElementId_fkey];

-- DropIndex
ALTER TABLE [dbo].[WorkElement] DROP CONSTRAINT [WorkElement_workElementName_key];

-- AlterTable
ALTER TABLE [dbo].[UserWork] DROP COLUMN [inputWorkElementId],
[inputWorkInformation],
[outputWorkElementId],
[outputWorkInformation];
ALTER TABLE [dbo].[UserWork] ADD [inputElementId] INT,
[inputInformation] NVARCHAR(1000),
[outputElementId] INT,
[outputInformation] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[WorkElement] DROP COLUMN [workElementName];
ALTER TABLE [dbo].[WorkElement] ADD [name] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[WorkElement] ADD CONSTRAINT [WorkElement_name_key] UNIQUE NONCLUSTERED ([name]);

-- AddForeignKey
ALTER TABLE [dbo].[UserWork] ADD CONSTRAINT [UserWork_inputElementId_fkey] FOREIGN KEY ([inputElementId]) REFERENCES [dbo].[WorkElement]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserWork] ADD CONSTRAINT [UserWork_outputElementId_fkey] FOREIGN KEY ([outputElementId]) REFERENCES [dbo].[WorkElement]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
