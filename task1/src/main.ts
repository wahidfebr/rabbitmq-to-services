import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const APP_PORT = process.env.APP_PORT || 3000;
  const APP_HOST = process.env.APP_HOST || '127.0.0.1';
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Task 1 CRUD Web API')
    .setDescription('Simple CRUD Web API')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(APP_PORT, APP_HOST, () => {
    console.log(`HTTP Server started at http://${APP_HOST}:${APP_PORT}`);
  });
}
bootstrap();
