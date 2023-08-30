-- CreateTable
CREATE TABLE "ProductQuestions" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductQuestions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductAnswers" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "questionId" INTEGER NOT NULL,

    CONSTRAINT "ProductAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductAnswers_questionId_key" ON "ProductAnswers"("questionId");

-- AddForeignKey
ALTER TABLE "ProductQuestions" ADD CONSTRAINT "ProductQuestions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductQuestions" ADD CONSTRAINT "ProductQuestions_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAnswers" ADD CONSTRAINT "ProductAnswers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductAnswers" ADD CONSTRAINT "ProductAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "ProductQuestions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
