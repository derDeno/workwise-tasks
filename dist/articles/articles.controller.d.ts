import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class ArticlesController {
    private readonly services;
    constructor(services: ArticlesService);
    getAllArticles(): Promise<any>;
    createArticle(createArticleDto: CreateArticleDto): Promise<any>;
    updateArticle(articleId: number, dto: UpdateArticleDto): Promise<any>;
    getArticle(articleId: number): Promise<any>;
    deleteArticle(articleId: number): Promise<any>;
}
