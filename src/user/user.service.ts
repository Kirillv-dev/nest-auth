import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    public userRepository: UserRepository,
  ) {}

  create(createUserDto: IUser) {
    return this.userRepository.create(createUserDto);
  }

  async update(id: number, updateUserDto: IUser) {
    await this.findOneById(id, true);

    return this.userRepository.updateById(id, updateUserDto);
  }

  async findOneById(id: number, throwIfNotFound: boolean = false) {
    const user = await this.userRepository.findOne({ id });
    if (!user && throwIfNotFound) {
      throw new NotFoundException('User with this id does not exists');
    }

    return user;
  }

  async findOneByPhone(phone: string, throwIfNotFound: boolean = false) {
    const user = await this.userRepository.findOne({ phone });
    if (!user && throwIfNotFound) {
      throw new NotFoundException('User with this id does not exists');
    }

    return user;
  }

  async findOneByEmail(email: string, throwIfNotFound: boolean = false) {
    const user = await this.userRepository.findOne({ email });
    if (!user && throwIfNotFound) {
      throw new NotFoundException('User with this id does not exists');
    }

    return user;
  }

  findOneByRefreshToken(refreshToken: string) {
    return this.userRepository.findOne({ refreshToken });
  }
}
