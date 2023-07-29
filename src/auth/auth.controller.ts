import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    console.log('@@@signupDto', signUpDto);
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    console.log('@@@signinDto', signInDto);
    return this.authService.signIn(signInDto);
  }

  @Post('tokens')
  refreshTokens(@Body('refreshToken') refreshToken: string) {
    return this.authService.createTokensByRefreshToken(refreshToken);
  }

  /* @Post('signin')
  signIn(@Body() signInDto: SignInDto) {
    console.log('@@@signinDto', signInDto);
    return this.authService.signIn(signInDto);
  } */
}
