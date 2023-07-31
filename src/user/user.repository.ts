import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(userData: any): Promise<IUser> {
    const user: IUser = await this.userModel.create(userData);
    return user;
  }

  updateById(id: number, userData: IUser) {
    return this.userModel.update(userData, { where: { id } });
  }

  async findOne(where: any): Promise<IUser> {
    const user = await this.userModel.findOne({ where });
    if (user) return user.get();
    return user;
  }
}
