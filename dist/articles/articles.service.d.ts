import { ArticlesEntity } from 'src/entities/article.entity';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { ResponseListDto } from './dto/response-list.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { HttpService } from '@nestjs/axios';
import { TagInArticleEntity } from 'src/entities/tag-article.entity';
import { TagsService } from 'src/tags/tags.service';
import { TagsEntity } from 'src/entities/tags.entity';
import { ResponseDto } from './dto/response.dto';
export declare class ArticlesService {
    private articlesRepo;
    private tagsArticleRepo;
    private tagsRepo;
    private httpService;
    private tagService;
    constructor(articlesRepo: Repository<ArticlesEntity>, tagsArticleRepo: Repository<TagInArticleEntity>, tagsRepo: Repository<TagsEntity>, httpService: HttpService, tagService: TagsService);
    getAllArticles(tagFilter: string, authorFilter: string): Promise<ResponseListDto[]>;
    createArticle(dto: CreateArticleDto): Promise<ArticlesEntity>;
    getArticle(articleId: number): Promise<ResponseDto>;
    updateArticle(articleId: number, dto: UpdateArticleDto): Promise<Object>;
    deleteArticle(articleId: number): Promise<Object>;
    getTagsForArticle(articleId: number): Promise<TagsEntity[]>;
}
