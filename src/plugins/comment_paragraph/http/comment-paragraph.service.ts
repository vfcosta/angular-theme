import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from "@angular/core";
import {RestangularService} from "../../../lib/ng-noosfero-api/http/restangular_service";
import {ArticleService} from "../../../lib/ng-noosfero-api/http/article.service";

@Injectable()
export class CommentParagraphService extends RestangularService<noosfero.Comment> {

    private commentParagraphCountsPromise: ng.IPromise<any>;

    constructor(protected restangular: Restangular, protected articleService: ArticleService) {
        super(restangular);
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

    activateCommentParagraph(article: noosfero.Article) {
        let articleElement = this.articleService.getElement(<number>article.id);
        return this.articleService.post("comment_paragraph_plugin/activate", articleElement);
    }

    deactivateCommentParagraph(article: noosfero.Article) {
        let articleElement = this.articleService.getElement(<number>article.id);
        return this.articleService.post("comment_paragraph_plugin/deactivate", articleElement);
    }

    commentParagraphCount(article: noosfero.Article, paragraphUuid: string) {
        return this.commentParagraphCounts(article).then((counts: any) => {
            return counts[paragraphUuid];
        });
    }

    private commentParagraphCounts(article: noosfero.Article) {
        if (!this.commentParagraphCountsPromise) {
            let articleElement = this.articleService.getElement(<number>article.id);
            this.commentParagraphCountsPromise = (<any>articleElement).customGET("comment_paragraph_plugin/comments/count").toPromise().then((response: restangular.IResponse) => {
                return response.data;
            }).catch(() => {
                this.commentParagraphCountsPromise = null;
            });
        }
        return this.commentParagraphCountsPromise;
    }
}
