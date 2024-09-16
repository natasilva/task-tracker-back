import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ResultModule } from '../result/result.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ResultModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [TypeOrmModule],
})
export class UserModule {}
