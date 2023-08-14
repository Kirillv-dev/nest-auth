import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class SignInDto {
  @ApiPropertyOptional({ description: 'User email address' })
  @ValidateIf((params) => !params.phone)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: 'User phone' })
  @ValidateIf((params) => !params.email)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
