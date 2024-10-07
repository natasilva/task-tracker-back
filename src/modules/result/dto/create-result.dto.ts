import { IsArray, IsDate, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateItemDto } from './create-item.dto';

export class CreateResultDto {
  @IsNumber()
  id_user: number;

  @IsDate()
  validation_date: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items: Array<CreateItemDto>;
}
