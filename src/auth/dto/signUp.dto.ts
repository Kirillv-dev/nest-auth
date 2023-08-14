import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  @ValidateIf((params) => !params.phone || params.email)
  email: string;

  @IsNotEmpty()
  @ValidateIf((params) => !params.email || params.phone)
  phone: string;

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
