import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { AWSS3Service } from 'src/aws/awss3.service';

@Injectable()
export class VideoService {
  constructor(private readonly awsS3Service: AWSS3Service) {}
  async uploadVideo(file: Express.Multer.File) {
    const fileName = file.originalname + '_' + Date.now();
    try {
      const res = await this.awsS3Service.uploadVideo(file.buffer, fileName);
      console.log(res);
    } catch (err) {
      console.log(err);
    }

    return 'got it';
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
