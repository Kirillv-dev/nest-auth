import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const foundUser = await this.userService.findOneByEmail(email);

    if (foundUser) throw new Error('User already exists');

    const hashPassword = await bcrypt.hash(
      password,
      Number(this.configService.get<number>('SALT')),
    );

    const userData: CreateUserDto = {
      ...signUpDto,
      email,
      password: hashPassword,
    };

    const user = await this.userService.create(userData);
    delete user.password;
    return user;
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.findOneByEmail(email);

    if (!user) throw new Error('User does not exists');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error('Invalid password');

    const payload: ITokenPayload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
    };

    const tokens = this.createTokens(payload);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      Number(this.configService.get<number>('SALT')),
    );
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  createTokens(payload: ITokenPayload) {
    const accessToken = sign(
      payload,
      this.configService.get<string>('JWT_ACCESS_SECRET'),
      {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
      },
    );

    const refreshToken = sign(
      payload,
      this.configService.get<string>('JWT_REFRESH_SECRET'),
      {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
      },
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async createTokensByRefreshToken(refreshToken: string) {
    try {
      verify(
        refreshToken,
        this.configService.get<string>('JWT_REFRESH_SECRET'),
      );
    } catch {
      throw new UnauthorizedException();
    }

    const hashedRefreshToken = await bcrypt.hash(
      refreshToken,
      Number(this.configService.get<number>('SALT')),
    );

    const user = await this.userService.findOneByRefreshToken(
      hashedRefreshToken,
    );

    const payload: ITokenPayload = {
      id: user.id,
      email: user.email,
      phone: user.phone,
    };

    const tokens = this.createTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
