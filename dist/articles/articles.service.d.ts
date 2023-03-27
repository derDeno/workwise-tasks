import { ArticlesEntity } from 'src/entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { HttpService } from '@nestjs/axios';
import { TagInArticleEntity } from 'src/entities/tag-article.entity';
import { TagsService } from 'src/tags/tags.service';
export declare class ArticlesService {
    private articlesRepo;
    private tagsArticleRepo;
    private httpService;
    private tagService;
    constructor(articlesRepo: Repository<ArticlesEntity>, tagsArticleRepo: Repository<TagInArticleEntity>, httpService: HttpService, tagService: TagsService);
    createArticle(dto: CreateArticleDto): Promise<any>;
    getArticle(articleId: number): Promise<any>;
    updateArticle(articleId: number, dto: UpdateArticleDto): Promise<{
        msg: string;
    }>;
    deleteArticle(articleId: number): Promise<any>;
    getAllArticles(): Promise<any>;
}