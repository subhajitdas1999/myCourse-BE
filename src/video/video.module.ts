import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { AwsModule } from 'src/aws/aws.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AwsModule],
  controllers: [VideoController],
  providers: [VideoService, PrismaService],
})
export class VideoModule {}
