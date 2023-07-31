import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNewsDto implements INews {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
