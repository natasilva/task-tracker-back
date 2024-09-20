import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ResultService } from '../services/result.service';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { FindAllResultDto } from '../dto/find-all-result.dto';

@Controller('results')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @Get()
  findAll(@Query() findAllResultDto: FindAllResultDto) {
    return this.resultService.findAll(findAllResultDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(+id, updateResultDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(+id);
  }
}
