import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepositoryImpl } from '../user/user.repository.impl';
import { User } from 'src/domain/user/user.entity';
import { AuthService } from 'src/application/auth/auth.service';
import { UserService } from 'src/application/user/user.service';
import { AuthController } from 'src/application/auth/auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  
  controllers: [AuthController],
  providers: [UserRepositoryImpl, 
  {
    provide: 'userService',
    useFactory: (userRepository: UserRepositoryImpl) =>
      new UserService(userRepository),
    inject: [UserRepositoryImpl],
  },
  {
    provide: 'authService',
    useFactory: (userService: UserService, jwtService: JwtService) =>
      new AuthService(userService, jwtService),
    inject: ['userService', JwtService],
  },
  JwtStrategy],
})
export class AuthModule {}
