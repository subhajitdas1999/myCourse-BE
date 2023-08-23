import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AWSS3Service } from 'src/aws/awss3.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly awsS3Service: AWSS3Service,
  ) {}
  async uploadVideo(file: Express.Multer.File, createVideoDto: CreateVideoDto) {
    const fileName = file.originalname.split('.')[0] + '_' + Date.now();
    try {
      // console.log(fileName);

      await this.awsS3Service.uploadVideo(file.buffer, fileName);
      const video = await this.prismaService.video.create({
        data: { ...createVideoDto, videoName: fileName },
      });
      return video;
    } catch (err) {
      console.log(err);
    }

    return 'got it';
  }
  async getOneVideo(fileName: string) {
    try {
      console.log(fileName);

      const res = await this.awsS3Service.getOneVideo(fileName);
      return res;
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  findAll() {
    return `This action returns all video`;
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
