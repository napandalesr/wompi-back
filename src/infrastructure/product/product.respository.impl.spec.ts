import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "../../domain/product/product.entity";
import { repositoryMockFactory } from "../../test-utils";
import { MockType } from "../../test-utils/types";
import { ProductRepositoryImpl } from "./product.repository.impl";
import { Repository } from "typeorm";

describe('Product respository impl', () => {
  let productRepositoryImpl: MockType<ProductRepositoryImpl>;
  let productRepositoryMock: MockType<Repository<ProductRepositoryImpl>>;
  beforeEach( async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepositoryImpl,
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
      ]
    }).compile();
    productRepositoryImpl = module.get(ProductRepositoryImpl); 
    productRepositoryMock = module.get(getRepositoryToken(Product));
  });

  it('debe ser definido', async () => {
    expect(productRepositoryImpl).toBeDefined();
  });

  it('debería llamar al método save del respositorio desde ProductRepositoryImpl', async () => {
    const productMock = new Product();
    productMock.count = 1;
    productMock.description = "";
    productMock.price; 1000;
    productMock.shipping = "";
    await productRepositoryImpl.create(productMock)
    expect(productRepositoryMock.save).toHaveBeenCalled();
    expect(productRepositoryMock.save).toHaveBeenCalledWith(productMock);
  });

  it('debería llamar al método find del respositorio desde ProductRepositoryImpl', async () => {
    await productRepositoryImpl.find()
    expect(productRepositoryMock.find).toHaveBeenCalled();
  });

  it('debería llamar al método save del respositorio desde ProductRepositoryImpl', async () => {
    await productRepositoryImpl.findOne()
    expect(productRepositoryMock.findOne).toHaveBeenCalled();
  });
})