import { Injectable } from '@nestjs/common';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';
import { PrismaService } from 'src/prisma/prisma.service';
import { AWSS3Service } from 'src/aws/awss3.service';

@Injectable()
export class ImagesService {
  private images: Image[] = [
    {
      id: 1,
      name: 'test coffee',
      brand: 'buddy',
    },
  ];
  constructor(
    private prismaService: PrismaService,
    private readonly awsS3Service: AWSS3Service,
  ) {}

  async uploadImage(file: Express.Multer.File) {
    const fileName = file.originalname + '_' + Date.now();
    try {
      const result = await this.awsS3Service.uploadImage(file.buffer, fileName);
      if (result.$metadata.httpStatusCode === 200) {
        await this.prismaService.images.create({
          data: { imageName: fileName },
        });

        return {
          status: 'success',
          fileName,
        };
      }
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return this.images;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
