import { ArticlesEntity } from 'src/entities/articles.entity';
import { TagInArticleEntity } from 'src/entities/tag-article.entity';
import { TagsEntity } from 'src/entities/tags.entity';
import { Repository } from 'typeorm';
import { ResponseTagArticleDto } from './dto/reponse-tag-article.dto';
export declare class TagsService {
    private tagsRepo;
    private tagsArticleRepo;
    private articlesRepo;
    constructor(tagsRepo: Repository<TagsEntity>, tagsArticleRepo: Repository<TagInArticleEntity>, articlesRepo: Repository<ArticlesEntity>);
    bindTag(tagName: string, articleId: number): Promise<Object>;
    getAllTags(): Promise<TagsEntity[]>;
    getTagArticles(tagId: number): Promise<ResponseTagArticleDto>;
    deleteTag(tagId: number): Promise<Object>;
}
