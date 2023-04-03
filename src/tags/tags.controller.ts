import { Controller, Delete, Get, Param } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {

    constructor(private readonly services: TagsService) {
    }

    // return all tags
    @Get('all')
    async getAll(): Promise<any> {
        return await this.services.getAllTags();
    }

    // return tag articles
    @Get(':id')
    async getTag(@Param('id') tagId: number): Promise<any> {
        return await this.services.getTagArticles(tagId);
    }

    // delete a tag
    @Delete(':id')
    async deleteTag(@Param('id') tagId: number): Promise<any> {
        return await this.services.deleteTag(tagId);
    }


}
