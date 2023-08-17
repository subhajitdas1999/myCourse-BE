import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-payment-order.dto';
import Razorpay from 'razorpay';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { createHmac } from 'crypto';
import {
  validatePaymentVerification,
  validateWebhookSignature,
} from 'razorpay/dist/utils/razorpay-utils';
@Injectable()
export class PaymentService {
  private readonly instance: Razorpay;
  constructor() {
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
    if (result == true) {
      //legit payment
      return { status: 200, message: 'ok' };
    }

    return { status: 402, message: 'Not valid payment' };
  }

  async getPaymentDetails(paymentId: string) {
    // const orderDetails = await this.instance.orders.fetch(orderId);
    const paymentDetails = await this.instance.payments.fetch(paymentId);
    return paymentDetails.status;
  }

  findAll() {
    return `This action returns all payment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  // update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //   return `This action updates a #${id} payment`;
  // }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
