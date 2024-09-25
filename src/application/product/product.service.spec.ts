import { MockType } from "../../test-utils/types";
import { ProductsService } from "./product.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "../../domain/product/product.entity";
import { ProductRepositoryImplMock, repositoryMockFactory } from "../../test-utils";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { ProductRepositoryImpl } from "../../infrastructure/product/product.repository.impl";

describe('Product Service', () => {
  let productServiceMock: ProductsService;
  let productRepositoryMock: MockType<Repository<ProductsService>>;
  let productRepositoryImplMock: ProductRepositoryImpl;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepositoryImpl,
        {
          provide: 'productsService',
          useFactory: (productRepository: ProductRepositoryImpl) =>
            new ProductsService(productRepository),
          inject: [ProductRepositoryImpl]
        },
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
      ]
    }).compile();
    productServiceMock = module.get('productsService'); 
    productRepositoryMock = module.get(getRepositoryToken(Product));
    productRepositoryImplMock = module.get<ProductRepositoryImpl>(ProductRepositoryImpl);
  });

  it('debe ser definido', async () => {
    expect(productServiceMock).toBeDefined();
  });
})