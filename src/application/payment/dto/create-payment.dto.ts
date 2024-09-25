import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  amount_in_cents: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  currency: string = "COP";

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  customer_email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  acceptance_token: string;

  @IsNotEmpty()
  @ApiProperty()
  payment_method: PaymentMethodType;

  @IsString()
  @IsOptional()
  @ApiProperty()
  reference: string;
}

type PaymentMethodType = {
  type: string,
  token: string
}
