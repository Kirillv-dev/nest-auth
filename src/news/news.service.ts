import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NewsRepository)
    public newsRepository: NewsRepository,
  ) {}

  create(createNewsDto: CreateNewsDto) {
    return this.newsRepository.create(createNewsDto);
  }

  findAll() {
    return this.newsRepository.findAll({});
  }

  async findOneById(id: number, throwIfNotFound: boolean = false) {
    const news = await this.newsRepository.findOneById(id);

    if (!news && throwIfNotFound) {
      throw new NotFoundException('News with this id does not exists');
    }
    return news;
  }

  async update(id: number, updateNewsDto: UpdateNewsDto) {
    await this.findOneById(id, true);
    return this.newsRepository.updateById(id, updateNewsDto);
  }

  async delete(id: number) {
    await this.findOneById(id, true);
    return this.newsRepository.destroyById(id);
  }
}
