import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from '@angular/core';
import { RestangularService } from './restangular_service';
import { ArticleService } from './article.service';

@Injectable()
export class CommentService extends RestangularService<noosfero.Comment> {

    constructor(protected restangular: Restangular, protected articleService: ArticleService) {
        super(restangular);
    }

    getResourcePath() {
        return "comments";
    }

    getDataKeys() {
        return {
            singular: 'comment',
            plural: 'comments'
        };
    }

    getByArticle(article: noosfero.Article, params: any = {}): Promise<noosfero.RestResult<noosfero.Comment[]>> {
        params['without_reply'] = true;
        const articleElement = this.articleService.getElement(<number>article.id);
        return this.list(articleElement, params);
    }

    createInArticle(article: noosfero.Article, comment: noosfero.Comment): Promise<noosfero.RestResult<noosfero.Comment>> {
        const articleElement = this.articleService.getElement(<number>article.id);
        return this.create(comment, articleElement, null, { 'Content-Type': 'application/json' }, false);
    }

    removeFromArticle(article: noosfero.Article, comment: noosfero.Comment): Promise<noosfero.RestResult<noosfero.Comment>> {
        const articleElement = this.articleService.getElement(<number>article.id);
        return this.remove(comment, articleElement);
    }
}
