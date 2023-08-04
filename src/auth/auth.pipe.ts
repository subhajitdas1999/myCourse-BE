import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthPipe implements PipeTransform {
  constructor(private readonly prismaService: PrismaService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const user = await this.prismaService.user.findUnique({
      where: { email: value.email },
    });
    if (user) {
      throw new HttpException(
        'Email already exist ,try login',
        HttpStatus.FORBIDDEN,
      );
    }

    return value;
  }
}
