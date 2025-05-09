BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserWork] (
    [id] INT NOT NULL IDENTITY(1,1),
    [userId] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [UserWork_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [inputWorkElementId] INT,
    [inputWorkInformation] NVARCHAR(1000),
    [workDescription] NVARCHAR(1000),
    [outputWorkElementId] INT,
    [outputWorkInformation] NVARCHAR(1000),
    CONSTRAINT [UserWork_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[WorkElement] (
    [id] INT NOT NULL IDENTITY(1,1),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [WorkElement_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [workElementName] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [WorkElement_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [WorkElement_workElementName_key] UNIQUE NONCLUSTERED ([workElementName])
);

-- AddForeignKey
ALTER TABLE [dbo].[UserWork] ADD CONSTRAINT [UserWork_inputWorkElementId_fkey] FOREIGN KEY ([inputWorkElementId]) REFERENCES [dbo].[WorkElement]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[UserWork] ADD CONSTRAINT [UserWork_outputWorkElementId_fkey] FOREIGN KEY ([outputWorkElementId]) REFERENCES [dbo].[WorkElement]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
