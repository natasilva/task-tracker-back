import { CreateServiceResultDto } from './create-service-result.dto';

export class CreateResultDto {
  id_user: number;
  validation_date: Date;
  service_results: Array<CreateServiceResultDto>;
}
