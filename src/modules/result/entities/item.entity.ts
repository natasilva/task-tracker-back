import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Result } from './result.entity';
import { Service } from './service.entity';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Result, (result) => result.items)
  @JoinColumn({ name: 'id_result' })
  result: Result;

  @ManyToOne(() => Service)
  @JoinColumn({ name: 'id_service' })
  service: Service;
}
