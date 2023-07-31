import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNewsDto implements INews {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  content?: string;
}
