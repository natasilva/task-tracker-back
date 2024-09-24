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
import { ResultCategory } from './result-category.entity';

@Entity('result')
@Unique(['user', 'validation_date'])
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  // @UpdateDateColumn({ type: 'timestamp', onUpdate: 'CURRENT_TIMESTAMP' })
  // updated_at: Date;

  @Column({ unique: true })
  validation_date: Date;

  @ManyToOne(() => User, (user) => user.results)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => ResultCategory, (result_category) => result_category.result)
  result_categories: ResultCategory[];
}
