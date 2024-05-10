import { Module } from '@nestjs/common';
import { Test01Module } from './test01/test01.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: <Dialect>process.env.DB_DIALECT || 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(<string>process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || 'db_name',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      sync: {
        alter: false,
      },
    }),
    Test01Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
