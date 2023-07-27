import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3uploadService {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: 'eu-north-1',
      credentials: {
        accessKeyId: 'AKIAX7VYKVR2GDKJPYNY',
        secretAccessKey: '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',
      },
    });
  }
  async uploadImage(file: Buffer, filename: string) {
    const command = new PutObjectCommand({
      Bucket: 'nestjs-upload-image',
      Key: filename,
      Body: file,
    });
    try {
      const result = await this.s3Client.send(command);
      console.log('result ', result);
    } catch (err) {
      console.log(err);
    }
  }

  findAll() {
    return `This action returns all s3upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} s3upload`;
  }

  // update(id: number, updateS3uploadDto: UpdateS3uploadDto) {
  //   return `This action updates a #${id} s3upload`;
  // }

  remove(id: number) {
    return `This action removes a #${id} s3upload`;
  }
}
