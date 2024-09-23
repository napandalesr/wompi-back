import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class CreateCardsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  exp_month: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  exp_year: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  cvc: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  card_holder: string;
}