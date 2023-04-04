import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ArticlesEntity } from 'src/entities/article.entity';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ResponseListDto } from './dto/response-list.dto';
import { ResponseDto } from './dto/response.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticlesController {

    constructor(private readonly services: ArticlesService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('all')
    async getAllArticles(@Query('tag') tagFilter: string, @Query('author') authorFilter: string): Promise<ResponseListDto[]> {
        return await this.services.getAllArticles(tagFilter, authorFilter);
    }

    @Put('')
    async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<ArticlesEntity> {
        return await this.services.createArticle(createArticleDto);
    }

    @Get(':id')
    async getArticle(@Param('id') articleId: number): Promise<ResponseDto> {
        return await this.services.getArticle(articleId);
    }

    @Post(':id')
    async updateArticle(@Param('id') articleId: number, @Body() dto: UpdateArticleDto): Promise<Object> {
        return await this.services.updateArticle(articleId, dto);
    }

    @Delete(':id')
    async deleteArticle(@Param('id') articleId: number): Promise<Object> {
        return await this.services.deleteArticle(articleId);
    }
}
