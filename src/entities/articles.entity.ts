import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagInArticleEntity } from './tag-article.entity';
import { TagsEntity } from './tags.entity';

@Entity('articles', { schema: 'workwise_blog' })
export class ArticlesEntity {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('text', { name: 'title' })
    title: string;

    @Column('text', { name: 'content' })
    content: string;

    @Column('text', { name: 'author' })
    author: string;

    @Column('int', { name: 'author_age' })
    author_age: number;

    @Column('int', { name: 'date_created' })
    date_created: number;

    @Column('int', { name: 'date_publish' })
    date_publish: number;

    @Column('int', { name: 'date_expire' })
    date_expire: number;

    @OneToMany(() => TagInArticleEntity, tia => tia.article)
    tia: TagInArticleEntity[];
}
