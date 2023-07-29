import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: any): Promise<User> {
    console.log('@@@createUserDto', createUserDto);
    const users = await this.userModel.create(createUserDto);
    console.log('@@@users', users);
    return users;
  }

  updateById(id: number, updateUserDto: any) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  async findOne(where: any) {
    const user = await this.userModel.findOne(where);
    if (user) return user.get();
    return user;
  }

  findAll() {}
  update() {}
  delete() {}
}
