-- CreateTable
CREATE TABLE "_PinnedByUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PinnedByUser_AB_unique" ON "_PinnedByUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PinnedByUser_B_index" ON "_PinnedByUser"("B");

-- AddForeignKey
ALTER TABLE "_PinnedByUser" ADD CONSTRAINT "_PinnedByUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PinnedByUser" ADD CONSTRAINT "_PinnedByUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
