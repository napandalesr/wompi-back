import { Inject, Injectable } from "@nestjs/common";
import { CreateCardsDto } from "./dto/create-cards.dto";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

@Injectable()
export class CardsService {
  constructor(
    private httpService: HttpService,
  ) {}

  async create(createCardsDto: CreateCardsDto): Promise<{token: string}> {
    const url = `${process.env.WOMPIURL}/tokens/cards`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(url, createCardsDto, {
          headers: {
            Authorization: `Bearer ${process.env.PUBLIC_KEY ?? ''}`
          }
        })
      );
      const { data: { id } } = response.data
      return {token: id};
    } catch (error) {
      console.error('Error creando token:', error);
      throw new Error('Error creando token');
    }
  }

  
  async getToken(): Promise<{acceptance_token: string, permalink: string, type: string}> {
    const url = `${process.env.WOMPIURL}/merchants/${process.env.PUBLIC_KEY}`;
    try {
      const response = await lastValueFrom(
        this.httpService.get(url)
      )
      
      const { data: { presigned_acceptance } } = response.data;
      console.log('data', presigned_acceptance);
      return presigned_acceptance;
    } catch (error) {
      console.error('Error creando token de aceptación:', error);
      throw new Error('Error creando token de aceptación');
    }
  }
}