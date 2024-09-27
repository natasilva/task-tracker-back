import { IsNumber } from 'class-validator';

export class CreateCategoryServiceDto {
  @IsNumber()
  id_service: number;

  @IsNumber()
  quantity: number;
}
