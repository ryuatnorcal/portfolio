-- Internal tools get the same fields as projects. Existing rows keep their
-- name (now title) and description.
ALTER TABLE "internal_tool" RENAME COLUMN "name" TO "title";

ALTER TABLE "internal_tool"
  ADD COLUMN "year" TEXT,
  ADD COLUMN "subtitle" TEXT,
  ADD COLUMN "link" TEXT,
  ADD COLUMN "modalTitle" TEXT,
  ADD COLUMN "modalYear" TEXT,
  ADD COLUMN "modalImg" TEXT,
  ADD COLUMN "modalDescription" TEXT,
  ADD COLUMN "modalUrl" TEXT;
