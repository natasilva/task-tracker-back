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
  category_type: string;

  @Column({ type: 'int', default: 0 })
  sequence: number;

  //   @OneToMany(() => ServiceResult, (service_result) => service_result.service)
  //   service_results: ServiceResult[];
}
