import { Component, Input, Inject, ViewEncapsulation } from '@angular/core';
import {ArticleService} from '../../../../lib/ng-noosfero-api/http/article.service';

/**
 * @ngdoc controller
 * @name ArticleBlog
 * @description
 *  An specific {@link ArticleView} for Blog articles.
 */
@Component({
    selector: "noosfero-blog",
    templateUrl: './blog.html',
    styleUrls: ['blog.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ArticleBlogComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;

    private posts: noosfero.Article[];
    private perPage: number = 3;
    private currentPage: number;
    private totalPosts: number = 0;

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        this.loadPage({ page: 1 });
    }

    loadPage($event: any) {
        let filters = {
            content_type: "TextArticle",
            per_page: this.perPage,
            page: $event.page
        };

        this.articleService
            .getChildren(this.article, filters)
            .then((result: noosfero.RestResult<noosfero.Article[]>) => {
                this.totalPosts = <number>(<any>result.headers).get("total");
                this.posts = result.data;
            });
    }

}
