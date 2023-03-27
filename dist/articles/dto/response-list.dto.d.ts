import { TagsEntity } from 'src/entities/tags.entity';
export declare class ResponseListDto {
    id: number;
    title: string;
    author: string;
    authorAge: number;
    date_created: number;
    tags: TagsEntity[];
    content: string;
}
