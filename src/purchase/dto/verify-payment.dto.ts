import { IsNotEmpty } from 'class-validator';

export class VerifyPaymentDto {
  @IsNotEmpty()
  razorpay_payment_id: string;
  @IsNotEmpty()
  razorpay_order_id: string;
  @IsNotEmpty()
  razorpay_signature: string;
}
