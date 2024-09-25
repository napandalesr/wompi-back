import { Test, TestingModule } from "@nestjs/testing";
import { MockType } from "../../test-utils/types";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
import { paymentServiceFactory } from "../../test-utils";
import { CreatePaymentDto } from "./dto/create-payment.dto";

describe('Payment controller', () => {
  let paymentController: PaymentController;
  let paymentServiceMock: MockType<PaymentService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentController],
      providers: [
        {
          provide: PaymentService,
          useFactory: paymentServiceFactory
        }
      ]
    }).compile();

    paymentController = module.get<PaymentController>(PaymentController);
    paymentServiceMock = module.get(PaymentService);
  });

  it('debe ser definido', () => {
    expect(paymentController).toBeDefined();
  });

  it('debería llamar al método de registro de tarjetas desde el controlador CardsController', async () => {
    const payment = new CreatePaymentDto();

    payment.acceptance_token = "123"
    payment.currency = "COP"
    payment.customer_email = "napandalesr@gmail.com"
    payment.acceptance_token = "123"
    payment.reference = "123"

    await paymentController.create(payment);
    expect(paymentServiceMock.create).toHaveBeenCalled();
    expect(paymentServiceMock.create).toHaveBeenCalledWith(payment);
  });

})