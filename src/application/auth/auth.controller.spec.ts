import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import { authServiceFactory, repositoryMockFactory, userServiceFactory } from "../../test-utils"
import { getRepositoryToken } from "@nestjs/typeorm"
import { User } from "../../domain/user/user.entity"
import { MockType } from "../../test-utils/types"
import { Repository } from "typeorm"
import { UserService } from "../user/user.service"

describe('auth controller', () => {
  let authController: AuthController;
  let authServiceMock: MockType<AuthService>;
  let usersRepositoryMock: MockType<Repository<UserService>>;
  let usersServiceMock: MockType<UserService>;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: 'authService',
          useFactory: authServiceFactory
        },
        {
          provide: UserService,
          useFactory: userServiceFactory
        },
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory
        }
      ]
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authServiceMock = module.get('authService');
    usersRepositoryMock = module.get(getRepositoryToken(User));
    usersServiceMock = module.get(UserService);
  });

  it('debe ser definido', () => {
    expect(authController).toBeDefined();
  });

  it('debería llamar al método de registro de usuarios desde el controlador AuthController', async () => {
    const params = {
      email: "napandalesr@gmail.com",
      password: "12345"
    }
    await authController.register(params);

    expect(authServiceMock.register).toHaveBeenCalled();
    expect(authServiceMock.register).toHaveBeenCalledWith(params.email, params.password);
  });

  it('debería llamar al método de login desde el controlador AuthController', async () => {
    const params = {
      email: "napandalesr@gmail.com",
      password: "12345"
    }
    await authController.login(params);

    expect(authServiceMock.login).toHaveBeenCalled();
    expect(authServiceMock.login).toHaveBeenCalledWith(params.email, params.password);
  });

})