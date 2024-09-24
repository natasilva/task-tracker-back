import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from './service.entity';
import { ResultCategory } from './result-category.entity';

@Entity('category_service')
export class CategoryService {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => ResultCategory)
  @JoinColumn({ name: 'id_category' })
  result_category: ResultCategory;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'id_service' })
  service: Service;

  // @ManyToOne(() => Result, (result) => result.service_results)
  // @JoinColumn({ name: 'id_result' })
  // result: Result;
}
