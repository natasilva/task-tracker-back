import { IsArray, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { UpdateCategoryServiceDto } from './update-category-service.dto';
import { Type } from 'class-transformer';

export class UpdateResultCategoryDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNumber()
  ar_qtd: number;

  @IsNumber()
  vd_qtd: number;

  @IsNumber()
  packaging_qtd: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCategoryServiceDto)
  services: Array<UpdateCategoryServiceDto>;
}
