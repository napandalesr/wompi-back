import { AuthService } from "../application/auth/auth.service";
import { MockType } from "./types";
import { Repository } from "typeorm";
import { UserService } from "../application/user/user.service";


export const authServiceFactory: () => MockType<AuthService> = jest.fn(
  () => ({
    login: jest.fn(),
    register: jest.fn(),
  }),
);

export const userServiceFactory: () => MockType<UserService> = jest.fn(
  () => ({
    create: jest.fn(),
    findByEmail: jest.fn(),
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