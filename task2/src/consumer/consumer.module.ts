import { Module } from '@nestjs/common';
import { ConsumerService } from './service/consumer.service';
import { Test01Module } from 'src/test01/test01.module';

@Module({
  imports: [Test01Module],
  providers: [ConsumerService],
})
export class ConsumerModule {}
