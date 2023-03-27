import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticlesEntity } from 'src/entities/article.entity';
import { TagsEntity } from 'src/entities/tags.entity';
import { TagInArticleEntity } from 'src/entities/tag-article.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ArticlesEntity,
      TagsEntity,
      TagInArticleEntity,
    ]),
    HttpModule,
  ],
  providers: [ArticlesService],
  controllers: [ArticlesController],
})
export class ArticlesModule { }