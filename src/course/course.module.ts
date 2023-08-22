import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { ImagesModule } from 'src/images/images.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ImagesModule],
  controllers: [CourseController],
  providers: [CourseService, PrismaService],
})
export class CourseModule {}
