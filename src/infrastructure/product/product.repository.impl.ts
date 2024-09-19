import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/domain/product/product.repository';
import { Product } from 'src/domain/product/product.entity';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
}
