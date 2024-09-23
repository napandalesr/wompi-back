import { Body, Controller, Get, Post } from "@nestjs/common";
import { CardsService } from "./cards.service";
import { CreateCardsDto } from "./dto/create-cards.dto";

@Controller('card')
export class CardsController {
  constructor(
    private readonly cardService: CardsService
  ) {}

  @Post()
  async create(@Body() createCardsDto: CreateCardsDto): Promise<{token: string}> {
    return await this.cardService.create(createCardsDto);
  }

  @Get('acceptance_token')
  async getToken(): Promise<{acceptance_token: string, permalink: string, type: string}> {
    return await this.cardService.getToken();
  }
}