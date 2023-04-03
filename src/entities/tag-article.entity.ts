import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag_in_article', { schema: 'workwise_blog' })
export class TagInArticleEntity {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column({ type: 'int', name: 'tag_id' })
    tagId: number;

    @Column({ type: 'int', name: 'article_id' })
    articleId: number;
}
