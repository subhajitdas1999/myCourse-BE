import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseCourseDto } from './create-purchase.course.dto';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseCourseDto) {}
