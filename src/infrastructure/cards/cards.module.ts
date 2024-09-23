import { HttpModule, HttpService } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { CardsController } from "src/application/cards/cards.controller";
import { CardsService } from "src/application/cards/cards.service";

@Module({
  imports: [HttpModule],
  controllers: [CardsController],
  providers: [
    CardsService
  ]
})
export class cardsModule {}