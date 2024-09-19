import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNumber()
  @IsNotEmpty()
  count: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  shipping: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
