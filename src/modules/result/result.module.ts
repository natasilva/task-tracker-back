import { forwardRef, Module } from '@nestjs/common';
import { ResultService } from './services/result.service';
import { ResultController } from './controllers/result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { ServiceResult } from './entities/service-result.entity';
import { Service } from './entities/service.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Result, ServiceResult, Service]),
    forwardRef(() => UserModule),
  ],
  controllers: [ResultController],
  providers: [ResultService],
  exports: [TypeOrmModule],
})
export class ResultModule {}
