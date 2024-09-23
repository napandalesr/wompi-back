import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";

export class CreatePaymentDto {
  @IsNumber()
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
  @IsNotEmpty()
  @ApiProperty()
  reference: string;
}

type PaymentMethodType = {
  type: string,
  token: string
}
