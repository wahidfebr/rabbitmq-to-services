import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const APP_PORT = process.env.APP_PORT || 3000;
  const APP_HOST = process.env.APP_HOST || '127.0.0.1';
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(APP_PORT, APP_HOST, () => {
    console.log(`HTTP Server started at http://${APP_HOST}:${APP_PORT}`);
  });
}
bootstrap();
