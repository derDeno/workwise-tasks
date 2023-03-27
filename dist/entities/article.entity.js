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
exports.ArticlesEntity = void 0;
const typeorm_1 = require("typeorm");
let ArticlesEntity = class ArticlesEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'int', name: 'id' }),
    __metadata("design:type", Number)
], ArticlesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'title' }),
    __metadata("design:type", String)
], ArticlesEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'content' }),
    __metadata("design:type", String)
], ArticlesEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('text', { name: 'author' }),
    __metadata("design:type", String)
], ArticlesEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'author_age' }),
    __metadata("design:type", Number)
], ArticlesEntity.prototype, "author_age", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'date_created' }),
    __metadata("design:type", Number)
], ArticlesEntity.prototype, "date_created", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'date_publish' }),
    __metadata("design:type", Number)
], ArticlesEntity.prototype, "date_publish", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'date_expire' }),
    __metadata("design:type", Number)
], ArticlesEntity.prototype, "date_expire", void 0);
ArticlesEntity = __decorate([
    (0, typeorm_1.Entity)('articles', { schema: 'workwise_blog' })
], ArticlesEntity);
exports.ArticlesEntity = ArticlesEntity;
//# sourceMappingURL=article.entity.js.map