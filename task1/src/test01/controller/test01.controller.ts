import { Controller, Get } from '@nestjs/common';

@Controller('test01')
export class Test01Controller {
  @Get()
  getHello() {
    return process.env.APP_PORT;
  }
}
