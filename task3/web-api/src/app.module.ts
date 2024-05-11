import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProviderModule } from './provider/provider.module';
import { HttpModule } from './http/http.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProviderModule,
    HttpModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
