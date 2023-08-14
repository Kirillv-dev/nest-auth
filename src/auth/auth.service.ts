import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, phone, password } = signUpDto;

    if (email && (await this.userService.findOneByEmail(email))) {
      throw new ConflictException('User with this email already exists');
    }

    if (phone && (await this.userService.findOneByPhone(phone))) {
      throw new ConflictException('User with this phone already exists');
    }

    const hashPassword = await bcrypt.hash(
      password,
      Number(this.configService.get<number>('SALT')),
    );

    const userData: IUser = {
      ...signUpDto,
      password: hashPassword,
    };
    if (email) userData.email = email;
    if (phone) userData.phone = phone;

    const user = await this.userService.create(userData);
    delete user.password;
    return user;
  }

  async signInByPhone(signInDto: SignInDto) {
    const { phone, password } = signInDto;
    const user = await this.userService.findOneByPhone(phone);
    if (!user) throw new UnauthorizedException('Invalid password or phone');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password or phone');
    }

    const payload: ITokenPayload = {
      id: user.id,
      email: user.email,
    };

    const tokens = this.createTokens(payload);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signInByEmail(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid password or email');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password or email');
    }

    const payload: ITokenPayload = {
      id: user.id,
      email: user.email,
    };

    const tokens = this.createTokens(payload);

    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async signOut(userId: number) {
    await this.userService.update(userId, { refreshToken: null });
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
    };

    const tokens = this.createTokens(payload);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }
}
