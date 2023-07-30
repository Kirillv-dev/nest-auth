import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      username: process.env.SQL_USERNAME,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB_NAME,
      host: process.env.SQL_HOST,
      port: Number(process.env.SQL_PORT),
      dialect: 'postgres',
      synchronize: true,
      autoLoadModels: true,
      sync: { force: false, alter: true },
    }),
    UserModule,
    AuthModule,
    NewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
