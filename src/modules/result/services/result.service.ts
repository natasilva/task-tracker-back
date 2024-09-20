import { Injectable } from '@nestjs/common';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { Repository } from 'typeorm';
import { Result } from '../entities/result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from '../entities/service-result.entity';
import { CreateServiceResultDto } from '../dto/create-service-result.dto';
import { User } from '../../user/entities/user.entity';
import { UpdateServiceResultDto } from '../dto/update-service-result.dto';
import { FindAllResultDto } from '../dto/find-all-result.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result) private resultRepository: Repository<Result>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(ServiceResult)
    private serviceResultRepository: Repository<ServiceResult>,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const user = await this.userRepository.findOne({
      where: { id: createResultDto.id_user },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const result = this.resultRepository.create({
      user: user,
      validation_date: createResultDto.validation_date,
    });

    const savedResult = await this.resultRepository.save(result);

    const serviceResults: ServiceResult[] = await Promise.all(
      createResultDto.service_results.map(
        async (serviceResultDto: CreateServiceResultDto) => {
          const serviceResult = this.serviceResultRepository.create({
            ...serviceResultDto,
            result: savedResult,
            service: { id: serviceResultDto.id_service },
          });

          return this.serviceResultRepository.save(serviceResult);
        },
      ),
    );

    return { ...savedResult, serviceResults };
  }

  async findAll(findAllResultDto: FindAllResultDto) {
    const query = `
      WITH date_range AS (
        SELECT generate_series(
          $1::date, 
          $2::date, 
          '1 day'
          )::date AS validation_date
          ), mytb AS (
            SELECT * 
            FROM result 
            WHERE DATE(validation_date) BETWEEN $1 AND $2
            )
            SELECT r.*, d.validation_date
            FROM date_range d
        LEFT JOIN mytb r ON DATE(r.validation_date) = d.validation_date;
    `;

    const values = [
      findAllResultDto.initialDate
        ? new Date(findAllResultDto.initialDate)
        : new Date(new Date().setDate(new Date().getDate() - 9)),
      findAllResultDto.endDate
        ? new Date(findAllResultDto.endDate)
        : new Date(),
    ];

    try {
      const results = await this.resultRepository.query(query, values);
      return results;
    } catch (err) {
      throw new Error(`Error to find results: ${err}`);
    }
  }

  async findOne(id: number) {
    const result = await this.resultRepository.findOne({
      where: { id },
      relations: { service_results: { service: true }, user: true },
    });

    return result;
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    // Salva cada service-result que foi passado
    const serviceResults: ServiceResult[] = await Promise.all(
      updateResultDto.service_results.map(
        async (serviceResultDto: UpdateServiceResultDto) => {
          return this.serviceResultRepository.save(serviceResultDto);
        },
      ),
    );

    return serviceResults;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
