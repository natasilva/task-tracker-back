import { Injectable } from '@nestjs/common';
import { CreateResultDto } from '../dto/create-result.dto';
import { UpdateResultDto } from '../dto/update-result.dto';
import { DataSource, Repository } from 'typeorm';
import { Result } from '../entities/result.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../user/entities/user.entity';
import { FindAllResultDto } from '../dto/find-all-result.dto';
import { CreateItemDto } from '../dto/create-item.dto';
import { UpdateItemDto } from '../dto/update-item.dto';
import { Item } from '../entities/item.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result) private resultRepository: Repository<Result>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Item) private itemRepository: Repository<Item>,
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

      const items: Item[] = await Promise.all(
        createResultDto.items.map(async (createItemDto: CreateItemDto) => {
          const item = this.itemRepository.create({
            ...createItemDto,
            result: savedResult,
            service: { id: createItemDto.id_service },
          });
          return queryRunner.manager.save(item);
        }),
      );

      await queryRunner.commitTransaction();

      return { ...savedResult, items };
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
          select * from
            (
              SELECT d.validation_date, r.*
              FROM date_range d
              LEFT JOIN mytb r ON DATE(r.validation_date) = d.validation_date
            ) as res
          ${findAllResultDto.registered == 'true' ? 'where res.id is not null' : ''};
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
        items: { service: true },
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

      const items: Item[] = await Promise.all(
        updateResultDto.items.map(async (updateItemDto: UpdateItemDto) => {
          let item: Item;
          if (updateItemDto.id) {
            item = await this.itemRepository.findOne({
              where: { id: updateItemDto.id },
            });

            if (!item) {
              throw new Error(`Item with ID ${updateItemDto.id} not found`);
            }

            await queryRunner.manager.save({
              ...item,
              quantity: updateItemDto.quantity,
            });

            return item;
          } else {
            item = this.itemRepository.create({
              ...updateItemDto,
              result: { id: result.id },
              service: { id: updateItemDto.id_service },
            });
            await queryRunner.manager.save(item);
          }
        }),
      );

      await queryRunner.commitTransaction();

      return { ...result, items };
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
