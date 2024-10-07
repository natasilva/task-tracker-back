import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  first_service: string;

  @Column({ nullable: true })
  second_service: string;

  @Column({ nullable: true })
  service_category: string;

  @Column({ type: 'float' })
  value: number;
}
