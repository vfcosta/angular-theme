import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from "@angular/core";
import { RestangularService } from "./restangular_service.ng2";
import { ArticleService } from "./article.service.ng2";

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

    getByArticle(article: noosfero.Article, params: any = {}): ng.IPromise<noosfero.RestResult<noosfero.Comment[]>> {
        params['without_reply'] = true;
        let articleElement = this.articleService.getElement(<number>article.id);
        return this.list(articleElement, params);
    }

    createInArticle(article: noosfero.Article, comment: noosfero.Comment): ng.IPromise<noosfero.RestResult<noosfero.Comment>> {
        let articleElement = this.articleService.getElement(<number>article.id);
        return this.create(comment, articleElement, null, { 'Content-Type': 'application/json' }, false);
    }

    removeFromArticle(article: noosfero.Article, comment: noosfero.Comment): ng.IPromise<noosfero.RestResult<noosfero.Comment>> {
        let articleElement = this.articleService.getElement(<number>article.id);
        return this.remove(comment, articleElement);
    }
}
