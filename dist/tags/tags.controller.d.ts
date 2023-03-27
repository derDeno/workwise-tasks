import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly services;
    constructor(services: TagsService);
    getAll(): Promise<any>;
    getTag(tagId: number): Promise<any>;
    deleteTag(tagId: number): Promise<any>;
}
