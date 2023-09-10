import { Injectable } from '@nestjs/common';
import { CreatePurchaseCourseDto } from './dto/create-purchase.course.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import Razorpay from 'razorpay';
import {
  validatePaymentVerification,
  validateWebhookSignature,
} from 'razorpay/dist/utils/razorpay-utils';
import { CreateOrderDto } from './dto/create-payment-order.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
// interface UserDetailsInPayment {
//   courseId: string;
//   email: string;
//   price: number;
// }
@Injectable()
export class PurchaseService {
  private readonly instance: Razorpay;
  constructor(private readonly prismaService: PrismaService) {
    this.instance = new Razorpay({
      key_id: process.env.RAZORYPAY_KEY_ID,
      key_secret: process.env.RAZORYPAY_KEY_SECRET,
    });
  }

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = await this.instance.orders.create({
      amount: createOrderDto.amount * 100,
      currency: 'INR',
    });

    return order;
  }

  async verify(verifyPaymentDto: VerifyPaymentDto) {
    const res = validatePaymentVerification(
      {
        order_id: verifyPaymentDto.razorpay_order_id,
        payment_id: verifyPaymentDto.razorpay_payment_id,
      },
      verifyPaymentDto.razorpay_signature,
      process.env.RAZORYPAY_KEY_SECRET,
    );
    if (res) {
      return { status: 200, message: 'signature valid' };
    }
    return { status: 403, message: 'signature not valid' };
  }

  async webhookVerification(webhookBody, webhookSignature: string) {
    // const headerSignature = req.
    // console.log(reqBody, webhookSignature);
    const result = validateWebhookSignature(
      JSON.stringify(webhookBody),
      webhookSignature,
      process.env.RAZORPAY_WEBHOOK_SECRET,
    );
    // console.log(webhookBody);
    if (result == true) {
      //legit payment
      if (webhookBody?.payload?.payment?.entity?.status === 'captured') {
        const createPurchaseDto: CreatePurchaseCourseDto =
          webhookBody?.payload?.payment?.entity?.notes;
        await this.createPurchase(createPurchaseDto);
        // console.log(details.courseId, details.userEmail);
      }
      return { status: 200, message: 'ok' };
    }

    return { status: 402, message: 'Not valid payment' };
  }

  async getPaymentDetails(paymentId: string) {
    // const orderDetails = await this.instance.orders.fetch(orderId);
    const paymentDetails = await this.instance.payments.fetch(paymentId);
    return paymentDetails.status;
  }

  async createPurchase(createPurchaseDto: CreatePurchaseCourseDto) {
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
