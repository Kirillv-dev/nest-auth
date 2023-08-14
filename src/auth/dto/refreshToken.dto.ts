import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: 'User email address' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
