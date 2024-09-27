import { IsNumber, IsOptional } from 'class-validator';

export class UpdateCategoryServiceDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNumber()
  id_service: number;

  @IsNumber()
  quantity: number;
}
