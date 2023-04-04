import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesEntity } from 'src/entities/articles.entity';
import { TagInArticleEntity } from 'src/entities/tag-article.entity';
import { TagsEntity } from 'src/entities/tags.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ArticlesEntity,
            TagsEntity,
            TagInArticleEntity,
        ]),
    ],
    providers: [TagsService],
    controllers: [TagsController],
    exports: [TagsService],
})
export class TagsModule { }
