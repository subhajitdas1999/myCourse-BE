import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { ImagesModule } from './images/images.module';
import { S3uploadService } from './s3upload/s3upload.service';

@Module({
  imports: [VideoModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
