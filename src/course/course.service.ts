import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ImagesService } from 'src/images/images.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly imagesService: ImagesService,
  ) {}
  async create(file: Express.Multer.File, createCourseDto: CreateCourseDto) {
    try {
      const url = await this.imagesService.uploadImageToPublicBucket(
        file,
        'courseImages/',
      );
      const course = await this.prismaService.course.create({
        data: { ...createCourseDto, courseImageUrl: url },
      });
      return course;
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
