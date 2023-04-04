"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const articles_entity_1 = require("../entities/articles.entity");
const typeorm_2 = require("typeorm");
const response_list_dto_1 = require("./dto/response-list.dto");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const tag_article_entity_1 = require("../entities/tag-article.entity");
const tags_service_1 = require("../tags/tags.service");
const tags_entity_1 = require("../entities/tags.entity");
const response_dto_1 = require("./dto/response.dto");
let ArticlesService = class ArticlesService {
    constructor(articlesRepo, tagsArticleRepo, tagsRepo, httpService, tagService) {
        this.articlesRepo = articlesRepo;
        this.tagsArticleRepo = tagsArticleRepo;
        this.tagsRepo = tagsRepo;
        this.httpService = httpService;
        this.tagService = tagService;
    }
    async getAllArticles(tagFilter, authorFilter) {
        const currentTimestamp = Math.floor(new Date().getTime() / 1000);
        const articles = await this.articlesRepo.find({
            where: [
                Object.assign({ date_publish: (0, typeorm_2.LessThanOrEqual)(currentTimestamp), date_expire: (0, typeorm_2.MoreThanOrEqual)(currentTimestamp) }, (authorFilter && { author: authorFilter })),
                Object.assign({ date_publish: (0, typeorm_2.LessThanOrEqual)(currentTimestamp), date_expire: 0 }, (authorFilter && { author: authorFilter }))
            ]
        });
        const response = [];
        for (const article of articles) {
            const tags = await this.getTagsForArticle(article.id);
            if (tagFilter != null) {
                if (tags.findIndex(x => x.name == tagFilter) > -1) {
                    const responseItem = new response_list_dto_1.ResponseListDto();
                    responseItem.id = article.id;
                    responseItem.author = article.author;
                    responseItem.authorAge = article.author_age;
                    responseItem.title = article.title;
                    responseItem.date_created = article.date_created;
                    responseItem.tags = tags;
                    response.push(responseItem);
                }
            }
            else {
                const responseItem = new response_list_dto_1.ResponseListDto();
                responseItem.id = article.id;
                responseItem.author = article.author;
                responseItem.authorAge = article.author_age;
                responseItem.title = article.title;
                responseItem.date_created = article.date_created;
                responseItem.tags = tags;
                response.push(responseItem);
            }
        }
        return response;
    }
    async createArticle(dto) {
        const newArticle = new articles_entity_1.ArticlesEntity();
        newArticle.title = dto.title;
        newArticle.content = dto.content;
        newArticle.author = dto.author;
        newArticle.date_expire = dto.date_expire;
        newArticle.date_publish = dto.date_publish;
        newArticle.date_created = Math.floor(new Date().getTime() / 1000);
        const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get("https://api.agify.io/?name=" + dto.author));
        newArticle.author_age = data.age;
        const article = await this.articlesRepo.insert(newArticle);
        for (const tag of dto.tags) {
            this.tagService.bindTag(tag, article.raw.insertId);
        }
        return await this.articlesRepo.findOneByOrFail({ id: article.raw.insertId });
    }
    async getArticle(articleId) {
        const article = await this.articlesRepo.findOneBy({ id: articleId });
        const tags = await this.getTagsForArticle(articleId);
        const response = new response_dto_1.ResponseDto();
        response.id = article.id;
        response.author = article.author;
        response.authorAge = article.author_age;
        response.content = article.content;
        response.title = article.title;
        response.date_created = article.date_created;
        response.date_publish = article.date_publish;
        response.date_expire = article.date_expire;
        response.tags = tags;
        return response;
    }
    async updateArticle(articleId, dto) {
        const article = new articles_entity_1.ArticlesEntity();
        article.title = dto.title;
        article.content = dto.content;
        article.date_publish = dto.date_publish;
        article.date_expire = dto.date_expire;
        article.author = dto.author;
        if (dto.author != null) {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get("https://api.agify.io/?name=" + dto.author));
            article.author_age = data.age;
        }
        if (dto.tags != null) {
            for (const tag of dto.tags) {
                this.tagService.bindTag(tag, articleId);
            }
        }
        const result = await this.articlesRepo.update({ id: articleId }, article);
        if (result.affected > 0) {
            return { msg: 'Done' };
        }
        else {
            throw new common_1.NotFoundException('Article not found!');
        }
    }
    async deleteArticle(articleId) {
        await this.articlesRepo.delete({ id: articleId });
        return { msg: 'Done' };
    }
    async getTagsForArticle(articleId) {
        const tagArticles = await this.tagsArticleRepo.findBy({ articleId: articleId });
        const result = [];
        for (const tagArticle of tagArticles) {
            const tag = await this.tagsRepo.findOneBy({ id: tagArticle.tagId });
            result.push(tag);
        }
        return result;
    }
};
ArticlesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(articles_entity_1.ArticlesEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_article_entity_1.TagInArticleEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(tags_entity_1.TagsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        axios_1.HttpService,
        tags_service_1.TagsService])
], ArticlesService);
exports.ArticlesService = ArticlesService;
//# sourceMappingURL=articles.service.js.map