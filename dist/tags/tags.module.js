"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagsModule = void 0;
const common_1 = require("@nestjs/common");
const tags_service_1 = require("./tags.service");
const tags_controller_1 = require("./tags.controller");
const typeorm_1 = require("@nestjs/typeorm");
const articles_entity_1 = require("../entities/articles.entity");
const tag_article_entity_1 = require("../entities/tag-article.entity");
const tags_entity_1 = require("../entities/tags.entity");
let TagsModule = class TagsModule {
};
TagsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                articles_entity_1.ArticlesEntity,
                tags_entity_1.TagsEntity,
                tag_article_entity_1.TagInArticleEntity,
            ]),
        ],
        providers: [tags_service_1.TagsService],
        controllers: [tags_controller_1.TagsController],
        exports: [tags_service_1.TagsService],
    })
], TagsModule);
exports.TagsModule = TagsModule;
//# sourceMappingURL=tags.module.js.map