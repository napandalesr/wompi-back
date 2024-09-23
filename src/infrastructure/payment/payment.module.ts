import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PaymentService } from '../../application/payment/payment.service';
import { Payment } from '../../domain/payment/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from '../../application/payment/payment.controller';
import { UuidModule, UuidService } from 'nestjs-uuid';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]), 
    HttpModule, 
    UuidModule
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService
  ],
})
export class PaymentModule {}