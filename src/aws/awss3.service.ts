import {
  PutObjectCommand,
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
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
      Bucket: process.env.PRIVATE_BUCKET_NAME,
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

  async uploadImageToPublicBucket(file: Buffer, filename: string) {
    const command = new PutObjectCommand({
      Bucket: process.env.PUBLIC_BUCKET_NAME,
      Key: filename,
      Body: file,
    });
    try {
      await this.s3Client.send(command);
      const url = `https://${process.env.PUBLIC_BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${filename}`;
      return url;
    } catch (err) {
      console.log(err);
    }
  }

  async uploadVideo(file: Buffer, filename: string) {
    const command = new PutObjectCommand({
      Bucket: process.env.PRIVATE_BUCKET_NAME,
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
      Bucket: process.env.PRIVATE_BUCKET_NAME,
    });
    try {
      const res = await this.s3Client.send(command);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  async getOneImage(filename: string) {
    console.log('fileName', filename);

    const command = new GetObjectCommand({
      Bucket: process.env.PRIVATE_BUCKET_NAME,
      Key: filename,
    });

    try {
      // this.s3Client.
      const url = await getSignedUrl(this.s3Client, command);
      // const url = 'tets';
      // const url = await this.s3Client.send(command);
      console.log(url);

      return 'ok';
    } catch (err) {
      console.log(err);
    }
  }

  async getOneVideo(filename: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.PRIVATE_BUCKET_NAME,
      Key: filename,
    });

    try {
      const url = await getSignedUrl(this.s3Client, command, { expiresIn: 20 });
      // const url = await this.s3Client.send(command);
      return url;
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
