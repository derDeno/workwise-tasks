import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticlesEntity } from 'src/entities/articles.entity';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { ResponseListDto } from './dto/response-list.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { TagInArticleEntity } from 'src/entities/tag-article.entity';
import { TagsService } from 'src/tags/tags.service';
import { TagsEntity } from 'src/entities/tags.entity';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class ArticlesService {

    constructor(
        @InjectRepository(ArticlesEntity) private articlesRepo: Repository<ArticlesEntity>,
        @InjectRepository(TagInArticleEntity) private tagsArticleRepo: Repository<TagInArticleEntity>,
        @InjectRepository(TagsEntity) private tagsRepo: Repository<TagsEntity>,
        private httpService: HttpService,
        private tagService: TagsService
    ) { }

    async getAllArticles(tagFilter: string, authorFilter: string): Promise<ResponseListDto[]> {

        const currentTimestamp = Math.floor(new Date().getTime() / 1000);

        const articles = await this.articlesRepo.find({
            where: [
                {
                    date_publish: LessThanOrEqual(currentTimestamp),
                    date_expire: MoreThanOrEqual(currentTimestamp),
                    ...(authorFilter && { author: authorFilter }),
                },
                {
                    date_publish: LessThanOrEqual(currentTimestamp),
                    date_expire: 0,
                    ...(authorFilter && { author: authorFilter })
                }
            ],
            relations: ['tia', 'tia.tag']

        });

        // add / filter tags and prepare final response dto
        const response: ResponseListDto[] = [];
        for (const article of articles) {

            const responseItem = new ResponseListDto();
            responseItem.id = article.id;
            responseItem.author = article.author;
            responseItem.authorAge = article.author_age;
            responseItem.title = article.title;
            responseItem.date_created = article.date_created;
            responseItem.tags = article.tia.map(obj => obj.tag.name);

            response.push(responseItem);
        }

        // return the articles if no tag filter is set
        if (tagFilter == null || tagFilter.length < 1) {
            return response;
        }

        return response.filter(item => item.tags.includes(tagFilter));
    }

    async createArticle(dto: CreateArticleDto): Promise<ArticlesEntity> {

        // map dto to entity
        const newArticle = new ArticlesEntity();
        newArticle.title = dto.title;
        newArticle.content = dto.content;
        newArticle.author = dto.author;
        newArticle.date_expire = dto.date_expire;
        newArticle.date_publish = dto.date_publish;
        newArticle.date_created = Math.floor(new Date().getTime() / 1000); // current timestamp in seconds

        // get age for author name
        const { data } = await firstValueFrom(this.httpService.get("https://api.agify.io/?name=" + dto.author));
        newArticle.author_age = data.age;

        // get the id of the inserted row and return its content
        const article = await this.articlesRepo.insert(newArticle);

        // save the tags
        for (const tag of dto.tags) {
            this.tagService.bindTag(tag, article.raw.insertId);
        }

        return await this.articlesRepo.findOneByOrFail({ id: article.raw.insertId });
    }

    async getArticle(articleId: number): Promise<any> {

        const article = await this.articlesRepo.findOne({
            where: { id: articleId },
            relations: ['tia', 'tia.tag']
        });

        const response = new ResponseDto();
        response.id = article.id;
        response.author = article.author;
        response.authorAge = article.author_age;
        response.content = article.content;
        response.title = article.title;
        response.date_created = article.date_created;
        response.date_publish = article.date_publish;
        response.date_expire = article.date_expire;
        response.tags = article.tia.map(obj => obj.tag.name);

        return response;
    }

    async updateArticle(articleId: number, dto: UpdateArticleDto): Promise<Object> {

        // map dto to entity
        const article = new ArticlesEntity();
        article.title = dto.title;
        article.content = dto.content;
        article.date_publish = dto.date_publish;
        article.date_expire = dto.date_expire;
        article.author = dto.author;

        // check if author changed
        if (dto.author != null) {
            // update age
            const { data } = await firstValueFrom(this.httpService.get("https://api.agify.io/?name=" + dto.author));
            article.author_age = data.age;
        }

        // if tags are given, update them too
        if (dto.tags != null) {

            // save the tags
            for (const tag of dto.tags) {
                this.tagService.bindTag(tag, articleId);
            }
        }

        const result = await this.articlesRepo.update({ id: articleId }, article);

        if (result.affected > 0) {
            return { msg: 'Done' };
        } else {
            throw new NotFoundException('Article not found!');
        }
    }

    async deleteArticle(articleId: number): Promise<Object> {

        await this.articlesRepo.delete({ id: articleId });
        return { msg: 'Done' };
    }
}
