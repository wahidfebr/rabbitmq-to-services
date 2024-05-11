import { Module } from '@nestjs/common';
import { ProviderService } from './service/provider.service';

@Module({
  providers: [ProviderService],
  exports: [ProviderService],
})
export class ProviderModule {}
