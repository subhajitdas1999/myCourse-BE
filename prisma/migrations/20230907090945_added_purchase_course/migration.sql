-- CreateTable
CREATE TABLE "PurchaseCourse" (
    "purchaseDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PurchaseCourse_userId_courseId_key" ON "PurchaseCourse"("userId", "courseId");

-- AddForeignKey
ALTER TABLE "PurchaseCourse" ADD CONSTRAINT "PurchaseCourse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseCourse" ADD CONSTRAINT "PurchaseCourse_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
