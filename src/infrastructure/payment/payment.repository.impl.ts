import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "../../domain/payment/payment.entity";
import { PaymentRepository } from "../../domain/payment/payment.repository";
import { Repository } from "typeorm";

@Injectable()
export class PaymentRepositoryImpl implements PaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async create(payment: Payment): Promise<Payment> {
    return await this.paymentRepository.create(payment);
  }
}