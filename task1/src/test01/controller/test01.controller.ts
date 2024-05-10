import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ITest01, ITest01StoreDTO } from '../dto/test01.dto';
import { Test01Service } from '../service/test01.service';

@Controller('test01')
export class Test01Controller {
  constructor(private service: Test01Service) {}

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findById(id);
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

  @Put(':id')
  async update(
    @Body() { nama, status }: ITest01StoreDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ITest01> {
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

    return await this.service.update({ nama, status }, id);
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number): Promise<ITest01> {
    return await this.service.destroy(id);
  }
}
