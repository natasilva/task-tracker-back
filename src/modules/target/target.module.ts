import { Module } from '@nestjs/common';
import { TargetService } from './services/target.service';
import { TargetController } from './controllers/target.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Target } from './entities/target.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Target])],
  controllers: [TargetController],
  providers: [TargetService],
})
export class TargetModule {}
