-- CreateTable
CREATE TABLE "section_visibility" (
    "section" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "section_visibility_pkey" PRIMARY KEY ("section")
);
