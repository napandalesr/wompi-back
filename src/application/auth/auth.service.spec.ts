import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service"
import { authServiceFactory } from "../../test-utils";
import { MockType } from "../../test-utils/types";

describe('Auth Servics', () => {
  let authServiceMock: MockType<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: 'authService',
          useFactory: authServiceFactory
        },
      ]
    }).compile();
    authServiceMock = module.get('authService');
  });
  
  it('debe ser definido', () => {
    expect(authServiceMock).toBeDefined();
  });
})