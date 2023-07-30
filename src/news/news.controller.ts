import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-news.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(+id);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createUserDto: CreateUserDto) {
    return this.newsService.create(createUserDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateNewsDto: any) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.newsService.delete(+id);
  }
}
