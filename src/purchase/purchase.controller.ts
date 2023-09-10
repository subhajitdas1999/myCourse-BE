import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseCourseDto } from './dto/create-purchase.course.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { CreateOrderDto } from './dto/create-payment-order.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { Public } from 'src/auth/auth.public';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post('/createOrder')
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.purchaseService.createOrder(createOrderDto);
  }

  @Post('/verify')
  verify(@Body() verifyPaymentDto: VerifyPaymentDto) {
    return this.purchaseService.verify(verifyPaymentDto);
  }

  @Public()
  @Post('/webhookVerification')
  webhookVerification(
    @Body() reqBody,
    @Headers('X-Razorpay-Signature') webhookSignature: string,
  ) {
    return this.purchaseService.webhookVerification(reqBody, webhookSignature);
  }
  @Get(':paymentId')
  getPaymentDetails(@Param('paymentId') paymentId: string) {
    return this.purchaseService.getPaymentDetails(paymentId);
  }

  // @Post()
  // createPurchaseCourse(@Body() createPurchaseDto: CreatePurchaseCourseDto) {
  //   return this.purchaseService.createPurchase(createPurchaseDto);
  // }

  @Get()
  findAll() {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseService.remove(+id);
  }
}
