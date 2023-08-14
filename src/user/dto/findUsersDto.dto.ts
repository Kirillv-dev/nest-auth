import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class FindUsersDto implements IUser {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Transform((params: TransformFnParams) => parseInt(params.value, 10))
  @IsPositive()
  page?: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @Transform((params: TransformFnParams) => parseInt(params.value, 10))
  @IsPositive()
  limit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  lastName?: string;
}
