import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./product.controller"
import { productServiceFactory, repositoryMockFactory } from "../../test-utils";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Product } from "../../domain/product/product.entity";
import { MockType } from "../../test-utils/types";
import { ProductsService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";

describe('Product controller', () => {
  let productController: ProductsController;
  let productServiceMock: MockType<ProductsService>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: getRepositoryToken(Product),
          useFactory: repositoryMockFactory,
        },
        {
          provide: ProductsService,
          useFactory: productServiceFactory,
        },
      ]
    }).compile();

    productController = module.get<ProductsController>(ProductsController);
    productServiceMock = module.get(ProductsService);
  });

  it('debe ser definido', async () => {
    expect(productController).toBeDefined();
  });

  it('debería llamar al método de create de products desde el controlador ProductController', async () => {
    const productMock = new CreateProductDto();
    productMock.count = 1;
    productMock.description = "";
    productMock.price; 1000;
    productMock.shipping = "";
    await productController.create(productMock);
    expect(productServiceMock.create).toHaveBeenCalled();
    expect(productServiceMock.create).toHaveBeenCalledWith(productMock);
  });

  it('debería llamar al método de create de products desde el controlador ProductController', async () => {
    await productController.findAll();
    expect(productServiceMock.findAll).toHaveBeenCalled();
    expect(productServiceMock.findAll).toHaveBeenCalledWith();
  });
})