import { Controller, Post, Body, Get, UseGuards, Inject, Param, Res, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './product.service';
import { Product } from '../../domain/product/product.entity';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';
import { existsSync } from 'fs';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(@Inject('productsService') private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise <Product> {
    return await this.productsService.findOne(id);
  }

  @Get('image/:idProduct/:idImage')
  async findImage(
    @Param('idProduct') idProduct: string,
    @Param('idImage') idImage: string,
    @Res() res: Response
  ) {
    const imagePath = join(process.cwd(), 'assets', 'products', idProduct, idImage);
    if (existsSync(imagePath)) {
      return res.sendFile(imagePath);
    } else {
      throw new NotFoundException('Image not found');
    }
  }
}
