import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { ImagesModule } from './images/images.module';
import { AwsModule } from './aws/aws.module';
import { PrismaService } from './prisma/prisma.service';
@Module({
  imports: [VideoModule, ImagesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
