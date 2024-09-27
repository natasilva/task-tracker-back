import { Injectable } from '@nestjs/common';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { DataSource, Repository } from 'typeorm';
import { Result } from '../entities/result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryServiceDto } from '../dto/create-category-service.dto';
import { User } from '../../user/entities/user.entity';
import { UpdateResultCategoryDto } from '../dto/update-result-category.dto';
import { FindAllResultDto } from '../dto/find-all-result.dto';
import { CategoryService } from '../entities/category-service.entity';
import { ResultCategory } from '../entities/result-category.entity';
import { CreateResultCategoryDto } from '../dto/create-result-category.dto';
import { UpdateCategoryServiceDto } from '../dto/update-category-service.dto';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result) private resultRepository: Repository<Result>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(CategoryService)
    private categoryServiceRepository: Repository<CategoryService>,
    @InjectRepository(ResultCategory)
    private resultCategoryRepository: Repository<ResultCategory>,
    private dataSource: DataSource,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const user = await this.userRepository.findOne({
      where: { id: createResultDto.id_user },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const result = this.resultRepository.create({
        user: user,
        validation_date: createResultDto.validation_date,
      });

      const savedResult = await queryRunner.manager.save(result);

      const categories = await Promise.all(
        createResultDto.result_categories.map(
          async (createResultCategoryDto: CreateResultCategoryDto) => {
            const services = [...createResultCategoryDto.services];
            delete createResultCategoryDto.services;
            const result_category = this.resultCategoryRepository.create({
              ...createResultCategoryDto,
              result: { id: savedResult.id },
            });

            await queryRunner.manager.save(result_category);

            await Promise.all(
              services.map(
                async (createCategoryServiceDto: CreateCategoryServiceDto) => {
                  const service = this.categoryServiceRepository.create({
                    result_category,
                    quantity: createCategoryServiceDto.quantity,
                    service: { id: createCategoryServiceDto.id_service },
                  });

                  await queryRunner.manager.save(service);
                },
              ),
            );

            return result_category;
          },
        ),
      );

      await queryRunner.commitTransaction();

      return { ...savedResult, categories };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
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
      relations: {
        result_categories: { category_services: { service: true } },
        user: true,
      },
    });

    return result;
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const result = await this.findOne(id);

      if (!result) {
        throw new Error('Result not found');
      }

      const categories = await Promise.all(
        updateResultDto.result_categories.map(
          async (updateResultCategoryDto: UpdateResultCategoryDto) => {
            let result_category: ResultCategory;

            const services = [...updateResultCategoryDto.services];
            delete updateResultCategoryDto.services;

            if (updateResultCategoryDto.id) {
              result_category = await this.resultCategoryRepository.findOne({
                where: { id: updateResultCategoryDto.id },
              });

              if (!result_category) {
                throw new Error(
                  `Category with ID ${updateResultCategoryDto.id} not found`,
                );
              }

              Object.assign(result_category, updateResultCategoryDto);
              await queryRunner.manager.save(result_category);
            } else {
              result_category = this.resultCategoryRepository.create({
                ...updateResultCategoryDto,
                result: { id: result.id },
              });
              await queryRunner.manager.save(result_category);
            }
            await Promise.all(
              services.map(
                async (updateCategoryServiceDto: UpdateCategoryServiceDto) => {
                  let category_service: CategoryService;

                  if (updateCategoryServiceDto.id) {
                    category_service =
                      await this.categoryServiceRepository.findOne({
                        where: { id: updateCategoryServiceDto.id },
                      });

                    if (!category_service) {
                      throw new Error(
                        `Service with ID ${updateCategoryServiceDto.id} not found`,
                      );
                    }

                    Object.assign(category_service, updateCategoryServiceDto);
                    await queryRunner.manager.save(category_service);
                  } else {
                    category_service = this.categoryServiceRepository.create({
                      result_category,
                      quantity: updateCategoryServiceDto.quantity,
                      service: { id: updateCategoryServiceDto.id_service },
                    });
                    await queryRunner.manager.save(category_service);
                  }
                },
              ),
            );
            return result_category;
          },
        ),
      );

      await queryRunner.commitTransaction();

      return categories;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
}
