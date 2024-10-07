import { IsNumber } from 'class-validator';

export class CreateItemDto {
  @IsNumber()
  id_service: number;

  @IsNumber()
  quantity: number;
}
