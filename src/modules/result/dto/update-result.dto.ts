import { UpdateResultCategoryDto } from './update-result-category.dto';
import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateResultDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateResultCategoryDto)
  result_categories: Array<UpdateResultCategoryDto>;
}
