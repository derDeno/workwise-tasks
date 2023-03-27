import { TagsService } from './tags.service';
export declare class TagsController {
    private readonly services;
    constructor(services: TagsService);
    deleteTag(tagId: number): Promise<any>;
}
