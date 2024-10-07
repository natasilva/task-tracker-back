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
import { Item } from './item.entity';

@Entity('result')
@Unique(['user', 'validation_date'])
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Column({ unique: true })
  validation_date: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => Item, (item) => item.result)
  items: Item[];
}
