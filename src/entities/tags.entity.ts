import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TagInArticleEntity } from './tag-article.entity';

@Entity('tags', { schema: 'workwise_blog' })
export class TagsEntity {

    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('text', { name: 'name' })
    name: string;

    @OneToMany(() => TagInArticleEntity, tia => tia.tag)
    tia: TagInArticleEntity[];
}
