import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from '../entities/target.entity';
import { Repository } from 'typeorm';
import { GetReportDto } from '../dto/get-report.dto';

@Injectable()
export class TargetService {
  constructor(
    @InjectRepository(Target) private targetRepository: Repository<Target>,
  ) {}

  findAll() {
    return `This action returns all target`;
  }

  async getReport(getReportDto: GetReportDto) {
    const { id_user, initialDate, endDate } = getReportDto;

    const query = `
      with totals as (
        select
          service.key,
          service.type,
          service.category,
          sum(item.quantity)
        from result
        inner join item on item.id_result = result.id
        left join service on service.id = item.id_service 
        where result.id_user = $1
        ${initialDate ? `AND result.validation_date >= $2` : ''}
        ${endDate ? `AND result.validation_date <= $3` : ''}
        group by key, type, category 
      ), target_tb as (
        select
          target.name,
          target.description,
          target.value,
          totals.key first_service,
          target.second_service second_service,
          target.service_category service_category,
          totals.sum first_qtd,
          case
            when target."type" = 'service' then (select tt.sum from totals as tt where tt.key = target.second_service)
            when target."type" = 'category' then (select sum(tt.sum) from totals as tt where tt.category = target.service_category::service_category_enum and tt."type" = 'envio')
          end as second_qtd
        from target
        left join totals on totals.key = target.first_service 
	    )
	
      SELECT
        target_tb.name name,
        target_tb.description description,
          target_tb.value targetValue,
          trunc((target_tb.first_qtd * 100 / target_tb.second_qtd)::numeric, 2)::float achievedValue
      from target_tb
      order by name
    `;

    const values: Array<number | Date> = [id_user];

    if (initialDate) values.push(new Date(initialDate));
    if (endDate) values.push(new Date(endDate));

    try {
      const targets = await this.targetRepository.query(query, values);
      return targets;
    } catch (err) {
      throw new Error(`Error to find targets: ${err}`);
    }
  }
}
