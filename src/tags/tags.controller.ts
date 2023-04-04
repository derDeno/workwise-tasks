import { Controller, Delete, Get, Param } from '@nestjs/common';
import { TagsEntity } from 'src/entities/tags.entity';
import { ResponseTagArticleDto } from './dto/reponse-tag-article.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {

    constructor(private readonly services: TagsService) {
    }

    // return all tags
    @Get('all')
    async getAll(): Promise<TagsEntity[]> {
        return await this.services.getAllTags();
    }

    // return tag articles
    @Get(':id')
    async getTag(@Param('id') tagId: number): Promise<ResponseTagArticleDto> {
        return await this.services.getTagArticles(tagId);
    }

    // delete a tag
    @Delete(':id')
    async deleteTag(@Param('id') tagId: number): Promise<Object> {
        return await this.services.deleteTag(tagId);
    }
}
