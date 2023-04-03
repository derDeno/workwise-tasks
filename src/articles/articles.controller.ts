import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticlesController {

    constructor(private readonly services: ArticlesService) { }

    @UseInterceptors(ClassSerializerInterceptor)
    @Get('all')
    async getAllArticles(@Query('tag') tagFilter: string, @Query('author') authorFilter: string): Promise<any> {
        return await this.services.getAllArticles(tagFilter, authorFilter);
    }

    @Put('')
    async createArticle(@Body() createArticleDto: CreateArticleDto): Promise<any> {
        return await this.services.createArticle(createArticleDto);
    }

    @Post(':id')
    async updateArticle(@Param('id') articleId: number, @Body() dto: UpdateArticleDto): Promise<any> {
        return await this.services.updateArticle(articleId, dto);
    }

    @Get(':id')
    async getArticle(@Param('id') articleId: number): Promise<any> {
        return await this.services.getArticle(articleId);
    }

    @Delete(':id')
    async deleteArticle(@Param('id') articleId: number): Promise<any> {
        return await this.services.deleteArticle(articleId);
    }
}
