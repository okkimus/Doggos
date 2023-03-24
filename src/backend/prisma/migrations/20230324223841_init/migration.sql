-- CreateTable
CREATE TABLE "Vote" (
    "id" SERIAL NOT NULL,
    "breed" TEXT NOT NULL,
    "upVotes" INTEGER NOT NULL,
    "downVotes" INTEGER NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vote_breed_key" ON "Vote"("breed");
