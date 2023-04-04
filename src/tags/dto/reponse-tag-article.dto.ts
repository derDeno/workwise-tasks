import { ArticlesEntity } from "src/entities/articles.entity";

export class ResponseTagArticleDto {
    public id: number;
    public name: string;
    public articles: ArticlesEntity[];
}
