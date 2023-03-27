import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {

    constructor(private readonly services: TagsService) { 
    }

    /*

    // return all tags
    @Get('all')
    async getAll() {

    }

    // return tag articles
    @Get(':id')
    async getTag() {

    }
*/

    // delete a tag
    @Delete(':id')
    async deleteTag(@Param('id') tagId: number): Promise<any> {
        return await this.services.deleteTag(tagId);
    }

    
}
