"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesModule = void 0;
const common_1 = require("@nestjs/common");
const articles_service_1 = require("./articles.service");
const articles_controller_1 = require("./articles.controller");
const typeorm_1 = require("@nestjs/typeorm");
const article_entity_1 = require("../entities/article.entity");
const tags_entity_1 = require("../entities/tags.entity");
const tag_article_entity_1 = require("../entities/tag-article.entity");
const axios_1 = require("@nestjs/axios");
const tags_service_1 = require("../tags/tags.service");
let ArticlesModule = class ArticlesModule {
};
ArticlesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                article_entity_1.ArticlesEntity,
                tags_entity_1.TagsEntity,
                tag_article_entity_1.TagInArticleEntity,
            ]),
            axios_1.HttpModule,
        ],
        providers: [articles_service_1.ArticlesService, tags_service_1.TagsService],
        controllers: [articles_controller_1.ArticlesController],
    })
], ArticlesModule);
exports.ArticlesModule = ArticlesModule;
//# sourceMappingURL=articles.module.js.map