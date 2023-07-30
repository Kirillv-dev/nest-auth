import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository)
    public userRepository: UserRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateById(id, updateUserDto);
  }

  findOne(where: any) {
    return this.userRepository.findOne(where);
  }

  findOneByPhone(phone: string) {
    return this.userRepository.findOne({ phone });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ email });
  }

  findOneByRefreshToken(refreshToken: string) {
    return this.userRepository.findOne({ refreshToken });
  }
}
