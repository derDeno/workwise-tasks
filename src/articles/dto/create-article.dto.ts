import { IsNotEmpty } from "class-validator";

export class CreateArticleDto {

  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public content: string;

  @IsNotEmpty()
  public author: string;

  public tags: string[];

  public date_publish: number;
  public date_expire: number;
}
