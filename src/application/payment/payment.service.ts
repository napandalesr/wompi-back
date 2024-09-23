import { Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { Payment } from "src/domain/payment/payment.entity";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { UuidService } from "nestjs-uuid";

@Injectable()
export class PaymentService {

  constructor(
    private httpService: HttpService,
    private readonly uuidService: UuidService
  ) {}

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment>{
    createPaymentDto.reference = this.uuidService.generate();
    console.log('reference', createPaymentDto.reference);
    const url = `${process.env.WOMPIURL}/transactions`;
    try {
      const response = await lastValueFrom(
        this.httpService.post(url, createPaymentDto, {
          headers: {
            Authorization: `Bearer ${process.env.PRIVATE_KEY}`,
          },
        }),
      );
      return response.data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new Error('Error creating transaction');
    }
  }

  async getStatus (id: string) {
    const url = `${process.env.WOMPIURL}/transactions/${id}`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(url)
      )
      const { data: { status } } = response.data;
      return { status };
    } catch (error) {
      console.error('Error consultando el estado de la transación:', error);
      throw new Error('Error consultando el estado de la transación');
    }
  }
}