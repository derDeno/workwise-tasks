import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesEntity } from 'src/entities/article.entity';
import { TagInArticleEntity } from 'src/entities/tag-article.entity';
import { TagsEntity } from 'src/entities/tags.entity';
import { Repository } from 'typeorm';
import { ResponseTagArticleDto } from './dto/reponse-tag-article.dto';

@Injectable()
export class TagsService {

    constructor(
        @InjectRepository(TagsEntity) private tagsRepo: Repository<TagsEntity>,
        @InjectRepository(TagInArticleEntity) private tagsArticleRepo: Repository<TagInArticleEntity>,
        @InjectRepository(ArticlesEntity) private articlesRepo: Repository<ArticlesEntity>,
    ) { }


    // create tag if it does not exist and then create relation to article
    async bindTag(tagName: string, articleId: number): Promise<any> {

        let tag = await this.tagsRepo.findOneBy({ name: tagName });

        if(tag == null) {

            // no tag found, create one
            const newTag = new TagsEntity();
            newTag.name = tagName;

            const result = await this.tagsRepo.insert(newTag);
            tag = await this.tagsRepo.findOneBy({ id: result.raw.insertId });
        }

        // check if relation already exists
        let relation = await this.tagsArticleRepo.findOneBy({ articleId: articleId, tagId: tag.id});

        if(relation == null) {

            // create relation
            const newRelation = new TagInArticleEntity();
            newRelation.articleId = articleId;
            newRelation.tagId = tag.id;
            
            const result = await this.tagsArticleRepo.insert(newRelation);
            relation = await this.tagsArticleRepo.findOneBy({ id: result.raw.insertId });
        }

        return {
            tag: tag,
            relation: relation,
            msg: 'Done'
        }
    }


    async getAllTags(): Promise<any> {
        const tags = await this.tagsRepo.find();
        return tags;
    }

    async getTagArticles(tagId: number): Promise<any> {
        const tagArticles = await this.tagsArticleRepo.findBy({ tagId: tagId });

        const response = new ResponseTagArticleDto();
        response.id = tagId;
        response.name = ( await this.tagsRepo.findOneBy({ id: tagId }) ).name;

        const articles: ArticlesEntity[] = [];

        // find each article and add it to the response dto
        for (const tagArticle of tagArticles) {
            const article = await this.articlesRepo.findOneBy({ id: tagArticle.articleId });
            articles.push(article);
        }

        response.articles = articles;

        // TODO: check if articles are published and/or expired


        return response;
    }

    // delete tag and tag relation
    async deleteTag(tagId: number): Promise<any> {

        // execute tag deletion before relation deletion to check if the given tag exists
        const resultTags = await this.tagsRepo.delete({ id: tagId });

        if(resultTags.affected > 0) {

            // now delete all tag relations
            await this.tagsArticleRepo.delete({ tagId: tagId });

            return { msg: 'Done'};
        }else {
            throw new NotFoundException('Tag not found!');
        }
    }

}
