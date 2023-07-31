import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { News } from './news.model';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectModel(News)
    private newsModel: typeof News,
  ) {}

  async create(createUserDto: any): Promise<News> {
    const users = await this.newsModel.create(createUserDto);
    return users;
  }

  updateById(id: number, updateUserDto: any) {
    return this.newsModel.update(updateUserDto, { where: { id } });
  }

  async findOneById(id: number) {
    const user = await this.newsModel.findOne({ where: { id } });
    if (user) return user.get();
    return user;
  }

  findAll(where: any) {
    return this.newsModel.findAll(where);
  }

  destroyById(id: number) {
    return this.newsModel.destroy({ where: { id } });
  }
}
