import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Target {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  type: string;

  @Column()
  service_key: string;

  @Column()
  extra_service_key: string;

  @Column()
  service_category: string;

  @Column()
  value: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
