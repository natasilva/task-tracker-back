import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Result } from './result.entity';
import { CategoryService } from './category-service.entity';
// import { Service } from './service.entity';

@Entity('result_category')
export class ResultCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ type: 'int' })
  ar_qtd: number;

  @Column({ type: 'int' })
  vd_qtd: number;

  @Column({ type: 'int' })
  packaging_qtd: number;

  @ManyToOne(() => Result, (result) => result.result_categories)
  @JoinColumn({ name: 'id_result' })
  result: Result;

  @OneToMany(
    () => CategoryService,
    (category_services) => category_services.result_category,
  )
  category_services: CategoryService[];

  // @ManyToOne(() => Service) //(service) => service.service_results
  // @JoinColumn({ name: 'id_service' })
  // service: Service;
}
