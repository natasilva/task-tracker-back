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

  @Column()
  category: string;

  @Column()
  has_ar: boolean;

  @Column()
  has_vd: boolean;

  @Column()
  has_packaging: boolean;

  @Column({ type: 'int', default: 0 })
  sequence: number;

  //   @OneToMany(() => ServiceResult, (service_result) => service_result.service)
  //   service_results: ServiceResult[];
}
