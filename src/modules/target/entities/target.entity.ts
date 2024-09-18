import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('target')
export class Target {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  service_key: string;

  @Column({ nullable: true })
  extra_service_key: string;

  @Column({ nullable: true })
  service_category: string;

  @Column({ type: 'float' })
  value: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
