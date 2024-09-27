import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CreateCategoryServiceDto } from './create-category-service.dto';
import { Type } from 'class-transformer';

export class CreateResultCategoryDto {
  @IsString()
  type: string;

  @IsNumber()
  ar_qtd: number;

  @IsNumber()
  vd_qtd: number;

  @IsNumber()
  packaging_qtd: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCategoryServiceDto)
  services: Array<CreateCategoryServiceDto>;
}
