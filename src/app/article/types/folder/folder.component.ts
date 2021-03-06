import { Component, Input, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { ArticleService } from '../../../../lib/ng-noosfero-api/http/article.service';

/**
 * @ngdoc controller
 * @name Folder
 * @description
 *  An specific {@link ArticleView} for folders.
 */
@Component({
    selector: "noosfero-folder",
    templateUrl: './folder.html',
    styleUrls: ['folder.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class FolderComponent implements OnInit {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;

    private posts: noosfero.Article[];
    private perPage = 5;
    private currentPage: number;
    private totalPosts = 0;

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        this.loadPage({ page: 1 });
    }

    loadPage($event: any) {
        const filters = {
            per_page: this.perPage,
            page: $event.page
        };
        this.articleService.getChildren(this.article, filters).then((result: noosfero.RestResult<noosfero.Article[]>) => {
            this.totalPosts = <number>(<any>result.headers).get("total");
            this.posts = result.data;
        });
    }
}
