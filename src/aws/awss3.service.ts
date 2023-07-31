import {
  PutObjectCommand,
  S3Client,
  ListObjectsV2Command,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AWSS3Service {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.BUCKET_REGION,
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRETE_ACCESS_KEY,
      },
    });
  }
  async uploadImage(file: Buffer, filename: string) {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
      Body: file,
    });
    try {
      const result = await this.s3Client.send(command);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async uploadVideo(file: Buffer, filename: string) {
    const command = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: filename,
      Body: file,
    });

    try {
      const result = await this.s3Client.send(command);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async getAllImage() {
    const command = new ListObjectsV2Command({
      Bucket: process.env.BUCKET_NAME,
    });
    try {
      const res = await this.s3Client.send(command);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    return 'test';
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
