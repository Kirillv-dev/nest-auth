import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class FindUsersDto implements IUser {
  @IsOptional()
  @IsNotEmpty()
  @Transform((params: TransformFnParams) => parseInt(params.value, 10))
  @IsPositive()
  page?: number;

  @IsOptional()
  @IsNotEmpty()
  @Transform((params: TransformFnParams) => parseInt(params.value, 10))
  @IsPositive()
  limit?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;
}
