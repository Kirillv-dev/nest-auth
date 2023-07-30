import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-news.dto';
import { NewsRepository } from './news.repository';

@Injectable()
export class NewsService {
  constructor(
    @Inject(NewsRepository)
    public newsRepository: NewsRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.newsRepository.create(createUserDto);
  }

  update(id: number, updateNewsDto: any) {
    return this.newsRepository.updateById(id, updateNewsDto);
  }

  findOne(where: any) {
    return this.newsRepository.findOne(where);
  }

  findAll() {
    return this.newsRepository.findAll({});
  }

  delete(id: number) {
    return this.newsRepository.destroyById(id);
  }
}
