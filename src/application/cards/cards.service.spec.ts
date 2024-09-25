import { Test, TestingModule } from "@nestjs/testing";
import { CardsService } from "./cards.service";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { AxiosResponse } from "axios";
import { httServiceFactory } from "../../test-utils";
import { CreateCardsDto } from "./dto/create-cards.dto";

describe('CardService', () => {
  let cardService: CardsService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: HttpService,
          useFactory: httServiceFactory
        }
      ],
    }).compile();

    cardService = module.get<CardsService>(CardsService);
    httpService = module.get<HttpService>(HttpService);
  })

  it('Debería llamar al enpoint de acceptación', async () => {
    const mockData: AxiosResponse = {
      data: {
        data: {
          presigned_acceptance: 'presigned_acceptance',
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

    const result = await cardService.getToken();

    expect(result).toEqual(mockData.data.data.presigned_acceptance);
  });

  it('Debería llamar al enpoint de acceptación', async () => {
    const card = new CreateCardsDto();

    card.card_holder = 'Andres',
    card.cvc = '123',
    card.exp_month = '12';
    card.exp_year = '12',
    card.number = '4242424242424242';

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

    const result = await cardService.create(card);

    expect(result).toEqual({token: mockData.data.data.id});
  });

})