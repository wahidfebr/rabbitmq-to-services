import { Module } from '@nestjs/common';
import { HttpController } from './controller/http.controller';
import { HttpService } from './service/http.service';
import { ProviderModule } from '../provider/provider.module';

@Module({
  imports: [ProviderModule],
  controllers: [HttpController],
  providers: [HttpService],
})
export class HttpModule {}
