import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "../../domain/payment/payment.repository";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Payment } from "src/domain/payment/payment.entity";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class PaymentService {
  private readonly wompiUrl: string;
  private readonly publicKey: string;
  private readonly privateKey: string;

  constructor(
    private httpService: HttpService,
    private readonly paymentRepository: PaymentRepository
  ){
    this.wompiUrl = 'https://sandbox.wompi.co/v1'; // Usar 'https://production.wompi.co/v1' en producción
    this.publicKey = 'pub_stagtest_g2u0HQd3ZMh05hsSgTS2lUV8t3s4mOt7';
    this.privateKey = 'prv_stagtest_5i0ZGIGiFcDQifYsXxvsny7Y37tKqFWg';
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment>{
    const url = `${this.wompiUrl}/transactions`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, createPaymentDto, {
          headers: {
            Authorization: `Bearer ${this.privateKey}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Error creating transaction');
    }

    return await this.paymentRepository.create(createPaymentDto);
  }
}