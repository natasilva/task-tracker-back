import { IsArray, IsDate, IsNumber, ValidateNested } from 'class-validator';
import { CreateResultCategoryDto } from './create-result-category.dto';
import { Type } from 'class-transformer';

export class CreateResultDto {
  @IsNumber()
  id_user: number;

  @IsDate()
  validation_date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResultCategoryDto)
  result_categories: Array<CreateResultCategoryDto>;
}
