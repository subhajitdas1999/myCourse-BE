import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreateOrderDto } from './dto/create-payment-order.dto';
import { Public } from 'src/auth/auth.public';
import { VerifyPaymentDto } from './dto/verify-payment.dto';

@Controller('payment')
@Public()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/createOrder')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.paymentService.createOrder(createOrderDto);
  }

  @Post('/verify')
  verify(@Body() verifyPaymentDto: VerifyPaymentDto) {
    return this.paymentService.verify(verifyPaymentDto);
  }

  @Post('/webhookVerification')
  webhookVerification(
    @Body() reqBody,
    @Headers('X-Razorpay-Signature') webhookSignature: string,
  ) {
    return this.paymentService.webhookVerification(reqBody, webhookSignature);
  }
  @Get(':paymentId')
  getPaymentDetails(@Param('paymentId') paymentId: string) {
    return this.paymentService.getPaymentDetails(paymentId);
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.paymentService.update(+id, updatePaymentDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
