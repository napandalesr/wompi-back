import { Injectable } from '@nestjs/common';
import { Product } from '../../domain/product/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from '../../domain/product/product.repository';

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    
    
    return await this.productRepository.create(createProductDto);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findOne(id);
  }
}
