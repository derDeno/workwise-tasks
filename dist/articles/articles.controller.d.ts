import { ArticlesEntity } from 'src/entities/articles.entity';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ResponseListDto } from './dto/response-list.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesController {
    private readonly services;
    constructor(services: ArticlesService);
    getAllArticles(tagFilter: string, authorFilter: string): Promise<ResponseListDto[]>;
    createArticle(createArticleDto: CreateArticleDto): Promise<ArticlesEntity>;
    getArticle(articleId: number): Promise<any>;
    updateArticle(articleId: number, dto: UpdateArticleDto): Promise<Object>;
    deleteArticle(articleId: number): Promise<Object>;
}
