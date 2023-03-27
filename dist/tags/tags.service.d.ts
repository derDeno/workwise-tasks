import { ArticlesEntity } from 'src/entities/article.entity';
import { TagInArticleEntity } from 'src/entities/tag-article.entity';
import { TagsEntity } from 'src/entities/tags.entity';
import { Repository } from 'typeorm';
export declare class TagsService {
    private tagsRepo;
    private tagsArticleRepo;
    private articlesRepo;
    constructor(tagsRepo: Repository<TagsEntity>, tagsArticleRepo: Repository<TagInArticleEntity>, articlesRepo: Repository<ArticlesEntity>);
    bindTag(tagName: string, articleId: number): Promise<any>;
    getAllTags(): Promise<any>;
    getTagArticles(tagId: number): Promise<any>;
    deleteTag(tagId: number): Promise<any>;
}
