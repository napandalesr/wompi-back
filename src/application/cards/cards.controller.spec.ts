import { Test, TestingModule } from "@nestjs/testing";
import { CardsController } from "./cards.controller"
import { CardsService } from "./cards.service";
import { MockType } from "../../test-utils/types";
import { cardServiceFactory } from "../../test-utils";
import { CreateCardsDto } from "./dto/create-cards.dto";

describe('Card controller', () => {
  let cardController: CardsController;
  let cardServiceMock: MockType<CardsService>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useFactory: cardServiceFactory
        }
      ]
    }).compile();

    cardController = module.get<CardsController>(CardsController);
    cardServiceMock = module.get(CardsService);
  });

  it('debe ser definido', () => {
    expect(cardController).toBeDefined();
  });

  it('debería llamar al método de registro de tarjetas desde el controlador CardsController', async () => {
    const card = new CreateCardsDto();

    card.card_holder = 'Andres',
    card.cvc = '123',
    card.exp_month = '12';
    card.exp_year = '12',
    card.number = '4242424242424242';

    await cardController.create(card);
    expect(cardServiceMock.create).toHaveBeenCalled();
    expect(cardServiceMock.create).toHaveBeenCalledWith(card);
  });

  it('debería llamar al método de generar token de aceptación desde el controlador CardsController', async () => {
    await cardController.getToken();
    expect(cardServiceMock.getToken).toHaveBeenCalled();
  })

})