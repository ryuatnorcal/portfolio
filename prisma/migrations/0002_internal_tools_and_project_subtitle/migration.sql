-- AlterTable
ALTER TABLE "project" ADD COLUMN "subtitle" TEXT;

-- CreateTable
CREATE TABLE "internal_tool" (
    "id" SERIAL NOT NULL,
    "locale" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "position" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "internal_tool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "internal_tool_locale_position_idx" ON "internal_tool"("locale", "position");
