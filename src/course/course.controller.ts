import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Request,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.public';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({
            maxSize: parseInt(process.env.MAX_SINGLE_IMAGE_SIZE_IN_BYTES),
            message: 'File size exceeding 5MB',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return this.courseService.create(file, createCourseDto);
  }
  @Public()
  @Get()
  findAll() {
    return this.courseService.findAll();
  }
  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Get('verify/:courseId')
  isPurchased(@Param('courseId') courseId: string, @Request() req) {
    return this.courseService.isPurchased(courseId, req.user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
