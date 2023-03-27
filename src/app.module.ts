import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'ffYkexQAETVIb17!',
      database: 'workwise_blog',
      entities: ['./entities/*.entity.{js,ts}'],
      autoLoadEntities: true,
      synchronize: true,
    }),

    ArticlesModule,

    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
