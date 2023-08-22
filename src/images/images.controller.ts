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
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.public';
@Public()
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
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
  ) {
    return await this.imagesService.uploadImage(file);
  }

  @Get(':fileName')
  async findOneImage(@Param('fileName') fileName: string) {
    return await this.imagesService.findOneImage(fileName);
    // console.log(process.env.DATABASE_URL);

    // return 'await this.awsS3Service.getAllImage()';
  }

  @Get()
  async findAll() {
    // return await this.awsS3Service.getAllImage();
    // console.log(process.env.DATABASE_URL);

    return 'await this.awsS3Service.getAllImage()';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
