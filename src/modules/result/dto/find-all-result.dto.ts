import { Optional } from '@nestjs/common';

export class FindAllResultDto {
  @Optional()
  initialDate: string;

  @Optional()
  endDate: string;
}
