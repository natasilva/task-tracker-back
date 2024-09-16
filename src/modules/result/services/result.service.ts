import { Injectable } from '@nestjs/common';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { Repository } from 'typeorm';
import { Result } from '../entities/result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceResult } from '../entities/service-result.entity';
import { CreateServiceResultDto } from '../dto/create-service-result.dto';
import { User } from '../../user/entities/user.entity';

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

  findAll() {
    return `This action returns all result`;
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
