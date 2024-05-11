import { Module } from '@nestjs/common';
import { Test01Controller } from './controller/test01.controller';
import { Test01Service } from './service/test01.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test01 } from './entity/test01.entity';

@Module({
  imports: [SequelizeModule.forFeature([Test01])],
  controllers: [Test01Controller],
  providers: [Test01Service],
  exports: [Test01Service],
})
export class Test01Module {}
