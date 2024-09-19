import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './product.service';
import { Product } from 'src/domain/product/product.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }
}
