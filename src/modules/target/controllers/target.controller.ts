import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { TargetService } from '../services/target.service';
import { GetReportDto } from '../dto/get-report.dto';

@Controller('targets')
export class TargetController {
  constructor(private readonly targetService: TargetService) {}

  @Get()
  findAll() {
    return this.targetService.findAll();
  }

  @Get('/report')
  getReport(@Query() getReportDto: GetReportDto) {
    if (!getReportDto || !getReportDto.id_user) {
      throw new BadRequestException('The id_user parameter is required.');
    }

    return this.targetService.getReport(getReportDto);
  }
}
