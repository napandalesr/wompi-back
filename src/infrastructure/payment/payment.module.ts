import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { PaymentService } from '../../application/payment/payment.service';
import { PaymentRepositoryImpl } from './payment.repository.impl';
import { Payment } from '../../domain/payment/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentController } from '../../application/payment/payment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), HttpModule],
  controllers: [PaymentController],
  providers: [
    PaymentRepositoryImpl,
    {
      provide: 'paymentService',
      useFactory: (paymentRepository: PaymentRepositoryImpl, httpService: HttpService)=>
        new PaymentService(httpService, paymentRepository),
      inject: [PaymentRepositoryImpl]
    }
  ],
})
export class PaymentModule {}