import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Result } from './result.entity';
import { Service } from './service.entity';

@Entity('service_result')
export class ServiceResult {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  ar_qtd: number;

  @Column({ type: 'int' })
  vd_qtd: number;

  @Column({ type: 'int' })
  packaging_qtd: number;

  @ManyToOne(() => Result, (result) => result.service_results)
  @JoinColumn({ name: 'id_result' })
  result: Result;

  @ManyToOne(() => Service) //(service) => service.service_results
  @JoinColumn({ name: 'id_service' })
  service: Service;
}
