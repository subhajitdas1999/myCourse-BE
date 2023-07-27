import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { S3uploadService } from 'src/s3upload/s3upload.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService, S3uploadService],
})
export class ImagesModule {}
