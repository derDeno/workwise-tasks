import { TagsEntity } from './tags.entity';
import { ArticlesEntity } from './articles.entity';
export declare class TagInArticleEntity {
    id: number;
    tagId: number;
    articleId: number;
    article: ArticlesEntity;
    tag: TagsEntity;
}
