import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class SignInDto {
  @ValidateIf((params) => !params.phone)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ValidateIf((params) => !params.email)
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
