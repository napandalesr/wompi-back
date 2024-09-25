import { Test, TestingModule } from "@nestjs/testing";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { AxiosResponse } from "axios";
import { httServiceFactory } from "../../test-utils";
import { PaymentService } from "./payment.service";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UuidService } from "nestjs-uuid";

describe('PaymentService', () => {
  let paymentService: PaymentService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PaymentService,
        UuidService,
        {
          provide: HttpService,
          useFactory: httServiceFactory
        }
      ],
    }).compile();

    paymentService = module.get<PaymentService>(PaymentService);
    httpService = module.get<HttpService>(HttpService);
  })

  it('Debería llamar al enpoint para conocer el estado de una transación', async () => {
    const mockData: AxiosResponse = {
      data: {
        data: {
          status: 'PENDING',
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined
      }
    };
    
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockData));
    const result = await paymentService.getStatus('123');
    expect(result).toEqual({status: mockData.data.data.status});
  });

  it('Debería llamar al enpoint para realizar una transación', async () => {
    const payment = new CreatePaymentDto();

    payment.acceptance_token = "123"
    payment.currency = "COP"
    payment.customer_email = "napandalesr@gmail.com"
    payment.acceptance_token = "123"
    payment.reference = "123"

    const mockData: AxiosResponse = {
      data: {
        data: {
          id: 'token',
        },
      },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: undefined
      }
    };
    
    jest.spyOn(httpService, 'post').mockReturnValue(of(mockData));

    const result = await paymentService.create(payment);

    expect(result).toEqual(mockData.data);
  });

})