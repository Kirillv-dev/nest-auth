import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Post('tokens')
  refreshTokens(@Body('refreshToken') refreshToken: string) {
    return this.authService.createTokensByRefreshToken(refreshToken);
  }

  @Post('signout')
  signOut(@Req() request: any) {
    const { userId } = request;
    return this.authService.signOut(userId);
  }
}
