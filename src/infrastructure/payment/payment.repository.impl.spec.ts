import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { repositoryMockFactory } from "../../test-utils";
import { MockType } from "../../test-utils/types";
import { Repository } from "typeorm";
import { PaymentRepositoryImpl } from "./payment.repository.impl";
import { Payment } from "../../domain/payment/payment.entity";

describe('Payment respository impl', () => {
  let paymentRepositoryImpl: MockType<PaymentRepositoryImpl>;
  let paymentRepositoryMock: MockType<Repository<PaymentRepositoryImpl>>;
  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentRepositoryImpl,
        {
          provide: getRepositoryToken(Payment),
          useFactory: repositoryMockFactory,
        },
      ]
    }).compile();
    paymentRepositoryImpl = module.get(PaymentRepositoryImpl); 
    paymentRepositoryMock = module.get(getRepositoryToken(Payment));
  });

  it('debe ser definido', async () => {
    expect(PaymentRepositoryImpl).toBeDefined();
  });

  it('debería llamar al método create del respositorio desde PaymentRepositoryImpl', async () => {
    const paymentMock = new Payment();
    paymentMock.amount_in_cents = 123
    paymentMock.currency = 'COP';
    paymentMock.customer_email = "napandalesr@gmail.com";
    paymentMock.reference = '123';
    await paymentRepositoryMock.create(paymentMock)
    expect(paymentRepositoryMock.create).toHaveBeenCalled();
    expect(paymentRepositoryMock.create).toHaveBeenCalledWith(paymentMock);
  });
})