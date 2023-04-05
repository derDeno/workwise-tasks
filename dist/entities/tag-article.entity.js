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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagInArticleEntity = void 0;
const typeorm_1 = require("typeorm");
const tags_entity_1 = require("./tags.entity");
const articles_entity_1 = require("./articles.entity");
let TagInArticleEntity = class TagInArticleEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], TagInArticleEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'tag_id' }),
    __metadata("design:type", Number)
], TagInArticleEntity.prototype, "tagId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'article_id' }),
    __metadata("design:type", Number)
], TagInArticleEntity.prototype, "articleId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => articles_entity_1.ArticlesEntity, article => article.tia),
    (0, typeorm_1.JoinColumn)({ name: 'article_id' }),
    __metadata("design:type", articles_entity_1.ArticlesEntity)
], TagInArticleEntity.prototype, "article", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tags_entity_1.TagsEntity, tag => tag.tia),
    (0, typeorm_1.JoinColumn)({ name: 'tag_id' }),
    __metadata("design:type", tags_entity_1.TagsEntity)
], TagInArticleEntity.prototype, "tag", void 0);
TagInArticleEntity = __decorate([
    (0, typeorm_1.Entity)('tag_in_article', { schema: 'workwise_blog' })
], TagInArticleEntity);
exports.TagInArticleEntity = TagInArticleEntity;
//# sourceMappingURL=tag-article.entity.js.map