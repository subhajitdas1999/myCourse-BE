import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { AWSS3Service } from 'src/aws/awss3.service';
import { AwsModule } from 'src/aws/aws.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [AwsModule],
  controllers: [ImagesController],
  providers: [ImagesService, PrismaService],
  exports: [ImagesService],
})
export class ImagesModule {}
