import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './infrastructure/product/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    AuthModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
