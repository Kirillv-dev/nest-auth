import { Controller, Post, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refreshToken.dto';
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
    if (signInDto.phone) {
      return this.authService.signInByPhone(signInDto);
    }
    return this.authService.signInByEmail(signInDto);
  }

  @Post('tokens')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.createTokensByRefreshToken(
      refreshTokenDto.refreshToken,
    );
  }

  @Post('signout')
  @UseGuards(AuthGuard)
  signOut(@Req() request: any) {
    const { id } = request.user;
    return this.authService.signOut(id);
  }
}
