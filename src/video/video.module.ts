import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { AwsModule } from 'src/aws/aws.module';

@Module({
  imports: [AwsModule],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
