import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
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

  async findAll(query): Promise<IUser[]> {
    const { searchingParms, offset, limit } = query;
    let where = {};

    if (searchingParms) {
      where = {
        [Op.and]: Object.entries(searchingParms).map(([key, value]) => ({
          [key]: { [Op.like]: `%${value}%` },
        })),
      };
    }

    return this.userModel.findAll({ where, offset, limit });
  }
}
