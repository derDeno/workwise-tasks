import { Exclude } from 'class-transformer';
import { TagsEntity } from 'src/entities/tags.entity';

export class ResponseListDto {
    
    public id: number;
    public title: string;
    public author: string;
    public authorAge: number;
    public date_created: number;
    public tags: TagsEntity[];

    @Exclude()
    public content: string;
}
