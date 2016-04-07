import { Injectable, Inject } from "ng-forward";
import {RestangularService} from "../../../lib/ng-noosfero-api/http/restangular_service";
import {ArticleService} from "../../../lib/ng-noosfero-api/http/article.service";

@Injectable()
@Inject("Restangular", "$q", "$log", ArticleService)
export class CommentParagraphService extends RestangularService<noosfero.Comment> {

    constructor(Restangular: restangular.IService, $q: ng.IQService, $log: ng.ILogService, protected articleService: ArticleService) {
        super(Restangular, $q, $log);
    }

    getResourcePath() {
        return "comment_paragraph_plugin/comments";
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
}
