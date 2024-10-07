import { ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateItemDto } from './update-item.dto';

export class UpdateResultDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateItemDto)
  items: Array<UpdateItemDto>;
}
