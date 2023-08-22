-- CreateTable
CREATE TABLE "course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "courseImageUrl" TEXT NOT NULL,

    CONSTRAINT "course_pkey" PRIMARY KEY ("id")
);
