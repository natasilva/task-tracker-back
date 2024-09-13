import { Module } from '@nestjs/common';
import { ResultService } from './services/result.service';
import { ResultController } from './controllers/result.controller';

@Module({
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
