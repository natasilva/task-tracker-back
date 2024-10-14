import { Optional } from '@nestjs/common';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetReportDto {
  @Optional()
  initialDate?: string;

  @Optional()
  endDate?: string;

  @IsNumber()
  @IsNotEmpty()
  id_user: number;
}
