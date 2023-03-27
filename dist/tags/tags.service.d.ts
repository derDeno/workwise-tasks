import { TagInArticleEntity } from 'src/entities/tag-article.entity';
import { TagsEntity } from 'src/entities/tags.entity';
import { Repository } from 'typeorm';
export declare class TagsService {
    private tagsRepo;
    private tagsArticleRepo;
    constructor(tagsRepo: Repository<TagsEntity>, tagsArticleRepo: Repository<TagInArticleEntity>);
    bindTag(tagName: string, articleId: number): Promise<any>;
    getAllTags(): Promise<any>;
    getTagArticles(): Promise<any>;
    deleteTag(tagId: number): Promise<any>;
}
