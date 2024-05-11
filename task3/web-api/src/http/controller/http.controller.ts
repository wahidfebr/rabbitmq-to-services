import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { IDataDTO, IMessageDTO } from '../dto/http.dto';
import { HttpService } from '../service/http.service';

@Controller()
export class HttpController {
  constructor(private service: HttpService) {}

  @Post()
  @HttpCode(200)
  async store(@Body() { nama, status }: IDataDTO): Promise<IMessageDTO> {
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

    await this.service.store({ nama, status });

    return {
      message: 'command received successfully for creating data',
    };
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Body() { nama, status }: IDataDTO,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<IMessageDTO> {
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

    await this.service.update({ nama, status }, id);

    return {
      message: 'command received successfully for updating data',
    };
  }

  @Delete(':id')
  @HttpCode(200)
  async destroy(@Param('id', ParseIntPipe) id: number): Promise<IMessageDTO> {
    await this.service.destroy(id);
    return {
      message: 'command received successfully for deleting data',
    };
  }
}
