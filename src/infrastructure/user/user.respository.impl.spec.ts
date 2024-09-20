import { MockType } from "../../test-utils/types";
import { UserRepositoryImpl } from "./user.repository.impl";
import { Repository } from "typeorm";
import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../../domain/user/user.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { repositoryMockFactory } from "../../test-utils";

describe('User repository impl', () => {
  let userRepositoryImpl: MockType<UserRepositoryImpl>;
  let userRepositoryMock: MockType<Repository<UserRepositoryImpl>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryImpl,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ]
    }).compile();
    userRepositoryImpl = module.get(UserRepositoryImpl); 
    userRepositoryMock = module.get(getRepositoryToken(User));
  });

  it('debe ser definido', async () => {
    expect(userRepositoryImpl).toBeDefined();
  });

  it('debería llamar al método save del repositorio de user desde userRepositoryImpl', async () => {
    const userMock = new User();
    userMock.email = "napandalesr@gmail.com";
    userMock.password = "12345";
    await userRepositoryImpl.create(userMock);
    expect(userRepositoryMock.save).toHaveBeenCalled();
    expect(userRepositoryMock.save).toHaveBeenCalledWith(userMock);
  });

  it('debería llamar al método findOne del repositorio de user desde userRepositoryImpl', async () => {
    const userMock = new User();
    userMock.email = "napandalesr@gmail.com";
    userMock.password = "12345";
    await userRepositoryImpl.findByEmail(userMock.email);
    expect(userRepositoryMock.findOne).toHaveBeenCalled();
    expect(userRepositoryMock.findOne).toHaveBeenCalledWith({ where: { email: userMock.email } });
  });
})