import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Payment } from "../../domain/payment/payment.entity";

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService:PaymentService,
  ) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto): Promise<Payment>{
    return await this.paymentService.create(createPaymentDto);
  }

  @Get('status/:id')
  async getStatus(
    @Param('id') 
    id: string) {
    return await this.paymentService.getStatus(id);
  }
}