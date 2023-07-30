import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { News } from './news.model';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';
import { NewsController } from './news.controller';

@Module({
  controllers: [NewsController],
  imports: [SequelizeModule.forFeature([News])],
  providers: [NewsService, NewsRepository],
  exports: [],
})
export class NewsModule {}
