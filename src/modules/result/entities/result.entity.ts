import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { ServiceResult } from './service-result.entity';

@Entity('result')
@Unique(['user', 'validation_date'])
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ unique: true })
  validation_date: Date;

  @ManyToOne(() => User, (user) => user.results)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => ServiceResult, (service_result) => service_result.result)
  service_results: ServiceResult[];
}
