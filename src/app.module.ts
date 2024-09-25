import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './infrastructure/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './infrastructure/product/products.module';
import { PaymentModule } from './infrastructure/payment/payment.module';
import { cardsModule } from './infrastructure/cards/cards.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/sql.sqlite',
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: false,
      autoLoadEntities: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ProductsModule,
    PaymentModule,
    cardsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
