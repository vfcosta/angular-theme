import { Component, Input, Inject } from "ng-forward";

import { ArticleService } from "../../../../lib/ng-noosfero-api/http/article.service";

/**
 * @ngdoc controller
 * @name Folder
 * @description
 *  An specific {@link ArticleView} for folders.
 */
@Component({
    selector: "noosfero-folder",
    templateUrl: "app/article/types/folder/folder.html"
})
@Inject(ArticleService)
export class FolderComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;

    private posts: noosfero.Article[];
    private perPage: number = 5;
    private currentPage: number;
    private totalPosts: number = 0;

    constructor(private articleService: ArticleService) { }

    ngOnInit() {
        this.loadPage();
    }

    loadPage() {
        let filters = {
            per_page: this.perPage,
            page: this.currentPage
        };

        this.articleService
            .getChildren(this.article, filters)
            .then((result: noosfero.RestResult<noosfero.Article[]>) => {
                this.totalPosts = <number>result.headers("total");
                this.posts = result.data;
            });
    }

}
