import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from '../entities/service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private ServiceRepository: Repository<Service>,
  ) {}

  async findAll() {
    const services = await this.ServiceRepository.find({
      order: { sequence: 'desc' },
    });

    return services;
  }

  findOne(id: number) {
    return `This action returns a #${id} result`;
  }
}
