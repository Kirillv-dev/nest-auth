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
import { CreateNewsDto } from './dto/create-news.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { NewsService } from './news.service';
import { UpdateNewsDto } from './dto/update-news.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOneById(+id, true);
  }

  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(+id, updateNewsDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  delete(@Param('id') id: string) {
    return this.newsService.delete(+id);
  }
}
