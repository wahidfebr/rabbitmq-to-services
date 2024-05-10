import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ITest01, ITest01StoreDTO } from '../dto/test01.dto';
import { Test01Service } from '../service/test01.service';

@Controller('test01')
export class Test01Controller {
  constructor(private service: Test01Service) {}

  @Get()
  getHello() {
    return process.env.APP_PORT;
  }

  @Post()
  async store(@Body() { nama, status }: ITest01StoreDTO): Promise<ITest01> {
    if (!nama) {
      throw new BadRequestException('nama is required');
    }
    if (typeof nama !== 'string') {
      throw new BadRequestException('nama should be a string');
    }
    if (!status) {
      throw new BadRequestException('status is required');
    }
    if (typeof status !== 'number') {
      throw new BadRequestException('status should be a number');
    }

    return await this.service.store({ nama, status });
  }
}
