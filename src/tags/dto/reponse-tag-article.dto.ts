import { ArticlesEntity } from "src/entities/article.entity";

export class ResponseTagArticleDto {
    public id: number;
    public name: string;
    public articles: ArticlesEntity[];
}
