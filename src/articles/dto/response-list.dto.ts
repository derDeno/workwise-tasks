import { Exclude } from 'class-transformer';

export class ResponseListDto {
  public id: number;
  public title: string;
  public author: string;
  public authorAge: number;
  public date_created: number;
//  public tags: TagDto[];

  @Exclude()
  public content: string;
}
