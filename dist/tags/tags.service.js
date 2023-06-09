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
exports.TagsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const articles_entity_1 = require("../entities/articles.entity");
const tag_article_entity_1 = require("../entities/tag-article.entity");
const tags_entity_1 = require("../entities/tags.entity");
const typeorm_2 = require("typeorm");
const reponse_tag_article_dto_1 = require("./dto/reponse-tag-article.dto");
let TagsService = class TagsService {
    constructor(tagsRepo, tagsArticleRepo, articlesRepo) {
        this.tagsRepo = tagsRepo;
        this.tagsArticleRepo = tagsArticleRepo;
        this.articlesRepo = articlesRepo;
    }
    async bindTag(tagName, articleId) {
        let tag = await this.tagsRepo.findOneBy({ name: tagName });
        if (tag == null) {
            const newTag = new tags_entity_1.TagsEntity();
            newTag.name = tagName;
            const result = await this.tagsRepo.insert(newTag);
            tag = await this.tagsRepo.findOneBy({ id: result.raw.insertId });
        }
        let relation = await this.tagsArticleRepo.findOneBy({ articleId: articleId, tagId: tag.id });
        if (relation == null) {
            const newRelation = new tag_article_entity_1.TagInArticleEntity();
            newRelation.articleId = articleId;
            newRelation.tagId = tag.id;
            const result = await this.tagsArticleRepo.insert(newRelation);
            relation = await this.tagsArticleRepo.findOneBy({ id: result.raw.insertId });
        }
        return {
            tag: tag,
            relation: relation,
            msg: 'Done'
        };
    }
    async getAllTags() {
        const tags = await this.tagsRepo.find();
        return tags;
    }
    async getTagArticles(tagId) {
        const tagArticles = await this.tagsArticleRepo.findBy({ tagId: tagId });
        const response = new reponse_tag_article_dto_1.ResponseTagArticleDto();
        response.id = tagId;
        response.name = (await this.tagsRepo.findOneBy({ id: tagId })).name;
        const articles = [];
        for (const tagArticle of tagArticles) {
            const article = await this.articlesRepo.findOneBy({ id: tagArticle.articleId });
            articles.push(article);
        }
        response.articles = articles;
        return response;
    }
    async deleteTag(tagId) {
        await this.tagsRepo.delete({ id: tagId });
        return { msg: 'Done' };
    }
};
TagsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tags_entity_1.TagsEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(tag_article_entity_1.TagInArticleEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(articles_entity_1.ArticlesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TagsService);
exports.TagsService = TagsService;
//# sourceMappingURL=tags.service.js.map