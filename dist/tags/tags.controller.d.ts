import { TagsEntity } from 'src/entities/tags.entity';
import { ResponseTagArticleDto } from './dto/reponse-tag-article.dto';
import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly services;
    constructor(services: TagsService);
    getAll(): Promise<TagsEntity[]>;
    getTag(tagId: number): Promise<ResponseTagArticleDto>;
    deleteTag(tagId: number): Promise<Object>;
}
