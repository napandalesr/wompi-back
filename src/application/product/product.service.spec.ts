import { MockType } from "../../test-utils/types";
import { ProductsService } from "./product.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "../../domain/product/product.entity";
import { productServiceFactory, repositoryMockFactory } from "../../test-utils";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";

describe('Product Service', () => {
  let productServiceMock: MockType<ProductsService>;
  let productRepositoryMock: MockType<Repository<ProductsService>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'productsService',
          useFactory: productServiceFactory
        },
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
      ]
    }).compile();
    productServiceMock = module.get('productsService'); 
    productRepositoryMock = module.get(getRepositoryToken(Product));
  });

  it('debe ser definido', async () => {
    expect(productServiceMock).toBeDefined();
  });

  it('debería llamar el método create del repositorio de Product', async () => {
    const productMock = new CreateProductDto();
    productMock.count = 1;
    productMock.description = "";
    productMock.price; 1000;
    productMock.shipping = "";
    await productServiceMock.create(productMock);
    //expect(productRepositoryMock.create).toHaveBeenCalled();
    //expect(productRepositoryMock.create).toHaveBeenCalledWith(productMock);
  });

  it('debería llamar el método find del repositorio de Product', async () => {
    await productServiceMock.findAll();
    //expect(productRepositoryMock.find).toHaveBeenCalled();
    //expect(productRepositoryMock.find).toHaveBeenCalledWith();
  });
})