export class UpdateArticleDto {
    
    public title: string;
    public content: string;
    public author: string;
    public tags: string[];
    public date_publish: number;
    public date_expire: number;
}
