import { TagsEntity } from 'src/entities/tags.entity';
export declare class ResponseDto {
    id: number;
    title: string;
    content: string;
    author: string;
    authorAge: number;
    date_created: number;
    date_publish: number;
    date_expire: number;
    tags: TagsEntity[];
}
