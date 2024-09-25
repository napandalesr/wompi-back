import { AuthService } from "../application/auth/auth.service";
import { MockType } from "./types";
import { Repository } from "typeorm";
import { UserService } from "../application/user/user.service";
import { ProductsService } from "src/application/product/product.service";
import { UserRepository } from "src/domain/user/user.repository";
import { ProductRepositoryImpl } from "src/infrastructure/product/product.repository.impl";
import { CardsService } from "src/application/cards/cards.service";
import { PaymentService } from "src/application/payment/payment.service";
import { HttpService } from "@nestjs/axios";


export const authServiceFactory: () => MockType<AuthService> = jest.fn(
  () => ({
    login: jest.fn(),
    register: jest.fn(),
  }),
);

export const httServiceFactory: () => MockType<HttpService> = jest.fn(
  () => ({
    request: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
    head: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
    axiosRef: jest.fn(),
  }),
);

export const userRepositoryFactory: () => MockType<UserRepository> = jest.fn(
  () => ({
    create: jest.fn(),
    findByEmail: jest.fn(),
  }),
);

export const userServiceFactory: () => MockType<UserService> = jest.fn(
  () => ({
    create: jest.fn(),
    findByEmail: jest.fn(),
  }),
);

export const productServiceFactory: () => MockType<ProductsService> = jest.fn(
  () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  }),
);

export const cardServiceFactory: () => MockType<CardsService> = jest.fn(
  () => ({
    getToken: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
  }),
);

export const paymentServiceFactory: () => MockType<PaymentService> = jest.fn(
  () => ({
    getStatus: jest.fn(),
    create: jest.fn(),
  }),
);

export const ProductRepositoryImplMock: () => MockType<ProductRepositoryImpl> = jest.fn(
  () => ({
    create: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
  }),
);

export const repositoryMockFactory: () => MockType<Partial<Repository<any>>> =
  jest.fn(() => ({
    find: jest.fn((entity) => entity),
    findOne: jest.fn(),
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    delete: jest.fn(),
    update: jest.fn(),
    findBy: jest.fn(),
    findOneBy: jest.fn((entity) => entity),
    query: jest.fn(),
    findOneByOrFail: jest.fn(),
    findOneOrFail: jest.fn(),
  }));