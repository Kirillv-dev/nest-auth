import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class SignUpDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsEmail()
  @ValidateIf((params) => !params.phone || params.email)
  email: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @ValidateIf((params) => !params.email || params.phone)
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
