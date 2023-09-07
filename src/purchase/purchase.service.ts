import { Injectable } from '@nestjs/common';
import { CreatePurchaseCourseDto } from './dto/create-purchase.course.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PurchaseService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createPurchaseDto: CreatePurchaseCourseDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email: createPurchaseDto.email },
      select: { id: true },
    });
    delete createPurchaseDto.email;
    const purchase = await this.prismaService.purchaseCourse.create({
      data: { ...createPurchaseDto, userId: user.id },
    });
    return purchase;
  }

  findAll() {
    return `This action returns all purchase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchase`;
  }

  update(id: number, updatePurchaseDto: UpdatePurchaseDto) {
    return `This action updates a #${id} purchase`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchase`;
  }
}
