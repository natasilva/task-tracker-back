import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('service')
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ unique: true })
  key: string;

  @Column({ type: 'enum', enum: ['objeto', 'carta'] })
  category: string;

  @Column({ type: 'enum', enum: ['envio', 'extra'] })
  type: string;
}
