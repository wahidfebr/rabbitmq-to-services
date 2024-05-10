import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const APP_PORT = 3000;
  const APP_HOST = 'localhost';
  const app = await NestFactory.create(AppModule);
  await app.listen(APP_PORT, APP_HOST, () => {
    console.log(`HTTP Server started at http://${APP_HOST}:${APP_PORT}`);
  });
}
bootstrap();
