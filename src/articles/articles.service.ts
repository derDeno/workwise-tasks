import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { ArticlesEntity } from 'src/entities/article.entity';
import { Repository } from 'typeorm';
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
        private tagService: TagsService,
    ) { }

    async createArticle(dto: CreateArticleDto): Promise<any> {

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

        return await this.articlesRepo.findOneByOrFail({id: article.raw.insertId });
    }

    
    async getArticle(articleId: number): Promise<any> {
        const article = await this.articlesRepo.findOneBy({ id: articleId });

        const tags = await this.getTagsForArticle(articleId);

        const response = new ResponseDto();
        response.id = article.id;
        response.author = article.author;
        response.authorAge = article.author_age;
        response.content = article.content;
        response.title = article.title;
        response.date_created = article.date_created;
        response.date_publish = article.date_publish;
        response.date_expire = article.date_expire;

        response.tags = tags;

        return response;
    }

    
    async updateArticle(articleId: number, dto: UpdateArticleDto) {

        // map dto to entity
        const article = new ArticlesEntity();
        article.title = dto.title;
        article.content = dto.content;
        article.date_publish = dto.date_publish;
        article.date_expire = dto.date_expire;
        article.author = dto.author;

        // check if author changed
        if(dto.author != null) {
            // update age
            const { data } = await firstValueFrom(this.httpService.get("https://api.agify.io/?name=" + dto.author));
            article.author_age = data.age;
        }

        // if tags are given, update them too
        if(dto.tags != null) {
            
            // save the tags
            for (const tag of dto.tags) {
                this.tagService.bindTag(tag, articleId);
            }
        }

        const result = await this.articlesRepo.update({ id: articleId}, article);

        if(result.affected > 0) {
            return { msg: 'Done'};
        }else {
            throw new NotFoundException('Article not found!');
        }
    }

    async deleteArticle(articleId: number): Promise<any> {

        // delete article first to make sure article exists
        const result = await this.articlesRepo.delete({ id: articleId });

        if(result.affected > 0) {

            // now delete relation to tags
            await this.tagsArticleRepo.delete({ articleId: articleId });

            return { msg: 'Done'};
        }else {
            throw new NotFoundException('Article not found!');
        }
    }
    

    async getAllArticles(tagFilter: string, authorFilter: string): Promise<any> {
        const articles = await this.articlesRepo.find();
        const result: ArticlesEntity[] = [];

        for (const article of articles) {

            // check the publish and expire timestamps to determine if it is public or not
            const currentTimestamp = Math.floor(new Date().getTime() / 1000);
            if(article.date_publish < currentTimestamp && ( article.date_expire === 0 || article.date_expire > currentTimestamp) ) {

                // check if author filter is set
                if(authorFilter != null) {
                    if(article.author == authorFilter) {
                        result.push(article);
                    }
                }else {
                    result.push(article);
                }
            }
        }

        // add / filter tags and prepare final response dto
        const response: ResponseListDto[] = [];
        for (const article of result) {
            
            const tags = await this.getTagsForArticle(article.id);

            // check if there is a tags filter
            if(tagFilter != null) {
                if(tags.findIndex( x => x.name == tagFilter) > -1) {
                    // tagfilter is in tag array
                }
            }else {
                // add tags to article
            }
        }

        // map entity to dto to remove the content field
        return response; 
    }


    // get all tags for an article
    async getTagsForArticle(articleId: number): Promise<TagsEntity[]> {

        const tagArticles = await this.tagsArticleRepo.findBy({ articleId: articleId });
        const result: TagsEntity[] = [];

        for (const tagArticle of tagArticles) {
            const tag = await this.tagsRepo.findOneBy({ id: tagArticle.tagId });
            result.push(tag);
        }

        return result;
    }
    
}
