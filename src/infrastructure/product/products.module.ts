import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from '../../application/product/product.controller';
import { ProductsService } from '../../application/product/product.service';
import { Product } from '../../domain/product/product.entity';
import { ProductRepositoryImpl } from './product.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    ProductRepositoryImpl,
    {
      provide: 'productsService',
      useFactory: (productRepository: ProductRepositoryImpl) => 
        new ProductsService(productRepository),
      inject: [ProductRepositoryImpl]
    }
  ],
})
export class ProductsModule {}
