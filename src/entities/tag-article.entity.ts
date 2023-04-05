import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TagsEntity } from './tags.entity';
import { ArticlesEntity } from './articles.entity';

@Entity('tag_in_article', { schema: 'workwise_blog' })
export class TagInArticleEntity {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'int', name: 'tag_id' })
    tagId: number;

    @Column({ type: 'int', name: 'article_id' })
    articleId: number;

    @ManyToOne(() => ArticlesEntity, article => article.tia)
    @JoinColumn({ name: 'article_id' })
    article: ArticlesEntity;

    @ManyToOne(() => TagsEntity, tag => tag.tia)
    @JoinColumn({ name: 'tag_id' })
    tag: TagsEntity;
}
